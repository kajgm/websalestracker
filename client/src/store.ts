import { configureStore } from '@reduxjs/toolkit';

import sideBarReducer from './slices/sideBarSlice';
import siteReducer from './slices/siteSlice';
import categoryReducer from './slices/categorySlice';
import itemReducer from './slices/itemSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    site: siteReducer,
    category: categoryReducer,
    item: itemReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
