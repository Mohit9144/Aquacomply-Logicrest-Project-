import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertCard = ({ alert, onMarkAsRead, showActions = true }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case 'medium':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'low':
        return <Info className="w-5 h-5 text-gray-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertClass = (severity) => {
    switch (severity) {
      case 'critical':
        return 'alert-critical';
      case 'high':
        return 'alert-warning';
      case 'medium':
      case 'low':
        return 'alert-low';
      default:
        return 'alert-low';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`alert-card ${getAlertClass(alert.severity)} ${alert.status === 'read' ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getSeverityIcon(alert.severity)}
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{alert.alert_type}</h4>
            <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
            {alert.recommended_action && (
              <p className="text-sm text-gray-600 mt-2 italic">
                Action: {alert.recommended_action}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {formatTime(alert.created_at)}
            </p>
          </div>
        </div>
        {showActions && alert.status !== 'read' && (
          <button
            onClick={() => onMarkAsRead(alert.id)}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
