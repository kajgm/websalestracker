import { join } from 'path';
import { BrowserWindow, app, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import { TCategory, TSite } from '../common/types';
import store, { STORE_KEYS } from './store';

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
    // Open the DevTools.
    window.webContents.openDevTools();
  } else {
    window?.loadFile(url);
  }

  // For AppBar
  ipcMain.on('minimize', () => {
    window.isMinimized() ? window.restore() : window.minimize();
  });
  ipcMain.on('maximize', () => {
    window.isMaximized() ? window.restore() : window.maximize();
  });
  ipcMain.on('close', () => {
    window.close();
  });

  //Local user configured sites
  ipcMain.handle('getSite', async (_, siteId: string) => {
    const localData: TSite[] = (store.get(STORE_KEYS.SITES) as TSite[]) ?? [];
    return localData.filter((site: TSite) => site.id === siteId);
  });
  ipcMain.handle('getAllSites', async () => {
    const localData: TSite[] = (store.get(STORE_KEYS.SITES) as TSite[]) ?? [];
    return localData;
  });
  ipcMain.handle('addSite', async (_, newSite: TSite) => {
    const localData: TSite[] = store.get(STORE_KEYS.SITES) as TSite[];
    const result = store.set(STORE_KEYS.SITES, [...(localData || []), newSite]);
    return result;
  });
  ipcMain.handle('removeSite', async (_, siteId: string) => {
    const localData: TSite[] = (store.get(STORE_KEYS.SITES) as TSite[]) ?? [];
    const newSites = localData.filter((site: TSite) => site.id !== siteId);
    const result = store.set(STORE_KEYS.SITES, newSites);
    return result;
  });
  ipcMain.handle('removeAllSites', async () => {
    const result = store.set(STORE_KEYS.SITES, []);
    return result;
  });

  //Local user configured categories
  ipcMain.handle('getCategory', async (_, categoryId: string) => {
    const localData: TCategory[] = (store.get(STORE_KEYS.CATEGORIES) as TCategory[]) ?? [];
    return localData.filter((category: TCategory) => category.id === categoryId);
  });
  ipcMain.handle('getAllCategories', async () => {
    const localData: TCategory[] = (store.get(STORE_KEYS.CATEGORIES) as TCategory[]) ?? [];
    return localData;
  });
  ipcMain.handle('addCategory', async (_, newCategory: TCategory) => {
    const localData: TCategory[] = store.get(STORE_KEYS.CATEGORIES) as TCategory[];
    const result = store.set(STORE_KEYS.CATEGORIES, [...(localData || []), newCategory]);
    return result;
  });
  ipcMain.handle('removeCategory', async (_, categoryId: string) => {
    const localData: TCategory[] = (store.get(STORE_KEYS.CATEGORIES) as TCategory[]) ?? [];
    const newCategories = localData.filter((category: TCategory) => category.id !== categoryId);
    const result = store.set(STORE_KEYS.CATEGORIES, newCategories);
    return result;
  });
  ipcMain.handle('removeAllCategories', async () => {
    const result = store.set(STORE_KEYS.CATEGORIES, []);
    return result;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
