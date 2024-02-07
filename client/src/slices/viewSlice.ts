import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ViewState {
  viewState: string;
}

const initialState: ViewState = {
  viewState: 'discover'
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      state.viewState = action.payload;
    }
  }
});

export const { setView } = viewSlice.actions;

export const selectView = (state: RootState) => state.view.viewState;

export default viewSlice.reducer;
