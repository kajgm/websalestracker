import { ipcRenderer, contextBridge } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

interface siteInfo {
  name: string;
  endpoint: string;
  categories: Array<string>;
  type: string;
}

interface configData {
  id: string;
  info: siteInfo;
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
  setPlugin: (plugin: configData) => {
    ipcRenderer.send('setPlugin', plugin);
  },
  deletePlugin: (plugin: string) => {
    ipcRenderer.send('deletePlugin', plugin);
  },
  getDefaultPlugin: (id: string) => {
    return ipcRenderer.invoke('getDefaultPlugin', id);
  },
  getAllPlugins: () => {
    return ipcRenderer.invoke('getAllPlugins');
  }
};
contextBridge.exposeInMainWorld('Main', api);
