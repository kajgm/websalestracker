import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface ApiState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: ApiState = {
  status: 'idle',
  error: ''
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {}
});

export const selectApiStatus = (state: RootState) => state.api.status;

export default apiSlice.reducer;
