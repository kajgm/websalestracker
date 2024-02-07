import React from 'react';
import { addSiteConfig } from '../slices/configSlice';
import { useAppDispatch } from '../hooks';

import Main from '../layouts/Main';

import data from '../data/defaultApiEndpoints';

interface siteInfo {
  name: string;
  endpoint: string;
  categories: Array<string>;
  type: string;
}

function Discover() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Main>
        <div className="p-6 mb-2 bg-gray-dark2 rounded-xl">
          <h1 className="text-4xl font-rubik font-bold">Discover</h1>
        </div>
        <div className="flex flex-row gap-6 p-6 mb-2 bg-gray-dark2 rounded-xl">
          {data &&
            data.map((site) => {
              return (
                <button
                  onClick={async () => {
                    window.Main.setPlugin({ id: site.name, info: site });
                    const localConfig = (await window.Main.getDefaultPlugin(site.name)) as siteInfo;
                    dispatch(addSiteConfig(localConfig));
                  }}
                  key={site.name}
                  className="text-4xl font-rubik font-bold p-6 bg-gray2 rounded-xl gap-2"
                >
                  {site.name[0]}
                </button>
              );
            })}
        </div>
      </Main>
    </>
  );
}

export default Discover;
