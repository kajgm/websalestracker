import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface redditPost {
  data: {
    title: string;
    url: string;
    id: string;
  };
}

interface ApiState {
  updated: Boolean;
  posts: Array<redditPost>;
}

const initialState: ApiState = {
  updated: false,
  posts: [{ data: { title: '', url: '', id: '' } }]
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    requestPostUpdate: (state) => {
      state.updated = true;
    },
    updatePosts: (state, action: PayloadAction<Array<redditPost>>) => {
      state.posts = action.payload;
    }
  }
});

export const { requestPostUpdate, updatePosts } = apiSlice.actions;

export const selectPosts = (state: RootState) => state.api.posts;
export const selectUpdateStatus = (state: RootState) => state.api.updated;

export default apiSlice.reducer;
