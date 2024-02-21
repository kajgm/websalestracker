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
  const siteId = siteInfo.id;
  const siteIdConcat = siteId.length < charScale ? siteId : siteId.slice(0, charScale) + '...';

  return (
    <>
      <div className="flex flex-col gap-2 mx-auto w-4/5 pt-6" key={siteId}>
        <div className="flex flex-row">
          <h1 className="font-rubik font-bold text-2xl">{siteIdConcat}</h1>
          <button
            onClick={async () => {
              dispatch(removeSite(siteInfo.id));
              {
                window.Main && window.Main.removeSite(siteInfo.id);
              }
            }}
            className="ml-auto"
          >
            <FaTrash />
          </button>
        </div>
        {siteInfo.labels.map((label: string) => {
          return <Category name={label} site={siteId} charScale={charScale} key={label} />;
        })}
      </div>
    </>
  );
}

export default SiteContainer;
