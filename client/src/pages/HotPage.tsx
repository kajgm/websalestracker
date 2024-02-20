import React from 'react';
import Main from '../layouts/Main';

import { FaFire } from 'react-icons/fa';

function HotPage() {
  return (
    <>
      <Main>
        <div className="flex flex-row p-6 mb-2 bg-gray-dark2 rounded-xl items-center space-x-4">
          <FaFire size={25} />
          <h1 className="text-4xl font-rubik font-bold">Hot</h1>
        </div>
      </Main>
    </>
  );
}

export default HotPage;
