import React from 'react';

const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, i) => renderRow(item, i))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
