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


def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body'))

        user_pass = body.get('hash_pass')
        user_email = body.get('user_email')

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
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
                        compact_jws = jwt.encode(user_info, jwt_secret, algorithm='HS256')
                        return send_res(200, {
                            'success': True,
                            'info': compact_jws,
                            'message': 'User in database'
                        })
                    else:
                        return send_res(403, {
                            'success': False,
                            'info': None,
                            'message': 'Unauthorized'
                        })
                return send_res(404, {
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
