import os

from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

local_host = 'localhost'
local_user = 'root'
local_password = os.getenv('LOCAL_PASS')


def test_os_vars():
    assert host and user and password and local_password


def test_mysql_production_connection():
    with connect(
            host=host,
            user=user,
            password=password,
            database=database
    ) as cnx:
        assert cnx


def test_mysql_local_connection():
    with connect(
            host=local_host,
            user=local_user,
            password=local_password,
            database=database
    ) as cnx:
        assert cnx
