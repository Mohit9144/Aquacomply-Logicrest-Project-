import React, { useState } from 'react';
import { 
  Power, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Zap, 
  Gauge, 
  Wind, 
  Droplet, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Sliders
} from 'lucide-react';

const IndustrialControlPanel = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [pumpStatus, setPumpStatus] = useState({
    main: true,
    backup: false,
    circulation: true
  });
  const [valvePositions, setValvePositions] = useState({
    inlet: 85,
    outlet: 75,
    bypass: 0,
    chemical: 60
  });
  const [chemicalDosing, setChemicalDosing] = useState({
    coagulant: 45,
    flocculant: 30,
    chlorine: 25,
    phAdjuster: 15
  });

  const togglePump = (pump) => {
    setPumpStatus(prev => ({ ...prev, [pump]: !prev[pump] }));
  };

  const adjustValve = (valve, value) => {
    setValvePositions(prev => ({ ...prev, [valve]: value }));
  };

  const adjustDosing = (chemical, value) => {
    setChemicalDosing(prev => ({ ...prev, [chemical]: value }));
  };

  const getSystemStatus = () => {
    const activePumps = Object.values(pumpStatus).filter(status => status).length;
    const totalPumps = Object.keys(pumpStatus).length;
    
    if (activePumps === totalPumps) return { status: 'optimal', color: 'green', text: 'All Systems Operational' };
    if (activePumps >= totalPumps - 1) return { status: 'warning', color: 'yellow', text: 'Backup Systems Active' };
    return { status: 'critical', color: 'red', text: 'System Degraded' };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Control Panel</h1>
                  <p className="text-xs text-gray-500">Industrial Treatment System Control</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg">Control</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Monitoring</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Automation</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Diagnostics</button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg bg-${systemStatus.color}-50`}>
                <div className={`w-2 h-2 bg-${systemStatus.color}-500 rounded-full`}></div>
                <span className={`text-sm font-medium text-${systemStatus.color}-700`}>{systemStatus.text}</span>
              </div>
              <div className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Control Mode Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex space-x-1">
          {['manual', 'automatic', 'maintenance'].map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveTab(mode)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                activeTab === mode 
                  ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {mode} Mode
            </button>
          ))}
        </div>
      </div>

      <main className="p-6">
        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className={`bg-white rounded-xl border p-4 ${systemStatus.color === 'green' ? 'border-green-200' : systemStatus.color === 'yellow' ? 'border-yellow-200' : 'border-red-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">System Status</span>
              {systemStatus.color === 'green' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className={`w-5 h-5 text-${systemStatus.color}-500`} />}
            </div>
            <p className={`text-lg font-bold text-${systemStatus.color}-700`}>{systemStatus.text}</p>
            <p className="text-xs text-gray-500 mt-1">Last check: 2 min ago</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Active Pumps</span>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">
              {Object.values(pumpStatus).filter(status => status).length} / {Object.keys(pumpStatus).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Operational</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Flow Rate</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">125.5 MLD</p>
            <p className="text-xs text-gray-500 mt-1">Current flow</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Power Usage</span>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">87.3 kW</p>
            <p className="text-xs text-gray-500 mt-1">Current draw</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pump Control */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pump Control</h2>
              <p className="text-sm text-gray-500">Manage pump operations and status</p>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(pumpStatus).map(([pump, status]) => (
                <div key={pump} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${status ? 'bg-green-100' : 'bg-gray-200'}`}>
                      <Activity className={`w-6 h-6 ${status ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize">{pump} Pump</h3>
                      <p className="text-sm text-gray-500">
                        {status ? 'Running • 45.2 kW' : 'Stopped • 0 kW'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePump(pump)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      status 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {status ? 'Stop' : 'Start'}
                  </button>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors">
                  Emergency Stop All Systems
                </button>
              </div>
            </div>
          </div>

          {/* Valve Control */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Valve Control</h2>
              <p className="text-sm text-gray-500">Adjust valve positions and flow control</p>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(valvePositions).map(([valve, position]) => (
                <div key={valve} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {valve} Valve
                    </label>
                    <span className="text-sm font-bold text-gray-900">{position}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={position}
                      onChange={(e) => adjustValve(valve, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <div className={`w-3 h-3 rounded-full ${
                      position > 75 ? 'bg-green-500' : 
                      position > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${position}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chemical Dosing */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Chemical Dosing</h2>
              <p className="text-sm text-gray-500">Control chemical injection rates</p>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(chemicalDosing).map(([chemical, rate]) => (
                <div key={chemical} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {chemical.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <span className="text-sm font-bold text-gray-900">{rate} mg/L</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={rate}
                      onChange={(e) => adjustDosing(chemical, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <Droplet className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Parameters */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Process Parameters</h2>
              <p className="text-sm text-gray-500">Key operational metrics</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">pH Level</span>
                    <Gauge className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">7.2</p>
                  <p className="text-xs text-green-600">Optimal</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Temperature</span>
                    <Thermometer className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">24.5°C</p>
                  <p className="text-xs text-gray-600">Normal</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">DO Level</span>
                    <Wind className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">3.2 mg/L</p>
                  <p className="text-xs text-green-600">Good</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Pressure</span>
                    <Activity className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">2.8 bar</p>
                  <p className="text-xs text-gray-600">Stable</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Automation Level</span>
                  <span className="text-sm text-blue-600 font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Save Configuration
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustrialControlPanel;
