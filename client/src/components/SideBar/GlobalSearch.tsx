import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function GlobalSearch() {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    //console.log('Searched for: ' + e.target.value);
  };

  return (
    <>
      <div className="flex flex-row px-2">
        <input
          type="text"
          placeholder="search.."
          onChange={handleChange}
          value={searchInput}
          className="bg-gray2 mx-2 py-1 outline-none font-rubik w-4/5"
        />
        <FaSearch className="relative top-2" />
      </div>
    </>
  );
}

export default GlobalSearch;
