import React from 'react';

import { selectSites } from '../../../slices/configSlice';
import { useAppSelector } from '../../../hooks';

import Site from './Site';

function Listings() {
  const data = useAppSelector(selectSites);

  return (
    <>
      {data.length > 0 && (
        <div className="overflow-auto">
          {data.map((site: siteInfo) => (
            <Site site={site} name={site.name} categories={site.categories} />
          ))}
        </div>
      )}
    </>
  );
}

export default Listings;
