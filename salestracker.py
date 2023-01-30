import sys
import os
import argparse
from api.api import *

NUM_INTIAL_POSTS = 10
SORT_METHOD = 'new'


def main(args):

    r_api = reddit_api()

    num_posts = args.num_initial or NUM_INTIAL_POSTS
    sorting = args.sorting or SORT_METHOD

    print('Currently tracking the following subreddits:')
    print(get_subreddits())
    print('Sorting method: ' + sorting)
    print('--------------------\n')

    r_api.print_initial_posts(num_posts, sorting)
    latest_posts = r_api.get_current_post(sorting)

    while (1):
        try:
            current_posts = r_api.get_current_post(sorting)
        except:
            r_api.refresh_token()
            current_posts = r_api.get_current_post(sorting)

        for subreddit in latest_posts:
            if latest_posts[subreddit].get_name() != current_posts[subreddit].get_name():
                current_posts[subreddit].print_data()
                latest_posts[subreddit] = current_posts[subreddit]
        r_api.wait()


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--num_initial", required=False)
    parser.add_argument("-s", "--sorting", required=False)
    args = parser.parse_args()
    
    try:
        main(args)
    except KeyboardInterrupt:
        print('\nExiting')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(1)
