import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../contexts/UserContext';
import { useWebSocket } from '../../contexts/WebSocketContext';
import KPICard from '../../components/KPICard';
import AlertCard from '../../components/AlertCard';
import { Droplets, Activity, AlertTriangle, BarChart3, Settings, Eye } from 'lucide-react';

const UserDashboard = () => {
  const { dashboardData, alerts, fetchDashboardData, fetchAlerts, markAlertAsRead } = useUserData();
  const { connect, disconnect } = useWebSocket();

  useEffect(() => {
    fetchDashboardData();
    fetchAlerts();
    
    // Connect WebSocket for real-time updates
    // In a real app, userId would come from auth context
    connect(1, 'user');
    
    return () => {
      disconnect();
    };
  }, [fetchDashboardData, fetchAlerts, connect, disconnect]);

  if (!dashboardData) {
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
              <h1 className="text-xl font-bold text-gray-900">Reacto Platform</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/user/dashboard" className="text-primary-600 font-medium">
                Dashboard
              </Link>
              <Link to="/user/live-monitoring" className="text-gray-600 hover:text-gray-900">
                Live Monitoring
              </Link>
              <Link to="/user/alerts" className="text-gray-600 hover:text-gray-900">
                Alerts
              </Link>
              <Link to="/user/monthly-summary" className="text-gray-600 hover:text-gray-900">
                Reports
              </Link>
              <Link to="/user/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {dashboardData.plant_info?.user?.full_name || 'User'}
          </h2>
          <p className="text-gray-600 mt-1">
            Plant: {dashboardData.plant_info?.plant_name || 'N/A'}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardData.kpis?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                status={kpi.status}
                trend={kpi.trend}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/user/live-monitoring"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center space-x-3"
            >
              <Eye className="w-8 h-8 text-primary-600" />
              <div>
                <h4 className="font-medium text-gray-900">Live Monitoring</h4>
                <p className="text-sm text-gray-600">View real-time data</p>
              </div>
            </Link>

            <Link
              to="/user/alerts"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center space-x-3"
            >
              <AlertTriangle className="w-8 h-8 text-warning-600" />
              <div>
                <h4 className="font-medium text-gray-900">View Alerts</h4>
                <p className="text-sm text-gray-600">Check notifications</p>
              </div>
            </Link>

            <Link
              to="/user/monthly-summary"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center space-x-3"
            >
              <BarChart3 className="w-8 h-8 text-success-600" />
              <div>
                <h4 className="font-medium text-gray-900">Monthly Report</h4>
                <p className="text-sm text-gray-600">View analytics</p>
              </div>
            </Link>

            <Link
              to="/user/settings"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center space-x-3"
            >
              <Settings className="w-8 h-8 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Settings</h4>
                <p className="text-sm text-gray-600">Manage preferences</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            <Link
              to="/user/alerts"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all alerts
            </Link>
          </div>
          
          {dashboardData.recent_alerts?.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recent_alerts.slice(0, 3).map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onMarkAsRead={markAlertAsRead}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p>No active alerts</p>
              <p className="text-sm">Your plant is operating normally</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default UserDashboard;
