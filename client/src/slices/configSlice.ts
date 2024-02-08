import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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
    },
    getSavedConfig: (state) => {
      async () => {
        const savedPlugins = await window.Main.getAllPlugins();

        savedPlugins.keys.map((site: string) => {
          state.sites.push(savedPlugins[site]);
        });
      };
    }
  }
});

export const { addSiteConfig, removeSiteConfig, getSavedConfig } = configSlice.actions;

export const selectSites = (state: RootState) => state.config.sites;

export default configSlice.reducer;
