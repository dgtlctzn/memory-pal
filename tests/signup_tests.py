import json

from ..functions import signup


def test_res_if_signup_user_exists():
    event = {
        'body': json.dumps({
            'user_pass': 'katsu',
            'user_email': 'dgtlctzn7@gmail.com'
        })
    }
    res = signup.lambda_handler(event, None)
    assert res['statusCode'] == 200 and not json.loads(res['body'])['success']

