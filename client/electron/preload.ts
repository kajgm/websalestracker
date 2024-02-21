import { ipcRenderer, contextBridge } from 'electron';
import { TSite } from '../common/types';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  /**
    Here function for AppBar
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
  addSite: async (site: TSite) => {
    ipcRenderer.invoke('addSite', site);
  },
  getSite: async (siteId: string) => {
    return ipcRenderer.invoke('getSite', siteId);
  },
  getAllSites: async () => {
    return ipcRenderer.invoke('getAllSites');
  },
  removeSite: async (siteId: string) => {
    ipcRenderer.invoke('removeSite', siteId);
  }
};
contextBridge.exposeInMainWorld('Main', api);
