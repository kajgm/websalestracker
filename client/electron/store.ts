import Store from 'electron-store';
import { JSONSchemaType } from 'ajv';
import { SiteData } from '../common/types';

export type SchemaType = {
  plugins: SiteData[];
};

const schema: JSONSchemaType<SchemaType> = {
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
};

export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  PLUGINS: 'plugins'
};

// Not sure why this is throwing an error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const store = new Store<SchemaType>({ schema });

export default store;
