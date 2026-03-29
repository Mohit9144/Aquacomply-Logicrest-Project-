import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../contexts/UserContext';
import AlertCard from '../../components/AlertCard';
import { Droplets, AlertTriangle, Filter, CheckCircle } from 'lucide-react';

const UserAlerts = () => {
  const { alerts, fetchAlerts, markAlertAsRead } = useUserData();
  const [filter, setFilter] = useState('all');
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    if (alerts) {
      let filtered = alerts;
      
      if (filter !== 'all') {
        filtered = alerts.filter(alert => alert.status === filter);
      }
      
      setFilteredAlerts(filtered);
    }
  }, [alerts, filter]);

  const handleMarkAllAsRead = async () => {
    const unreadAlerts = alerts.filter(alert => alert.status !== 'read');
    for (const alert of unreadAlerts) {
      await markAlertAsRead(alert.id);
    }
    fetchAlerts();
  };

  const getAlertStats = () => {
    const stats = {
      total: alerts?.length || 0,
      active: alerts?.filter(a => a.status === 'active').length || 0,
      read: alerts?.filter(a => a.status === 'read').length || 0,
      critical: alerts?.filter(a => a.severity === 'critical' && a.status !== 'read').length || 0
    };
    return stats;
  };

  const stats = getAlertStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Alerts</h1>
            </div>
            <Link to="/user/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-danger-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-danger-600">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-success-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-bold text-success-600">{stats.read}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-danger-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-danger-600">{stats.critical}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filter === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filter === 'active'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Active ({stats.active})
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filter === 'read'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Read ({stats.read})
                </button>
              </div>
            </div>

            {stats.active > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="btn-secondary text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onMarkAsRead={markAlertAsRead}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'No alerts' : `No ${filter} alerts`}
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Great job! Your plant is operating normally.'
                  : `There are no ${filter} alerts to display.`
                }
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View all alerts
                </button>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default UserAlerts;
