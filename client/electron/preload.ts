import { ipcRenderer, contextBridge } from 'electron';
import { SiteData } from './types';

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
  setPlugin: async (plugin: SiteData) => {
    ipcRenderer.invoke('setPlugin', plugin);
  },
  getPlugin: async (pluginId: number) => {
    return ipcRenderer.invoke('getPlugin', pluginId);
  },
  getAllPlugins: async () => {
    return ipcRenderer.invoke('getAllPlugins');
  },
  deletePlugin: async (pluginId: number) => {
    ipcRenderer.invoke('deletePlugin', pluginId);
  }
};
contextBridge.exposeInMainWorld('Main', api);
