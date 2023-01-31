from api.format import *
import datetime


class post_obj:

    name = None
    title = None
    timestamp = None
    subreddit = None
    url = None

    def __init__(self, post_obj):
        self.name = post_obj['data']['name']
        self.title = post_obj['data']['title'].replace('&amp;', '&')
        self.timestamp = post_obj['data']['created']
        self.subreddit = post_obj['data']['subreddit']
        self.url = post_obj['data']['url']

    def get_name(self):
        return self.name

    def print_data(self):
        time = datetime.datetime.fromtimestamp(self.timestamp)
        time_string = time.strftime('%Y-%m-%d %I:%M:%S %p')
        print(f'{tformatting.BOLD}' + self.subreddit + f'{tformatting.DIM} -- ' + time_string + f'{tformatting.ENDC}' + f'{tformatting.ENDC}' +
              '\n' + self.title + '\n' + f'{tformatting.DIM}' + self.url + f'{tformatting.ENDC}' + '\n')


def create_post_list(res):
    post_list = []
    for entry in reversed(res.json()['data']['children']):
        p = post_obj(entry)
        post_list.append(p)

    return post_list
