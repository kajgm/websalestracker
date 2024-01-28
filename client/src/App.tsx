import React from 'react';
import AppBar from './components/AppBar';
import Main from './layouts/Main';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="no-flex fixed z-50 w-screen bg-gray-dark">
          <AppBar />
        </div>
      )}
      <Main></Main>
    </div>
  );
}

export default App;
