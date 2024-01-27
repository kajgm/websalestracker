import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';

import data from '../data/testCellData';
import SideBar from '../components/SideBar';

function Main() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-wrap items-center justify-center gap-6">
        {data.map((item) => (
          <Cell title={item.title} description={item.description} key={item.title}></Cell>
        ))}
      </div>
    </div>
  );
}

export default Main;
