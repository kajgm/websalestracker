import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';

import data from '../data/testCellData';

function Main() {
  return (
    <div className="flex-auto">
      <div className="flex flex-row justify-center items-center h-full space-x-10">
        {data.map((item) => (
          <Cell title={item.title} description={item.description} key={item.title}></Cell>
        ))}
      </div>
    </div>
  );
}

export default Main;
