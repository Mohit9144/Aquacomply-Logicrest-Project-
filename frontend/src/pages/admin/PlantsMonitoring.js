import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../contexts/AdminContext';
import { Droplets, Activity, AlertTriangle, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const AdminPlantsMonitoring = () => {
  const { plantsMonitoring, fetchPlantsMonitoring } = useAdminData();

  useEffect(() => {
    fetchPlantsMonitoring();
  }, [fetchPlantsMonitoring]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-success-100 text-success-800';
      case 'warning':
        return 'bg-warning-100 text-warning-800';
      case 'critical':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return <Activity className="w-5 h-5 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getParameterStatus = (value, type) => {
    switch (type) {
      case 'bod':
        return value > 30 ? 'critical' : 'normal';
      case 'cod':
        return value > 250 ? 'warning' : 'normal';
      case 'turbidity':
        return value > 5 ? 'critical' : 'normal';
      default:
        return 'normal';
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

  const getStatusCounts = () => {
    const counts = {
      normal: 0,
      warning: 0,
      critical: 0,
      total: plantsMonitoring?.length || 0
    };

    plantsMonitoring?.forEach(plant => {
      counts[plant.status] = (counts[plant.status] || 0) + 1;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Plants Monitoring</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/admin/clients" className="text-gray-600 hover:text-gray-900">
                Clients
              </Link>
              <Link to="/admin/plants-monitoring" className="text-primary-600 font-medium">
                Plants
              </Link>
              <Link to="/admin/alerts" className="text-gray-600 hover:text-gray-900">
                Alerts
              </Link>
              <Link to="/admin/devices" className="text-gray-600 hover:text-gray-900">
                Devices
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Plants Status</h2>
          <p className="text-gray-600 mt-1">Real-time monitoring of all client plants</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plants</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center mr-3">
                <Activity className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Normal</p>
                <p className="text-2xl font-bold text-success-600">{statusCounts.normal}</p>
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
                <p className="text-2xl font-bold text-warning-600">{statusCounts.warning}</p>
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
                <p className="text-2xl font-bold text-danger-600">{statusCounts.critical}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantsMonitoring?.map((plant) => (
            <div key={plant.plant_id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Plant Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{plant.plant_name}</h3>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plant.status)}`}>
                    {getStatusIcon(plant.status)}
                    <span>{plant.status}</span>
                  </div>
                </div>

                {/* Parameters */}
                <div className="space-y-3 mb-4">
                  {plant.bod_level !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">BOD</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          getParameterStatus(plant.bod_level, 'bod') === 'critical' ? 'text-danger-600' : 'text-gray-900'
                        }`}>
                          {plant.bod_level.toFixed(1)} mg/L
                        </span>
                        {getParameterStatus(plant.bod_level, 'bod') === 'critical' && (
                          <TrendingUp className="w-4 h-4 text-danger-500" />
                        )}
                      </div>
                    </div>
                  )}

                  {plant.cod_level !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">COD</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          getParameterStatus(plant.cod_level, 'cod') === 'warning' ? 'text-warning-600' : 'text-gray-900'
                        }`}>
                          {plant.cod_level.toFixed(1)} mg/L
                        </span>
                        {getParameterStatus(plant.cod_level, 'cod') === 'warning' && (
                          <TrendingUp className="w-4 h-4 text-warning-500" />
                        )}
                      </div>
                    </div>
                  )}

                  {plant.turbidity !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Turbidity</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          getParameterStatus(plant.turbidity, 'turbidity') === 'critical' ? 'text-danger-600' : 'text-gray-900'
                        }`}>
                          {plant.turbidity.toFixed(1)} NTU
                        </span>
                        {getParameterStatus(plant.turbidity, 'turbidity') === 'critical' && (
                          <TrendingUp className="w-4 h-4 text-danger-500" />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Last Update */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    Last update: {formatTime(plant.last_update)}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!plantsMonitoring || plantsMonitoring.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
            <p className="text-gray-600">There are no plants currently being monitored.</p>
            <Link
              to="/admin/clients"
              className="mt-4 inline-flex btn-primary text-sm"
            >
              Add Client with Plant
            </Link>
          </div>
        )}

        {/* System Health */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-success-100 rounded-full mx-auto mb-3">
                <Activity className="w-8 h-8 text-success-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Healthy Plants</h4>
              <p className="text-2xl font-bold text-success-600">{statusCounts.normal}</p>
              <p className="text-xs text-gray-500">
                {statusCounts.total > 0 ? Math.round((statusCounts.normal / statusCounts.total) * 100) : 0}% of total
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-warning-100 rounded-full mx-auto mb-3">
                <AlertTriangle className="w-8 h-8 text-warning-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Need Attention</h4>
              <p className="text-2xl font-bold text-warning-600">{statusCounts.warning + statusCounts.critical}</p>
              <p className="text-xs text-gray-500">
                {statusCounts.total > 0 ? Math.round(((statusCounts.warning + statusCounts.critical) / statusCounts.total) * 100) : 0}% of total
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Monitoring Coverage</h4>
              <p className="text-2xl font-bold text-blue-600">100%</p>
              <p className="text-xs text-gray-500">All plants connected</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPlantsMonitoring;
