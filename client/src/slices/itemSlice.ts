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

export const selectItems = (state: RootState) => state.item.items;

export default itemSlice.reducer;
