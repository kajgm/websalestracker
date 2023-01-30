import sys
import os
from api.api import *

NUM_INTIAL_POSTS = 10


def main():

    r_api = reddit_api()

    print('Currently tracking the following subreddits:')
    print(get_subreddits())
    print('--------------------\n')

    r_api.print_initial_posts(NUM_INTIAL_POSTS)
    latest_posts = r_api.get_current_post()

    while (1):
        try:
            current_posts = r_api.get_current_post()
        except:
            r_api.refresh_token()
            current_posts = r_api.get_current_post()

        for subreddit in latest_posts:
            if latest_posts[subreddit].get_name() != current_posts[subreddit].get_name():
                current_posts[subreddit].print_data()
                latest_posts[subreddit] = current_posts[subreddit]
        r_api.wait()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print('Exiting')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(1)
