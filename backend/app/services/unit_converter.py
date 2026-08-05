# app/services/unit_converter.py

def normalize_unit(unit: str) -> str:

    if not unit:
        return ""

    unit = unit.lower().replace(" ", "")

    replacements = {
        "gl": "g/l",
        "gdl": "g/dl",
        "mgdl": "mg/dl",
        "mgl": "mg/l",
        "mmoll": "mmol/l",
        "umoll": "umol/l",
        "µmoll": "umol/l",
        "iul": "iu/l",
        "ul": "u/l",
    }

    return replacements.get(unit, unit)


def convert_value(test_name: str,
                  value,
                  from_unit: str,
                  to_unit: str):
    

    if value is None:
        return value

    from_unit = normalize_unit(from_unit)
    to_unit = normalize_unit(to_unit)

    # Same unit
    if from_unit == to_unit:
        return value

    # g/L -> g/dL
    if from_unit == "g/l" and to_unit == "g/dl":
        return value / 10

    # mg/L -> mg/dL
    if from_unit == "mg/l" and to_unit == "mg/dl":
        return value / 10

        # -------------------------
    # Creatinine
    # -------------------------
    if test_name == "SERUM CREATININE":
        if from_unit == "umol/l" and to_unit == "mg/dl":
            return round(value / 88.4, 2)

    # -------------------------
    # Uric Acid
    # -------------------------
    if test_name == "URIC ACID":
        if from_unit == "umol/l" and to_unit == "mg/dl":
            return round(value / 59.48, 2)

    # -------------------------
    # Total Calcium
    # -------------------------
    if test_name == "TOTAL CALCIUM":
        if from_unit == "mmol/l" and to_unit == "mg/dl":
            return round(value * 4.0, 2)

    # -------------------------
    # Phosphorus
    # -------------------------
    if test_name == "PHOSPHORUS":
        if from_unit == "mmol/l" and to_unit == "mg/dl":
            return round(value * 3.1, 2)

    # -------------------------
    # Blood Urea
    # -------------------------
    if test_name == "BLOOD UREA":
        if from_unit == "mmol/l" and to_unit == "mg/dl":
            return round(value * 6.0, 2)

    # -------------------------
    # Blood Urea Nitrogen (BUN)
    # -------------------------
    if test_name == "BLOOD UREA NITROGEN":
        if from_unit == "mmol/l" and to_unit == "mg/dl":
            return round(value * 2.8, 2)

    
    # Unknown conversion
    return value