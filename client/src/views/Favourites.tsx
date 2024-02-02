import React from 'react';
import { FaHeart } from "react-icons/fa";

function Favourites(props: {width: number}) {
  return (
    <>
      <div className='flex justify-center bg-gray rounded-lg py-1' style={{ width: `${props.width / (24 * 4)}rem` }}>
        <FaHeart />
      </div>
    </>
  );
}

export default Favourites;
