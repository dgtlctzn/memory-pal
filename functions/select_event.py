import json
import os
from datetime import datetime, timedelta

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

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                select_row = (user_email, row_id)
                select_row_query = """
                SELECT Events.days_till, Days.type, Days.name, Days.message, CAST(Days.date AS CHAR), Days.recurring FROM Days
                INNER JOIN Events
                ON Days.id = Events.days_id
                WHERE Days.user_id = (SELECT id FROM Users WHERE email = "%s")
                AND Days.id = "%s"
                """ % select_row
                cursor.execute(select_row_query)

                result = cursor.fetchall()
                _, e_type, name, message, date, recurring = result[0]

                days_map = []
                for row in result:
                    days_map.append(row[0])

                return send_res(200, {
                    'success': True,
                    'info': {
                        'days_map': days_map,
                        'date': date,
                        'type': e_type,
                        'name': name,
                        'message': message,
                        'recurring': recurring
                    },
                    'message': 'Day found'
                })
    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)