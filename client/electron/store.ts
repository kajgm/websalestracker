import Store, { Schema } from 'electron-store';
import { SiteData } from './types';

interface DataStore {
  plugins: SiteData[];
}

const schema: Schema<DataStore> = {
  plugins: {
    type: 'array',
    properties: {
      siteData: {
        type: 'object',
        default: {}
      }
    },
    default: {}
  }
};

export const STORE_KEYS: { [key: string]: keyof DataStore } = { PLUGINS: 'plugins' };

const store = new Store<DataStore>({ schema });

export default store;
