import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAppSelector } from './hooks';
import { selectSites } from './slices/siteSlice';

import Home from './pages/Home';
import AppBar from './components/AppBar';

const Favourite = lazy(() => import('./pages/Favourite'));
const Discover = lazy(() => import('./pages/Discover'));
const Hot = lazy(() => import('./pages/Hot'));
const Settings = lazy(() => import('./pages/Settings'));
const Site = lazy(() => import('./pages/Site'));
const Category = lazy(() => import('./pages/Category'));

function App() {
  const sites = useAppSelector(selectSites);

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
            {sites.map((site) => (
              <Route path="/site/:site" element={<Site />} key={site.name} />
            ))}
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
