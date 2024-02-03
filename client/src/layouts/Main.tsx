import React from 'react';

import SideBar from '../components/SideBar/SideBar';
import SiteContent from '../components/Site/SiteContent';
import BottomBar from '../components/BottomBar/BottomBar';

function Main(props: { topPad: string }) {
  return (
    <>
      <div className={'w-full max-w-screen h-full grid grid-cols-[min-content_auto] pt-' + props.topPad}>
        <SideBar />
        <SiteContent />
      </div>
      <div className="z-50 w-screen bg-gray-dark bottom-0 fixed">
        <BottomBar />
      </div>
    </>
  );
}

export default Main;
