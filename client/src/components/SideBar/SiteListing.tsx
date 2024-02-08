import React from 'react';
import { requestPostUpdate, updatePosts, updateName, updateCategory } from '../../slices/apiSlice';
import { selectWidth } from '../../slices/sideBarSlice';
import { removeSiteConfig, selectSites } from '../../slices/configSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ApiService from '../../services/api.service';

import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
  const data = useAppSelector(selectSites);

  return (
    <>
      {data.length > 0 && (
        <div className="overflow-auto">
          {data.map((site: siteInfo) => {
            const charScale = curWidth / 15;
            const siteName = site.name.length < charScale ? site.name : site.name.slice(0, charScale) + '...';
            return (
              <div className="flex flex-col gap-2 mx-auto w-4/5 pt-6" key={site.name}>
                <div className="flex flex-row">
                  <h1 className="font-rubik font-bold text-2xl">{siteName}</h1>
                  <button
                    onClick={async () => {
                      dispatch(removeSiteConfig(site.name));
                      window.Main.deletePlugin(site.name);
                    }}
                    className="ml-auto"
                  >
                    <FaTrash />
                  </button>
                </div>
                {site.categories.map((cat: string) => {
                  const catName = cat.length < charScale ? cat : cat.slice(0, charScale) + '...';
                  return (
                    <div className="bg-gray py-2 rounded-full font-rubik font-bold text-center">
                      <Link to="/Site">
                        <button
                          onClick={() => getApiData(site.name, site.endpoint, cat, 'new', site.type)}
                          className="font-rubik font-bold"
                          key={cat}
                        >
                          {catName}
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default SiteListing;
