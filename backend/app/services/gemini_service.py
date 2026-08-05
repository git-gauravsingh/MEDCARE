# backend/app/services/gemini_service.py
import json
import requests
import re
from app.config import settings
from rapidfuzz import process

# Complete symptoms list hardcoded for fast access[cite: 3, 4]
VALID_SYMPTOMS = [
    "anxiety and nervousness", "depression", "shortness of breath", "depressive or psychotic symptoms",
    "sharp chest pain", "dizziness", "insomnia", "abnormal involuntary movements", "chest tightness",
    "palpitations", "irregular heartbeat", "breathing fast", "hoarse voice", "sore throat",
    "difficulty speaking", "cough", "nasal congestion", "throat swelling", "diminished hearing",
    "lump in throat", "throat feels tight", "difficulty in swallowing", "skin swelling",
    "retention of urine", "groin mass", "leg pain", "hip pain", "suprapubic pain", "blood in stool",
    "lack of growth", "emotional symptoms", "elbow weakness", "back weakness", 
    "symptoms of the scrotum and testes", "swelling of scrotum", "pain in testicles", "flatulence",
    "pus draining from ear", "jaundice", "mass in scrotum", "white discharge from eye", "irritable infant",
    "abusing alcohol", "fainting", "hostile behavior", "drug abuse", "sharp abdominal pain", "feeling ill",
    "vomiting", "headache", "nausea", "diarrhea", "vaginal itching", "vaginal dryness", "painful urination",
    "involuntary urination", "pain during intercourse", "frequent urination", "lower abdominal pain",
    "vaginal discharge", "blood in urine", "hot flashes", "intermenstrual bleeding", "hand or finger pain",
    "wrist pain", "hand or finger swelling", "arm pain", "wrist swelling", "arm stiffness or tightness",
    "arm swelling", "hand or finger stiffness or tightness", "wrist stiffness or tightness", "lip swelling",
    "toothache", "abnormal appearing skin", "skin lesion", "acne or pimples", "dry lips", "facial pain",
    "mouth ulcer", "skin growth", "eye deviation", "diminished vision", "double vision", "cross-eyed",
    "symptoms of eye", "pain in eye", "eye moves abnormally", "abnormal movement of eyelid",
    "foreign body sensation in eye", "irregular appearing scalp", "swollen lymph nodes", "back pain",
    "neck pain", "low back pain", "pain of the anus", "pain during pregnancy", "pelvic pain", "impotence",
    "infant spitting up", "vomiting blood", "regurgitation", "burning abdominal pain", "restlessness",
    "symptoms of infants", "wheezing", "peripheral edema", "neck mass", "ear pain", "jaw swelling",
    "mouth dryness", "neck swelling", "knee pain", "foot or toe pain", "bowlegged or knock-kneed",
    "ankle pain", "bones are painful", "knee weakness", "elbow pain", "knee swelling", "skin moles",
    "knee lump or mass", "weight gain", "problems with movement", "knee stiffness or tightness",
    "leg swelling", "foot or toe swelling", "heartburn", "smoking problems", "muscle pain",
    "infant feeding problem", "recent weight loss", "problems with shape or size of breast",
    "difficulty eating", "scanty menstrual flow", "vaginal pain", "vaginal redness", "vulvar irritation",
    "weakness", "decreased heart rate", "increased heart rate", "bleeding or discharge from nipple",
    "ringing in ear", "plugged feeling in ear", "itchy ear(s)", "frontal headache", "fluid in ear",
    "neck stiffness or tightness", "spots or clouds in vision", "eye redness", "lacrimation",
    "itchiness of eye", "blindness", "eye burns or stings", "itchy eyelid", "feeling cold",
    "decreased appetite", "excessive appetite", "excessive anger", "loss of sensation", "focal weakness",
    "slurring words", "symptoms of the face", "disturbance of memory", "paresthesia", "side pain", "fever",
    "shoulder pain", "shoulder stiffness or tightness", "shoulder weakness", "shoulder swelling",
    "tongue lesions", "leg cramps or spasms", "ache all over", "lower body pain", "problems during pregnancy",
    "spotting or bleeding during pregnancy", "cramps and spasms", "upper abdominal pain", "stomach bloating",
    "changes in stool appearance", "unusual color or odor to urine", "kidney mass", "swollen abdomen",
    "symptoms of prostate", "leg stiffness or tightness", "difficulty breathing", "rib pain", "joint pain",
    "muscle stiffness or tightness", "hand or finger lump or mass", "chills", "groin pain", "fatigue",
    "abdominal distention", "regurgitation.1", "symptoms of the kidneys", "melena", "flushing",
    "coughing up sputum", "seizures", "delusions or hallucinations", "pain or soreness of breast",
    "excessive urination at night", "bleeding from eye", "rectal bleeding", "constipation", "temper problems",
    "coryza", "wrist weakness", "hemoptysis", "lymphedema", "skin on leg or foot looks infected",
    "allergic reaction", "congestion in chest", "muscle swelling", "low back weakness", "sleepiness",
    "apnea", "abnormal breathing sounds", "excessive growth", "blood clots during menstrual periods",
    "absence of menstruation", "pulling at ears", "gum pain", "redness in ear", "fluid retention",
    "flu-like syndrome", "sinus congestion", "painful sinuses", "fears and phobias", "recent pregnancy",
    "uterine contractions", "burning chest pain", "back cramps or spasms", "stiffness all over",
    "muscle cramps, contractures, or spasms", "low back cramps or spasms", "back mass or lump", "nosebleed",
    "long menstrual periods", "heavy menstrual flow", "unpredictable menstruation", "painful menstruation",
    "infertility", "frequent menstruation", "sweating", "mass on eyelid", "swollen eye", "eyelid swelling",
    "eyelid lesion or rash", "unwanted hair", "symptoms of bladder", "irregular appearing nails",
    "itching of skin", "hurts to breath", "skin dryness, peeling, scaliness, or roughness",
    "skin on arm or hand looks infected", "skin irritation", "itchy scalp", "incontinence of stool", "warts",
    "bumps on penis", "too little hair", "foot or toe lump or mass", "skin rash",
    "mass or swelling around the anus", "ankle swelling", "drainage in throat", "dry or flaky scalp",
    "premenstrual tension or irritability", "feeling hot", "foot or toe stiffness or tightness",
    "pelvic pressure", "elbow swelling", "early or late onset of menopause", "bleeding from ear",
    "hand or finger weakness", "low self-esteem", "itching of the anus", "swollen or red tonsils",
    "irregular belly button", "lip sore", "vulvar sore", "hip stiffness or tightness", "mouth pain",
    "arm weakness", "leg lump or mass", "penis pain", "loss of sex drive", "obsessions and compulsions",
    "antisocial behavior", "neck cramps or spasms", "poor circulation", "thirst", "sneezing", "bladder mass",
    "premature ejaculation", "leg weakness", "penis redness", "penile discharge", "shoulder lump or mass",
    "cloudy eye", "hysterical behavior", "arm lump or mass", "nightmares", "bleeding gums", "pain in gums",
    "bedwetting", "diaper rash", "lump or mass of breast", "vaginal bleeding after menopause",
    "itching of scrotum", "postpartum problems of the breast", "hesitancy", "muscle weakness", "throat redness",
    "joint swelling", "redness in or around nose", "wrinkles on skin", "foot or toe weakness",
    "hand or finger cramps or spasms", "back stiffness or tightness", "wrist lump or mass", "skin pain",
    "low urine output", "sore in nose", "ankle weakness"
]

VALID_SYMPTOM_SET = {s.lower() for s in VALID_SYMPTOMS}

with open(settings.SYMPTOM_ALIASES_PATH, "r", encoding="utf-8") as f:
    aliases = json.load(f)
    
import json

with open("app/utils/disease_info.json", "r", encoding="utf-8") as f:
    DISEASE_INFO = json.load(f)

SYMPTOM_LOOKUP = {}

for canonical, alias_list in aliases.items():

    SYMPTOM_LOOKUP[canonical.lower()] = canonical

    for alias in alias_list:
        SYMPTOM_LOOKUP[alias.lower()] = canonical

def _call_gemini(prompt: str, temperature: float = 0.0) -> str:
    MODEL = "gemini-flash-lite-latest"

    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODEL}:generateContent?key={settings.GEMINI_API_KEY}"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": temperature,
            "topK": 10,
            "maxOutputTokens": 800
        }
    }

    try:
        print("URL:", url)
        print("MODEL:", MODEL)
        print("KEY:", settings.GEMINI_API_KEY[:10] + "...")

        response = requests.post(
            url,
            json=payload,
            timeout=20
        )
        
        print("STATUS:", response.status_code)
        print("BODY:", response.text)

        if response.status_code != 200:
            print(f"Gemini API Error {response.status_code}: {response.text}")
            return ""

        data = response.json()

        if (
            "candidates" not in data
            or not data["candidates"]
            or "content" not in data["candidates"][0]
        ):
            print("Gemini Empty Response:", data)
            return ""

        text = data["candidates"][0]["content"]["parts"][0]["text"].strip()

        # Remove accidental markdown
        text = text.replace("```json", "").replace("```", "").strip()

        # Remove chain-of-thought / planning text if Gemini ever leaks it
        bad_phrases = [
            "Final Polish",
            "Reasoning",
            "Analysis",
            "Let's think",
            "Thought process"
        ]

        for phrase in bad_phrases:
            if phrase.lower() in text.lower():
                idx = text.lower().find(phrase.lower())
                text = text[:idx].strip()

        return text

    except requests.exceptions.Timeout:
        print("Gemini Timeout")
        return ""

    except Exception as e:
        print(f"Gemini Exception: {e}")
        return ""

   

def _parse_json_response(raw_text: str) -> dict:
    # Retained JSON extraction logic from the new code[cite: 5]
    if not raw_text:
        return {}
    try:
        match = re.search(r'\{.*\}', raw_text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return {}
    except Exception as e:
        print(f"JSON Parse Error: {e} | Raw Text: {raw_text}")
        return {}

def analyze_user_input(user_text: str, allowed_features: list = None) -> dict:
    
    clean_text = user_text.strip().lower()
    
    GENERIC_WORDS = {
        # English
        "pain",
        "ache",
        "aching",
        "hurt",
        "hurts",
        "hurting",
        "sore",
        "soreness",
        "discomfort",
        "problem",
        "issue",
        "trouble",

        # Hindi / Hinglish
        "dard",
        "drd",
        "derd",
        "darad",
        "drad",
        "takleef",
        "taklif",
        "taklif hai",
        "takleef hai",
        "problem hai",
        "issue hai",
        "dukhta",
        "dukhti",
        "dukhta hai",
        "dukhti hai",
        "dukhta hu",
        "dukhti hu",
        "dukhta hua",
        "dukhti hui",
        "dard hai",
        "drd h",
        "drd hai",
        "pain hai",
        "pain h",
        "bohot dard",
        "bahut dard",
        "zyada dard",
        "tez dard",
        "mild pain",
        "severe pain",
        "pain ho raha hai",
        "pain ho rha hai",
        "pain ho raha",
        "pain ho rha",
        "dard ho raha hai",
        "dard ho rha hai",
        "dard ho raha",
        "dard ho rha",
        "takleef ho rahi hai",
        "taklif ho rahi hai"
    }
    

    if clean_text in GENERIC_WORDS:
        return {
            "intent": "body_part",
            "extracted_symptoms": [],
            "reply": "Which part? (Head, Chest, Stomach, Back, Leg, Arm, Ear, Eye...)"
        }

    # -----------------------------
    # 1. Exact full-text alias match
    # -----------------------------
    if clean_text in SYMPTOM_LOOKUP:

        symptom = SYMPTOM_LOOKUP[clean_text]

        return {
            "intent": "symptoms",
            "symptoms": [symptom],
            "extracted_symptoms": [symptom],
            "reply": ""
        }

    # ----------------------------------------
    # 2. Phrase lookup (pet dard, bukhar etc.)
    # ----------------------------------------
    matched = []

    words = clean_text.split()
    print("INPUT:", repr(clean_text))
    print("WORDS:", words)

    for phrase, symptom in SYMPTOM_LOOKUP.items():
    
        if " " in phrase:
            if phrase in clean_text:
                print("MATCH:", phrase, "->", symptom)
                matched.append(symptom)
        else:
            if phrase in words:
                print("MATCH:", phrase, "->", symptom)
                matched.append(symptom)


    if matched:

        return {
            "intent": "symptoms",
            "symptoms": matched,
            "extracted_symptoms": matched,
            "reply": ""
        }

    # ----------------------------------------
    # 3. RapidFuzz on aliases (NO GEMINI)
    # ----------------------------------------

    words = re.split(r"[,\s]+", clean_text)

    matched = []

    alias_keys = list(SYMPTOM_LOOKUP.keys())

    for word in words:
    
        # Generic/short words ignore
        if len(word) < 5:
            continue

        best = process.extractOne(
            word,
            alias_keys,
            score_cutoff=95
        )
        print("WORD:", word, "BEST:", best)

        if best:
            canonical = SYMPTOM_LOOKUP[best[0]]
            matched.append(canonical)

    matched = list(dict.fromkeys(matched))

    if matched:

        return {
            "intent": "symptoms",
            "symptoms": matched,
            "extracted_symptoms": matched,
            "reply": ""
        }

    # ----------------------------------------
    # 4. Greeting
    # ----------------------------------------

    greeting_pattern = r"^(h+e*l+o+|h+i+|h+e+y+|h+l+w+)[^a-z]*$"

    if re.match(greeting_pattern, clean_text):

        return {
            "intent": "chat",
            "extracted_symptoms": [],
            "reply": "Hello! I am MEDCARE AI, your personal clinical symptom tracker. Please describe the symptoms you are experiencing."
        }

    # ----------------------------------------
    # 5. Gemini LAST fallback
    # ----------------------------------------

    features_to_match = allowed_features if allowed_features else VALID_SYMPTOMS

    prompt = f"""
You are a medical symptom normalizer.

Your only job is:

1. Understand English, Hindi and Hinglish.
2. Correct spelling mistakes.
3. Expand abbreviations.
4. Convert symptoms into standard symptom names.

Return ONLY JSON.

User:
{user_text}

Output:

{{
    "intent":"chat | symptoms | finished",
    "symptoms":[
        "fever",
        "cough"
    ],
    "reply":""
}}
"""

    raw_text = _call_gemini(prompt)

    if not raw_text:

        return {
            "intent": "chat",
            "extracted_symptoms": [],
            "reply": "I am experiencing network issues. Please try again."
        }

    result = _parse_json_response(raw_text)

    if not result:

        return {
            "intent": "chat",
            "extracted_symptoms": [],
            "reply": "I couldn't process that. Please describe your symptoms clearly."
        }

    matched = []

    symptoms = (
        result.get("symptoms")
        or result.get("extracted_symptoms")
        or []
    )

    for symptom in symptoms:

        best = process.extractOne(
            symptom.lower().strip(),
            features_to_match,
            score_cutoff=75
        )

        if best:

            matched.append(best[0])

    result["extracted_symptoms"] = list(dict.fromkeys(matched))
    
    if result.get("intent") == "symptoms" and not result["extracted_symptoms"]:
    
        return {
            "intent": "unknown",
            "extracted_symptoms": [],
            "reply": "I couldn't recognize that disease or symptom. Please check the spelling and try again."
        }

    return result

def generate_followup_question(
    current_symptoms: list,
    top_3_diseases: list,
    candidate_symptoms: list = None
) -> str:

    candidate_text = ""

    if candidate_symptoms:
        candidate_text = f"""
Possible additional symptoms (choose ONLY from these):

{', '.join(candidate_symptoms)}
"""

    prompt = f"""
You are an intelligent medical assistant.

The patient has already reported these symptoms:

{', '.join(current_symptoms)}

Possible diseases (internal reference only):

{', '.join(top_3_diseases)}

Possible additional symptoms:

{candidate_text}

Your task:

Ask ONLY ONE follow-up question.

Rules:

- Ask about symptoms only.
- Never repeat symptoms already reported.
- Choose ONLY from "Possible additional symptoms".
- If there are many symptoms, choose the most useful 2 or 3.
- Never mention disease names.
- Never explain your reasoning.
- Never show analysis.
- Never use markdown.
- Return ONLY the question.
- Keep it under 20 words.


Example outputs:

Are you also experiencing chills, joint pain, or skin rash?

Do you have loss of appetite, abdominal pain, or sweating?

Are you also experiencing eye pain or muscle aches?
"""

    question = _call_gemini(prompt, temperature=0.0)

    if not question:
    
        if candidate_symptoms:

            sample = ", ".join(candidate_symptoms[:3])

            return f"Are you also experiencing {sample}?"

        return "Could you describe any additional symptoms?"
    
    return question.strip()

from app.services.model_loader import ml_models

def get_top_3_summary(diseases_dict: dict) -> dict:
    
    result = {"diseases": []}

    for name, confidence in diseases_dict.items():

        info = ml_models.disease_info.get(name.lower(), {})

        result["diseases"].append({

            "name": name,

            "confidence": round(confidence * 100, 2),

            "basic_details": info.get("basic_details", ""),

            "reason": info.get("reason", []),

            "diet_recommendation": info.get("diet_recommendation", []),

            "recommended_tests": info.get("recommended_tests", []),

            "emergency_level": info.get("emergency_level", "")

        })

    return result

def get_single_disease_details(disease_name: str, confidence: float) -> dict:
    disease = DISEASE_INFO.get(disease_name.lower())

    if not disease:
        return {
            "name": disease_name,
            "confidence": round(confidence * 100, 2),
            "error": "Disease information not found."
        }

    return {
        "name": disease_name,
        "confidence": round(confidence * 100, 2),

        "basic_details": disease.get("basic_details", ""),

        "reason": disease.get("reason", []),

        "emergency_signs": disease.get("emergency_signs", []),

        "precautions": disease.get("precautions", []),

        "things_to_avoid": disease.get("things_to_avoid", []),

        "diet_recommendation": disease.get("diet_recommendation", []),

        "common_medicines": disease.get("common_medicines", []),

        "treatment_options": disease.get("treatment_options", []),

        "recovery_time": disease.get("recovery_time", []),

        "physical_activities": disease.get("physical_activities", []),

        "recommended_tests": disease.get("recommended_tests", []),

        "when_to_visit_doctor": disease.get("when_to_visit_doctor", []),

        "specialist": disease.get("specialist", ""),

        "emergency_level": disease.get("emergency_level", "")
    }
