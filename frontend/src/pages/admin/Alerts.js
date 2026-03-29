import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../contexts/AdminContext';
import AlertCard from '../../components/AlertCard';
import { Droplets, AlertTriangle, Filter, CheckCircle, Search } from 'lucide-react';

const AdminAlerts = () => {
  const { alerts, fetchAlerts, resolveAlert } = useAdminData();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    if (alerts) {
      let filtered = alerts;
      
      // Apply status filter
      if (filter !== 'all') {
        filtered = filtered.filter(alert => alert.status === filter);
      }
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(alert => 
          alert.alert_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.user?.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredAlerts(filtered);
    }
  }, [alerts, filter, searchTerm]);

  const handleResolveAll = async () => {
    const activeAlerts = alerts.filter(alert => alert.status !== 'resolved');
    for (const alert of activeAlerts) {
      await resolveAlert(alert.id);
    }
    fetchAlerts();
  };

  const getAlertStats = () => {
    const stats = {
      total: alerts?.length || 0,
      active: alerts?.filter(a => a.status === 'active').length || 0,
      read: alerts?.filter(a => a.status === 'read').length || 0,
      resolved: alerts?.filter(a => a.status === 'resolved').length || 0,
      critical: alerts?.filter(a => a.severity === 'critical' && a.status !== 'resolved').length || 0,
      high: alerts?.filter(a => a.severity === 'high' && a.status !== 'resolved').length || 0
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
              <h1 className="text-xl font-bold text-gray-900">Alert Control Center</h1>
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
              <Link to="/admin/alerts" className="text-primary-600 font-medium">
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
          <h2 className="text-2xl font-bold text-gray-900">Alert Management</h2>
          <p className="text-gray-600 mt-1">Monitor and manage all client alerts</p>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-gray-600 mr-2" />
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-danger-100 rounded-full flex items-center justify-center mr-2">
                <AlertTriangle className="w-4 h-4 text-danger-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Active</p>
                <p className="text-xl font-bold text-danger-600">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-warning-100 rounded-full flex items-center justify-center mr-2">
                <AlertTriangle className="w-4 h-4 text-warning-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Critical</p>
                <p className="text-xl font-bold text-warning-600">{stats.critical}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">High</p>
                <p className="text-xl font-bold text-orange-600">{stats.high}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-success-600 mr-2" />
              <div>
                <p className="text-xs font-medium text-gray-600">Read</p>
                <p className="text-xl font-bold text-success-600">{stats.read}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                <CheckCircle className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Resolved</p>
                <p className="text-xl font-bold text-gray-600">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center space-x-2">
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
                    onClick={() => setFilter('resolved')}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      filter === 'resolved'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Resolved ({stats.resolved})
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            {stats.active > 0 && (
              <button
                onClick={handleResolveAll}
                className="btn-secondary text-sm"
              >
                Resolve All Active
              </button>
            )}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Alert Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        alert.severity === 'critical' ? 'bg-danger-100' :
                        alert.severity === 'high' ? 'bg-warning-100' : 'bg-blue-100'
                      }`}>
                        <AlertTriangle className={`w-5 h-5 ${
                          alert.severity === 'critical' ? 'text-danger-600' :
                          alert.severity === 'high' ? 'text-warning-600' : 'text-blue-600'
                        }`} />
                      </div>

                      {/* Alert Content */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{alert.alert_type}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            alert.severity === 'critical' ? 'bg-danger-100 text-danger-800' :
                            alert.severity === 'high' ? 'bg-warning-100 text-warning-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            alert.status === 'active' ? 'bg-red-100 text-red-800' :
                            alert.status === 'read' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {alert.status}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-2">{alert.message}</p>
                        
                        {alert.recommended_action && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Action:</span> {alert.recommended_action}
                          </p>
                        )}

                        {/* Alert Details */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Client: {alert.user?.company_name || 'Unknown'}</span>
                          <span>Plant: {alert.plant?.plant_name || 'Unknown'}</span>
                          <span>{new Date(alert.created_at).toLocaleString()}</span>
                          {alert.actual_value && alert.threshold_value && (
                            <span>
                              Value: {alert.actual_value} (Threshold: {alert.threshold_value})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {alert.status !== 'resolved' && (
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="btn-secondary text-sm"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' && !searchTerm ? 'No alerts found' : `No ${filter} alerts found`}
              </h3>
              <p className="text-gray-600">
                {filter === 'all' && !searchTerm 
                  ? 'Great! No alerts in the system.'
                  : 'Try adjusting your filters or search terms.'
                }
              </p>
              {(filter !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setFilter('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Alert Trends */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Most Common Alert Type</h4>
              <p className="text-lg font-bold text-gray-900">High BOD Levels</p>
              <p className="text-sm text-gray-600">45% of all alerts</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Average Resolution Time</h4>
              <p className="text-lg font-bold text-gray-900">2.4 hours</p>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Critical Alert Rate</h4>
              <p className="text-lg font-bold text-danger-600">12%</p>
              <p className="text-sm text-gray-600">Need immediate attention</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAlerts;
