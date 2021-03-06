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
        body = json.loads(event.get('body'))

        user_jwt = body.get('user_jwt')
        user_message = body.get('user_message')
        day_type = body.get('day_type')
        day_name = body.get('day_name')
        year = body.get('year')
        day_map = body.get('day_map')
        date = datetime.today()

        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                day_info = (day_type, day_name, user_message, user_email, year)
                add_day_query = """
                INSERT INTO Days (type, name, message, user_id, year)
                VALUES ( "%s", "%s", "%s", (SELECT id FROM Users WHERE email = "%s"), "%s" )
                """ % day_info
                cursor.execute(add_day_query)
                day_id = cursor.lastrowid

                event_entries = []
                for day in day_map:
                    event_entries.append((
                        str(date - timedelta(days=day)),
                        day,
                        day_id
                    ))
                add_events_query = """
                INSERT INTO Events (date, days_till, days_id)
                VALUES ( %s, %s, %s)
                """
                cursor.executemany(add_events_query, event_entries)
                cnx.commit()

                return send_res(200, {
                    'success': True,
                    'info': day_id,
                    'message': 'Day added'
                })
    except (Error, Exception) as e:
        print(e)
        res_body = {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        }
        return send_res(500, res_body)


if __name__ == '__main__':
    body = {
        'body': json.dumps({
            'user_jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJKb2pvIFBvcHBhIiwidXNlcl9lbWFpbCI6In'
                        'BvcHBhN0BnbWFpbC5jb20ifQ.0lkerS75VlrU4meloaqJpT5odkY_2VcwqmHo5fpqtuw',
            'user_message': 'Need to buy presents',
            'day_type': 'Holiday',
            'year': 0,
            'day_name': 'Christmas',
            'day_map': [0, 6, 21]
        })
    }
    print(lambda_handler(body, None))
