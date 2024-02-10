import React from 'react';
import { Link } from 'react-router-dom';

import ApiService from '../../../services/api.service';
import { requestPostUpdate, updatePosts, updateName, updateCategory } from '../../../slices/apiSlice';
import { useAppDispatch } from '../../../hooks';

function Category(props: { site: siteInfo; category: string; charScale: number }) {
  const dispatch = useAppDispatch();

  const getApiData = (name: string, endpoint: string, category: string, sorting: string, type: string) => {
    dispatch(requestPostUpdate());
    ApiService.getReddit(endpoint, category, sorting, type).then((response) => {
      dispatch(updatePosts(response.data.data.children));
    });
    dispatch(updateName(name));
    dispatch(updateCategory(category));
  };

  const catName =
    props.category.length < props.charScale ? props.category : props.category.slice(0, props.charScale) + '...';

  return (
    <>
      <div className="bg-gray py-2 rounded-full font-rubik font-bold text-center" key={props.category}>
        <Link to="/Site">
          <button
            onClick={() => getApiData(props.site.name, props.site.endpoint, props.category, 'new', props.site.type)}
            className="font-rubik font-bold"
          >
            {catName}
          </button>
        </Link>
      </div>
    </>
  );
}

export default Category;
