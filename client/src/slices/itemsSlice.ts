import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { TItem, TSite } from '../../common/types';

const itemsAdapter = createEntityAdapter({
  selectId: (item: TItem) => item.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = itemsAdapter.getInitialState({
  status: 'idle',
  error: ''
});

export const fetchSiteItems = createAsyncThunk('items/fetchSiteItems', async (site: TSite) => {
  let aggregateArr: Array<TItem> = [];

  const LabelPromises = site.labels.map((label) => axios.get(site.endpoint + label + '/new' + site.type));
  await Promise.all(LabelPromises).then((responses) => {
    responses.map((response, index) => {
      const responseItems = response.data.data.children as Array<any>;
      const itemPrice = 0; //to implement
      const labelItems = responseItems.map((item) => ({
        id: item.data.id,
        title: item.data.title,
        description: item.data.link_flair_text,
        url: item.data.url,
        price: itemPrice,
        siteId: site.id,
        label: site.labels[index],
        categoryId: undefined
      })) as Array<TItem>;
      aggregateArr = aggregateArr.concat(labelItems);
    });
  });

  return aggregateArr;
});

export const fetchCategoryItems = createAsyncThunk('items/fetchSiteItems', async () => {});

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: itemsAdapter.addOne,
    removeItem: itemsAdapter.removeOne
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSiteItems.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchSiteItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        itemsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchSiteItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
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

export const selectItemsByLabel = createSelector([selectAllItems, (_, label) => label], (items, label) =>
  items.filter((item) => item.label === label)
);

export default itemsSlice.reducer;
