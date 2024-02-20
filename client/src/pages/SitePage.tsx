import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { selectItems } from '../slices/itemsSlice';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';

function SitePage() {
  const { siteName } = useParams();
  const { state } = useLocation();

  const items = useAppSelector(selectItems).filter((item) => item.siteName === siteName);

  return (
    <>
      {siteName ? (
        <Main>
          <div className="flex flex-col h-full overflow-auto">
            {state.label ? <Info siteName={siteName} label={state.label} /> : <Info siteName={siteName} />}
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
      ) : null}
    </>
  );
}

export default SitePage;
