import React from 'react';

const StatCard = ({ label, value, trend, color }) => {
  return (
    <div className="card p-6">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className={`text-2xl font-bold ${color === 'red' ? 'text-red-600' : 'text-slate-900'}`}>{value}</h3>
        <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
