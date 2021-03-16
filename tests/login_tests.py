import json

from ..functions import login


def test_res_when_wrong_login_password():
    event = {
        'body': json.dumps({
            'user_pass': 'wrong password',
            'user_email': 'dgtlctzn7@gmail.com'
        })
    }
    res = login.lambda_handler(event, None)
    assert res['statusCode'] == 200 and not json.loads(res['body'])['success']


def test_res_when_login_no_user():
    event = {
        'body': json.dumps({
            'user_pass': 'password',
            'user_email': 'donotexist@gmail.com'
        })
    }
    res = login.lambda_handler(event, None)
    assert res['statusCode'] == 200 and not json.loads(res['body'])['success']


def test_200_if_login_user_info_valid():
    event = {
        'body': json.dumps({
            'user_pass': 'katsu',
            'user_email': 'dgtlctzn7@gmail.com'
        })
    }
    assert login.lambda_handler(event, None)['statusCode'] == 200
