import requests
import json
import csv
import getpass
import os

API_ENDPOINT = 'https://oauth.reddit.com/r/'
CRED_PATH = '../src/credentials.json'
SUBRED_PTH = '../src/subreddits.csv'
CUR_PATH = os.path.dirname(__file__)

def check_response_status(res):
    if res.status_code != 200:
        print('Error: Response Returned ' + str(res.status_code))
    else:
        print('Request returned ' + str(res.status_code))


def get_credentials():
    credentials = {}

    try:
        with open(os.path.join(CUR_PATH, CRED_PATH), 'r') as json_file:
            credentials = json.load(json_file)
    except:
        print('credentials.json not found, please enter credentials')
        credentials['app_id'] = input('App id: ')
        credentials['secret'] = input('secret')
        credentials['reddit_username'] = input('Reddit username: ')
        credentials['reddit_password'] = getpass.getpass('Reddit password: ')

    return credentials

def get_subreddits(self):
    subreddits = []

    try:
        with open(os.path.join(CUR_PATH, SUBRED_PTH), newline='') as csv_file:
            reader = csv.reader(csv_file)
            subreddits = list(reader)
    except:
        print('subreddits.csv not found')
        subreddits = list(input('please enter the subreddits you would like to track (, seperated)'))
    
    return subreddits


class reddit_api:

    headers = {'User-Agent': 'salestrackerbot/0.0.1'}
    credentials = None
    token = None

    def __init__(self):
        self.credentials = get_credentials()
        self.token = self.get_token()

    def get_token(self):

        auth = requests.auth.HTTPBasicAuth(
            self.credentials['app_id'], self.credentials['secret'])

        data = {
            'grant_type': 'password',
            'duration': 'permanent',
            'username': self.credentials['reddit_username'],
            'password': self.credentials['reddit_password']
        }

        post_res = requests.post('https://www.reddit.com/api/v1/access_token',
                                auth=auth, data=data, headers=self.headers)
        check_response_status(post_res)

        token = post_res.json()['access_token']
        self.headers['Authorization'] = 'bearer {}'.format(token)

        get_res = requests.get(
            'https://oauth.reddit.com/api/v1/me', headers=self.headers)
        check_response_status(get_res)

        token = post_res.json()['access_token']

        return token


    def get_current_post(self):
        res = requests.get('{}bapcsalescanada/new'.format(API_ENDPOINT),
                        headers=self.headers, params={'limit': '1'})
        check_response_status(res)
        return res.json()['data']['children'][0]


    def print_initial_posts(self, num_posts):
        res = requests.get('{}bapcsalescanada/new'.format(API_ENDPOINT),
                        headers=self.headers, params={'limit': num_posts})
        check_response_status(res)
        for post in reversed(res.json()['data']['children']):
            print(post['data']['title'])
            print(post['data']['url'] + '\n')
