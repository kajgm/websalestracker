import { GET_REDDIT } from './types';

import ApiService from '../services/api.service';

export const getReddit = (subreddit: string, sorting: string) => (dispatch: any) => {
  return ApiService.getReddit(subreddit, sorting).then(
    (response: any) => {
      console.log(response);
      return Promise.resolve();
    },
    (error: any) => {
      return Promise.reject();
    }
  );
};
