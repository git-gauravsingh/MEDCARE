# backend/app/services/predictor.py
import numpy as np
import json
from app.services.model_loader import ml_models
from app.utils.helpers import process_image, process_symptoms
from app.schemas.payload import PredictionResponse
import logging

logger = logging.getLogger(__name__)

def predict_disease_from_symptoms(symptoms: list) -> PredictionResponse:
    try:
        model_features = list(ml_models.xgb_model.feature_names_in_)
        input_array = process_symptoms(symptoms, model_features)
        probabilities = ml_models.xgb_model.predict_proba(input_array)[0]
        
        top_3_indices = np.argsort(probabilities)[-3:][::-1]
        top_3_predictions = {}
        
        for idx in top_3_indices:
            actual_class_id = ml_models.xgb_model.classes_[idx]
            disease_name = ml_models.label_encoder.inverse_transform([actual_class_id])[0]
            top_3_predictions[str(disease_name)] = float(probabilities[idx])
            
        primary_disease = list(top_3_predictions.keys())[0]
        primary_confidence = top_3_predictions[primary_disease]
        
        return PredictionResponse(
            disease=primary_disease,
            confidence=primary_confidence,
            top_3_predictions=top_3_predictions,
            source_model="XGBoost (Symptoms)"
        )
    except Exception as e:
        logger.error(f"Error in symptom prediction: {str(e)}")
        raise e

def predict_disease_from_image(image_bytes: bytes) -> PredictionResponse:
    try:
        img_array = process_image(image_bytes)
        predictions = ml_models.image_model.predict(img_array)[0]
        
        top_3_indices = np.argsort(predictions)[-3:][::-1]
        top_3_predictions = {}
        
        
        for idx in top_3_indices:
            class_name = ml_models.class_names[int(idx)]
            top_3_predictions[class_name] = float(predictions[idx])
            
        primary_disease = list(top_3_predictions.keys())[0]
        primary_confidence = top_3_predictions[primary_disease]
        
        return PredictionResponse(
            disease=primary_disease,
            confidence=primary_confidence,
            top_3_predictions=top_3_predictions,
            source_model="EfficientNetB0 (Skin Image)"
        )
    except Exception as e:
        logger.error(f"Error in image prediction: {str(e)}")
        raise e
    
    
try:
    with open('app/utils/disease_info.json', 'r') as f:
        disease_db = json.load(f)
except Exception as e:
    logger.error(f"Error loading disease database: {str(e)}")
    disease_db = {}

try:
    with open('app/utils/lab_rules.json', 'r') as f:
        lab_rules_db = json.load(f)  # <-- Hardcoded rules ko isse replace kar diya
except Exception as e:
    logger.error(f"Error loading lab rules: {str(e)}")
    lab_rules_db = {}


def predict_disease_from_report(extracted_terms: list) -> dict:
    try:
        extracted_upper = [term.upper() for term in extracted_terms]
        best_match = "UNKNOWN_NORMAL"
        highest_score = 0.0

        # --- UPDATED: Loop through lab_rules_db instead of LAB_MARKER_RULES ---
        for disease, markers in lab_rules_db.items():
            matched_count = 0
            for marker in markers:
                if any(marker in term for term in extracted_upper):
                    matched_count += 1
            
            if matched_count > 0 and len(markers) > 0:
                confidence = (matched_count / len(markers)) * 100
                if confidence > highest_score:
                    highest_score = confidence
                    best_match = disease

        if best_match in disease_db and highest_score >= 30.0:
            db_info = disease_db[best_match]
            return {
                "prediction": best_match.upper(),
                "confidence": f"{highest_score:.2f}%",
                "basic_details": db_info.get("basic_details", ""),
                "reasons": db_info.get("reason", []),
                "diet": db_info.get("diet_recommendation", []),
                "emergency_level": db_info.get("emergency_level", "Low")
            }
        
        return {
            "prediction": "UNKNOWN_NORMAL",
            "confidence": "95.00%",
            "basic_details": "Report appears normal or parameters are not strongly indicating a specific condition."
        }
    except Exception as e:
        logger.error(f"Error in report prediction: {str(e)}")
        raise e