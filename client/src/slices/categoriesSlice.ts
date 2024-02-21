import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { TCategory } from '../../common/types';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: Array<TCategory>,
  reducers: {
  }
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
