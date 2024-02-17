import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { SiteData } from '../../common/types';

interface SiteState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
  sites: Array<SiteData>;
}

const initialState: SiteState = {
  status: 'idle',
  error: '',
  sites: []
};

export const getLocalSites = createAsyncThunk('site/getLocalSites', async () => {
  const localSites = await window.Main.getAllSites();
  return localSites;
});

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    addSite: (state, action: PayloadAction<SiteData>) => {
      state.sites.push(action.payload);
    },
    removeSite: (state, action: PayloadAction<number>) => {
      state.sites.splice(action.payload, 1);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalSites.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getLocalSites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sites = action.payload;
      })
      .addCase(getLocalSites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addSite, removeSite } = siteSlice.actions;

export const selectSites = (state: RootState) => state.site.sites;
export const selectSiteStatus = (state: RootState) => state.site.status;

export default siteSlice.reducer;
