import React, { useEffect, useRef, useState } from 'react';
import { setIconState, setWidth } from '../../slices/sideBarSlice';
import { useAppDispatch } from '../../hooks';

import SiteListing from './SiteListing';
import Navigation from './Navigation';

const minWidth = 150; //px
const maxWidth = 300; //px
const defaultWidth = 150; //px //TODO: move to global variable
const iconWidth = 150; //TODO: move to global variable

function SideBar() {
  const dispatch = useAppDispatch();
  const [width, updateWidth] = useState(parseInt(localStorage.getItem('sidebarWidth')!) || defaultWidth);
  const isResized = useRef(false);

  useEffect(() => {
    localStorage.setItem('sidebarWidth', width.toString());
  }, [width]);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
      }

      updateWidth((previousWidth) => {
        const curWidth = previousWidth + e.movementX / 2;
        const isWidthInRange = curWidth >= minWidth && curWidth <= maxWidth;
        const newWidth = isWidthInRange ? curWidth : previousWidth;
        return newWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      isResized.current = false;
    });

    dispatch(setWidth(width));
    dispatch(setIconState(width == iconWidth));

  }, [width]);

  return (
    <>
    <div className="flex relative overflow-y-hidden select-none">
      <aside className="flex flex-col gap-2 bg-gray-dark py-6" style={{ width: `${width / 16}rem` }}>
        <Navigation />
        <SiteListing/>
      </aside>

      {/* Handle */}
      <div
        className="w-2 bg-transparent cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
    </>
  );
}

export default SideBar;
