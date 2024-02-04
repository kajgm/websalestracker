import React from 'react';
import { selectUpdateStatus, selectPosts, selectSite, selectCategory } from '../../slices/apiSlice';
import { requestPostUpdate, updatePosts } from '../../slices/apiSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import ApiService from '../../services/api.service';
import SiteItem from './SiteItem';

import data from '../../data/publicApiEndpoints';
import SiteInfo from './SiteInfo';

function SiteContent() {
  const dispatch = useAppDispatch();

  const getApiData = () => {
    data.map((endpoint) => {
      dispatch(requestPostUpdate());
      ApiService.getReddit(endpoint.endpoint, endpoint.categories[0], 'new', endpoint.type).then((response) => {
        dispatch(updatePosts(response.data.data.children));
      });
    });
  };

  const updated = useAppSelector(selectUpdateStatus);
  // if (!updated) {
  //   getApiData();
  // }
  const posts = useAppSelector(selectPosts);
  const site = useAppSelector(selectSite);
  const category = useAppSelector(selectCategory);

  return (
    <>
      <div className="flex flex-col overflow-auto">
        <div>
          <SiteInfo name={site} category={category} />
        </div>
        <div className="bg-gray-dark rounded-lg h-full mr-2">
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
