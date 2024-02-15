import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../store';
import { SiteData, SiteItem } from '../../common/types';

interface ApiState {
  status: string;
  error: string;
  site: SiteData;
  category: string;
  items: Array<SiteItem>;
}

const initialState: ApiState = {
  status: 'idle',
  error: '',
  site: {
    name: '',
    endpoint: '',
    type: '',
    categories: []
  },
  category: '',
  items: []
};

export const updateCategoryItems = createAsyncThunk<Array<SiteItem>, void, { state: RootState }>(
  'api/updateCategoryItems',
  async (_, { getState }) => {
    const category = selectCategory(getState());
    const site = selectSite(getState());
    const response = await axios.get(site.endpoint + category + '/' + 'new' + site.type);
    const newItems = response.data.data.children;

    return newItems;
  }
);

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    updateSite: (state, action: PayloadAction<SiteData>) => {
      state.site = action.payload;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(updateCategoryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategoryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(updateCategoryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { updateSite, updateCategory } = apiSlice.actions;

export const selectSite = (state: RootState) => state.api.site;
export const selectCategory = (state: RootState) => state.api.category;
export const selectItems = (state: RootState) => state.api.items;
export const selectStatus = (state: RootState) => state.api.status;

export default apiSlice.reducer;
