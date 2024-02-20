import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TSite } from '../../common/types';

interface SiteState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
  entities: Array<TSite>;
}

const initialState: SiteState = {
  status: 'idle',
  error: '',
  entities: []
};

export const getLocalSites = createAsyncThunk('site/getLocalSites', async () => {
  const localSites = window.Main ? await window.Main.getAllSites() : [];
  return localSites;
});

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    addSite: (state, action: PayloadAction<TSite>) => {
      state.entities.push(action.payload);
    },
    removeSite: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter((site) => site.name !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalSites.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getLocalSites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(getLocalSites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addSite, removeSite } = siteSlice.actions;

export const selectSites = (state: RootState) => state.sites.entities;
export const selectSiteStatus = (state: RootState) => state.sites.status;

export default siteSlice.reducer;
