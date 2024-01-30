import React from 'react';

function Cell(props: { title: string; description: string }) {
  const searchTitle = props.title.match('\\[(.*?)\\]');
  const displayTitle = searchTitle ? searchTitle[0].replace(/[\[\]']+/g, '') : null;

  if (!displayTitle) {
    return;
  }

  return (
    <a href={props.description} target="_blank">
      <div className="shadow-lg rounded-full hover:shadow-purple hover:-translate-y-3 ease-in-out duration-300 max-w-40">
        <div className="bg-gradient-to-br from-gray-dark to-gray-dark2 p-5 rounded-lg text-center">
          <h1 className="p-1 text-white text-xl">{displayTitle}</h1>
          <p className="p-1 text-white text-base">test</p>
        </div>
      </div>
    </a>
  );
}

export default Cell;
