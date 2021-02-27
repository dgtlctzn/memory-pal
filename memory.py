import json
import requests


def lambda_handler(event, context):

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }


if __name__ == '__main__':
    res = requests.get('https://icanhazdadjoke.com/', headers={'Accept': 'application/json'})
    print(res.json())