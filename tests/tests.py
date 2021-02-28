import os

from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'


def test_os_vars():
    assert host and user and password


def test_mysql_connection():
    with connect(
            host=host,
            user=user,
            password=password,
            database=database
    ) as cnx:
        assert cnx
