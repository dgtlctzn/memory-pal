import json
import os

import jwt
from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

jwt_secret = os.getenv('JWT_SECRET')


def send_res(status, body):
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Credentials': True,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'X-Requested-With': '*',
        },
        'body': json.dumps(body)
    }


class SqlConnect:

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def get_user(self, user_email):
        with connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        ) as cnx:
            with cnx.cursor() as cursor:
                select_user_query = f"""
                SELECT name, email, phone, CAST(birthdate AS CHAR) FROM Users WHERE email = "{user_email}"
                """
                cursor.execute(select_user_query)
                print('this is what cursor.withrows prints: ' + str(cursor.with_rows))
                name, email, phone, birthdate = cursor.fetchall()[0]
                user_info = {
                    'user_name': name,
                    'user_email': email,
                    'user_phone': phone,
                    'birthdate': birthdate
                }
                return user_info


def lambda_handler(event, context):
    try:
        headers = event.get('headers')
        user_jwt = headers.get('Authorization')
        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']

        db = SqlConnect(host, user, password, database)
        user_info = db.get_user(user_email)

        return send_res(200, {
            'success': True,
            'info': user_info,
            'message': f'User selected'
        })
    except (Error, Exception) as e:
        print(e)
        return send_res(500, {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        })
