import json
import os

from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'


def lambda_handler(event, context):
    try:
        with connect(
            host=host,
            user=user,
            password=password,
            database=database
        ) as cnx:
            with cnx.cursor() as cursor:
                cursor.execute('INSERT INTO Users (name, phone) VALUES ("New Guy", "222-222-2223");')
                cnx.commit()
    except Error as e:
        print(e)
        return {
            'statusCode': 500,
            'body': 'internal server error'
        }
    return {
        'statusCode': 200,
        'body': 'inserted new user'
    }