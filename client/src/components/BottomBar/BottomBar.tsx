import React from 'react';

import Settings from './Settings';
import Status from './Status';

function BottomBar() {
  return (
    <>
      <div className="flex flex-row p-2">
        <Settings />
        <Status />
      </div>
    </>
  );
}

export default BottomBar;
