import React from 'react';
import { selectUpdateStatus, selectPosts } from '../../slices/apiSlice';
import { requestPostUpdate, updatePosts } from '../../slices/apiSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import ApiService from '../../services/api.service';
import SiteItem from './SiteItem';

import data from '../../data/publicApiEndpoints';

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

  return (
    <div className="flex flex-wrap items-center content-start gap-6 m-6">
      {posts.map((item) => {
        return <SiteItem title={item.data.title} description={item.data.url} key={item.data.id}></SiteItem>;
      })}
    </div>
  );
}

export default SiteContent;
