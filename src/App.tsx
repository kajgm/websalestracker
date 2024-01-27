import React from 'react';
import AppBar from './components/AppBar';
import Main from './layouts/Main';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-dark to-indigo">
      {window.Main && (
        <div className="z-50 bg-gray-dark">
          <AppBar />
        </div>
      )}
      <Main></Main>
    </div>
  );
}

export default App;
