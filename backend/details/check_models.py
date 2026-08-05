import json



FILE = "output_data_v2.json"

REQUIRED_FIELDS = [
    "basic_details",
    "reason",
    "emergency_signs",
    "precautions",
    "things_to_avoid",
    "diet_recommendation",
    "common_medicines",
    "treatment_options",
    "recovery_time",
    "physical_activities",
    "recommended_tests",
    "when_to_visit_doctor",
    "specialist",
    "emergency_level"
]

with open(FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

print("=" * 60)
print(f"Total Diseases : {len(data)}")
print("=" * 60)

missing_count = 0
empty_count = 0

for disease, info in data.items():

    # Missing fields
    missing = [field for field in REQUIRED_FIELDS if field not in info]

    if missing:
        missing_count += 1
        print(f"\n❌ {disease}")
        print("Missing Fields:", ", ".join(missing))

    # Empty fields
    empty = []

    for field in REQUIRED_FIELDS:

        if field not in info:
            continue

        value = info[field]

        if isinstance(value, list) and len(value) == 0:
            empty.append(field)

        elif isinstance(value, str) and value.strip() == "":
            empty.append(field)

    if empty:
        empty_count += 1
        print(f"\n⚠️ {disease}")
        print("Empty Fields:", ", ".join(empty))

print("\n" + "=" * 60)
print("VALIDATION COMPLETE")
print("=" * 60)
print(f"Diseases Checked : {len(data)}")
print(f"Missing Field Errors : {missing_count}")
print(f"Empty Field Warnings : {empty_count}")

if missing_count == 0 and empty_count == 0:
    print("\n PERFECT! JSON is complete.")