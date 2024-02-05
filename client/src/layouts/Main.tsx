import React from 'react';

import SideBar from '../components/SideBar/SideBar';
import SiteContent from '../components/Site/SiteContent';
import BottomBar from '../components/BottomBar/BottomBar';

function Main(props: { topPad: string }) {
  return (
    <>
      <div className="w-full max-w-screen h-full pl-2 pr-2 pb-10 mt-2">
        <div className={'w-full h-full grid grid-cols-[min-content_auto] pb-2 pt-' + props.topPad}>
          <SideBar />
          <SiteContent />
        </div>

        <div className="w-full bg-gray-dark bottom-0 rounded-lg mb-2">
          <BottomBar />
        </div>
      </div>
    </>
  );
}

export default Main;
