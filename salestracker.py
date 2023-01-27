
import time
from api.authentication import reddit_api

NUM_INTIAL_POSTS = 10

def main():

    r_api = reddit_api()

    r_api.print_initial_posts(NUM_INTIAL_POSTS)
    latest_post = r_api.get_current_post()

    while (1):
        current_post = r_api.get_current_post()
        if latest_post['data']['name'] != current_post['data']['name']:
            print(current_post['data']['title'])
            print(current_post['data']['url'])
            latest_post = current_post
        time.sleep(30)


if __name__ == "__main__":
    main()
