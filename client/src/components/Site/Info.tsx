import React from 'react';
import { TSite } from '../../../common/types';
import { FaSpinner } from 'react-icons/fa';
import { fetchSiteItems } from '../../slices/itemsSlice';
import { useAppDispatch } from '../../hooks';

function SiteInfo(props: { site: TSite; label?: string }) {
  const dispatch = useAppDispatch();
  const { site, label } = props;
  const infoTitle = label ? site.id + ': ' + label : site.id;

  return (
    <>
      <div className="flex flex-row p-6 mb-2 bg-gray-dark2 rounded-xl">
        <h1 className="text-4xl font-rubik font-bold">{infoTitle}</h1>
        <button
          onClick={async () => dispatch(fetchSiteItems(site))}
          className="bg-gray-dark2 rounded-lg text-xl font-rubik font-bold ml-auto"
        >
          <FaSpinner />
        </button>
      </div>
    </>
  );
}

export default SiteInfo;
