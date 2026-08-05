from pathlib import Path
import sqlite3
import pandas as pd

# ==============================
# Paths
# ==============================

BASE_DIR = Path(__file__).resolve().parent.parent.parent

CSV_PATH = BASE_DIR / "datasets" / "meds_dataset" / "medicine_master.csv"
DB_PATH = BASE_DIR / "backend" / "databases" / "medicines.db"

print("=" * 60)
print("📂 Loading CSV...")
print("=" * 60)

# ==============================
# Read CSV
# ==============================

df = pd.read_csv(CSV_PATH)
df = df.fillna("")
df.drop_duplicates(
    subset=["medicine_name"],
    keep="last",
    inplace=True
)

print(f"✅ CSV Loaded Successfully")
print(f"Rows    : {len(df)}")
print(f"Columns : {len(df.columns)}")

# ==============================
# Connect SQLite
# ==============================

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

print("\n📦 Importing medicines...")



# ==============================
# Prepare Records
# ==============================

records = []

for _, row in df.iterrows():

    medicine_name = " ".join(str(row["medicine_name"]).split())

    if not medicine_name:
        continue

    generic_name = str(row["generic_name"]).strip()

    records.append((
        medicine_name,
        generic_name,
        str(row["medicine_type"]).strip(),
        str(row["uses"]).strip(),
        str(row["introduction"]).strip(),
        str(row["how_it_works"]).strip(),
        str(row["dosage"]).strip(),
        str(row["side_effects"]).strip(),
        str(row["precautions"]).strip(),
        str(row["storage"]).strip()
    ))

# ==============================
# Insert
# ==============================

cursor.execute("DELETE FROM medicines")
cursor.execute("DELETE FROM sqlite_sequence WHERE name='medicines'")

cursor.executemany("""
INSERT INTO medicines (

    medicine_name,
    generic_name,
    medicine_type,
    uses,
    introduction,
    how_it_works,
    dosage,
    side_effects,
    precautions,
    storage

)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", records)

conn.commit()

cursor.execute("SELECT COUNT(*) FROM medicines")
total = cursor.fetchone()[0]

print("=" * 60)
print(f"✅ Imported {total} medicines")
print("=" * 60)

conn.close()