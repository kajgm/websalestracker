import React, { useState } from 'react';
import icon from '../../public/assets/icon.png';

function AppBar() {
  const [isMaximize, setMaximize] = useState(false);

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false);
    } else {
      setMaximize(true);
    }
    window.Main.Maximize();
  };

  // For some reason these are required otherwise this error is thrown:
  // Error: An object could not be cloned.
  const handleMinimze = () => {
    window.Main.Minimize();
  };

  const handleClose = () => {
    window.Main.Close();
  };

  return (
    <>
      <div className="flex justify-between draggable text-white">
        <div className="inline-flex">
          <img src={icon} className="w-6 h-auto mt-1 ml-1"></img>
          {/* <p className="text-xs mt-1 ml-2">RST</p> */}
        </div>
        <div className="inline-flex">
          <button onClick={handleMinimze} className="undraggable px-4 pt-1 hover:bg-gray-light2">
            &#8211;
          </button>
          <button onClick={handleToggle} className="undraggable px-6 pt-1 hover:bg-gray-light2">
            {isMaximize ? '\u2752' : '⃞'}
          </button>
          <button onClick={handleClose} className="undraggable px-4 pt-1 hover:bg-red hover:text-white">
            &#10005;
          </button>
        </div>
      </div>
    </>
  );
}

export default AppBar;
