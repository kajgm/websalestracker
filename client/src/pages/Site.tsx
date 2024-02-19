import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { selectItems } from '../slices/itemSlice';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';

function Site() {
  const { siteName } = useParams();
  const items = useAppSelector(selectItems).filter((item) => item.site === siteName);
  return (
    <>
      {siteName ? (
        <Main>
          <div className="flex flex-col h-full overflow-auto">
            <Info name={siteName} />
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

export default Site;
