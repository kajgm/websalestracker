import React from 'react';

import { selectPosts, selectSite, selectCategory } from '../slices/apiSlice';
import { useAppSelector } from '../hooks';

import Main from '../layouts/Main';
import Item from '../components/Site/Item';
import Info from '../components/Site/Info';

function Site() {
  const posts = useAppSelector(selectPosts);
  const site = useAppSelector(selectSite);
  const category = useAppSelector(selectCategory);

  return (
    <>
      <Main>
        <div className="flex flex-col h-full overflow-auto">
          <Info name={site} category={category} />
          <div className="bg-gray-dark2 rounded-lg overflow-auto">
            <div className="flex flex-wrap items-center content-start">
              {posts.map((item) => {
                return <Item title={item.data.title} description={item.data.url} key={item.data.id}></Item>;
              })}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Site;
