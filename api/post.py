from api.format import *


class post_obj:

    name = None
    title = None
    timestamp = None
    subreddit = None
    url = None

    def __init__(self, post_obj):
        self.name = post_obj['data']['name']
        self.title = post_obj['data']['title']
        self.timestamp = post_obj['data']['created']
        self.subreddit = post_obj['data']['subreddit']
        self.url = post_obj['data']['url']

    def get_name(self):
        return self.name

    def print_data(self):
        print(f'{bcolors.BOLD}' + self.subreddit + f'{bcolors.ENDC}' +
              '\n' + self.title + '\n' + f'{bcolors.DIM}' + self.url + f'{bcolors.ENDC}' + '\n')


def create_post_list(res):
    post_list = []
    for entry in reversed(res.json()['data']['children']):
        p = post_obj(entry)
        post_list.append(p)

    return post_list
