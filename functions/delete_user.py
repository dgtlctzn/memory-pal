import json
import os

import jwt
import telnyx
from dotenv import load_dotenv
from mysql.connector import connect, Error


load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'

jwt_secret = os.getenv('JWT_SECRET')

telnyx.api_key = os.getenv('TELNYX_API_KEY')
telnyx_number = os.getenv('TELNYX_NUMBER')


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


class SendText:

    def __init__(self, number):
        self.__client = telnyx
        self.__phone_number = number

    def text(self, phone, message):
        self.__client.Message.create(
            to=f"+1{phone}",
            from_=self.__phone_number,
            text=message
        )


class SqlConnect:

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def delete_user(self, user_email):
        with connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        ) as cnx:
            with cnx.cursor() as cursor:
                select_user_query = f"""
                SELECT phone FROM Users WHERE email = "{user_email}"
                """
                cursor.execute(select_user_query)
                phone = cursor.fetchall()[0][0]
                delete_user_query = f"""
                DELETE FROM Users WHERE email = "{user_email}"
                """
                cursor.execute(delete_user_query)
                cnx.commit()
                return phone


def lambda_handler(event, context):
    try:
        headers = event.get('headers')
        user_jwt = headers.get('Authorization')
        user_email = jwt.decode(user_jwt, jwt_secret, algorithms="HS256")['user_email']

        db = SqlConnect(host, user, password, database)
        phone = db.delete_user(user_email)
        message = 'You are now unsubscribed from text alerts. Goodbye from Memory Pal!'
        st = SendText(telnyx_number)
        st.text(phone, message)
        return send_res(200, {
            'success': True,
            'info': None,
            'message': f'User deleted'
        })
    except (Error, Exception) as e:
        print(e)
        return send_res(500, {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        })
