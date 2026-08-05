# backend/app/utils/helpers.py
import numpy as np
from PIL import Image
import io
import tensorflow as tf

def process_image(image_bytes: bytes) -> np.ndarray:
    """
    Processes an uploaded image to the format expected by EfficientNetB0.
    - Loads bytes into a PIL Image
    - Converts to RGB (removes alpha channels if PNG)
    - Resizes to 224x224
    - Expands dimensions for batching shape (1, 224, 224, 3)
    """
    image = Image.open(io.BytesIO(image_bytes))
    
    if image.mode != "RGB":
        image = image.convert("RGB")
        
    image = image.resize((224, 224))
    img_array = tf.keras.utils.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

def process_symptoms(user_symptoms: list, all_model_features: list) -> np.ndarray:
    """
    Converts a list of user symptom strings into a binary 1D array of length 377.
    """
    # Initialize an array of zeros with the length of the expected features
    input_data = np.zeros(len(all_model_features))
    
    # Set the index to 1 if the user reported that symptom
    for symptom in user_symptoms:
        if symptom in all_model_features:
            index = all_model_features.index(symptom)
            input_data[index] = 1
            
    # XGBoost expects a 2D array shape (1, 377) for a single prediction
    return input_data.reshape(1, -1)