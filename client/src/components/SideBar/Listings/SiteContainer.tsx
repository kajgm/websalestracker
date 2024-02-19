import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectWidth } from '../../../slices/sideBarSlice';
import { removeSite } from '../../../slices/siteSlice';
import { SiteData } from '../../../../common/types';

import Category from './Category';

function SiteContainer(props: { id: number; siteInfo: SiteData }) {
  const dispatch = useAppDispatch();

  const curWidth = useAppSelector(selectWidth);
  const charScale = curWidth / 15;
  const siteName = props.siteInfo.name;
  const siteNameConcat = siteName.length < charScale ? siteName : siteName.slice(0, charScale) + '...';

  return (
    <>
      <div className="flex flex-col gap-2 mx-auto w-4/5 pt-6" key={props.siteInfo.name}>
        <div className="flex flex-row">
          <h1 className="font-rubik font-bold text-2xl">{siteNameConcat}</h1>
          <button
            onClick={async () => {
              dispatch(removeSite(props.siteInfo));
              {
                window.Main && window.Main.removeSite(props.id);
              }
            }}
            className="ml-auto"
          >
            <FaTrash />
          </button>
        </div>
        {props.siteInfo.categories.map((name: string) => {
          return <Category name={name} site={props.siteInfo.name} charScale={charScale} key={name} />;
        })}
      </div>
    </>
  );
}

export default SiteContainer;
