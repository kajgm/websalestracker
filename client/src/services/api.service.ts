import axios from 'axios';

const getReddit = (endpoint: string, subreddit: string, sorting: string, type: string) => {
  return axios.get(endpoint + subreddit + '/' + sorting + type);
};

export default {
  getReddit
};
