import React, { useContext, useState } from 'react';
import { Search, X } from 'lucide-react';
import { SnippetContext } from '../context/SnippetContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(SnippetContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={`
      relative flex items-center w-full rounded-lg 
      border border-slate-200 dark:border-slate-700
      ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-slate-300 dark:hover:border-slate-600'}
      transition-all duration-150
      bg-slate-50 dark:bg-slate-700/50
    `}>
      <div className="flex items-center pl-3 text-slate-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search snippets..."
        className="w-full py-2 px-3 bg-transparent outline-none text-sm"
      />
      {searchQuery && (
        <button 
          onClick={handleClearSearch}
          className="flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;