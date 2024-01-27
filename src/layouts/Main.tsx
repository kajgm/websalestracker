import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';

import data from '../data/testCellData';
import SideBar from '../components/SideBar';

function Main() {
  const [sidebarWidth, setWidth] = useState('');

  return (
    <>
      <SideBar sendSideBarWidth={setWidth} />
      <div className={'flex flex-wrap items-center gap-6 ' + sidebarWidth}>
        {data.map((item) => (
          <Cell title={item.title} description={item.description} key={item.title}></Cell>
        ))}
      </div>
    </>
  );
}

export default Main;
