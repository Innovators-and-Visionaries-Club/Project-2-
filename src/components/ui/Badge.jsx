import React from 'react';
import { RISK_LEVELS } from '../../constants/riskLevels';

const Badge = ({ level }) => {
  const config = RISK_LEVELS[level] || RISK_LEVELS.LOW;
  const classes = {
    CRITICAL: 'badge-critical',
    HIGH: 'badge-high',
    MEDIUM: 'badge-medium',
    LOW: 'badge-low',
    SAFE: 'badge-low',
  };

  return (
    <span className={`badge ${classes[level] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {config.label}
    </span>
  );
};

export default Badge;
