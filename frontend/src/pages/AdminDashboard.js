import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Zap,
  Building,
  Users,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Download,
  Filter as FilterIcon,
  Search,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  Settings,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPlants, setSelectedPlants] = useState(['all']);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlantDropdown, setShowPlantDropdown] = useState(false);

  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Hotel Paradise - Main STP',
      client: 'Hotel Paradise Ltd',
      location: 'Mumbai, Maharashtra',
      contact: '+91-22-12345678',
      email: 'manager@hotelparadise.com',
      status: 'active',
      efficiency: 72.5,
      inflow: 125.5,
      treated: 118.2,
      reused: 85.7,
      bod: 45.8,
      cod: 285.3,
      turbidity: 3.2,
      alerts: 3,
      lastUpdate: '2 min ago',
      plantType: 'Hotel',
      capacity: 150
    },
    {
      id: 2,
      name: 'Taj Industrial Complex',
      client: 'Taj Industries Pvt Ltd',
      location: 'Pune, Maharashtra',
      contact: '+91-20-87654321',
      email: 'plant@tajindustries.com',
      status: 'active',
      efficiency: 85.2,
      inflow: 250.0,
      treated: 245.0,
      reused: 180.5,
      bod: 22.1,
      cod: 195.3,
      turbidity: 2.8,
      alerts: 1,
      lastUpdate: '5 min ago',
      plantType: 'Industrial',
      capacity: 300
    },
    {
      id: 3,
      name: 'Green Valley Residency',
      client: 'Green Valley Housing Society',
      location: 'Bangalore, Karnataka',
      contact: '+91-80-98765432',
      email: 'admin@greenvalley.com',
      status: 'warning',
      efficiency: 65.8,
      inflow: 85.3,
      treated: 78.2,
      reused: 52.1,
      bod: 38.9,
      cod: 298.7,
      turbidity: 4.5,
      alerts: 5,
      lastUpdate: '1 min ago',
      plantType: 'Residential',
      capacity: 100
    },
    {
      id: 4,
      name: 'Royal Resort & Spa',
      client: 'Royal Hospitality Group',
      location: 'Goa, India',
      contact: '+91-83-11223344',
      email: 'stp@royalresort.com',
      status: 'active',
      efficiency: 91.3,
      inflow: 95.8,
      treated: 92.5,
      reused: 75.2,
      bod: 18.5,
      cod: 165.2,
      turbidity: 2.1,
      alerts: 0,
      lastUpdate: '3 min ago',
      plantType: 'Hotel',
      capacity: 120
    },
    {
      id: 5,
      name: 'Tech Park Phase 2',
      client: 'Tech Park Developers',
      location: 'Hyderabad, Telangana',
      contact: '+91-40-55443322',
      email: 'maintenance@techpark.com',
      status: 'offline',
      efficiency: 0,
      inflow: 0,
      treated: 0,
      reused: 0,
      bod: 0,
      cod: 0,
      turbidity: 0,
      alerts: 8,
      lastUpdate: '45 min ago',
      plantType: 'Commercial',
      capacity: 200
    }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalPlants: 5,
    activePlants: 4,
    totalAlerts: 17,
    criticalAlerts: 3,
    avgEfficiency: 78.7,
    totalCapacity: 870,
    totalInflow: 556.6,
    totalTreated: 533.9,
    totalReused: 393.5
  });

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlantFilter = selectedPlants.includes('all') || selectedPlants.includes(plant.id.toString());
    return matchesSearch && matchesPlantFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'offline': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 85) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAlertSeverityColor = (count) => {
    if (count === 0) return 'text-green-600';
    if (count <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const togglePlantSelection = (plantId) => {
    if (plantId === 'all') {
      setSelectedPlants(['all']);
    } else {
      const newSelection = selectedPlants.includes(plantId) 
        ? selectedPlants.filter(id => id !== plantId)
        : [...selectedPlants.filter(id => id !== 'all'), plantId];
      
      if (newSelection.length === 0) {
        setSelectedPlants(['all']);
      } else {
        setSelectedPlants(newSelection);
      }
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Reacto Platform</h1>
                  <p className="text-xs text-gray-500">System Administration</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg">Dashboard</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Plants</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Clients</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Analytics</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Settings</button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
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
            {/* Plant Filter */}
            <div className="relative">
              <button
                onClick={() => setShowPlantDropdown(!showPlantDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Building className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {selectedPlants.includes('all') ? 'All Plants' : `${selectedPlants.length} Selected`}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              
              {showPlantDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => togglePlantSelection('all')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedPlants.includes('all') ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Plants
                    </button>
                    {plants.map((plant) => (
                      <button
                        key={plant.id}
                        onClick={() => togglePlantSelection(plant.id.toString())}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedPlants.includes(plant.id.toString()) ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {plant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time Range */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Time Range:</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['1h', '6h', '24h', '7d', '30d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedTimeRange === range 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>

      <main className="p-6">
        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Plants</p>
                  <p className="text-xs text-gray-500">Registered facilities</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{systemStats.totalPlants}</span>
              <span className="ml-1 text-sm text-gray-500">plants</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{systemStats.activePlants} active</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                  <p className="text-xs text-gray-500">Combined MLD</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{systemStats.totalCapacity}</span>
              <span className="ml-1 text-sm text-gray-500">MLD</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span>64% utilized</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-xs text-gray-500">System-wide</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{systemStats.totalAlerts}</span>
              <span className="ml-1 text-sm text-gray-500">alerts</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{systemStats.criticalAlerts} critical</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                  <p className="text-xs text-gray-500">System performance</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${getEfficiencyColor(systemStats.avgEfficiency)}`}>
                {systemStats.avgEfficiency.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-500">%</span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span>+2.3% vs last week</span>
            </div>
          </div>
        </div>

        {/* Plants Grid */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Plant Overview</h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Download className="w-4 h-4 inline mr-1" />
                  Export
                </button>
                <button className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">
                  <Eye className="w-4 h-4 inline mr-1" />
                  View All
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plant Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Water Quality
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alerts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlants.map((plant) => (
                  <tr key={plant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{plant.name}</div>
                          <div className="text-sm text-gray-500">{plant.client}</div>
                          <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {plant.location}
                            </span>
                            <span className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {plant.contact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          plant.status === 'active' ? 'bg-green-500' :
                          plant.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plant.status)}`}>
                          {plant.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{plant.lastUpdate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Efficiency:</span>
                          <span className={`font-medium ${getEfficiencyColor(plant.efficiency)}`}>
                            {plant.efficiency.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Flow:</span>
                          <span className="text-gray-900">{plant.inflow.toFixed(1)} MLD</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${
                              plant.efficiency >= 85 ? 'bg-green-500' :
                              plant.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${plant.efficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">BOD:</span>
                          <span className={`font-medium ${plant.bod > 30 ? 'text-red-600' : 'text-green-600'}`}>
                            {plant.bod.toFixed(1)} mg/L
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">COD:</span>
                          <span className={`font-medium ${plant.cod > 250 ? 'text-red-600' : 'text-green-600'}`}>
                            {plant.cod.toFixed(1)} mg/L
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Turbidity:</span>
                          <span className={`font-medium ${plant.turbidity > 5 ? 'text-red-600' : 'text-green-600'}`}>
                            {plant.turbidity.toFixed(1)} NTU
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getAlertSeverityColor(plant.alerts)}`}>
                          {plant.alerts}
                        </div>
                        <div className="text-xs text-gray-500">active</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
