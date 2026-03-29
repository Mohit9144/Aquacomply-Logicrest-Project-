import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../contexts/AdminContext';
import { Droplets, Settings, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

const AdminDevices = () => {
  const { devices, fetchDevices } = useAdminData();

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success-100 text-success-800';
      case 'offline':
        return 'bg-danger-100 text-danger-800';
      case 'warning':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5 text-success-600" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-danger-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const getDelayStatus = (delay) => {
    if (!delay) return 'normal';
    if (delay > 60) return 'critical';
    if (delay > 15) return 'warning';
    return 'normal';
  };

  const getDelayColor = (delay) => {
    const status = getDelayStatus(delay);
    switch (status) {
      case 'critical':
        return 'text-danger-600 bg-danger-50';
      case 'warning':
        return 'text-warning-600 bg-warning-50';
      default:
        return 'text-success-600 bg-success-50';
    }
  };

  const getDeviceStats = () => {
    const stats = {
      total: devices?.length || 0,
      online: devices?.filter(d => d.status === 'online').length || 0,
      offline: devices?.filter(d => d.status === 'offline').length || 0,
      warning: devices?.filter(d => d.status === 'warning').length || 0,
      delayed: devices?.filter(d => d.data_delay_minutes > 15).length || 0
    };
    return stats;
  };

  const stats = getDeviceStats();

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Device Monitoring</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/admin/clients" className="text-gray-600 hover:text-gray-900">
                Clients
              </Link>
              <Link to="/admin/plants-monitoring" className="text-gray-600 hover:text-gray-900">
                Plants
              </Link>
              <Link to="/admin/alerts" className="text-gray-600 hover:text-gray-900">
                Alerts
              </Link>
              <Link to="/admin/devices" className="text-primary-600 font-medium">
                Devices
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Device Health Monitoring</h2>
          <p className="text-gray-600 mt-1">Real-time status of all sensors and devices</p>
        </div>

        {/* Device Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Devices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center mr-3">
                <Wifi className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Online</p>
                <p className="text-2xl font-bold text-success-600">{stats.online}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-danger-100 rounded-full flex items-center justify-center mr-3">
                <WifiOff className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-danger-600">{stats.offline}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Warning</p>
                <p className="text-2xl font-bold text-warning-600">{stats.warning}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Data Delay</p>
                <p className="text-2xl font-bold text-orange-600">{stats.delayed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Devices List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Delay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devices?.length > 0 ? (
                  devices.map((device, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <Settings className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {device.device_name}
                            </div>
                            <div className="text-sm text-gray-500">{device.device_type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{device.plant_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(device.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.status)}`}>
                            {device.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(device.last_data_time)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.data_delay_minutes !== null ? (
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDelayColor(device.data_delay_minutes)}`}>
                              {device.data_delay_minutes} min
                            </span>
                            {getDelayStatus(device.data_delay_minutes) === 'critical' && (
                              <AlertTriangle className="w-4 h-4 text-danger-500" />
                            )}
                            {getDelayStatus(device.data_delay_minutes) === 'warning' && (
                              <AlertTriangle className="w-4 h-4 text-warning-500" />
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No data</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            View Details
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            Test Connection
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No devices found</h3>
                      <p className="text-sm text-gray-500">
                        No devices are currently registered in the system.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Health Summary */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Device Uptime</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-success-500 h-2 rounded-full"
                      style={{ width: `${stats.total > 0 ? (stats.online / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.total > 0 ? Math.round((stats.online / stats.total) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Data Freshness</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stats.total > 0 ? ((stats.total - stats.delayed) / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.total > 0 ? Math.round(((stats.total - stats.delayed) / stats.total) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Critical Issues</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-danger-500 h-2 rounded-full"
                      style={{ width: `${stats.total > 0 ? (stats.offline / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-danger-600">
                    {stats.total > 0 ? Math.round((stats.offline / stats.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Priorities</h3>
            <div className="space-y-3">
              {stats.offline > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-danger-50 rounded-lg">
                  <WifiOff className="w-5 h-5 text-danger-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-danger-900">Offline Devices</h4>
                    <p className="text-xs text-danger-700">
                      {stats.offline} device(s) are offline. Check power and connectivity.
                    </p>
                  </div>
                </div>
              )}

              {stats.delayed > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-warning-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-warning-900">Data Delays</h4>
                    <p className="text-xs text-warning-700">
                      {stats.delayed} device(s) have data delays. Check network connectivity.
                    </p>
                  </div>
                </div>
              )}

              {stats.warning > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-orange-900">Device Warnings</h4>
                    <p className="text-xs text-orange-700">
                      {stats.warning} device(s) need attention. Schedule maintenance.
                    </p>
                  </div>
                </div>
              )}

              {stats.offline === 0 && stats.delayed === 0 && stats.warning === 0 && (
                <div className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-success-900">All Systems Healthy</h4>
                    <p className="text-xs text-success-700">
                      All devices are online and functioning normally.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDevices;
