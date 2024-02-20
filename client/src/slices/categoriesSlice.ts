import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { TCategory } from '../../common/types';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: Array<TCategory>,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      const newCategory: TCategory = {
        name: action.payload,
        siteNames: [],
        siteLabels: [],
      };
      state.push(newCategory);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state = state.filter((category) => category.name === action.payload);
    }
  }
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
