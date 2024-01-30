import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

const StrictApp = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <StrictApp />);
} else {
  const root = createRoot(rootElement);
  root.render(<StrictApp />);
}
