import React from 'react';
import { requestPostUpdate, updatePosts, updateName, updateCategory } from '../../slices/apiSlice';
import { selectWidth } from '../../slices/sideBarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ApiService from '../../services/api.service';

import data from '../../data/publicApiEndpoints';

function SiteListing() {
  const dispatch = useAppDispatch();

  const getApiData = (name: string, endpoint: string, category: string, sorting: string, type: string) => {
    dispatch(requestPostUpdate());
    ApiService.getReddit(endpoint, category, sorting, type).then((response) => {
      dispatch(updatePosts(response.data.data.children));
    });
    dispatch(updateName(name));
    dispatch(updateCategory(category));
  };

  const curWidth = useAppSelector(selectWidth);

  return (
    <>
    <div className='overflow-auto'>
    {data.map((site: any) => (
      <div className='flex flex-col gap-2 mx-auto' style={{ width: `${curWidth / 20}rem` }}>
        <h1
          className="font-pmarker text-2xl pt-6 mx-auto"
          key={site}
        >
          {site.name}
        </h1>
        {site.categories.map((cat: string) => (
          <button
          onClick={() => getApiData(site.name, site.endpoint, cat, 'new', site.type)}
          className="bg-gray py-2 rounded-lg">
            {cat}
          </button>
        ))}
      </div>
  ))}
  </div>
  </>);
}

export default SiteListing;
