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


def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body'))

        user_jwt = body.get('user_jwt')
        user_name = body.get('user_name')
        user_phone = body.get('user_phone')
        user_birthday = body.get('user_birthday')

        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']

        update = None
        if user_name:
            update = ("name", user_name, user_email)
        elif user_phone:
            update = ("phone", user_phone, user_email)
        elif user_birthday:
            update = ("birthdate", user_birthday, user_email)
        else:
            return send_res(400, {
                'success': False,
                'info': None,
                'message': 'No info to update'
            })

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                update_user_query = """
                UPDATE Users 
                SET %s = "%s"
                WHERE email = "%s" 
                """ % update
                cursor.execute(update_user_query)
                cnx.commit()
                return send_res(200, {
                    'success': True,
                    'info': None,
                    'message': f'User\'s {update[0]} updated'
                })
    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)
