from config import config
import psycopg2
import psycopg2.extras

def get_db_connection():
    conn=None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        return conn
    except(Exception, psycopg2.Error) as error:
        print(error)
