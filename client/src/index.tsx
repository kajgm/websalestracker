import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import './global.css';

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
