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
        headers = event.get('headers')
        user_jwt = headers.get('Authorization')
        row_id = event['queryStringParameters']['row_id']

        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']
        if not user_email:
            return send_res(200, {
                'success': False,
                'info': None,
                'message': 'Unauthorized'
            })
        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                delete_day_query = """
                DELETE FROM Days WHERE id = "%s"
                """ % row_id
                cursor.execute(delete_day_query)
                cnx.commit()

                return send_res(200, {
                    'success': True,
                    'info': None,
                    'message': 'Day deleted'
                })
    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)
