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

    def signup(
            self,
            user_email=None,
            user_name=None,
            user_pass=None,
            user_phone=None
    ):
        with connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        ) as cnx:
            with cnx.cursor() as cursor:
                check_user_query = """SELECT email FROM Users WHERE email = "%s" """ % user_email
                cursor.execute(check_user_query)
                if len(cursor.fetchall()):
                    return False
                else:
                    hash_pass = pbkdf2_sha256.hash(user_pass)
                    cursor.execute(
                        """INSERT INTO Users (name, email, password, phone) VALUES (%s, %s, %s, %s);""",
                        (user_name, user_email, hash_pass, user_phone)
                    )
                    cnx.commit()
                    return True


def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body'))

        user_pass = body.get('user_pass')
        user_email = body.get('user_email')
        user_phone = body.get('user_phone')
        user_name = body.get('user_name')

        sql = SqlConnect(host, user, password, database)
        result = sql.signup(
            user_email=user_email,
            user_name=user_name,
            user_pass=user_pass,
            user_phone=user_phone
        )
        if not result:
            return send_res(200, {
                'success': False,
                'info': None,
                'message': 'User already exists'
            })
        else:
            user_info = {
                'user_name': user_name,
                'user_email': user_email,
            }
            compact_jws = jwt.encode(user_info, jwt_secret, algorithm='HS256')
            return send_res(201, {
                'success': True,
                'info': {
                    'jwt': compact_jws,
                    'user_name': user_name
                },
                'message': 'New user created'
            }, compact_jws)

    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)
