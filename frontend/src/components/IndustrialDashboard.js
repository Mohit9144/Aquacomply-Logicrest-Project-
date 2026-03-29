import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Droplet, 
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
  Users,
  Shield,
  Cpu,
  Database,
  Radio,
  ChevronUp,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

const IndustrialDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedPlant, setSelectedPlant] = useState('plant-1');
  const [realTimeData, setRealTimeData] = useState({
    bod: 45.8,
    cod: 285.3,
    turbidity: 3.2,
    chlorine: 0.8,
    ph: 7.2,
    flow: 125.5,
    efficiency: 72.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        bod: Math.max(20, Math.min(80, prev.bod + (Math.random() - 0.5) * 5)),
        cod: Math.max(200, Math.min(400, prev.cod + (Math.random() - 0.5) * 10)),
        turbidity: Math.max(1, Math.min(10, prev.turbidity + (Math.random() - 0.5) * 0.5)),
        chlorine: Math.max(0.2, Math.min(2, prev.chlorine + (Math.random() - 0.5) * 0.1)),
        flow: Math.max(100, Math.min(150, prev.flow + (Math.random() - 0.5) * 2)),
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
                  <p className="text-xs text-gray-500">Industrial Water Treatment Monitoring</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">Dashboard</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Analytics</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Control</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Maintenance</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Reports</button>
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
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700">Plant:</label>
              <select 
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="plant-1">Main STP Facility</option>
                <option value="plant-2">Secondary Treatment Unit</option>
                <option value="plant-3">Tertiary Treatment Plant</option>
              </select>
            </div>
            
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
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>

      <main className="p-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Flow Rate */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Flow Rate</p>
                  <p className="text-xs text-gray-500">Inflow Volume</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(realTimeData.flow, 120)}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">{realTimeData.flow.toFixed(1)}</span>
                <span className="ml-1 text-sm text-gray-500">MLD</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Capacity</span>
                <p className="text-sm font-medium text-gray-700">83.7%</p>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '83.7%'}}></div>
            </div>
          </div>

          {/* BOD */}
          <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow ${getStatusBg(realTimeData.bod, 30)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Gauge className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">BOD</p>
                  <p className="text-xs text-gray-500">Biochemical Oxygen</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(realTimeData.bod, 42)}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className={`text-2xl font-bold ${getStatusColor(realTimeData.bod, 30)}`}>
                  {realTimeData.bod.toFixed(1)}
                </span>
                <span className="ml-1 text-sm text-gray-500">mg/L</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Status</span>
                <p className={`text-sm font-medium ${getStatusColor(realTimeData.bod, 30)}`}>
                  {realTimeData.bod > 30 ? 'Critical' : 'Normal'}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
              <span>Limit: 30 mg/L</span>
            </div>
          </div>

          {/* COD */}
          <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow ${getStatusBg(realTimeData.cod, 250)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Filter className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">COD</p>
                  <p className="text-xs text-gray-500">Chemical Oxygen</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(realTimeData.cod, 290)}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className={`text-2xl font-bold ${getStatusColor(realTimeData.cod, 250)}`}>
                  {realTimeData.cod.toFixed(1)}
                </span>
                <span className="ml-1 text-sm text-gray-500">mg/L</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Status</span>
                <p className={`text-sm font-medium ${getStatusColor(realTimeData.cod, 250)}`}>
                  {realTimeData.cod > 250 ? 'Warning' : 'Normal'}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
              <AlertTriangle className="w-3 h-3 text-yellow-500" />
              <span>Limit: 250 mg/L</span>
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Efficiency</p>
                  <p className="text-xs text-gray-500">Treatment Rate</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-green-600">{realTimeData.efficiency.toFixed(1)}</span>
                <span className="ml-1 text-sm text-gray-500">%</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Grade</span>
                <p className="text-sm font-medium text-green-600">Good</p>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: `${realTimeData.efficiency}%`}}></div>
            </div>
          </div>
        </div>

        {/* Secondary Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Turbidity */}
          <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow ${getStatusBg(realTimeData.turbidity, 5)}`}>
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
              <div className="flex items-center space-x-1">
                {getTrendIcon(realTimeData.turbidity, 3.5)}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(realTimeData.turbidity, 5)}`}>
                {realTimeData.turbidity.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-500">NTU</span>
            </div>
          </div>

          {/* pH Level */}
          <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow ${getStatusBg(Math.abs(realTimeData.ph - 7.5), 0.5)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">pH Level</p>
                  <p className="text-xs text-gray-500">Acidity</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Minus className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(Math.abs(realTimeData.ph - 7.5), 0.5)}`}>
                {realTimeData.ph.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-500">pH</span>
            </div>
          </div>

          {/* Chlorine */}
          <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow ${getStatusBg(realTimeData.chlorine, 0.5)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Droplet className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Chlorine</p>
                  <p className="text-xs text-gray-500">Residual</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${getStatusColor(realTimeData.chlorine, 0.5)}`}>
                {realTimeData.chlorine.toFixed(2)}
              </span>
              <span className="ml-1 text-sm text-gray-500">mg/L</span>
            </div>
          </div>
        </div>

        {/* Alerts and System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Alerts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* Critical Alert */}
                <div className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-red-900">Critical BOD Level</h3>
                      <span className="text-xs text-red-600">2 min ago</span>
                    </div>
                    <p className="text-sm text-red-800 mb-3">
                      BOD level has reached critical threshold at 45.8 mg/L. Immediate action required to prevent compliance violation.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-red-700">
                      <span>Current: 45.8 mg/L</span>
                      <span>•</span>
                      <span>Limit: 30 mg/L</span>
                      <span>•</span>
                      <span>Duration: 45 min</span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700">
                        Take Action
                      </button>
                      <button className="px-3 py-1 bg-white text-red-600 text-xs font-medium rounded-lg border border-red-300 hover:bg-red-50">
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </div>

                {/* Warning Alert */}
                <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-yellow-900">Elevated COD Levels</h3>
                      <span className="text-xs text-yellow-600">15 min ago</span>
                    </div>
                    <p className="text-sm text-yellow-800 mb-3">
                      COD levels are above normal range. Monitor closely and consider optimizing chemical dosing.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-yellow-700">
                      <span>Current: 285.3 mg/L</span>
                      <span>•</span>
                      <span>Limit: 250 mg/L</span>
                      <span>•</span>
                      <span>Trend: Increasing</span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-700">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-white text-yellow-600 text-xs font-medium rounded-lg border border-yellow-300 hover:bg-yellow-50">
                        Schedule Check
                      </button>
                    </div>
                  </div>
                </div>

                {/* Maintenance Alert */}
                <div className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-900">Scheduled Maintenance</h3>
                      <span className="text-xs text-blue-600">1 hour ago</span>
                    </div>
                    <p className="text-sm text-blue-800 mb-3">
                      Monthly sensor calibration and maintenance check due for primary treatment unit.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-blue-700">
                      <span>Type: Calibration</span>
                      <span>•</span>
                      <span>Priority: Medium</span>
                      <span>•</span>
                      <span>Due: Tomorrow</span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">
                        Schedule
                      </button>
                      <button className="px-3 py-1 bg-white text-blue-600 text-xs font-medium rounded-lg border border-blue-300 hover:bg-blue-50">
                        Postpone
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-4">
            {/* System Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">PLC Status</p>
                      <p className="text-xs text-gray-500">Main Controller</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Data Logger</p>
                      <p className="text-xs text-gray-500">Storage System</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Radio className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Communication</p>
                      <p className="text-xs text-gray-500">Network Link</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">Latency</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sensor Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sensor Network</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Online Sensors</span>
                  <span className="font-medium text-green-600">12 / 12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Data Freshness</span>
                  <span className="font-medium text-gray-900">< 1 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Calibration Status</span>
                  <span className="font-medium text-yellow-600">Due Soon</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Battery Levels</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium text-gray-900">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '99.8%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium text-gray-900">120ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '88%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustrialDashboard;
