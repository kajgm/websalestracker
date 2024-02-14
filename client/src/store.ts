import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import sideBarReducer from './slices/sideBarSlice';
import pluginReducer from './slices/pluginSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    sidebar: sideBarReducer,
    plugin: pluginReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
