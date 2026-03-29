import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Zap,
  Gauge,
  Wind,
  Thermometer,
  Filter,
  Settings,
  Bell,
  BarChart3,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Download,
  Filter as FilterIcon
} from 'lucide-react';

const PlantOwnerDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [realTimeData, setRealTimeData] = useState({
    inflow: 125.5,
    treated: 118.2,
    reused: 85.7,
    bod: 45.8,
    cod: 285.3,
    turbidity: 3.2,
    chlorine: 0.8,
    ph: 7.2,
    efficiency: 72.5,
    temperature: 24.5,
    pressure: 2.8,
    dissolved_oxygen: 3.2
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'High BOD Level',
      message: 'BOD level critically high at 45.8 mg/L',
      time: '2 min ago',
      parameter: 'BOD',
      current: 45.8,
      limit: 30,
      action: 'Increase aeration time immediately'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Elevated COD',
      message: 'COD levels above normal range',
      time: '15 min ago',
      parameter: 'COD',
      current: 285.3,
      limit: 250,
      action: 'Optimize chemical dosing'
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Due',
      message: 'Monthly sensor calibration required',
      time: '1 hour ago',
      parameter: 'Maintenance',
      action: 'Schedule calibration'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        bod: Math.max(20, Math.min(80, prev.bod + (Math.random() - 0.5) * 5)),
        cod: Math.max(200, Math.min(400, prev.cod + (Math.random() - 0.5) * 10)),
        turbidity: Math.max(1, Math.min(10, prev.turbidity + (Math.random() - 0.5) * 0.5)),
        chlorine: Math.max(0.2, Math.min(2, prev.chlorine + (Math.random() - 0.5) * 0.1)),
        inflow: Math.max(100, Math.min(150, prev.inflow + (Math.random() - 0.5) * 2)),
        efficiency: Math.max(60, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, threshold, type = 'normal') => {
    if (type === 'reverse') {
      return value <= threshold ? 'text-green-500' : value <= threshold * 1.5 ? 'text-yellow-500' : 'text-red-500';
    }
    return value <= threshold ? 'text-green-500' : value <= threshold * 1.5 ? 'text-yellow-500' : 'text-red-500';
  };

  const getStatusBg = (value, threshold, type = 'normal') => {
    if (type === 'reverse') {
      return value <= threshold ? 'bg-green-50 border-green-200' : value <= threshold * 1.5 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
    }
    return value <= threshold ? 'bg-green-50 border-green-200' : value <= threshold * 1.5 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
  };

  const getTrendIcon = (current, previous) => {
    if (Math.abs(current - previous) < 0.1) return <Minus className="w-4 h-4 text-gray-400" />;
    return current > previous ? <TrendingUp className="w-4 h-4 text-red-500" /> : <TrendingDown className="w-4 h-4 text-green-500" />;
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Bell className="w-5 h-5 text-blue-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Reacto Platform</h1>
                  <p className="text-xs text-gray-500">Hotel Paradise - Main STP Facility</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">Dashboard</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Analytics</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Reports</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Settings</button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Control Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Time Range:</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['1h', '6h', '24h', '7d', '30d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedTimeRange === range 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            <button className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>

      <main className="p-6">
        {/* Plant Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Plant Overview</h2>
              <p className="text-gray-600">Real-time monitoring of your STP facility</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Plant Efficiency</p>
                <p className="text-2xl font-bold text-green-600">{realTimeData.efficiency.toFixed(1)}%</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Water Flow Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Inflow</p>
                  <p className="text-xs text-gray-500">Dirty Water In</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{realTimeData.inflow.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">MLD</span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '83.7%'}}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Treated Water</p>
                  <p className="text-xs text-gray-500">Filtered Output</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{realTimeData.treated.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">MLD</span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '94.2%'}}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Reused Water</p>
                  <p className="text-xs text-gray-500">Recycled Output</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{realTimeData.reused.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">MLD</span>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{width: '72.5%'}}></div>
            </div>
          </div>
        </div>

        {/* Water Quality Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`bg-white rounded-xl border p-6 ${getStatusBg(realTimeData.bod, 30)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Gauge className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">BOD</p>
                  <p className="text-xs text-gray-500">Biochemical Oxygen</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(realTimeData.bod, 30)}`}>
                {realTimeData.bod.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-500">mg/L</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
              <span>Limit: 30 mg/L</span>
            </div>
          </div>

          <div className={`bg-white rounded-xl border p-6 ${getStatusBg(realTimeData.cod, 250)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <FilterIcon className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">COD</p>
                  <p className="text-xs text-gray-500">Chemical Oxygen</p>
                </div>
              </div>
              <Minus className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(realTimeData.cod, 250)}`}>
                {realTimeData.cod.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-500">mg/L</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-3 h-3 text-yellow-500" />
              <span>Limit: 250 mg/L</span>
            </div>
          </div>

          <div className={`bg-white rounded-xl border p-6 ${getStatusBg(realTimeData.turbidity, 5)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <Wind className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Turbidity</p>
                  <p className="text-xs text-gray-500">Water Clarity</p>
                </div>
              </div>
              <TrendingDown className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(realTimeData.turbidity, 5)}`}>
                {realTimeData.turbidity.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-500">NTU</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Limit: 5 NTU</span>
            </div>
          </div>

          <div className={`bg-white rounded-xl border p-6 ${getStatusBg(realTimeData.chlorine, 0.5)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Droplet className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Chlorine</p>
                  <p className="text-xs text-gray-500">Disinfection</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(realTimeData.chlorine, 0.5)}`}>
                {realTimeData.chlorine.toFixed(2)}
              </span>
              <span className="ml-1 text-sm text-gray-500">mg/L</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Limit: 2.0 mg/L</span>
            </div>
          </div>
        </div>

        {/* Additional Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Temperature</p>
                  <p className="text-xs text-gray-500">Water Temp</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{realTimeData.temperature.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">°C</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pressure</p>
                  <p className="text-xs text-gray-500">System Pressure</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{realTimeData.pressure.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">bar</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Wind className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Dissolved O₂</p>
                  <p className="text-xs text-gray-500">Oxygen Level</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{realTimeData.dissolved_oxygen.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">mg/L</span>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${getAlertBg(alert.type)}`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                        <span>Parameter: {alert.parameter}</span>
                        {alert.current && alert.limit && (
                          <>
                            <span>•</span>
                            <span>Current: {alert.current} | Limit: {alert.limit}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">
                          Take Action
                        </button>
                        <button className="px-3 py-1 bg-white text-gray-600 text-xs font-medium rounded-lg border border-gray-300 hover:bg-gray-50">
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlantOwnerDashboard;
