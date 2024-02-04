import React from 'react';
import { FaRocket } from 'react-icons/fa';

function Discover(props: { width: number }) {
  return (
    <>
      <div className="flex justify-center bg-gray rounded-lg py-1" style={{ width: `${props.width}rem` }}>
        <FaRocket />
      </div>
    </>
  );
}

export default Discover;
