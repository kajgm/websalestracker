import React from 'react';
import AppBar from './components/AppBar';
import Main from './layouts/Main';

function App() {
  const appBarPadding = window.Main ? '6' : '0';

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {window.Main && (
        <div className="z-50 w-screen fixed">
          <AppBar />
        </div>
      )}
      <Main topPad={appBarPadding} />
    </div>
  );
}

export default App;
