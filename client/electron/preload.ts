import { ipcRenderer, contextBridge } from 'electron';
import { TCategory, TSite } from '../common/types';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * AppBar
   */
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  /**
   * Access user stored data
   */
  // User stored sites
  addSite: async (site: TSite) => {
    ipcRenderer.invoke('addSite', site);
  },
  getSite: async (siteId: string) => {
    return ipcRenderer.invoke('getSite', siteId);
  },
  removeSite: async (siteId: string) => {
    ipcRenderer.invoke('removeSite', siteId);
  },
  getAllSites: async () => {
    return ipcRenderer.invoke('getAllSites');
  },
  removeAllSites: async () => {
    ipcRenderer.invoke('removeAllSites');
  },

  // User stored categories
  addCategory: async (categoryId: TCategory) => {
    ipcRenderer.invoke('addCategory', categoryId);
  },
  getCategory: async (categoryId: string) => {
    return ipcRenderer.invoke('getCategory', categoryId);
  },
  removeCategory: async (categoryId: string) => {
    ipcRenderer.invoke('removeCategory', categoryId);
  },
  getAllCategories: async () => {
    return ipcRenderer.invoke('getAllCategories');
  },
  removeAllCategories: async () => {
    ipcRenderer.invoke('removeAllCategories');
  }
};
contextBridge.exposeInMainWorld('Main', api);
