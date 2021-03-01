import json
import os

from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'


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
    users = []
    try:
        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                cursor.execute('SELECT * FROM Users')
                for username in cursor:
                    users.append({
                        'id': username[0],
                        'name': username[1],
                        'phone': username[2]
                    })
    except Error as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps(e)
        }
    return send_res(200, json.dumps(users))


# if __name__ == '__main__':
#     print(lambda_handler('', ''))
