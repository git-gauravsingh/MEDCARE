import json
import time
from google import genai
from google.genai import types

# -----------------------------
# CONFIG
# -----------------------------

client = genai.Client(
    api_key="GEMINI_API_KEY"
)

MODEL = "gemini-flash-lite-latest"

INPUT_FILE = "input_data.json"
OUTPUT_FILE = "output_data_v2.json"


# -----------------------------
# LOAD
# -----------------------------

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

try:
    with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
        output = json.load(f)
except:
    output = {}

total = len(data)

for index, (disease, info) in enumerate(data.items(), start=1):

    if disease in output:
        print(f"[{index}/{total}] Skip : {disease}")
        continue

    print(f"[{index}/{total}] Processing : {disease}")

    prompt = f"""
Disease:
{disease}

Return ONLY valid JSON.

Generate ONLY these fields.

Use very simple English.

{{
    "common_medicines":[
        "...",
        "...",
        "...",
        "..."
    ],

    "treatment_options":[
        "...",
        "...",
        "...",
        "..."
    ],

    "when_to_visit_doctor":[
        "...",
        "...",
        "...",
        "..."
    ],

    "specialist":"",

    "emergency_level":"Low | Moderate | High | Emergency"
}}
"""

    try:

        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )

        new_fields = json.loads(response.text)

        output[disease] = {

            "basic_details":
                info.get("basic_details", ""),

            "reason":
                info.get("reason", []),

            "emergency_signs":
                info.get("emergency_signs", []),

            "precautions":
                info.get("precautions", []),

            "things_to_avoid":
                info.get("things_to_avoid", []),

            "diet_recommendation":
                info.get("diet_recommendation", []),

            # renamed
            "common_medicines":
                new_fields.get("common_medicines",
                               info.get("general_medicines", [])),

            # NEW
            "treatment_options":
                new_fields.get("treatment_options", []),

            "recovery_time":
                info.get("recovery_time", []),

            "physical_activities":
                info.get("physical_activities", []),

            # renamed
            "recommended_tests":
                info.get("recommended_test", []),

            # NEW
            "when_to_visit_doctor":
                new_fields.get("when_to_visit_doctor", []),

            # NEW
            "specialist":
                new_fields.get("specialist", ""),

            # NEW
            "emergency_level":
                new_fields.get("emergency_level", "")
        }

        with open(
            OUTPUT_FILE,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                output,
                f,
                indent=4,
                ensure_ascii=False
            )

        time.sleep(5)

    except Exception as e:

        print(disease, e)
        time.sleep(15)

print("DONE")