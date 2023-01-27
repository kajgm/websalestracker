import requests
import json
import time

API = 'https://oauth.reddit.com'


def authenticate(headers, credentials):

    auth = requests.auth.HTTPBasicAuth(
        credentials['app_id'], credentials['secret'])

    data = {
        'grant_type': 'password',
        'duration': 'permanent',
        'username': credentials['reddit_username'],
        'password': credentials['reddit_password']
    }

    post_res = requests.post('https://www.reddit.com/api/v1/access_token',
                             auth=auth, data=data, headers=headers)

    check_response_status(post_res)

    token = post_res.json()['access_token']
    headers['Authorization'] = 'bearer {}'.format(token)

    get_res = requests.get(
        'https://oauth.reddit.com/api/v1/me', headers=headers)
    check_response_status(get_res)

    return post_res


def get_credentials():
    credentials = {}

    try:
        with open('credentials.json', 'r') as json_file:
            credentials = json.load(json_file)
    except:
        print('credentials.json not found, please enter credentials')
        credentials['app_id'] = input('App id: ')
        credentials['secret'] = input('secret')
        credentials['reddit_username'] = input('reddit_username')
        credentials['reddit_password'] = input('reddit_password')

    return credentials


def check_response_status(res):
    if res.status_code != 200:
        raise Exception('Error: Response Returned ' + str(res.status_code))
    else:
        print('Request returned ' + str(res.status_code))


def get_current_post(headers, token):
    res = requests.get('{}/r/bapcsalescanada/new'.format(API),
                       headers=headers, params={'limit': '1'})
    check_response_status(res)
    return res.json()['data']['children'][0]


def print_initial_posts(headers, token):
    res = requests.get('{}/r/bapcsalescanada/new'.format(API),
                       headers=headers, params={'limit': '10'})
    check_response_status(res)
    for post in reversed(res.json()['data']['children']):
        print(post['data']['title'])
        print(post['data']['url'] + '\n')


def main():
    headers = {'User-Agent': 'salestrackerbot/0.0.1'}

    credentials = get_credentials()
    res = authenticate(headers, credentials)
    token = res.json()['access_token']

    headers['Authorization'] = 'bearer {}'.format(token)

    print_initial_posts(headers, token)
    latest_post = get_current_post(headers, token)

    while (1):
        current_post = get_current_post(headers, token)
        if latest_post['data']['name'] != current_post['data']['name']:
            print(current_post['data']['title'])
            print(current_post['data']['url'])
            latest_post = current_post
        time.sleep(30)


if __name__ == "__main__":
    main()
