cat << 'EOF' > main.py
from fastapi import FastAPI
import spacy

app = FastAPI()

# Load SpaCy English language model
nlp = spacy.load("en_core_web_sm")

@app.get("/")
def health_check():
    return {"status": "healthy", "message": "Medcare backend is running successfully!"}

@app.post("/extract-entities/")
def extract_entities(text: str):
    doc = nlp(text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    return {"text": text, "entities": entities}
EOF