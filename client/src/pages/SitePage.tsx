import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { selectSiteById } from '../slices/sitesSlice';
import { selectItemsBySiteId } from '../slices/itemsSlice';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';

function SitePage() {
  const { siteId } = useParams();
  const { state } = useLocation();

  const site = useAppSelector((state) => selectSiteById(state, siteId || ''));
  const items = useAppSelector((state) => selectItemsBySiteId(state, site.id));

  return (
    <>
      <Main>
        <div className="flex flex-col h-full overflow-auto">
          {state.label ? <Info siteId={site.id} label={state.label} /> : <Info siteId={site.id} />}
          <div className="bg-gray-dark2 rounded-lg overflow-auto">
            <div className="flex flex-wrap items-center content-start">
              {items
                ? items.map((e) => {
                    return <Item {...e}></Item>;
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
