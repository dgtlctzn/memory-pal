import json
import os

from functions import login, signup

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


def test_403_when_wrong_login_password():
    event = {
        'body': json.dumps({
            'user_pass': 'wrong password',
            'user_email': 'dgtlctzn7@gmail.com'
        })
    }
    assert login.lambda_handler(event, None)['statusCode'] == 403


def test_404_when_login_no_user():
    event = {
        'body': json.dumps({
            'user_pass': 'password',
            'user_email': 'donotexist@gmail.com'
        })
    }
    assert login.lambda_handler(event, None)['statusCode'] == 404


def test_200_if_login_user_info_valid():
    event = {
        'body': json.dumps({
            'user_pass': 'katsu',
            'user_email': 'dgtlctzn7@gmail.com'
        })
    }
    assert login.lambda_handler(event, None)['statusCode'] == 200


def test_409_if_signup_user_exists():
    event = {
        'body': json.dumps({
            'user_pass': 'katsu',
            'user_email': 'dgtlctzn7@gmail.com'
        })
    }
    assert signup.lambda_handler(event, None)['statusCode'] == 409
