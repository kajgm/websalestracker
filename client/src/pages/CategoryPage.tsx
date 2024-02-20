import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';
import { selectItems } from '../slices/itemsSlice';

function SitePage() {
  const { categoryName } = useParams();
  const items = useAppSelector(selectItems).filter((item) => item.categoryName === categoryName);

  return (
    <>
      {categoryName ? (
        <Main>
          <div className="flex flex-col h-full overflow-auto">
            <Info siteName={categoryName} />
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
