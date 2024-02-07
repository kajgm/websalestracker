import React from 'react';

import Settings from './Settings';
import Status from './Status';

function BottomBar() {
  return (
    <>
      <div className="w-full bg-gray-dark2 bottom-0 rounded-lg mb-2">
        <div className="flex flex-row p-2">
          <Settings />
          <Status />
        </div>
      </div>
    </>
  );
}

export default BottomBar;
