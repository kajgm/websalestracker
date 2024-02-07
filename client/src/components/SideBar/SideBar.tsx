import React, { useEffect, useRef, useState } from 'react';
import { setIconState, setWidth } from '../../slices/sideBarSlice';
import { useAppDispatch } from '../../hooks';

import SiteListing from './SiteListing';
import Navigation from './Navigation';
import NewSite from './NewSite';

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
      <div className="relative flex overflow-y-hidden select-none">
        <div
          className="relative flex flex-col gap-2 py-6 bg-gray-dark rounded-lg"
          style={{ width: `${width / 16}rem` }}
        >
          <Navigation />
          <NewSite />
          <SiteListing />
        </div>

        {/* Handle */}
        <div
          className="w-1 mr-1 bg-transparent cursor-col-resize hover:bg-gray"
          onMouseDown={() => {
            isResized.current = true;
          }}
        />
      </div>
    </>
  );
}

export default SideBar;
