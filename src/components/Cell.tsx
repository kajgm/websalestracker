import React from 'react';

function Cell(props: { title: string; description: string }) {
  return (
    <div className="shadow-lg shadow-purple hover:-translate-y-6 ease-in-out duration-300">
      <div className="bg-gray-dark2 p-10 rounded text-center">
        <h1 className="p-1 text-white text-3xl">{props.title}</h1>
        <p className="p-1 text-white text-base">{props.description}</p>
      </div>
    </div>
  );
}

export default Cell;
