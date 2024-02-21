import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { TItem } from '../../common/types';

const itemsAdapter = createEntityAdapter({
  selectId: (item: TItem) => item.id,

  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = itemsAdapter.getInitialState({
  status: 'idle',
  error: ''
});

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: itemsAdapter.addOne,
    removeItem: itemsAdapter.removeOne
  }
});

export const { addItem, removeItem } = itemsSlice.actions;

export const {
  selectAll: selectAllItems,
  selectById: slectItemById,
  selectIds: selectItemIds
} = itemsAdapter.getSelectors((state: RootState) => state.items);

export const selectItemsBySiteId = createSelector([selectAllItems, (_, siteId) => siteId], (items, siteId) =>
  items.filter((item) => item.siteId === siteId)
);

export const selectItemsByCategoryId = createSelector(
  [selectAllItems, (_, categoryId) => categoryId],
  (items, categoryId) => items.filter((item) => item.categoryId === categoryId)
);

export default itemsSlice.reducer;
