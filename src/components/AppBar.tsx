import React, { useState } from 'react';

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

  return (
    <>
      <div className="pl-2 flex justify-between draggable text-zinc-300">
        <div className="inline-flex">
          <p className="text-xs md:pt-1 md:-ml-1 lg:-ml-2">Reddit Sales Tracker</p>
        </div>
        <div className="inline-flex -mt-1">
          <button onClick={window.Main.Minimize} className="undraggable md:px-4 lg:px-3 pt-1 hover:bg-zinc-600">
            &#8211;
          </button>
          <button onClick={handleToggle} className="undraggable px-6 lg:px-5 pt-1 hover:bg-zinc-600">
            {isMaximize ? '\u2752' : '⃞'}
          </button>
          <button onClick={window.Main.Close} className="undraggable px-4 pt-1 hover:bg-red-600 hover:text-white">
            &#10005;
          </button>
        </div>
      </div>
      {/*
      <div className="pl-1 bg-gray-900 text-white undraggable">
        <div className="flex text-center">
          <div className="text-sm w-8  hover:bg-gray-700">Test1</div>
          <div className="text-sm w-8   hover:bg-gray-700">Test2</div>
        </div>
      </div>
      */}
    </>
  );
}

export default AppBar;
