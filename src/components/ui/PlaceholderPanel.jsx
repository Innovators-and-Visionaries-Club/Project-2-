import React from 'react';

const PlaceholderPanel = ({ label, height = 'h-64' }) => {
  return (
    <div className={`w-full ${height} border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center`}>
      <span className="text-gray-400 font-medium">{label}</span>
    </div>
  );
};

export default PlaceholderPanel;
