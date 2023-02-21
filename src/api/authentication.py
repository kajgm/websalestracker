import requests
import json
import getpass
from api.format import *
from helpers import *


def check_response_status(res, printflag):
    if res.status_code != 200:
        raise Exception(f'{tformatting.FAIL}Error: Response Returned ' +
                        str(res.status_code) + f'{tformatting.ENDC}')
    elif printflag:
        print(f'{tformatting.OKGREEN}  Request returned ' +
              str(res.status_code) + f'{tformatting.ENDC}')


# retrieve credentials from credentials.json
def get_credentials():
    credentials = {}
    try:
        with open(CRED_PATH, 'r') as json_file:
            credentials = json.load(json_file)
    except:
        print('credentials.json not found, please enter credentials')
        credentials['app_id'] = input('App id: ')
        credentials['secret'] = input('Secret: ')
        credentials['reddit_username'] = input('Reddit username: ')
        credentials['reddit_password'] = getpass.getpass('Reddit password: ')

    return credentials


class authorization:
    credentials = None
    token = None
    headers = None

    def __init__(self):
        self.headers = {'User-Agent': 'salestrackerbot/0.0.1'}
        self.credentials = get_credentials()
        self.set_token_loop()

    def set_token(self):

        print('Attempting to connect to the reddit api...')
        auth = requests.auth.HTTPBasicAuth(
            self.credentials['app_id'], self.credentials['secret'])

        data = {
            'grant_type': 'password',
            'username': self.credentials['reddit_username'],
            'password': self.credentials['reddit_password']
        }

        try:
            # post request to retrieve token
            post_res = requests.post(
                TOKEN_URL, auth=auth, data=data, headers=self.headers)
            check_response_status(post_res, True)
        except:
            print(
                f'{tformatting.FAIL}Error: Failed to perform post request{tformatting.ENDC}')
            return False

        token = post_res.json()['access_token']
        self.headers['Authorization'] = 'bearer {}'.format(token)

        try:
            # get request to verify get functionality with token works
            get_res = requests.get(GET_URL, headers=self.headers)
            check_response_status(get_res, True)
        except:
            print(
                f'{tformatting.FAIL}Error: Failed to perform get request{tformatting.ENDC}')
            return False

        token = post_res.json()['access_token']
        self.token = token

        return True

    def set_token_loop(self):
        tk_status = self.set_token()
        while (not tk_status):
            wait(WAIT_TIME)
            tk_status = self.set_token()

    def get_token(self):
        return self.token
