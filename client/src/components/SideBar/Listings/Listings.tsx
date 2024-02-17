import React from 'react';

import { selectSites, selectSiteStatus } from '../../../slices/siteSlice';
import { useAppSelector } from '../../../hooks';
import { SiteData } from '../../../../common/types';

import Site from './Site';

function Listings() {
  const data = useAppSelector(selectSites);
  const status = useAppSelector(selectSiteStatus);

  let content;

  if (status == 'pending') {
    content = <div className="text-center my-5 font-rubik">Loading...</div>;
  } else if (status == 'succeeded') {
    content = data.length > 0 && (
      <div className="overflow-auto">
        {data.map((siteInfo: SiteData, index: number) => {
          return <Site id={index} siteInfo={siteInfo} key={siteInfo.name} />;
        })}
      </div>
    );
  } else if (status == 'failed') {
    <div className="text-center my-5 font-rubik">Sites not found</div>;
  }

  return <>{content}</>;
}

export default Listings;
