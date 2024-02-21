import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { selectItemsByCategoryId } from '../slices/itemsSlice';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';

function SitePage() {
  const { categoryId } = useParams();

  const items = useAppSelector((state) => selectItemsByCategoryId(state, categoryId));

  return (
    <>
      <Main>
        <div className="flex flex-col h-full overflow-auto">
          <Info siteId={categoryId || ''} />
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
