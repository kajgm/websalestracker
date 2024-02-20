import { configureStore } from '@reduxjs/toolkit';

import sideBarReducer from './slices/sideBarSlice';
import siteReducer from './slices/sitesSlice';
import categoryReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    sites: siteReducer,
    categories: categoryReducer,
    items: itemsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
