import sys
import os
import time
import csv

WAIT_TIME = 10
NUM_INTIAL_POSTS = 10
CACHE_SIZE = 5
SORT_METHOD = "new"
SOUND_FLAG = True
FILTER_OPTIONS = ["new", "top", "hot", "rising", "controversial"]
TOP_PATH = os.path.realpath("..")
API_PATH = TOP_PATH, "/src/api"
SOUND_PATH = TOP_PATH + "/res/notification.mp3"
SUBRED_PATH = TOP_PATH + "/res/subreddits.csv"
CRED_PATH = TOP_PATH + "/credentials.json"
TOKEN_URL = "https://www.reddit.com/api/v1/access_token"
GET_URL = "https://oauth.reddit.com/api/v1/me"
API_ENDPOINT = "https://oauth.reddit.com/r/"


# retrieve list of subreddits from subreddits.csv
def get_subreddits():
    subreddits = []

    try:
        with open(SUBRED_PATH, newline="") as csv_file:
            reader = csv.reader(csv_file)
            subreddits = list(reader)[0]
    except:
        print("subreddits.csv not found")
        subreddits = list(
            input(
                "please enter the subreddits you would like to track seperated by a ',':\n"
            )
        )

    return subreddits


def validate_flags(args):
    if args.num_initial != None:
        if type(args.num_initial) != int:
            raise Exception("Error: num_initial is not a integer")
    if args.filter != None:
        if args.filter not in FILTER_OPTIONS:
            raise Exception(
                "Error: filter not valid option, must be on of: " + str(FILTER_OPTIONS)
            )
    if args.sound != None:
        args.sound = args.sound.lower() == ("true" or "t")
        if type(args.sound) != bool:
            raise Exception("Error: sound must be either True or False")

    return args


def get_post_attr(subreddit_list, attr):
    attr_list = []

    if attr == "name":
        for post in subreddit_list:
            attr_list.append(post.get_name())
    elif attr == "url":
        for post in subreddit_list:
            attr_list.append(post.get_url())

    return attr_list


def wait(sec):
    # output the . -> .. -> ... waiting loop animation
    for j in range(sec):
        print(".", end="")
        sys.stdout.flush()
        time.sleep(1)
    # clear the terminal line
    print("\r", end="")
    print("                              ", end="\r")
    time.sleep(1)
