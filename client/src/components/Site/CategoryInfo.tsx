import React from 'react';
import { TCategory } from '../../../common/types';

function CategoryInfo(props: { category: TCategory; label?: string }) {
  const { category, label } = props;
  const infoTitle = label ? category.id + ': ' + label : category.id;

  return (
    <>
      <div className="flex flex-row p-6 mb-2 bg-gray-dark2 rounded-xl">
        <h1 className="text-4xl font-rubik font-bold">{infoTitle}</h1>
      </div>
    </>
  );
}

export default CategoryInfo;
