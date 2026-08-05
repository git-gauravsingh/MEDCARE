import sqlite3
import uuid
import json
from datetime import datetime
from pathlib import Path

# Database path (medicines.db ke bagal mein)
DB_PATH = Path(__file__).resolve().parent.parent.parent / "databases" / "chat_history.db"

DB_PATH.parent.mkdir(parents=True, exist_ok=True)

def get_chat_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_chat_db():
    conn = get_chat_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ChatSession (
            id TEXT PRIMARY KEY,
            title TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ChatMessage (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            sender TEXT,
            type TEXT,
            content TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(session_id) REFERENCES ChatSession(id)
        )
    ''')
    conn.commit()
    conn.close()

init_chat_db()

def get_or_create_session(session_id: str = None, tool_used: str = "Disease Diagnosis"):
    if not session_id:
        session_id = str(uuid.uuid4())
        conn = get_chat_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO ChatSession (id, title) VALUES (?, ?)", (session_id, tool_used))
        conn.commit()
        conn.close()
    return session_id

def enforce_token_limit(max_tokens=1000):
    # 1 Token ~= 4 characters (approx). 1000 tokens = 4000 characters.
    max_chars = max_tokens * 4
    conn = get_chat_db()
    cursor = conn.cursor()
    
    while True:
        cursor.execute("SELECT SUM(LENGTH(content)) FROM ChatMessage")
        result = cursor.fetchone()[0]
        total_chars = result if result else 0
        
        if total_chars <= max_chars:
            break  # Limit ke andar hai, loop tod do
            
        # Agar limit cross hui, toh sabse purani chat uthao aur delete maro
        cursor.execute("SELECT id FROM ChatSession ORDER BY created_at ASC LIMIT 1")
        oldest_session = cursor.fetchone()
        if not oldest_session:
            break
            
        oldest_id = oldest_session[0]
        cursor.execute("DELETE FROM ChatMessage WHERE session_id = ?", (oldest_id,))
        cursor.execute("DELETE FROM ChatSession WHERE id = ?", (oldest_id,))
        conn.commit()
        
    conn.close()

def save_message(session_id: str, sender: str, msg_type: str, content: str):
    conn = get_chat_db()
    cursor = conn.cursor()
    
    if isinstance(content, (dict, list)):
        content = json.dumps(content)
        
    cursor.execute(
        "INSERT INTO ChatMessage (session_id, sender, type, content) VALUES (?, ?, ?, ?)",
        (session_id, sender, msg_type, content)
    )
    conn.commit()
    conn.close()
    
    # Message save hone ke turant baad token limit check karo (default 1000 tokens)
    enforce_token_limit()

def get_all_sessions():
    conn = get_chat_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, datetime(created_at, 'localtime') as created_at FROM ChatSession ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    
    sessions = []
    for row in rows:
        # Time formatting
        dt = datetime.strptime(row["created_at"], "%Y-%m-%d %H:%M:%S")
        display_time = dt.strftime("%b %d, %I:%M %p")
        sessions.append({
            "chat_id": row["id"],
            "title": row["title"],
            "display_time": display_time
        })
    return sessions

def get_session_messages(session_id: str):
    conn = get_chat_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, sender, type, content, datetime(timestamp, 'localtime') as timestamp FROM ChatMessage WHERE session_id = ? ORDER BY timestamp ASC", (session_id,))
    rows = cursor.fetchall()
    conn.close()
    
    messages = []
    for row in rows:
        dt = datetime.strptime(row["timestamp"], "%Y-%m-%d %H:%M:%S")
        content = row["content"]
        # Convert JSON string back to dict if needed
        try:
            content = json.loads(content)
        except:
            pass
            
        messages.append({
            "id": row["id"],
            "sender": row["sender"],
            "type": row["type"],
            "content": content,
            "time": dt.strftime("%I:%M %p")
        })
    return messages