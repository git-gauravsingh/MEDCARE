# app/services/reference_checker.py

from pathlib import Path
import json
from typing import List, Dict
from app.services.unit_converter import convert_value, normalize_unit

# ======================================
# Load Lab Reference
# ======================================

BASE_DIR = Path(__file__).resolve().parent.parent
LAB_REFERENCE_PATH = BASE_DIR / "utils" / "lab_reference.json"

with open(LAB_REFERENCE_PATH, "r", encoding="utf-8") as f:
    LAB_REFERENCE = json.load(f)


# ======================================
# Get Reference Range
# ======================================

def get_reference_range(test_name: str, gender: str = "male"):

    test = LAB_REFERENCE.get(test_name)

    if not test:
        return None

    reference = test.get("reference_range", {})

    if gender.lower() in reference:
        return reference[gender.lower()]

    if "general" in reference:
        return reference["general"]

    return None


# ======================================
# Get Status
# ======================================

def get_status(test_name: str,
               value,
               unit: str = "",
               gender: str = "male") -> str:

    test = LAB_REFERENCE.get(test_name)

    if not test:
        return "UNKNOWN", value

    datatype = test.get("datatype", "numeric")

    # -----------------------------
    # Positive / Negative
    # -----------------------------
    if datatype == "positive_negative":

        if value is None:
            return "UNKNOWN", value

        value = str(value).strip().upper()

        if value in [
            "POSITIVE",
            "REACTIVE",
            "DETECTED",
            "PRESENT",
            "TRACE"
        ]:
            return "POSITIVE", value

        if value in [
            "NEGATIVE",
            "NON REACTIVE",
            "NOT DETECTED",
            "ABSENT",
            "NIL"
        ]:
            return "NEGATIVE", value

        return "UNKNOWN", value

    # -----------------------------
    # Text
    # -----------------------------
    if datatype == "text":
        return "VALUE", value

    # -----------------------------
    # Numeric
    # -----------------------------
    try:
        value = float(value)
    except:
        return "UNKNOWN", value

    reference = get_reference_range(test_name, gender)
    
    preferred_unit = test.get("preferred_unit", "")

    if preferred_unit:

        value = convert_value(
            test_name=test_name,
            value=value,
            from_unit=unit,
            to_unit=preferred_unit
        )
 

    if not reference:
        return "UNKNOWN", value


    normal_low = reference.get("low")
    normal_high = reference.get("high")

    critical = test.get("critical_range", {})

    critical_low = critical.get("low")
    critical_high = critical.get("high")

    # Critical Low

    if critical_low is not None:

        if value < critical_low:
            return "CRITICAL_LOW", value

    # Low

    if normal_low is not None:

        if value < normal_low:
            return "LOW", value

    # Critical High

    if critical_high is not None:

        if value > critical_high:
            return "CRITICAL_HIGH", value

    # High

    if normal_high is not None:

        if value > normal_high:
            return "HIGH", value

    return "NORMAL", value


# ======================================
# Analyze Report
# ======================================

def analyze_report(parsed_report: List[Dict],
                   gender: str = "male") -> List[Dict]:

    results = []

    for item in parsed_report:

        test_name = item.get("test_name")

        value = item.get("value")

        status, converted_value = get_status(
            test_name=test_name,
            value=value,
            unit=item.get("unit", ""),
            gender=gender
        )


        results.append({

            "test_name": test_name,

            "original_value": value,

            "original_unit": item.get("unit", ""),

            "converted_value": converted_value,

            "converted_unit": LAB_REFERENCE[test_name].get("preferred_unit", item.get("unit", "")),

            "status": status

        })

    return results