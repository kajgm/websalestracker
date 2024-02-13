import React from 'react';
import { FaTrash } from 'react-icons/fa';

import ApiService from '../../../services/api.service';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectWidth } from '../../../slices/sideBarSlice';
import { removeSiteConfig } from '../../../slices/configSlice';
import { requestPostUpdate, updatePosts, updateName, updateCategory } from '../../../slices/apiSlice';
import { SiteData } from '../../../../common/types';

import Category from './Category';

function Site(props: { id: number; siteInfo: SiteData }) {
  const dispatch = useAppDispatch();

  const curWidth = useAppSelector(selectWidth);
  const charScale = curWidth / 15;
  const siteName = props.siteInfo.name;
  const siteNameConcat = siteName.length < charScale ? siteName : siteName.slice(0, charScale) + '...';

  const getCategory = (categoryName: string, sorting: string) => {
    dispatch(requestPostUpdate());
    ApiService.getReddit(props.siteInfo.endpoint, categoryName, sorting, props.siteInfo.type).then((response) => {
      dispatch(updatePosts(response.data.data.children));
    });
    dispatch(updateName(props.siteInfo.name));
    dispatch(updateCategory(categoryName));
  };

  return (
    <>
      <div className="flex flex-col gap-2 mx-auto w-4/5 pt-6" key={props.siteInfo.name}>
        <div className="flex flex-row">
          <h1 className="font-rubik font-bold text-2xl">{siteNameConcat}</h1>
          <button
            onClick={async () => {
              dispatch(removeSiteConfig(props.id));
              window.Main.deletePlugin(props.siteInfo.name);
            }}
            className="ml-auto"
          >
            <FaTrash />
          </button>
        </div>
        {props.siteInfo.categories.map((category: string) => {
          return <Category getCategory={getCategory} category={category} charScale={charScale} key={category} />;
        })}
      </div>
    </>
  );
}

export default Site;
