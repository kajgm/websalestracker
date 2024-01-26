import React from 'react';
import AppBar from './components/AppBar';
import Main from './layouts/Main';

function App() {
  return (
    <div className="flex flex-col h-screen bg-zinc-700">
      {window.Main && (
        <div className="flex-none bg-zinc-800">
          <AppBar />
        </div>
      )}
      <Main></Main>
    </div>
  );
}

export default App;
