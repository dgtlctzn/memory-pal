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


class SqlConnect:

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def add_event(
            self,
            day_type=None,
            day_name=None,
            day_map=None,
            user_message=None,
            user_email=None,
            date=None,
            recurring=None
    ):
        with connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        ) as cnx:
            with cnx.cursor() as cursor:
                day_info = (day_type, day_name, user_message, user_email, date, recurring)
                add_day_query = """
                INSERT INTO Days (type, name, message, user_id, date, recurring)
                VALUES ( "%s", "%s", "%s", (SELECT id FROM Users WHERE email = "%s"), "%s", %s )
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
                return day_id


def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body'))

        user_jwt = body.get('user_jwt')
        user_message = body.get('user_message')
        day_type = body.get('day_type')
        day_name = body.get('day_name')
        day_map = body.get('day_map')
        user_dt = body.get('date')
        recurring = body.get('recurring')

        date = datetime.strptime(user_dt, '%m/%d/%Y, %I:%M:%S %p')

        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']

        sql = SqlConnect(host, user, password, database)
        day_id = sql.add_event(
            day_type=day_type,
            day_name=day_name,
            day_map=day_map,
            user_message=user_message,
            user_email=user_email,
            date=date,
            recurring=recurring
        )

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
