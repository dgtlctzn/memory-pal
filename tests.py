import json
import os
from datetime import date

from functions import login, signup, text_events

from dotenv import load_dotenv
from mysql.connector import connect, Error

load_dotenv()

host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASS')
database = 'memory_db'


# def test_os_vars():
#     assert host and user and password
#
#
# def test_mysql_connection():
#     with connect(
#             host=host,
#             user=user,
#             password=password,
#             database=database
#     ) as cnx:
#         assert cnx
#
#
# def test_res_when_wrong_login_password():
#     event = {
#         'body': json.dumps({
#             'user_pass': 'wrong password',
#             'user_email': 'dgtlctzn7@gmail.com'
#         })
#     }
#     res = login.lambda_handler(event, None)
#     assert res['statusCode'] == 200 and not json.loads(res['body'])['success']
#
#
# def test_res_when_login_no_user():
#     event = {
#         'body': json.dumps({
#             'user_pass': 'password',
#             'user_email': 'donotexist@gmail.com'
#         })
#     }
#     res = login.lambda_handler(event, None)
#     assert res['statusCode'] == 200 and not json.loads(res['body'])['success']
#
#
# def test_200_if_login_user_info_valid():
#     event = {
#         'body': json.dumps({
#             'user_pass': 'katsu',
#             'user_email': 'dgtlctzn7@gmail.com'
#         })
#     }
#     assert login.lambda_handler(event, None)['statusCode'] == 200
#
#
# def test_res_if_signup_user_exists():
#     event = {
#         'body': json.dumps({
#             'user_pass': 'katsu',
#             'user_email': 'dgtlctzn7@gmail.com'
#         })
#     }
#     res = signup.lambda_handler(event, None)
#     assert res['statusCode'] == 200 and not json.loads(res['body'])['success']


def test_future_mothers_day():
    test_day_2025 = date(year=2025, month=5, day=11)
    seven_days_before_2025 = date(year=2025, month=5, day=4)

    test_day_2028 = date(year=2028, month=5, day=14)
    seven_days_before_2028 = date(year=2028, month=5, day=7)

    get_mothers_day = text_events.parents_day(5, 8, 15)
    _ = date.today()

    mothers_day_2025 = get_mothers_day(2025)
    mothers_day_2028 = get_mothers_day(2028)

    res_0_2025 = text_events.get_sql_events(test_day_2025, _, mothers_day_2025)
    res_7_2025 = text_events.get_sql_events(seven_days_before_2025, _, mothers_day_2025)

    res_0_2028 = text_events.get_sql_events(test_day_2028, _, mothers_day_2028)
    res_7_2028 = text_events.get_sql_events(seven_days_before_2028, _, mothers_day_2028)

    assert len(res_0_2025) == 1 and len(res_7_2025) == 1 and len(res_0_2028) == 1 and len(res_7_2028) == 1
