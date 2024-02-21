import { createSlice, PayloadAction, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { TSite } from '../../common/types';

const sitesAdapter = createEntityAdapter({
  selectId: (site: TSite) => site.id,

  sortComparer: (a, b) => a.id.localeCompare(b.id)
});

const initialState = sitesAdapter.getInitialState({
  status: 'idle',
  error: ''
});

export const getLocalSites = createAsyncThunk('site/getLocalSites', async () => {
  const localSites = window.Main ? await window.Main.getAllSites() : [];
  return localSites;
});

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    addSite: sitesAdapter.addOne,
    removeSite: sitesAdapter.removeOne
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalSites.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getLocalSites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        sitesAdapter.upsertMany(state, action.payload);
      })
      .addCase(getLocalSites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      });
  }
});

export const { addSite, removeSite } = siteSlice.actions;

export const {
  selectAll: selectAllSites,
  selectById: selectSiteById,
  selectIds: selectSiteIds
} = sitesAdapter.getSelectors((state: RootState) => state.sites);

export default siteSlice.reducer;
