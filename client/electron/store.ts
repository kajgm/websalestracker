import Store from 'electron-store';
import { SiteData } from './types';

export type SchemaType = {
  plugins: SiteData[];
};

interface schema {
  type: 'object',
  properties: {
    plugins: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          endpoint: { type: 'string' },
          type: { type: 'string' },
          categories: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        required: ['name', 'endpoint', 'type', 'categories']
      }
    }
  },
  required: ['plugins']
}

export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  PLUGINS: 'plugins'
};

const store = new Store<schema>

export default store;
