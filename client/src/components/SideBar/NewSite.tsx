import React from 'react';

function NewSite() {
  return (
    <>
      <div className="mx-auto w-4/5">
        <div className="bg-gray rounded-full">
          <button
            className="w-full text-center py-1 font-rubik font-bold"
            onClick={async () => {
              window.Main.setPlugins('foo');
            }}
          >
            Add Site +
          </button>
        </div>
      </div>
    </>
  );
}

export default NewSite;
