import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAppSelector } from './hooks';
import { selectAllSites } from './slices/sitesSlice';

import Home from './pages/HomePage';
import AppBar from './components/AppBar';

const FavouritePage = lazy(() => import('./pages/FavouritePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const HotPage = lazy(() => import('./pages/HotPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const SitePage = lazy(() => import('./pages/SitePage'));
const Category = lazy(() => import('./pages/CategoryPage'));

function App() {
  const sites = useAppSelector(selectAllSites);

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
            <Route path="favourite" element={<FavouritePage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="hot" element={<HotPage />} />
            <Route path="settings" element={<SettingsPage />} />
            {sites.map((site) => {
              const siteId = site.id;
              return <Route path="site/:siteId" element={<SitePage />} key={siteId} />;
            })}
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
