import React from 'react';
import { requestPostUpdate, updatePosts, updateName, updateCategory } from '../../slices/apiSlice';
import { selectWidth } from '../../slices/sideBarSlice';
import { selectSites } from '../../slices/configSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ApiService from '../../services/api.service';

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
          {data.map((site: any) => {
            const charScale = curWidth / 15;
            const siteName = site.name.length < charScale ? site.name : site.name.slice(0, charScale) + '...';
            return (
              <div className="flex flex-col gap-2 mx-auto w-4/5" key={site}>
                <h1 className="font-rubik font-bold text-2xl pt-6">{siteName}</h1>
                {site.categories.map((cat: string) => {
                  const catName = cat.length < charScale ? cat : cat.slice(0, charScale) + '...';
                  return (
                    <button
                      onClick={() => getApiData(site.name, site.endpoint, cat, 'new', site.type)}
                      className="bg-gray py-2 rounded-full font-rubik font-bold"
                      key={cat}
                    >
                      {catName}
                    </button>
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
