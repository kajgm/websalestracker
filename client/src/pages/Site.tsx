import React from 'react';

import { selectItems, selectSite, selectCategory } from '../slices/apiSlice';
import { useAppSelector } from '../hooks';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';

function Site() {
  const items = useAppSelector(selectItems);
  const site = useAppSelector(selectSite);
  const category = useAppSelector(selectCategory);

  return (
    <>
      <Main>
        <div className="flex flex-col h-full overflow-auto">
          <Info name={site.name} category={category} />
          <div className="bg-gray-dark2 rounded-lg overflow-auto">
            <div className="flex flex-wrap items-center content-start">
              {items.map((e) => {
                return <Item title={e.title} url={e.url} description={e.description} id={e.id} key={e.id}></Item>;
              })}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Site;
