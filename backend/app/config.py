# backend/app/config.py

from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    PROJECT_NAME: str = "MedCare AI API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Disease prediction using Symptoms and Skin Images"

    # backend/
    BASE_DIR: Path = Path(__file__).resolve().parent.parent

    # backend/app/
    APP_DIR: Path = Path(__file__).resolve().parent

    # backend/saved_models/
    MODEL_DIR: Path = BASE_DIR / "saved_models"

    XGB_MODEL_PATH: Path = MODEL_DIR / "final_xgb_model.pkl"
    LABEL_ENCODER_PATH: Path = MODEL_DIR / "label_encoder.pkl"
    EFFICIENTNET_MODEL_PATH: Path = MODEL_DIR / "efficientnetb0_baseline.keras"
    CLASS_NAMES_PATH: Path = MODEL_DIR / "class_names.json"

    # backend/app/utils/
    UTILS_DIR: Path = BASE_DIR / "app" / "utils"
    
    SYMPTOM_ALIASES_PATH: Path = UTILS_DIR / "symptom_aliases.json"

    DISEASE_SYMPTOMS_PATH: Path = UTILS_DIR / "disease_symptoms.json"
    DISEASE_INFO_PATH: Path = UTILS_DIR / "disease_info.json"
    

    GEMINI_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
