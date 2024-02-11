import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SiteConfigState {
  status: string;
  error: string;
  sites: Array<siteInfo>;
}

const initialState: SiteConfigState = {
  status: 'idle',
  error: '',
  sites: []
};

export const getSavedConfig = createAsyncThunk('config/getSavedConfig', async () => {
  const localSites = await window.Main.getAllPlugins();
  return localSites;
});

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    addSiteConfig: (state, action: PayloadAction<siteInfo>) => {
      state.sites.push(action.payload);
    },
    removeSiteConfig: (state, action: PayloadAction<string>) => {
      const index = state.sites
        .map((e) => {
          return e.name;
        })
        .indexOf(action.payload);

      state.sites.splice(index, 1);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getSavedConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSavedConfig.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sites = action.payload;
      })
      .addCase(getSavedConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addSiteConfig, removeSiteConfig } = configSlice.actions;

export const selectSites = (state: RootState) => state.config.sites;
export const selectStatus = (state: RootState) => state.config.status;

export default configSlice.reducer;
