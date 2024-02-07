import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import sideBarReducer from './slices/sideBarSlice';
import viewReducer from './slices/viewSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    sidebar: sideBarReducer,
    view: viewReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
