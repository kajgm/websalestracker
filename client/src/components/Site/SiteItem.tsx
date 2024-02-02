import React from 'react';

interface SiteProps {
  title: string;
  description: string;
}

function SiteItem(props: SiteProps) {
  const searchTitle = props.title.match('\\[(.*?)\\]'); //Will need to update this
  const displayTitle = searchTitle ? searchTitle[0].replace(/[\[\]']+/g, '') : null;

  if (!displayTitle) {
    return;
  }

  return (
    <a href={props.description} target="_blank">
      <div className="shadow-lg rounded-full hover:shadow-purple hover:-translate-y-3 ease-in-out duration-300 max-w-40">
        <div className="bg-gradient-to-br from-gray-dark to-gray-dark2 p-5 rounded-lg text-center">
          <h1 className="p-1 text-white text-xl">{displayTitle}</h1>
          <p className="p-1 text-white text-base">desc</p>
        </div>
      </div>
    </a>
  );
}

export default SiteItem;
