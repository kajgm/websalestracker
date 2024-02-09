import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';
interface SiteConfigState {
  loading: string;
  sites: Array<siteInfo>;
}

const initialState: SiteConfigState = {
  loading: 'idle',
  sites: []
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    sitesLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    sitesReceived(state, action: PayloadAction<Array<siteInfo>>) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.sites = action.payload;
      }
    },
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

export const { sitesLoading, sitesReceived, addSiteConfig, removeSiteConfig } = configSlice.actions;

export const selectSites = (state: RootState) => state.config.sites;

export const getSavedConfig = () => async (dispatch: AppDispatch) => {
  dispatch(sitesLoading());
  const localSites = await window.Main.getAllPlugins();
  dispatch(sitesReceived(localSites));
};

export default configSlice.reducer;
