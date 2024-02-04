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
      <div className="bg-gray rounded-lg mx-auto px-2 flex flex-row">
        <GlobalSearch />
      </div>
      <div className="relative flex flex-row gap-2 mx-auto bg-gray-dark justify-center">
        <button className="bg-gray rounded-lg mx-auto px-2">
          <Favourites width={calcWidth} />
        </button>

        <button className="bg-gray rounded-lg mx-auto px-2">
          <Discover width={calcWidth} />
        </button>
        <button className="bg-gray rounded-lg mx-auto px-2">
          <Trending width={calcWidth} />
        </button>
      </div>
    </>
  );
}

export default Navigation;
