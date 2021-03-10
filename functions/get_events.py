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


def relative_date(current, event, type):
    


def lambda_handler(event, context):
    try:
        headers = event.get('headers')
        user_jwt = headers.get('Authorization')
        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                get_events_query = """
                SELECT CAST(Events.date AS CHAR), Days.type, Days.name FROM Events
                INNER JOIN Days
                ON Events.days_id = Days.id
                WHERE Days.user_id = (SELECT id FROM Users WHERE email = "%s")
                GROUP BY Days.id
                ORDER BY Events.date ASC;
                """ % user_email
                cursor.execute(get_events_query)
                results = cursor.fetchall()

                format_res = []
                for result in results:
                    format_res.append({
                        'date': result[0],
                        'type': result[1],
                        'name': result[2]
                    })

                return send_res(200, {
                    'success': True,
                    'info': format_res,
                    'message': f'{len(results)} events found'
                })
    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)
