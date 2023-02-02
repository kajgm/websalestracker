from api.format import *
import datetime
import os
import json

CUR_PATH = os.path.dirname(__file__)
SUBRED_DATA_PATH = '../resources/subredditTypes.json'

def create_post_list(res):
    post_list = []
    for entry in reversed(res.json()['data']['children']):
        p = post_obj(entry)
        post_list.append(p)

    return post_list

class post_obj:

    name = None
    title = None
    timestamp = None
    subreddit = None
    url = None
    country_icon = None
    type_icon = None

    def __init__(self, post_obj):
        self.name = post_obj['data']['name']
        self.title = post_obj['data']['title'].replace('&amp;', '&')
        self.timestamp = post_obj['data']['created']
        self.subreddit = post_obj['data']['subreddit'].lower()
        self.url = post_obj['data']['url']
        self.country_icon = self.set_country_icon()
        self.type_icon = self.set_type_icon()

    def get_name(self):
        return self.name

    def print_data(self):
        time = datetime.datetime.fromtimestamp(self.timestamp)
        time_string = time.strftime('%Y-%m-%d %I:%M:%S %p')
        print(f'{tformatting.BOLD}' + self.type_icon + self.country_icon + ' ' + self.subreddit + f'{tformatting.DIM} -- ' + time_string + f'{tformatting.ENDC}' + f'{tformatting.ENDC}' +
              '\n' + self.title + '\n' + f'{tformatting.DIM}' + self.url + f'{tformatting.ENDC}' + '\n')
    
    def get_subreddit_info(self):
        data = {}
        try:
            with open(os.path.join(CUR_PATH, SUBRED_DATA_PATH), 'r') as json_file:
                data = json.load(json_file)
        except:
            raise Exception('Error: subredditTypes.json not found')

        return data
    
    def set_country_icon(self):
        c_icon = ''
        subred_data = self.get_subreddit_info()
        subred = self.subreddit
        if subred in subred_data:
            match subred_data[subred]['country']:
                case 'CA':
                    c_icon = icon.RED_CIRCLE
                case 'US':
                    c_icon = icon.BLUE_CIRCLE
                case _:
                    c_icon = ''

        return c_icon

    def set_type_icon(self):
        t_icon = ''
        subred_data = self.get_subreddit_info()
        subred = self.subreddit
        if subred in subred_data:
            match subred_data[subred]['type']:
                case 'computer':
                    t_icon = icon.PC
                case 'clothing':
                    t_icon = icon.SHIRT
                case _:
                    t_icon = ''

        return t_icon
