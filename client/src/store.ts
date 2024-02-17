import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import sideBarReducer from './slices/sideBarSlice';
import siteReducer from './slices/siteSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    sidebar: sideBarReducer,
    site: siteReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
