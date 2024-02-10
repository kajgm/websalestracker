import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectWidth } from '../../../slices/sideBarSlice';
import { removeSiteConfig } from '../../../slices/configSlice';

import Category from './Category';

function Site(props: { site: siteInfo; name: string; categories: string[] }) {
  const dispatch = useAppDispatch();

  const curWidth = useAppSelector(selectWidth);

  const charScale = curWidth / 15;
  const siteName = props.name.length < charScale ? props.name : props.name.slice(0, charScale) + '...';
  return (
    <>
      <div className="flex flex-col gap-2 mx-auto w-4/5 pt-6" key={props.name}>
        <div className="flex flex-row">
          <h1 className="font-rubik font-bold text-2xl">{siteName}</h1>
          <button
            onClick={async () => {
              dispatch(removeSiteConfig(props.name));
              window.Main.deletePlugin(props.name);
            }}
            className="ml-auto"
          >
            <FaTrash />
          </button>
        </div>
        {props.categories.map((cat: string) => {
          return <Category site={props.site} category={cat} charScale={charScale} />;
        })}
      </div>
    </>
  );
}

export default Site;
