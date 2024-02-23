import React from 'react';
import { addSite } from '../slices/sitesSlice';
import { useAppDispatch } from '../hooks';
import { FaRocket } from 'react-icons/fa';

import Main from '../layouts/Main';
import { defaultSites, defaultCategories } from '../data/defaultTrackers';
import { TCategory, TSite } from '../../common/types';
import { addCategory } from '../slices/categoriesSlice';

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
                      }
                      dispatch(addSite(site));
                    }}
                    key={site.id}
                    className="text-2xl font-rubik font-bold p-6 bg-gray2 rounded-xl gap-2"
                  >
                    {site.id}
                  </button>
                );
              })}
          </div>
        </div>

        <div className="mb-2 bg-gray-dark2 p-6 rounded-xl">
          <h2 className="text-2xl font-rubik font-bold text-gray-light pb-6">Categories</h2>
          <div className="flex flex-row gap-6">
            {defaultCategories &&
              defaultCategories.map((category: TCategory) => {
                return (
                  <button
                    onClick={async () => {
                      {
                        window.Main && window.Main.addCategory(category);
                      }
                      dispatch(addCategory(category));
                    }}
                    key={category.id}
                    className="text-2xl font-rubik font-bold p-6 bg-gray2 rounded-xl gap-2"
                  >
                    {category.id}
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
