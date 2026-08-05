# app/services/report_parser.py

from pathlib import Path
import json
import re
from typing import List, Dict, Optional

# ===========================
# Load Lab Reference
# ===========================

BASE_DIR = Path(__file__).resolve().parent.parent
LAB_REFERENCE_PATH = BASE_DIR / "utils" / "lab_reference.json"

with open(LAB_REFERENCE_PATH, "r", encoding="utf-8") as f:
    LAB_REFERENCE = json.load(f)


# ===========================
# Normalize Text
# ===========================

def normalize_text(text: str) -> str:
    """
    Example:
    Hemoglobin (Hb)
        ↓
    HEMOGLOBIN HB
    """

    text = text.upper()

    text = re.sub(r"[(),:\[\]{}]", " ", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()


# ===========================
# Find Test Name
# ===========================

def find_test_name(line: str) -> Optional[str]:

    normalized = normalize_text(line)

    for canonical_name, details in LAB_REFERENCE.items():

        aliases = details.get("aliases", [])

        search_terms = [canonical_name] + aliases

        for alias in search_terms:

            alias = normalize_text(alias)

            if re.search(rf"\b{re.escape(alias)}\b", normalized):
                return canonical_name

    return None


# ===========================
# Extract Numeric Value
# ===========================

def extract_value(line: str) -> Optional[float]:

    matches = re.findall(r"(?<![-])\b\d+(?:\.\d+)?\b", line)

    if not matches:
        return None

    try:
        return float(matches[0])
    except:
        return None


# ===========================
# Extract Unit
# ===========================

def extract_unit(line: str, test_name: str) -> str:
    
    test = LAB_REFERENCE.get(test_name, {})

    units = []

    if "preferred_unit" in test:
        units.append(test["preferred_unit"])
        units.extend(test.get("alternate_units", []))

    elif "unit" in test:
        units.append(test["unit"])

    lower = line.lower()

    # OCR se actual unit detect karo
    patterns = [
        r"mg/?dl",
        r"g/?dl",
        r"mg/?l",
        r"g/?l",
        r"mmol/?l",
        r"umol/?l",
        r"µmol/?l",
        r"ng/?ml",
        r"pg/?ml",
        r"iu/?l",
        r"u/?l",
        r"meq/?l",
        r"fl",
        r"pg",
        r"%"
    ]

    for pattern in patterns:

        match = re.search(pattern, lower)

        if match:
            return match.group(0)

    if units:
        return units[0]

    return ""


# ===========================
# Parse Report
# ===========================

IGNORE_LINES = [
    "PATIENT",
    "NAME",
    "AGE",
    "SEX",
    "GENDER",
    "REFERENCE",
    "RANGE",
    "METHOD",
    "SAMPLE",
    "COLLECTED",
    "REPORTED",
    "DOCTOR",
    "ADDRESS",
    "LAB",
    "DATE"
]

def parse_report(report_text: str) -> List[Dict]:
    
    results = {}

    lines = report_text.splitlines()

    for i, line in enumerate(lines):

        normalized = normalize_text(line)

        if any(word in normalized for word in IGNORE_LINES):
            continue

        if not line.strip():
            continue

        test_name = find_test_name(line)


        if not test_name:
            continue

        test = LAB_REFERENCE.get(test_name, {})

        datatype = test.get("datatype", "numeric")

        if datatype == "positive_negative":

            upper = line.upper()

            if "NON REACTIVE" in upper:
                value = "NON REACTIVE"

            elif "NOT DETECTED" in upper:
                value = "NOT DETECTED"

            elif "NEGATIVE" in upper:
                value = "NEGATIVE"

            elif "POSITIVE" in upper:
                value = "POSITIVE"

            elif "REACTIVE" in upper:
                value = "REACTIVE"

            elif "DETECTED" in upper:
                value = "DETECTED"

            else:
                value = None

        else:

            value = extract_value(line)

            if value is None:

                for j in range(i + 1, min(i + 4, len(lines))):
                    value = extract_value(lines[j])

                    if value is not None:
                        break

        unit = extract_unit(line, test_name)

        if not unit:

            for j in range(i + 1, min(i + 4, len(lines))):

                unit = extract_unit(lines[j], test_name)

                if unit:
                    break


        results[test_name] = {
            "test_name": test_name,
            "value": value,
            "unit": unit
        }

    return list(results.values())