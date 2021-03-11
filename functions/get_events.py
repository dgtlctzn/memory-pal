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


def relative_date(current_dt, event_dt, e_type):
    if e_type == 'Birthday' or e_type == 'Holiday':
        this_year_event = datetime(year=current_dt.year, month=event_dt.month, day=event_dt.day)
        next_year_event = datetime(year=current_dt.year + 1, month=event_dt.month, day=event_dt.day)

        curr_delta = (current_dt - this_year_event).days * -1
        next_delta = (current_dt - next_year_event).days * -1

        days_away = curr_delta if curr_delta < next_delta else next_delta
        if days_away < 0:
            return next_delta
        else:
            return days_away
    else:
        return (current_dt - event_dt).days * -1


def parents_day(my_month, first, last):
    def get_day(my_year):
        for i in range(first, last):
            if datetime(year=my_year, month=my_month, day=i).isoweekday() == 7:
                return datetime(year=my_year, month=my_month, day=i)
    return get_day


def get_next_parents_day(current_dt, e_type):
    if e_type == 'Father\'s Day':
        get_fathers_day = parents_day(6, 15, 22)
        fathers_day = get_fathers_day(current_dt.year)
        return fathers_day if fathers_day > current_dt else get_fathers_day(current_dt.year + 1)
    elif e_type == 'Mother\'s Day':
        get_mothers_day = parents_day(5, 8, 15)
        mothers_day = get_mothers_day(current_dt.year)
        return mothers_day if mothers_day > current_dt else get_mothers_day(current_dt.year + 1)


def lambda_handler(event, context):
    try:
        headers = event.get('headers')
        user_jwt = headers.get('Authorization')
        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']
        user_timestamp = event['queryStringParameters']['timestamp']

        now = datetime.fromtimestamp(int(user_timestamp) / 1000)

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                get_events_query = """
                SELECT CAST(Events.date AS CHAR), Events.date, Days.type, Days.name FROM Events
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
                    date_str, dt, e_type, name = result
                    if e_type == 'Father\'s Day' or e_type == 'Mother\'s Day':
                        dt = get_next_parents_day(now, e_type)
                        date_str = dt.strftime('%Y-%m-%d %H:%M:%S')
                    days_away = relative_date(now, dt, e_type)

                    format_res.append({
                        'date': date_str,
                        'type': e_type,
                        'name': name,
                        'days_away': days_away
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


# if __name__ == '__main__':
#     print(relative_date(datetime.now(), datetime(year=1989, month=3, day=8), 'Birthday'))
