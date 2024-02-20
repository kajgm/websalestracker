import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectWidth } from '../../../slices/sideBarSlice';
import { removeSite } from '../../../slices/sitesSlice';
import { TSite } from '../../../../common/types';

import Category from './Category';

function SiteContainer(props: { siteInfo: TSite }) {
  const dispatch = useAppDispatch();

  const { siteInfo } = props;

  const curWidth = useAppSelector(selectWidth);
  const charScale = curWidth / 15;
  const siteName = siteInfo.name;
  const siteNameConcat = siteName.length < charScale ? siteName : siteName.slice(0, charScale) + '...';

  return (
    <>
      <div className="flex flex-col gap-2 mx-auto w-4/5 pt-6" key={siteName}>
        <div className="flex flex-row">
          <h1 className="font-rubik font-bold text-2xl">{siteNameConcat}</h1>
          <button
            onClick={async () => {
              dispatch(removeSite(siteInfo.name));
              {
                window.Main && window.Main.removeSite(siteInfo.name);
              }
            }}
            className="ml-auto"
          >
            <FaTrash />
          </button>
        </div>
        {siteInfo.labels.map((label: string) => {
          return <Category name={label} site={siteName} charScale={charScale} key={label} />;
        })}
      </div>
    </>
  );
}

export default SiteContainer;
