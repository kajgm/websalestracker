import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';

import data from '../data/testCellData';
import SideBar from '../components/SideBar';

function Main() {
  return (
    <div className="w-full max-w-screen h-full grid grid-cols-[min-content_auto]">
      <SideBar />
      <div>
        <div className="flex flex-wrap items-center gap-6 m-6 pb-6">
          {data.map((item) => (
            <Cell title={item.title} description={item.description} key={item.description}></Cell>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
