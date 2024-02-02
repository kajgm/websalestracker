import React from 'react';

import SideBar from '../components/SideBar/SideBar';
import SiteContent from '../components/Site/SiteContent';

function Main() {
  return (
    <div className="w-full max-w-screen h-full grid grid-cols-[min-content_auto]">
      <SideBar />
      <SiteContent />
    </div>
  );
}

export default Main;
