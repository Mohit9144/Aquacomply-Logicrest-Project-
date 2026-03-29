import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../contexts/UserContext';
import { Droplets, Activity, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const UserLiveMonitoring = () => {
  const { liveData, fetchLiveData } = useUserData();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchLiveData();
    setLastUpdate(new Date());

    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchLiveData();
        setLastUpdate(new Date());
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [fetchLiveData, autoRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success-600 bg-success-50';
      case 'offline':
        return 'text-danger-600 bg-danger-50';
      case 'warning':
        return 'text-warning-600 bg-warning-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5" />;
      case 'offline':
        return <WifiOff className="w-5 h-5" />;
      case 'warning':
        return <Activity className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!liveData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Live Monitoring</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm ${
                  autoRefresh 
                    ? 'bg-success-50 text-success-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                <span>Auto-refresh: {autoRefresh ? 'On' : 'Off'}</span>
              </button>
              <Link to="/user/dashboard" className="text-gray-600 hover:text-gray-900">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plant Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{liveData.plant_name}</h2>
          <p className="text-gray-600">
            Last updated: {lastUpdate ? formatTime(lastUpdate) : 'Never'}
          </p>
        </div>

        {/* Sensors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {liveData.sensors?.map((sensor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{sensor.sensor_name}</h3>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                  {getStatusIcon(sensor.status)}
                  <span>{sensor.status}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium text-gray-900">{sensor.sensor_type}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Current Value</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{sensor.value}</span>
                    <span className="ml-1 text-sm text-gray-500">{sensor.unit}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Last Reading</p>
                  <p className="text-sm text-gray-900">{formatTime(sensor.timestamp)}</p>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    sensor.status === 'online' ? 'bg-success-500' : 
                    sensor.status === 'offline' ? 'bg-danger-500' : 'bg-warning-500'
                  }`}></div>
                  <span className="text-xs text-gray-600">
                    {sensor.status === 'online' ? 'Real-time data' : 
                     sensor.status === 'offline' ? 'No connection' : 'Check sensor'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!liveData.sensors || liveData.sensors.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sensors available</h3>
            <p className="text-gray-600">There are no active sensors for this plant.</p>
          </div>
        )}

        {/* System Status */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">System Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Auto-refresh {autoRefresh ? 'enabled' : 'disabled'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{liveData.sensors?.length || 0} sensors active</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLiveMonitoring;
