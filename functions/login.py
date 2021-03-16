import json
import os

import jwt
from dotenv import load_dotenv
from mysql.connector import connect, Error
from passlib.hash import pbkdf2_sha256

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

jwt_secret = os.getenv('JWT_SECRET')


def send_res(status, body, jwt=None):
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Credentials': True,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'X-Requested-With': '*',
            'Set-Cookie': 'c1=' + jwt if jwt else None
        },
        'body': json.dumps(body)
    }


class SqlConnect:

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def login(self, user_email, user_pass):
        with connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        ) as cnx:
            with cnx.cursor() as cursor:
                check_user_query = """SELECT name, password, email FROM Users WHERE email = "%s" """ % user_email
                cursor.execute(check_user_query)
                for result in cursor.fetchall():
                    name, check_pass, email = result
                    if pbkdf2_sha256.verify(user_pass, check_pass):
                        user_info = {
                            'user_name': name,
                            'user_email': email
                        }
                        return user_info
                    else:
                        return None
                return None


def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body'))

        user_pass = body.get('user_pass')
        user_email = body.get('user_email')

        sql = SqlConnect(host, user, password, database)
        user_info = sql.login(user_email, user_pass)

        if user_info:
            compact_jws = jwt.encode(user_info, jwt_secret, algorithm='HS256')
            return send_res(200, {
                'success': True,
                'info': compact_jws,
                'message': 'User in database'
            }, compact_jws)
        else:
            return send_res(200, {
                'success': False,
                'info': None,
                'message': 'No user found'
            })
    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)
