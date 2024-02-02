import React from 'react';
import { requestPostUpdate, updatePosts } from '../../slices/apiSlice';
import { useAppDispatch } from '../../hooks';
import ApiService from '../../services/api.service';

import data from '../../data/publicApiEndpoints';

function SiteListing(props: any) {
  const dispatch = useAppDispatch();

  const getApiData = (endpoint: string, extension: string, sorting: string, type: string) => {
    dispatch(requestPostUpdate());
    ApiService.getReddit(endpoint, extension, sorting, type).then((response) => {
      dispatch(updatePosts(response.data.data.children));
    });
  };

  return data.map((endpoint: any) => (
    <button
      className="bg-gray gap-6 py-2 rounded-lg mx-auto"
      onClick={() => getApiData(endpoint.endpoint, endpoint.extensions[0], 'new', endpoint.type)}
      style={{ width: `${props.width / 20}rem` }}
    >
      {endpoint.name}
    </button>
  ));
}

export default SiteListing;
