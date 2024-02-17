import React from 'react';
import { addSite } from '../slices/siteSlice';
import { useAppDispatch } from '../hooks';
import { FaRocket } from 'react-icons/fa';

import { SiteData } from '../../common/types';
import Main from '../layouts/Main';

import data from '../data/defaultApiEndpoints';

function Discover() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Main>
        <div className="flex flex-row p-6 mb-2 bg-gray-dark2 rounded-xl items-center space-x-4">
          <FaRocket size={25} />
          <h1 className="text-4xl font-rubik font-bold">Discover</h1>
        </div>
        <div className="mb-2 bg-gray-dark2 p-6 rounded-xl">
          <h2 className="text-2xl font-rubik font-bold text-gray-light pb-6">Sites</h2>
          <div className="flex flex-row gap-6">
            {data &&
              data.map((site, index) => {
                return (
                  <button
                    onClick={async () => {
                      window.Main.addSite(site);
                      dispatch(addSite(site));
                    }}
                    key={site.name}
                    className="text-2xl font-rubik font-bold p-6 bg-gray2 rounded-xl gap-2"
                  >
                    {site.name}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="mb-2 bg-gray-dark2 p-6 rounded-xl">
          <h2 className="text-2xl font-rubik font-bold text-gray-light pb-6">Items</h2>
        </div>
      </Main>
    </>
  );
}

export default Discover;
