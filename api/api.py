import requests
import csv
import os
import sys
import time
from api.post import *
from api.authentication import *

API_ENDPOINT = 'https://oauth.reddit.com/r/'
CUR_PATH = os.path.dirname(__file__)
SUBRED_PTH = '../subreddits.csv'


def get_subreddits():
    subreddits = []

    try:
        with open(os.path.join(CUR_PATH, SUBRED_PTH), newline='') as csv_file:
            reader = csv.reader(csv_file)
            subreddits = list(reader)[0]
    except:
        print('subreddits.csv not found')
        subreddits = list(
            input('please enter the subreddits you would like to track seperated by a ,'))

    return subreddits


class reddit_api:

    headers = None
    auth = None

    def __init__(self):
        self.auth = auth_obj()
        self.auth.set_token()
        self.headers = {'User-Agent': 'salestrackerbot/0.0.1',
                        'Authorization': 'bearer ' + self.auth.get_token()}

    def refresh_token(self):
        self.auth.set_token()

    def get_current_post(self):
        subr_list = get_subreddits()
        res_dict = {}

        for subreddit in subr_list:
            res = requests.get(API_ENDPOINT + subreddit,
                               headers=self.headers, params={'limit': '1'})
            check_response_status(res, False)
            res_dict[subreddit] = post_obj(res.json()['data']['children'][0])

        return res_dict

    def print_initial_posts(self, num_posts):
        subr_list = get_subreddits()
        res_dict = {}

        for subreddit in subr_list:
            res = requests.get(API_ENDPOINT + subreddit,
                               headers=self.headers, params={'limit': num_posts})
            check_response_status(res, False)
            res_dict[subreddit] = post_obj(res.json()['data']['children'][0])

            post_list = create_post_list(res)
            for entry in post_list:
                entry.print_data()

    def wait(self):
        for i in range(6):
            for j in range(5):
                print('.', end='')
                sys.stdout.flush()
                time.sleep(1)
            print('\r', end='')
            print('     ', end='\r')
