# RedditSalesTracker

RedditSalesTracker (RST) is a simple tracker for posts on sales-specific subreddits

## Prerequisites
- >= [Python 3.11.0](https://www.python.org/downloads/)
- Requests
```
$ python -m pip install requests

```
- [Reddit API access](https://github.com/reddit-archive/reddit/wiki/OAuth2)

## Usage
1. To automate the authentication process, you can create a credentials.json file in the top level directory
- i.e. it should look something like:
```
{
    "app_id": "your_appid",
    "secret": "your_secret",
    "reddit_username": "your_username",
    "reddit_password": "your_password"
}
```
2. Modify the subreddits.csv to track your preferred subreddits

## Development

### Development Prerequisites


