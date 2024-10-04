import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img src={require('../../assets/search.png')} alt='module' />
    </div>
  );
}
/* Group */

export default SearchBar;
