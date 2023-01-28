import requests
import csv, os
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
            subreddits = list(reader)
    except:
        print('subreddits.csv not found')
        subreddits = list(input('please enter the subreddits you would like to track seperated by a ,'))
    
    return subreddits


class reddit_api:

    headers = None
    auth = None

    def __init__(self):
        self.auth = auth_obj()
        self.auth.set_token()
        self.headers = {'User-Agent': 'salestrackerbot/0.0.1', 'Authorization': 'bearer ' + self.auth.get_token()}


    def get_current_post(self):
        res = requests.get('{}bapcsalescanada/new'.format(API_ENDPOINT),
                        headers=self.headers, params={'limit': '1'})
        check_response_status(res)
        return post_obj(res.json()['data']['children'][0])


    def print_initial_posts(self, num_posts):
        res = requests.get('{}bapcsalescanada/new'.format(API_ENDPOINT),
                        headers=self.headers, params={'limit': num_posts})
        check_response_status(res)
        
        post_list = create_post_list(res)
        for entry in post_list:
            entry.print_data()
