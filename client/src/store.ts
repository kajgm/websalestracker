import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import sideBarReducer from './slices/sideBarSlice';
import configReducer from './slices/configSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    sidebar: sideBarReducer,
    config: configReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
