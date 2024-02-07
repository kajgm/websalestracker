import React from 'react';

import { selectWidth } from '../../slices/sideBarSlice';
import { useAppSelector } from '../../hooks';

import GlobalSearch from './GlobalSearch';
import Favourites from '../../views/Favourites';
import Discover from '../../views/Discover';
import Trending from '../../views/Trending';

function Navigation() {
  const curWidth = useAppSelector(selectWidth);

  return (
    <>
      <div className="mx-auto w-4/5">
        <div className="bg-gray rounded-full">
          <GlobalSearch />
        </div>
        <div className="flex flex-row gap-2 pt-2 bg-gray-dark w-full">
          <button className="flex justify-center bg-gray rounded-full py-1 w-1/3">
            <Favourites />
          </button>
          <button className="flex justify-center bg-gray rounded-full py-1 w-1/3">
            <Discover />
          </button>
          <button className="flex justify-center bg-gray rounded-full py-1 w-1/3">
            <Trending />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
