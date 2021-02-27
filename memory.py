import json
import requests


def lambda_handler(event, context):
    headers = {'Accept': 'application/json'}
    res = requests.get('https://icanhazdadjoke.com/', headers=headers)

    return {
        'statusCode': 200,
        'body': res.json().get('joke')
    }


# if __name__ == '__main__':
#     print(lambda_handler('', ''))
