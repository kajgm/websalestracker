import axios from 'axios';

import data from '../data/publicApiEndpoints';

const getReddit = (subreddit: string, sorting: string) => {
  const info = data.reddit;
  return axios.get(info.link + subreddit + '/' + sorting + info.type);
};

export default {
  getReddit
};
