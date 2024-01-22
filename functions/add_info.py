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

        user_email = jwt.decode(user_jwt, jwt_secret, algorithms='HS256')['user_email']

        update = (user_name, user_phone, user_birthday, user_email)

        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                update_user_query = """
                UPDATE Users 
                SET name = "%s", phone = "%s", birthdate = "%s"
                WHERE email = "%s" 
                """ % update
                cursor.execute(update_user_query)
                cnx.commit()

                message = 'Hi this is Memory Pal! You are now signed up for text reminders. If you would like to ' \
                          'add reminders or change your settings visit https://memorypal.netlify.app/'
                st = SendText(telnyx_number)
                st.text(user_phone, message)

                return send_res(200, {
                    'success': True,
                    'info': user_name,
                    'message': f'User updated'
                })
    except (Error, Exception) as e:
        print(e)
        return send_res(500, {
            'success': False,
            'info': None,
            'message': 'Internal server error'
        })
