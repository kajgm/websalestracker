import React from 'react';
import { selectPosts, selectSite, selectCategory } from '../../slices/apiSlice';
import { useAppSelector } from '../../hooks';

import SiteItem from './SiteItem';
import SiteInfo from './SiteInfo';

function SiteContent() {
  const posts = useAppSelector(selectPosts);
  const site = useAppSelector(selectSite);
  const category = useAppSelector(selectCategory);

  return (
    <>
      <div className="flex flex-col overflow-auto">
        <SiteInfo name={site} category={category} />
        <div className="bg-gray-dark rounded-lg overflow-auto">
          <div className="flex flex-wrap items-center content-start">
            {posts.map((item) => {
              return <SiteItem title={item.data.title} description={item.data.url} key={item.data.id}></SiteItem>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteContent;
