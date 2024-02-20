import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAppSelector } from './hooks';
import { selectSites } from './slices/sitesSlice';

import Home from './pages/HomePage';
import AppBar from './components/AppBar';

const FavouritePage = lazy(() => import('./pages/FavouritePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const HotPage = lazy(() => import('./pages/HotPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const SitePage = lazy(() => import('./pages/SitePage'));
const Category = lazy(() => import('./pages/CategoryPage'));

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
            <Route path="favourite" element={<FavouritePage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="hot" element={<HotPage />} />
            <Route path="settings" element={<SettingsPage />} />
            {sites.map((site) => {
              const siteName = site.name;
              return <Route path="site/:siteName" element={<SitePage />} key={siteName} />;
            })}
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
