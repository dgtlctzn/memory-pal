import json
import os

import bcrypt
from dotenv import load_dotenv
from jwt import JWT
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

jwt_secret = os.getenv('JWT_SECRET')
instance = JWT()


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
        'body': body
    }


def lambda_handler(event, context):
    body = json.loads(event.body)
    user_pass = body.get('user_pass')
    user_email = body.get('user_email')
    user_phone = body.get('user_phone')
    user_name = body.get('user_name')
    try:
        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                cursor.execute(
                    """SELECT email FROM Users WHERE email = %s""", user_email
                )
                if cursor:
                    return send_res(409, {
                        'success': False,
                        'info': None,
                        'message': 'User already exists'
                    })
                else:
                    hash_pass = bcrypt.hashpw(user_pass, bcrypt.gensalt())
                    cursor.execute(
                        """INSERT INTO Users (name, email, password, phone) VALUES (%s, %s, %s, %s);""",
                        (user_name, user_email, hash_pass, user_phone)
                    )
                    user_info = {
                        'user_name': user_name,
                        'user_email': user_email,
                        'hash_pass': hash_pass,
                        'user_phone': user_phone
                    }
                    compact_jws = instance.encode(user_info, jwt_secret, alg='RS256')
                    res_body = {
                        'success': True,
                        'info': compact_jws,
                        'message': 'New user created'
                    }
                    cnx.commit()
                    return send_res(201, json.dumps(res_body))
    except Error as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, json.dumps(res_body))
