import sys
import os
import argparse
from api.api import *
from playsound import playsound


NUM_INTIAL_POSTS = 10
SORT_METHOD = 'new'
SOUND_FLAG = True
CUR_PATH = os.path.dirname(__file__)


def main(args):

    r_api = reddit_api()

    num_posts = args.num_initial or NUM_INTIAL_POSTS
    sorting = args.filter or SORT_METHOD
    sound_flag = args.sound or SOUND_FLAG

    print('Currently tracking the following subreddits:')
    print(get_subreddits())
    print('Sorting method: ' + sorting)

    if not sound_flag:
        print('Sounds muted')

    print('--------------------\n')

    # output the initial list of posts
    r_api.print_initial_posts(num_posts, sorting)
    # set the latest set of posts to compare
    latest_posts = r_api.get_current_post(sorting)

    while (1):
        # attempt to get the current latest post
        try:
            current_posts = r_api.get_current_post(sorting)
        except:
            print(
                f'{tformatting.WARNING}Error: Failed to call post api, attempting to refresh token{tformatting.ENDC}')
            r_api.refresh_token()  # refresh token and attempt again if failure
            current_posts = r_api.get_current_post(sorting)
            print(
                f'{tformatting.OKGREEN}Success! Token refreshed\n{tformatting.ENDC}')

        for subreddit in latest_posts:
            # compare the 7 character unqiue post name (i.e. 10p5wam)
            if latest_posts[subreddit].get_name() != current_posts[subreddit].get_name():
                current_posts[subreddit].print_data()
                latest_posts[subreddit] = current_posts[subreddit]
                if sound_flag:
                    playsound(CUR_PATH + '\\resources\\notification.mp3')
        r_api.wait(10)  # wait for 10 seconds before refreshing again


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--num_initial", required=False)
    parser.add_argument("-f", "--filter", required=False)
    parser.add_argument("-s", "--sound", required=False)
    args = parser.parse_args()

    try:
        main(args)
    except KeyboardInterrupt:
        print('\nExiting')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(1)
