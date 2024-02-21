import React from 'react';

function SiteInfo(props: { siteId: string; label?: string }) {
  const { siteId, label } = props;

  const infoTitle = label ? siteId + ': ' + label : siteId;

  return (
    <div className="flex flex-wrap p-6 mb-2 bg-gray-dark2 rounded-xl">
      <h1 className="text-4xl font-rubik font-bold">{infoTitle}</h1>
    </div>
  );
}

export default SiteInfo;
