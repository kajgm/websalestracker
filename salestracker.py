import sys
import os
import argparse
from api.api import *
from playsound import playsound


NUM_INTIAL_POSTS = 10
SORT_METHOD = 'new'
SOUND_FLAG = True
CUR_PATH = os.path.dirname(__file__)

FILTER_OPTIONS = ['new', 'top', 'hot', 'rising', 'controversial']


def validate_flags(args):
    if args.num_initial != None:
        if type(args.num_initial) != int:
            raise Exception('Error: num_initial is not a integer')
    if args.filter != None:
        if args.filter not in FILTER_OPTIONS:
            raise Exception(
                'Error: filter not valid option, must be on of: ' + str(FILTER_OPTIONS))
    if args.sound != None:
        args.sound = args.sound.lower() == ('true' or 't')
        if type(args.sound) != bool:
            raise Exception('Error: sound must be either True or False')
    return args


def main(args):

    r_api = reddit_api()
    subr_list = get_subreddits()

    num_posts = args.num_initial or NUM_INTIAL_POSTS
    sorting = args.filter or SORT_METHOD
    sound_flag = args.sound
    if args.sound == None:
        sound_flag = SOUND_FLAG

    print('Currently tracking the following subreddits:')
    print(get_subreddits())
    print('Sorting method: ' + sorting)

    if not sound_flag:
        print('Sounds muted')

    print('--------------------\n')

    # output the initial list of posts
    initial_post_list = r_api.get_posts(num_posts, sorting, subr_list)
    for entry in initial_post_list:
        entry.print_data()

    # set the latest set of posts to compare
    latest_posts = r_api.get_current_post(sorting, subr_list)

    while (1):
        # attempt to get the current latest post
        try:
            current_posts = r_api.get_current_post(sorting, subr_list)
        except:
            print(
                f'{tformatting.WARNING}Error: Failed to call post api, attempting to refresh token{tformatting.ENDC}')
            r_api.refresh_token()  # refresh token and attempt again if failure
            current_posts = r_api.get_current_post(sorting, subr_list)
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
    raw_args = parser.parse_args()
    args = validate_flags(raw_args)

    try:
        main(args)
    except KeyboardInterrupt:
        print('\nExiting')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(1)
