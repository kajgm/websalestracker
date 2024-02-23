import Store, { Schema } from 'electron-store';
import { TCategory, TSite } from '../common/types';

interface DataStore {
  sites: TSite[];
  categories: TCategory[];
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
  },
  categories: {
    type: 'array',
    properties: {
      categoryData: {
        type: 'object',
        default: {}
      }
    },
    default: {}
  }
};

export const STORE_KEYS: { [key: string]: keyof DataStore } = { SITES: 'sites', CATEGORIES: 'categories' };

const store = new Store<DataStore>({ schema });

export default store;
