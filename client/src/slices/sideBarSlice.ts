import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SideBarState {
  iconState: Boolean;
  width: number;
}

const initialState: SideBarState = {
  iconState: false,
  width: 100
};

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setIconState: (state, action: PayloadAction<Boolean>) => {
      state.iconState = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    }
  }
});

export const { setIconState, setWidth } = sideBarSlice.actions;

export const selectIconState = (state: RootState) => state.sidebar.iconState;
export const selectWidth = (state: RootState) => state.sidebar.width;

export default sideBarSlice.reducer;
