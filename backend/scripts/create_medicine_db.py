import sqlite3
from pathlib import Path

# ==============================
# Database Path
# ==============================

DB_PATH = (
    Path(__file__).resolve().parent.parent
    / "databases"
    / "medicines.db"
)

# ==============================
# Connect
# ==============================

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Purani table delete
cursor.execute("DROP TABLE IF EXISTS medicines")

# ==============================
# Create Clean Table
# ==============================

cursor.execute("""
CREATE TABLE medicines (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    medicine_name TEXT NOT NULL UNIQUE,
    generic_name TEXT,

    medicine_type TEXT,

    uses TEXT,

    introduction TEXT,

    how_it_works TEXT,

    dosage TEXT,

    side_effects TEXT,

    precautions TEXT,

    storage TEXT

);
""")

conn.commit()
conn.close()

print("=" * 60)
print(" Clean Medicine Database Created Successfully")
print(f" Database : {DB_PATH}")
print(" Table    : medicines")
print("=" * 60)