import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TCategory } from '../../common/types';

const categoriesAdapter = createEntityAdapter({
  selectId: (category: TCategory) => category.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
});

const initialState = categoriesAdapter.getInitialState({
  status: 'idle',
  error: ''
});

export const getLocalCategories = createAsyncThunk('categories/getLocalCategories', async () => {
  const localCategories = window.Main ? await window.Main.getAllCategories() : [];
  return localCategories;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: categoriesAdapter.addOne,
    removeCategory: categoriesAdapter.removeOne
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalCategories.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getLocalCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        categoriesAdapter.upsertMany(state, action.payload);
      })
      .addCase(getLocalCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addCategory, removeCategory } = categoriesSlice.actions;

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);

export default categoriesSlice.reducer;
