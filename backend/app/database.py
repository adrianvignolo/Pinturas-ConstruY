import pymysql
from pymysql.cursors import DictCursor
from contextlib import contextmanager

DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3307,
    'user': 'root',
    'password': '',
    'database': 'materialesconstruy_db',
    'charset': 'utf8mb4',
    'cursorclass': DictCursor,
    'autocommit': True
}

def get_connection():
    return pymysql.connect(**DB_CONFIG)

@contextmanager
def get_db():
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()
