import io
import pdfplumber
from PIL import Image
import easyocr
# Yahan sirf Form add kiya hai
from fastapi import UploadFile, File, APIRouter, HTTPException, Form
from collections import Counter
import logging

from app.schemas.payload import ChatMessageRequest
from app.services.report_parser import parse_report
from app.services.reference_checker import analyze_report
from app.services.predictor import predict_disease_from_image, predict_disease_from_symptoms
from app.services.gemini_service import (
    analyze_user_input, 
    generate_followup_question, 
    get_top_3_summary
)
from app.services.chat_service import (
    get_or_create_session, save_message, get_all_sessions, get_session_messages
)
from app.services.model_loader import ml_models

logger = logging.getLogger(__name__)
ocr_reader = easyocr.Reader(['en'], gpu=False)

from pydantic import BaseModel
from typing import Any, Optional

class SaveInteractionRequest(BaseModel):
    session_id: Optional[str] = None
    tool_used: str
    user_message: str
    ai_response: Any

router = APIRouter()

@router.post("/chat/message", tags=["Chat"])
async def handle_chat_message(payload: ChatMessageRequest):
    try:
        allowed_features = []
        if ml_models.xgb_model is not None and hasattr(ml_models.xgb_model, "feature_names_in_"):
            allowed_features = list(ml_models.xgb_model.feature_names_in_)

        user_msg = payload.message.strip().lower()
        
        # 1. Naya session banao aur User ka message save karo
        session_id = get_or_create_session(payload.session_id, payload.tool_used)
        save_message(session_id, "user", "text", payload.message)

        # Check if user entered a disease name
        disease_lookup = {
            d.lower(): d
            for d in ml_models.disease_info.keys()
        }

        if user_msg in disease_lookup:
            disease = disease_lookup[user_msg]
            details = ml_models.disease_info[disease]
            
            ai_response = {
                "name": disease,
                **details
            }
            # AI message save karo
            save_message(session_id, "ai", "text", ai_response)

            return {
                "session_id": session_id,
                "type": "disease_details",
                "data": ai_response
            }

        exit_commands = ["done", "finished", "diagnose", "diagnose me", "bas", "ho gaya", "that's it", "complete", "ok"]
        
        # User ne yes/no/ha/na bola regarding cross-questions
        if payload.followup_count > 0 and user_msg in ["no", "na", "nahi", "nothing"]:
             # Agar user ne naye symptoms ke liye mana kar diya, toh force complete kar do
             intent = "finished"
             new_symptoms = []
        elif user_msg in exit_commands:
            intent = "finished"
            new_symptoms = []
            chat_reply = ""
        else:          
            BODY_PARTS = {
                "head",
                "chest",
                "back",
                "leg",
                "arm",
                "ear",
                "eye",
                "neck",
                "shoulder",
                "knee",
                "ankle",
                "foot",
                "toe",
                "hand",
                "finger",
                "wrist",
                "hip",
                "mouth",
                "tooth",
                "jaw",
                "nose",
                "throat",
                "stomach",
                "abdomen",
                "belly",
                "pelvis"
            }

            if payload.awaiting_body_part:
                part = payload.message.strip().lower()
                if part in BODY_PARTS:
                    payload.message = f"{part} pain"
                    
            analysis = analyze_user_input(payload.message, allowed_features)
            
            intent = analysis.get("intent", "symptoms")
            new_symptoms = analysis.get("extracted_symptoms", [])
            chat_reply = analysis.get("reply", "Noted.")

        if intent == "body_part":
            save_message(session_id, "ai", "text", analysis["reply"])
            return {
                "session_id": session_id,
                "type": "body_part",
                "message": analysis["reply"],
                "awaiting_body_part": True,
                "updated_symptoms": payload.current_symptoms,
                "followup_count": payload.followup_count
            }
            
        if intent == "chat":
            save_message(session_id, "ai", "text", chat_reply)
            return {
                "session_id": session_id,
                "type": "chat",
                "message": chat_reply,
                "updated_symptoms": payload.current_symptoms,
                "followup_count": payload.followup_count,
                "awaiting_body_part": False
            }
            
        if intent == "unknown":
            save_message(session_id, "ai", "text", chat_reply)
            return {
                "session_id": session_id,
                "type": "chat",
                "message": chat_reply
            }

        updated_symptoms = list(dict.fromkeys(payload.current_symptoms + new_symptoms))
        
        if intent == "symptoms":
            # Frontend par added symptoms dikhane ke liye message bhejo
            added_msg = f"Got it. Added: {', '.join(new_symptoms)}. Anything else? Say 'done' if this is all." if new_symptoms else "I couldn't match that exact symptom. Can you describe it differently?"
            
            # Agar followup loop me naye symptoms mile hain, toh intent ko automatic finished maan lo taaki dubara predict kare
            if payload.followup_count > 0 and new_symptoms:
                intent = "finished"
            else:
                save_message(session_id, "ai", "text", added_msg)
                return {
                    "session_id": session_id,
                    "type": "collecting",
                    "message": added_msg,
                    "updated_symptoms": updated_symptoms,
                    "followup_count": payload.followup_count
                }

        if intent == "finished":
            if not updated_symptoms:
                msg = "You haven't mentioned any symptoms yet! Please describe what you are experiencing."
                save_message(session_id, "ai", "text", msg)
                return {
                    "session_id": session_id,
                    "type": "collecting",
                    "message": msg,
                    "updated_symptoms": updated_symptoms,
                    "followup_count": payload.followup_count
                }
            
            ml_result = predict_disease_from_symptoms(updated_symptoms)
            confidence_score = ml_result.confidence
            
            # Agar confidence 60% se kam hai AUR humne abhi tak 2 se kam baar pucha hai
            if confidence_score < 0.60 and payload.followup_count < 2:
                top_3_names = list(ml_result.top_3_predictions.keys())[:3]
                symptom_counter = Counter()

                for disease in top_3_names:
                    symptoms = ml_models.disease_symptom_mapping.get(disease, [])
                    symptom_counter.update(symptoms)

                # Remove already known symptoms
                candidate_symptoms = [
                    symptom
                    for symptom, _ in symptom_counter.most_common()
                    if symptom.lower() not in {x.lower() for x in updated_symptoms}
                ]

                # Keep only first 15 symptoms
                candidate_symptoms = candidate_symptoms[:15]
                
                if not candidate_symptoms:
                    summary_data = get_top_3_summary(ml_result.top_3_predictions)
                    save_message(session_id, "ai", "text", summary_data)
                    return {
                        "session_id": session_id,
                        "type": "diagnosis_complete",
                        "data": summary_data,
                        "predicted_diseases": list(ml_result.top_3_predictions.keys()),
                        "updated_symptoms": updated_symptoms,
                        "ml_confidence": confidence_score,
                        "followup_count": 0
                    }

                followup_question = generate_followup_question(
                    current_symptoms=updated_symptoms,
                    top_3_diseases=top_3_names,
                    candidate_symptoms=candidate_symptoms
                )
                
                save_message(session_id, "ai", "text", followup_question)
                return {
                    "session_id": session_id,
                    "type": "followup",
                    "message": followup_question,
                    "updated_symptoms": updated_symptoms,
                    "ml_confidence": confidence_score,
                    "followup_count": payload.followup_count + 1
                }
            # Agar confidence 60%+ ho gaya YA hum 2 baar puch chuke hain (force result)
            else:
                summary_data = get_top_3_summary(ml_result.top_3_predictions)
                save_message(session_id, "ai", "text", summary_data)
                return {
                    "session_id": session_id,
                    "type": "diagnosis_complete",
                    "data": summary_data,
                    "predicted_diseases": list(ml_result.top_3_predictions.keys()),
                    "updated_symptoms": updated_symptoms,
                    "ml_confidence": confidence_score,
                    "followup_count": 0
                }

    except Exception as e:
        logger.error(f"Chat communication error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error handling chat message.")
    
@router.post("/predict/image", tags=["Image Prediction"])
async def predict_image(
    file: UploadFile = File(...),
    session_id: str = Form(None),
    tool_used: str = Form("Skin Disease")
):
    try:
        image_bytes = await file.read()
        
        # --- NAYA HISTORY LOGIC ---
        sess_id = get_or_create_session(session_id, tool_used)
        save_message(sess_id, "user", "text", f"📷 Uploaded Image: {file.filename}")
        
        result = predict_disease_from_image(image_bytes)

        # Gemini se explanation lao
        summary_data = get_top_3_summary(result.top_3_predictions)

        # --- NAYA HISTORY LOGIC ---
        save_message(sess_id, "ai", "text", summary_data)

        return {
            "success": True,
            "session_id": sess_id,
            "disease": result.disease,
            "confidence": round(result.confidence * 100, 2),
            "top_3_predictions": result.top_3_predictions,
            "summary": summary_data,
            "source_model": result.source_model
        }

    except Exception as e:
        logger.error(f"Image prediction error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze image."
        )
        
@router.post("/predict/report", tags=["Report Analysis"])
async def analyze_medical_report(
    file: UploadFile = File(...),
    session_id: str = Form(None),
    tool_used: str = Form("Report Analysis")
):
    try:
        file_content = await file.read()
        filename = file.filename.lower()
        extracted_text = ""

        # --- NAYA HISTORY LOGIC ---
        sess_id = get_or_create_session(session_id, tool_used)
        save_message(sess_id, "user", "text", f"📄 Uploaded Report: {file.filename}")

        # ---------- PDF ----------
        if filename.endswith(".pdf"):
            with pdfplumber.open(io.BytesIO(file_content)) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"

        # ---------- IMAGE ----------
        elif filename.endswith((".png", ".jpg", ".jpeg", ".bmp", ".tiff")):
            image = Image.open(io.BytesIO(file_content))
            text_list = ocr_reader.readtext(image, detail=0)
            extracted_text = "\n".join(text_list)

        # ---------- Unsupported ----------
        else:
            raise HTTPException(
                status_code=400,
                detail="Only PDF and image files are supported."
            )

        if not extracted_text.strip():
            raise HTTPException(
                status_code=400, 
                detail="Could not extract text. The PDF might be empty or an image-based scanned PDF."
            )

        parsed_report = parse_report(extracted_text)
        analyzed_report = analyze_report(
            parsed_report=parsed_report,
            gender="male"      # abhi hardcode, baad me frontend se bhej denge
        )

        # --- NAYA HISTORY LOGIC ---
        report_text = "\n\n---------------------\n\n".join(
            [f"{t['test_name']}\nResult : {t.get('converted_value', '')} {t.get('converted_unit', '')}\nStatus : {t.get('status', '')}" for t in analyzed_report]
        )
        bot_reply = "### Report Analysis Complete\n\n" + report_text
        save_message(sess_id, "ai", "text", bot_reply)

        return {
            "success": True,
            "session_id": sess_id,
            "filename": file.filename,
            "total_tests": len(analyzed_report),
            "tests": analyzed_report
        }

    except Exception as e:
        logger.error(f"Report analysis error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process the report: {str(e)}"
        )
        
@router.get("/chats", tags=["Chat History"])
async def fetch_all_chats():
    return get_all_sessions()

@router.get("/chats/{session_id}", tags=["Chat History"])
async def fetch_chat_by_id(session_id: str):
    messages = get_session_messages(session_id)
    return {"session_id": session_id, "messages": messages}

@router.delete("/chats/{session_id}", tags=["Chat History"])
async def delete_chat(session_id: str):
    from app.services.chat_service import get_chat_db
    conn = get_chat_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ChatMessage WHERE session_id = ?", (session_id,))
    cursor.execute("DELETE FROM ChatSession WHERE id = ?", (session_id,))
    conn.commit()
    conn.close()
    return {"success": True}

@router.post("/chat/save_interaction", tags=["Chat History"])
async def save_interaction(req: SaveInteractionRequest):
    from app.services.chat_service import get_or_create_session, save_message
    session_id = get_or_create_session(req.session_id, req.tool_used)
    
    # User ki query save karo
    save_message(session_id, "user", "text", req.user_message)
    # AI/Medicine ka response save karo
    save_message(session_id, "ai", "text", req.ai_response)
    
    return {"success": True, "session_id": session_id}