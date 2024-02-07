import React from 'react';
import { Link } from 'react-router-dom';

import GlobalSearch from './GlobalSearch';

import { FaHeart } from 'react-icons/fa';
import { FaRocket } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';

function Navigation() {
  return (
    <>
      <div className="mx-auto w-4/5">
        <div className="bg-gray rounded-full">
          <GlobalSearch />
        </div>
        <div className="flex flex-row gap-2 pt-2 bg-gray-dark w-full">
          <Link to="/Favourite" className="flex justify-center bg-gray rounded-full py-1 w-1/3">
            <button>
              <FaHeart />
            </button>
          </Link>
          <Link to="/Discover" className="flex justify-center bg-gray rounded-full py-1 w-1/3">
            <button>
              <FaRocket />
            </button>
          </Link>
          <Link to="/Hot" className="flex justify-center bg-gray rounded-full py-1 w-1/3">
            <button>
              <FaFire />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navigation;
