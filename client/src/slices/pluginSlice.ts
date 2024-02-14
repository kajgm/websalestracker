import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { SiteData } from '../../common/types';

interface PluginState {
  status: string;
  error: string;
  trackedSites: Array<SiteData>;
}

const initialState: PluginState = {
  status: 'idle',
  error: '',
  trackedSites: []
};

export const getLocalPlugins = createAsyncThunk('plugin/getLocalPlugin', async () => {
  const localPlugins = await window.Main.getAllPlugins();
  return localPlugins;
});

const pluginSlice = createSlice({
  name: 'plugin',
  initialState,
  reducers: {
    addLocalPlugin: (state, action: PayloadAction<SiteData>) => {
      state.trackedSites.push(action.payload);
    },
    removeLocalPlugin: (state, action: PayloadAction<number>) => {
      state.trackedSites.splice(action.payload, 1);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalPlugins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLocalPlugins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trackedSites = action.payload;
      })
      .addCase(getLocalPlugins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addLocalPlugin, removeLocalPlugin } = pluginSlice.actions;

export const selectTrackedSites = (state: RootState) => state.plugin.trackedSites;
export const selectStatus = (state: RootState) => state.plugin.status;

export default pluginSlice.reducer;
