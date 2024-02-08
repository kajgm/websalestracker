import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { addSiteConfig, getSavedConfig } from './slices/configSlice';

import AppBar from './components/AppBar';

const Home = lazy(() => import('./pages/Home'));
const Favourite = lazy(() => import('./pages/Favourite'));
const Discover = lazy(() => import('./pages/Discover'));
const Hot = lazy(() => import('./pages/Hot'));
const Settings = lazy(() => import('./pages/Settings'));
const Site = lazy(() => import('./pages/Site'));

function App() {
  const dispatch = useAppDispatch();
  dispatch(getSavedConfig());

  return (
    <BrowserRouter>
      <Suspense fallback={<Home />}>
        <div className="flex flex-col h-screen overflow-hidden">
          {window.Main && (
            <div className="z-50 w-screen fixed">
              <AppBar />
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/hot" element={<Hot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/site" element={<Site />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
