import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { TItem } from '../../common/types';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: Array<TItem>,
  reducers: {
    addItem: (state, action: PayloadAction<TItem>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state = state.filter(
        (item) => item.id === action.payload
      );
    }
  }
});

export const selectItems = (state: RootState) => state.items;

export default itemsSlice.reducer;
