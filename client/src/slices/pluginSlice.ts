import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { SiteData } from '../../common/types';

interface PluginState {
  status: string;
  error: string;
  sites: Array<SiteData>;
}

const initialState: PluginState = {
  status: 'idle',
  error: '',
  sites: []
};

export const getLocalPlugins = createAsyncThunk('plugin/getLocalPlugin', async () => {
  const localPlugins = await window.Main.getAllPlugins();
  return localPlugins;
});

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    addLocalPlugin: (state, action: PayloadAction<SiteData>) => {
      state.sites.push(action.payload);
    },
    removeLocalPlugin: (state, action: PayloadAction<number>) => {
      state.sites.splice(action.payload, 1);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalPlugins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLocalPlugins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sites = action.payload;
      })
      .addCase(getLocalPlugins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addLocalPlugin, removeLocalPlugin } = configSlice.actions;

export const selectSites = (state: RootState) => state.config.sites;
export const selectStatus = (state: RootState) => state.config.status;

export default configSlice.reducer;
