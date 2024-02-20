import React from 'react';
import { addSite } from '../slices/sitesSlice';
import { useAppDispatch } from '../hooks';
import { FaRocket } from 'react-icons/fa';

import Main from '../layouts/Main';
import { defaultSites, defaultCategories } from '../data/defaultTrackers';
import { TSite } from '../../common/types';

function DiscoverPage() {
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
            {defaultSites &&
              defaultSites.map((site: TSite) => {
                return (
                  <button
                    onClick={async () => {
                      {
                        window.Main && window.Main.addSite(site);
                        //window.Main && window.Main.addCategories(site, defaultCategories);
                      }
                      dispatch(addSite(site));
                      //dispatch(addCategories(site, defaultCategories))
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

export default DiscoverPage;
