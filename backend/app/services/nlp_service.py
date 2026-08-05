import spacy
import logging

logger = logging.getLogger(__name__)

# Load the scispaCy medical model
try:
    nlp = spacy.load("en_core_sci_sm")
    logger.info("scispaCy model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load scispaCy model: {str(e)}")
    nlp = None

def extract_medical_entities(text: str):
    """
    Extracts medical entities (like diseases, chemicals, test names) from raw text.
    """
    if nlp is None:
        return {"error": "NLP model not loaded."}
        
    doc = nlp(text)
    
    # Entity extraction
    entities = []
    for ent in doc.ents:
        entities.append(ent.text)
        
    # Remove duplicates and clean up
    unique_entities = list(set(entities))
    
    return unique_entities