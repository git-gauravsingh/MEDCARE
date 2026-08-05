import sqlite3
from pathlib import Path


# Database Path
DB_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "databases"
    / "medicines.db"
)


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def search_medicine(name: str):
    """
    Search medicine by medicine name or generic name.
    Exact matches are prioritized over partial matches.
    """
    
    name = " ".join(name.split())
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM medicines
        WHERE
            LOWER(medicine_name) LIKE '%' || LOWER(?) || '%'
            OR LOWER(generic_name) LIKE '%' || LOWER(?) || '%'
        ORDER BY
            CASE
                WHEN LOWER(medicine_name) = LOWER(?) THEN 0
                ELSE 1
            END
        LIMIT 1
        """,
        (name, name, name),
    )

    medicine = cursor.fetchone()
    conn.close()

    if medicine is None:
        return None

    return dict(medicine)


def get_medicine_suggestions(query: str, limit: int = 10):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            medicine_name,
            generic_name,
            medicine_type
        FROM medicines
        WHERE
            LOWER(medicine_name) LIKE '%' || LOWER(?) || '%'
            OR LOWER(generic_name) LIKE '%' || LOWER(?) || '%'
        ORDER BY medicine_name
        LIMIT ?
        """,
        (query, query, limit),
    )

    medicines = cursor.fetchall()
    conn.close()

    return [dict(row) for row in medicines]


def get_medicine_by_id(medicine_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM medicines
        WHERE id = ?
        """,
        (medicine_id,),
    )

    row = cursor.fetchone()
    conn.close()

    if row is None:
        return None

    return {
    "id": row["id"],
    "medicine_name": row["medicine_name"],
    "generic_name": row["generic_name"],
    "medicine_type": row["medicine_type"],
    "uses": row["uses"],
    "introduction": row["introduction"],
    "how_it_works": row["how_it_works"],
    "dosage": row["dosage"],
    "side_effects": row["side_effects"],
    "precautions": row["precautions"],
    "storage": row["storage"],
}