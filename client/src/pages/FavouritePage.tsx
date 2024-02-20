import React from 'react';
import Main from '../layouts/Main';
import { FaHeart } from 'react-icons/fa';

function FavouritePage() {
  return (
    <>
      <Main>
        <div className="flex flex-row p-6 mb-2 bg-gray-dark2 rounded-xl items-center space-x-4">
          <FaHeart size={25} />
          <h1 className="text-4xl font-rubik font-bold">Favourites</h1>
        </div>
      </Main>
    </>
  );
}

export default FavouritePage;
