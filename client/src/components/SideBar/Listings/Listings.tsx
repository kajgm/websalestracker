import React from 'react';

import { selectAllSites } from '../../../slices/sitesSlice';
import { useAppSelector } from '../../../hooks';
import { TSite } from '../../../../common/types';

import SiteContainer from './SiteContainer';

function Listings() {
  const data = useAppSelector(selectAllSites);

  return (
    <>
      <div className="overflow-auto">
        {data.map((siteInfo: TSite) => {
          return <SiteContainer siteInfo={siteInfo} key={siteInfo.id} />;
        })}
      </div>
    </>
  );
}

export default Listings;
