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
  name: string;
  category: string;
  updated: Boolean;
  posts: Array<redditPost>;
}

const initialState: ApiState = {
  name: '',
  category: '',
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
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }
  }
});

export const { requestPostUpdate, updatePosts, updateName, updateCategory } = apiSlice.actions;

export const selectSite = (state: RootState) => state.api.name;
export const selectCategory = (state: RootState) => state.api.category;
export const selectPosts = (state: RootState) => state.api.posts;
export const selectUpdateStatus = (state: RootState) => state.api.updated;

export default apiSlice.reducer;
