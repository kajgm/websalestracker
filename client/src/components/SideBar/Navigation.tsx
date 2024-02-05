import React from 'react';

import { selectWidth } from '../../slices/sideBarSlice';
import { useAppSelector } from '../../hooks';

import GlobalSearch from './GlobalSearch';
import Favourites from '../../views/Favourites';
import Discover from '../../views/Discover';
import Trending from '../../views/Trending';

function Navigation() {
  const curWidth = useAppSelector(selectWidth);
  const calcWidth = curWidth / (28 * 4);

  return (
    <>
      <div className="bg-gray rounded-full mx-auto px-2 w-4/5">
        <GlobalSearch />
      </div>
      <div className="relative flex flex-row gap-1 mx-auto bg-gray-dark justify-center w-4/5">
        <button className="bg-gray rounded-full mx-auto px-2 w-1/3">
          <Favourites />
        </button>
        <button className="bg-gray rounded-full mx-auto px-2 w-1/3">
          <Discover />
        </button>
        <button className="bg-gray rounded-full mx-auto px-2 w-1/3">
          <Trending />
        </button>
      </div>
    </>
  );
}

export default Navigation;
