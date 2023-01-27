import requests
import json

def main():

    with open('credentials.json', 'r') as json_file:
        credentials = json.load(json_file)

    app_id = credentials['app_id']
    secret = credentials['secret']
    reddit_username = credentials['reddit_username']
    reddit_password = credentials['reddit_password']

    auth = requests.auth.HTTPBasicAuth(app_id, secret)

    data = {
    'grant_type': 'password',
    'username': reddit_username,
    'password': reddit_password
    }

    headers = {'User-Agent': 'salestrackerbot/0.0.1'}
    res = requests.post('https://www.reddit.com/api/v1/access_token',
    auth=auth, data=data, headers=headers)
    print(res)

if __name__ == "__main__":
    main()