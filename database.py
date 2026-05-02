import sqlite3
from datetime import datetime, timedelta

def init_db():
    conn = sqlite3.connect('finance_bot.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        full_name TEXT,
        registration_date DATETIME
    )
    ''')
    
    # Transactions table
    # category: 'restaurant_income', 'restaurant_expense', 'hotel_income', 'hotel_expense', 'personal_food', 'personal_transport', 'personal_other'
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        category TEXT,
        amount REAL,
        description TEXT,
        timestamp DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (7579886970)
    )
    ''')
    
    conn.commit()
    conn.close()

def save_user(user_id, full_name):
    conn = sqlite3.connect('finance_bot.db')
    cursor = conn.cursor()
    cursor.execute('INSERT OR IGNORE INTO users (user_id, full_name, registration_date) VALUES (?, ?, ?)', 
                   (user_id, full_name, datetime.now()))
    conn.commit()
    conn.close()

def add_transaction(user_id, category, amount, description=""):
    conn = sqlite3.connect('finance_bot.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO transactions (user_id, category, amount, description, timestamp) VALUES (?, ?, ?, ?, ?)',
                   (user_id, category, amount, description, datetime.now()))
    conn.commit()
    conn.close()

def get_report(user_id, period='daily'):
    conn = sqlite3.connect('finance_bot.db')
    cursor = conn.cursor()
    
    if period == 'daily':
        start_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    else: # weekly
        start_date = datetime.now() - timedelta(days=7)
        
    cursor.execute('''
        SELECT category, SUM(amount) FROM transactions 
        WHERE user_id = ? AND timestamp >= ? 
        GROUP BY category
    ''', (user_id, start_date))
    
    data = cursor.fetchall()
    conn.close()
    return dict(data)
