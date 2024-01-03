import requests
from api.post import *
from api.authentication import *
from helpers import *


class redditApi:
    headers = None
    auth = None

    def __init__(self):
        self.auth = authorization()
        self.headers = {
            "User-Agent": "salestrackerbot/0.0.1",
            "Authorization": "bearer " + self.auth.get_token(),
        }

    def refresh_token(self):
        self.auth.set_token_loop()

    def get_current_post(self, sort, subr_list):
        res_dict = {}

        for subreddit in subr_list:
            res = requests.get(
                API_ENDPOINT + subreddit + "/" + sort,
                headers=self.headers,
                params={"limit": "1"},
            )
            check_response_status(res, False)
            res_dict[subreddit] = post_obj(res.json()["data"]["children"][0])

        return res_dict

    def get_posts_list(self, num_posts, sort, subr_list):
        ret_list = []

        for subreddit in subr_list:
            res = requests.get(
                API_ENDPOINT + subreddit + "/" + sort,
                headers=self.headers,
                params={"limit": num_posts},
            )
            check_response_status(res, False)

            post_list = create_post_list(res)
            ret_list += post_list

        ret_list.sort(key=lambda x: x.timestamp)

        return ret_list

    def get_posts_dict(self, num_posts, sort, subr_list):
        ret_dict = {}

        for subreddit in subr_list:
            res = requests.get(
                API_ENDPOINT + subreddit + "/" + sort,
                headers=self.headers,
                params={"limit": num_posts},
            )
            check_response_status(res, False)

            post_list = create_post_list(res)
            ret_dict[subreddit] = post_list

        return ret_dict
