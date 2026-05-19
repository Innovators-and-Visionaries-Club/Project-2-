import React from 'react';

const FilterRow = ({ children }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg border border-gray-100 mb-6">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filters</span>
      {children}
    </div>
  );
};

export default FilterRow;
