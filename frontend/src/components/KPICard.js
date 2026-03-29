import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({ title, value, unit, status, trend }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'status-normal';
      case 'warning':
        return 'status-warning';
      case 'critical':
        return 'status-critical';
      default:
        return 'status-normal';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="kpi-title">{title}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="kpi-value">{value}</span>
          <span className="ml-1 text-sm text-gray-500">{unit}</span>
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            {getTrendIcon(trend)}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
