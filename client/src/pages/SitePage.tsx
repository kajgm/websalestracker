import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { selectSiteById } from '../slices/sitesSlice';
import { selectItemsByLabel, selectItemsBySiteId } from '../slices/itemsSlice';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/SiteInfo';

function SitePage() {
  const { siteId } = useParams();
  const { state } = useLocation();

  const label = state.label;
  const site = useAppSelector((state) => selectSiteById(state, siteId || ''));

  let titleCard;
  let items;
  if (label) {
    items = useAppSelector((state) => selectItemsByLabel(state, label));
    titleCard = <Info site={site} label={label} />;
  } else {
    items = useAppSelector((state) => selectItemsBySiteId(state, site.id));
    titleCard = <Info site={site} />;
  }

  return (
    <>
      <Main>
        <div className="flex flex-col h-full w-full overflow-auto">
          {titleCard}
          <div className="bg-gray-dark2 rounded-lg overflow-auto">
            <div className="flex flex-wrap items-center content-start">
              {items
                ? items.map((e) => {
                    return <Item {...e} key={e.id}></Item>;
                  })
                : null}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default SitePage;
