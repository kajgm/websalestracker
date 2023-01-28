
import time
from api.api import reddit_api
from api.post import post_obj

NUM_INTIAL_POSTS = 10

def main():

    r_api = reddit_api()

    r_api.print_initial_posts(NUM_INTIAL_POSTS)
    latest_post = r_api.get_current_post()

    while (1):
        current_post = r_api.get_current_post()
        if latest_post.get_name() != current_post.get_name():
            current_post.print_data()
            latest_post = current_post
        time.sleep(30)


if __name__ == "__main__":
    main()
