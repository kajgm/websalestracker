import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import { getLocalPlugins } from './slices/pluginSlice';

import './global.css';

store.dispatch(getLocalPlugins()); // Asynchronously load local config on start

const StrictApp = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(<StrictApp />);
