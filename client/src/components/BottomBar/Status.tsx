import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

function Status() {
  const updated = 'succeeded'; // TODO

  return (
    <>
      <div className="flex flex-row ml-auto">
        <IconContext.Provider
          value={{ color: updated == 'succeeded' ? 'green' : 'red', className: 'global-class-name' }}
        >
          <div className="inline-flex items-baseline">
            <FaCircle />
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default Status;
