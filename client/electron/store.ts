import Store, { Schema } from 'electron-store';
import { TSite } from '../common/types';

interface DataStore {
  sites: TSite[];
}

const schema: Schema<DataStore> = {
  sites: {
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

export const STORE_KEYS: { [key: string]: keyof DataStore } = { SITES: 'sites' };

const store = new Store<DataStore>({ schema });

export default store;
