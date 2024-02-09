import React from 'react';

import SideBar from '../components/SideBar/SideBar';
import BottomBar from '../components/BottomBar/BottomBar';

function Main(props: any) {
  const appBarPadding = window.Main ? '6' : '0';

  return (
    <>
      <div className="w-full h-full pl-2 pr-2 pb-10 mt-2">
        <div className={'w-full h-full grid grid-cols-[min-content_auto] pb-2 pt-' + appBarPadding}>
          <SideBar />
          <div className="h-full overflow-auto">{props.children}</div>
        </div>
        <BottomBar />
      </div>
    </>
  );
}

export default Main;
