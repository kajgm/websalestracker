import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface siteInfo {
  name: string;
  endpoint: string;
  categories: Array<string>;
  type: string;
}

interface SiteConfigState {
  sites: Array<siteInfo>;
}

const initialState: SiteConfigState = {
  sites: []
};

export const configSlice = createSlice({
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
  }
});

export const { addSiteConfig, removeSiteConfig } = configSlice.actions;

export const selectSites = (state: RootState) => state.config.sites;

export default configSlice.reducer;
