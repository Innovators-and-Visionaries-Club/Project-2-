import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = "Search..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
