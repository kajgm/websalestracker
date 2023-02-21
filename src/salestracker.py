import sys
import os
import argparse
from api.api import *
from playsound import playsound
from helpers import *


def main(args):
    rApi = redditApi()

    subr_list = args.reddit or get_subreddits()
    num_posts = args.num_initial or NUM_INTIAL_POSTS
    sorting = args.filter or SORT_METHOD
    sound_flag = args.sound
    if args.sound == None:
        sound_flag = SOUND_FLAG

    print('\nCurrently tracking the following subreddits:')
    print(get_subreddits())
    print('\nSorting method: ' + sorting)

    if not sound_flag:
        print('\nSounds muted')

    print('\n------------------------------------------------------------\n')

    # output the initial list of posts
    initial_post_list = rApi.get_posts_list(num_posts, sorting, subr_list)
    for entry in initial_post_list:
        entry.print_data()

    # set the latest set of posts to compare
    subr_cache = rApi.get_posts_dict(CACHE_SIZE, sorting, subr_list)

    # main loop
    while (1):

        # attempt to get the current latest post
        try:
            current_posts = rApi.get_current_post(sorting, subr_list)
        except not KeyboardInterrupt:
            print(
                f'{tformatting.WARNING}Error: Failed to call post api, attempting to refresh token{tformatting.ENDC}')
            rApi.refresh_token()  # refresh token and attempt again if failure
            current_posts = rApi.get_current_post(sorting, subr_list)
            print(
                f'{tformatting.OKGREEN}Success! Token refreshed\n{tformatting.ENDC}')

        for subreddit in subr_cache:
            post_names = get_post_names(subr_cache[subreddit])

            # compare the 7 character unqiue post name (i.e. 10p5wam)
            if current_posts[subreddit].get_name() not in post_names:
                current_posts[subreddit].print_data()

                # add the new post to the cache of latest posts
                subr_cache[subreddit].append(current_posts[subreddit])
                subr_cache[subreddit].pop(0)

                # play a notification sound if enabled
                if sound_flag:
                    playsound(SOUND_PATH)

        wait(WAIT_TIME)  # wait for 10 seconds before refreshing again


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--num_initial", required=False)
    parser.add_argument("-f", "--filter", required=False)
    parser.add_argument("-s", "--sound", required=False)
    parser.add_argument("-r", "--reddit", required=False)
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
