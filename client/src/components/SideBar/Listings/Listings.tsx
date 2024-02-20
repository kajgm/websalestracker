import React from 'react';

import { selectSites } from '../../../slices/sitesSlice';
import { useAppSelector } from '../../../hooks';
import { TSite } from '../../../../common/types';

import SiteContainer from './SiteContainer';

function Listings() {
  const data = useAppSelector(selectSites);

  return (
    <>
      <div className="overflow-auto">
        {data.map((siteInfo: TSite) => {
          return <SiteContainer siteInfo={siteInfo} key={siteInfo.name} />;
        })}
      </div>
    </>
  );
}

export default Listings;
