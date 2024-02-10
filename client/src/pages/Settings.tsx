import React from 'react';
import Main from '../layouts/Main';

import { FaCog } from 'react-icons/fa';

function Settings() {
  return (
    <>
      <Main>
        <div className="flex flex-row p-6 mb-2 bg-gray-dark2 rounded-xl items-center space-x-4">
          <FaCog size={25} />
          <h1 className="text-4xl font-rubik font-bold">Settings</h1>
        </div>
      </Main>
    </>
  );
}

export default Settings;
