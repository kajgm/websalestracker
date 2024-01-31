import React from 'react';
import { useAppSelector } from '../hooks';
import { selectUpdateStatus, selectPosts } from '../slices/apiSlice';
import { requestPostUpdate, updatePosts } from '../slices/apiSlice';
import { useAppDispatch } from '../hooks';
import ApiService from '../services/api.service';

import Cell from '../components/Cell';
import SideBar from '../components/SideBar';

import data from '../data/publicApiEndpoints';

function Main() {
  const dispatch = useAppDispatch();

  const getApiData = () => {
    data.map((endpoint) => {
      dispatch(requestPostUpdate());
      ApiService.getReddit(endpoint.endpoint, endpoint.extensions[0], 'new', endpoint.type).then((response) => {
        dispatch(updatePosts(response.data.data.children));
      });
    });
  };

  const updated = useAppSelector(selectUpdateStatus);
  if (!updated) {
    getApiData();
  }
  const posts = useAppSelector(selectPosts);

  return (
    <div className="w-full max-w-screen h-full grid grid-cols-[min-content_auto]">
      <SideBar />
      <div>
        <div className="flex flex-wrap items-center gap-6 m-6 pb-6">
          {posts.map((item) => {
            return <Cell title={item.data.title} description={item.data.url} key={item.data.title}></Cell>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
