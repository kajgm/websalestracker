import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SiteCategory } from '../../common/types';

interface CategoryState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
  categories: Array<SiteCategory>;
}

const initialState: CategoryState = {
  status: 'idle',
  error: '',
  categories: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<{ categoryName: string; siteName: string }>) => {
      const { categoryName, siteName } = action.payload;
      const newCategory: SiteCategory = {
        name: categoryName,
        site: siteName,
        items: []
      };
      state.categories.push(newCategory);
    },
    removeCategory: (state, action: PayloadAction<{ categoryName: string; siteName: string }>) => {
      const { categoryName, siteName } = action.payload;
      state.categories = state.categories.filter(
        (category) => category.name === categoryName && category.site === siteName
      );
    }
  }
});
