import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import { getLocalSites } from './slices/sitesSlice';

import './global.css';

async function start() {
  store.dispatch(getLocalSites()); // Asynchronously load local config on start

  const root = createRoot(document.getElementById('root')!);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

start();
