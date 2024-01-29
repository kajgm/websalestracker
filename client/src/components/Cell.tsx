import React from 'react';

function Cell(props: { title: string; description: string }) {
  return (
    <div className="shadow-lg rounded-full hover:shadow-purple hover:-translate-y-3 ease-in-out duration-300">
      <div className="bg-gradient-to-br from-gray-dark to-gray-dark2 p-5 rounded-lg text-center">
        <h1 className="p-1 text-white text-3xl">{props.title}</h1>
        <p className="p-1 text-white text-base">{props.description}</p>
      </div>
    </div>
  );
}

export default Cell;
