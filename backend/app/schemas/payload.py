from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class SymptomRequest(BaseModel):
    symptoms: List[str] = Field(..., description="List of symptoms", min_items=1)

class PredictionResponse(BaseModel):
    disease: str
    confidence: float
    top_3_predictions: Optional[Dict[str, float]] = None
    source_model: str

class ChatMessageRequest(BaseModel):
    session_id: Optional[str] = None        
    tool_used: Optional[str] = "Disease Diagnosis" 
    message: str
    current_symptoms: List[str] = []
    followup_count: int = 0
    awaiting_body_part: bool = False
    predicted_diseases: list[str] = []

class DiseaseRequest(BaseModel):
    disease_name: str
    

    