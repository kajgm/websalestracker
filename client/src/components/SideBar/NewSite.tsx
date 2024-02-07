import React from 'react';

import { addSiteConfig } from '../../slices/configSlice';
import { useAppDispatch } from '../../hooks';

import data from '../../data/defaultApiEndpoints';

interface siteInfo {
  name: string;
  endpoint: string;
  categories: Array<string>;
  type: string;
}

function NewSite() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="mx-auto w-4/5">
        <div className="bg-gray rounded-full">
          <button
            className="w-full text-center py-1 font-rubik font-bold"
            onClick={async () => {
              window.Main.setPlugin({ id: data[0].name, info: data[0] });
              const localConfig = (await window.Main.getDefaultPlugin('reddit')) as siteInfo;
              console.log(localConfig);
              dispatch(addSiteConfig(localConfig));
            }}
          >
            Add Site +
          </button>
        </div>
      </div>
    </>
  );
}

export default NewSite;
