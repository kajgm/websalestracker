import React from 'react';

function SiteInfo(props: { name: string; category: string }) {
  const infoTitle = props.name && props.category ? props.name + ': ' + props.category : '';

  return (
    <div className="flex flex-wrap p-6 mb-2 bg-gray-dark rounded-xl">
      <h1 className="text-4xl font-rubik font-bold">{infoTitle}</h1>
    </div>
  );
}

export default SiteInfo;
