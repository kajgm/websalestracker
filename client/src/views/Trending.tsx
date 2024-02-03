import React from 'react';
import { FaFire } from "react-icons/fa";

function Trending(props: {width: number}) {
  return (
    <>
      <div className='flex justify-center bg-gray rounded-lg py-1' style={{ width: `${props.width}rem` }}>
        <FaFire />
      </div>
    </>
  );
}

export default Trending;
