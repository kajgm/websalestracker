import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { selectWidth } from '../../slices/sideBarSlice';
import { useAppSelector } from '../../hooks';

function GlobalSearch() {
  const [searchInput, setSearchInput] = useState('');
  const curWidth = useAppSelector(selectWidth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    //console.log('Searched for: ' + e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search.."
        onChange={handleChange}
        value={searchInput}
        className="bg-gray p-1 outline-none font-pmarker"
        style={{ width: `${curWidth / 24}rem` }}
      />
      <FaSearch className="relative top-2" />
    </>
  );
}

export default GlobalSearch;
