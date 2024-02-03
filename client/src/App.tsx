import React from 'react';
import AppBar from './components/AppBar';
import Main from './layouts/Main';

function App() {
  
  const appBarPadding = window.Main ? '6' : '0';

  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="z-50 w-screen bg-gray-dark fixed">
          <AppBar />
        </div>
      )}
      <Main topPad={appBarPadding}/>
    </div>
  );
}

export default App;
