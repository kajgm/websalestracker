import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SiteItem } from '../../common/types';

interface ItemState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
  items: Array<SiteItem>;
}

const initialState: ItemState = {
  status: 'idle',
  error: '',
  items: []
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SiteItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<{ itemName: string; categoryName: string; siteName: string }>) => {
      const { itemName, categoryName, siteName } = action.payload;
      state.items = state.items.filter(
        (item) => item.name === itemName && item.category === categoryName && item.site === siteName
      );
    }
  }
});

export const selectItemsBySite = (state: RootState, site: string) =>
  state.item.items.filter((item) => item.site === site);

export const selectItemsByCategory = (state: RootState, category: string) =>
  state.item.items.filter((item) => item.category === category);

export default itemSlice.reducer;
