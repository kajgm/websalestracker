import React, { useEffect, useRef, useState } from 'react';
import SiteListing from './SiteListing';

const minWidth = 100; //px
const maxWidth = 300; //px
const defaultWidth = 100; //px

function SideBar() {
  const [width, setWidth] = useState(parseInt(localStorage.getItem('sidebarWidth')!) || defaultWidth);
  const isResized = useRef(false);

  useEffect(() => {
    localStorage.setItem('sidebarWidth', width.toString());
  }, [width]);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      isResized.current = false;
    });
  }, []);

  return (
    <div className="flex relative overflow-y-hidden select-none">
      <aside className="relative flex flex-col gap-2 bg-gray-dark py-6" style={{ width: `${width / 16}rem` }}>
        <SiteListing width={width} />
      </aside>

      {/* Handle */}
      <div
        className="w-2 bg-transparent cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
}

export default SideBar;
