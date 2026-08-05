# backend/app/services/model_loader.py
import json
import joblib
import pandas as pd
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self):
        self.xgb_model = None
        self.label_encoder = None
        self.image_model = None
        self.class_names = None
        
        self.disease_symptom_mapping = {}
        self.disease_info = {}
        self.symptom_lookup = {}

    def load_models(self):
        logger.info("Loading models into memory...")
        try:
            self.xgb_model = joblib.load(settings.XGB_MODEL_PATH)
            logger.info("XGBoost model loaded successfully.")
            self.label_encoder = joblib.load(settings.LABEL_ENCODER_PATH)
            logger.info("Label Encoder loaded successfully.")
            self.image_model = None
            self.image_model_loaded = False
            logger.info("Image model will be loaded on first request.")
            with open(settings.CLASS_NAMES_PATH, 'r') as f:
                self.class_names = json.load(f)

            logger.info("Class names loaded successfully.")

            # Load disease -> symptoms mapping
            with open(settings.DISEASE_SYMPTOMS_PATH, "r", encoding="utf-8") as f:
                self.disease_symptom_mapping = json.load(f)

            logger.info(
                f"Disease symptom mapping loaded successfully ({len(self.disease_symptom_mapping)} diseases)."
            )
            
            with open(settings.DISEASE_INFO_PATH, "r", encoding="utf-8") as f:
                self.disease_info = json.load(f)

            logger.info(
                f"Disease info loaded ({len(self.disease_info)} diseases)."
            )
            
            with open(settings.SYMPTOM_ALIASES_PATH, "r", encoding="utf-8") as f:

                aliases = json.load(f)

            self.symptom_lookup = {}
            
            for symptom, alias_list in aliases.items():

                for alias in alias_list:

                    self.symptom_lookup[alias.lower().strip()] = symptom

            logger.info(
                f"Symptom aliases loaded ({len(self.symptom_lookup)} aliases)."
            )

        except Exception as e:
            logger.error(f"Failed to load models: {str(e)}")
            raise e
        
            
    def get_image_model(self):
        if self.image_model is None:
            logger.info("Loading EfficientNet model...")

            import tensorflow as tf

            self.image_model = tf.keras.models.load_model(
                settings.EFFICIENTNET_MODEL_PATH
            )

            self.image_model_loaded = True
            logger.info("EfficientNet model loaded.")

        return self.image_model


ml_models = ModelLoader()