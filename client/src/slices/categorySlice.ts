import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SiteCategory } from '../../common/types';

interface CategoryState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
  ids: Array<SiteCategory>;
}

const initialState: CategoryState = {
  status: 'idle',
  error: '',
  ids: []
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
        ids: []
      };
      state.ids.push(newCategory);
    },
    removeCategory: (state, action: PayloadAction<{ categoryName: string; siteName: string }>) => {
      const { categoryName, siteName } = action.payload;
      state.ids = state.ids.filter((id) => id.name === categoryName && id.site === siteName);
    }
  }
});

export default categorySlice.reducer;
