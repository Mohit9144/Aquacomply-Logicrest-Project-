import React, { useState } from 'react';
import { Settings, LogOut, Search, Filter, Server, CheckCircle, AlertTriangle, ArrowUpRight, ShieldAlert, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_PLANTS = [
  { id: 1, name: 'Main Residency STP', client: 'Apex Hospitality', capacity: 150, status: 'warning', bod: 28.4, cod: 210, location: 'North Sector' },
  { id: 2, name: 'Eco Resort Filters', client: 'Blue Lagoon', capacity: 300, status: 'normal', bod: 15.2, cod: 140, location: 'South Beach' },
  { id: 3, name: 'Chemical Unit 4', client: 'ChemCorp Ind.', capacity: 1000, status: 'critical', bod: 45.1, cod: 320, location: 'Industrial Zone A' },
  { id: 4, name: 'Westside Apartments', client: 'Urban Living', capacity: 80, status: 'normal', bod: 12.0, cod: 90, location: 'West End' },
  { id: 5, name: 'Textile Processing', client: 'FabricWorld', capacity: 450, status: 'warning', bod: 29.5, cod: 240, location: 'Industrial Zone B' },
  { id: 6, name: 'Downtown Plaza', client: 'City Malls', capacity: 120, status: 'normal', bod: 18.4, cod: 180, location: 'City Center' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filteredPlants = MOCK_PLANTS.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'normal': return <span className="badge-success">NORMAL</span>;
      case 'warning': return <span className="badge-warning">WARNING</span>;
      case 'critical': return <span className="badge-danger flex items-center gap-1"><ShieldAlert size={12}/> CRITICAL</span>;
      default: return null;
    }
  };

  const overviewStats = {
     total: MOCK_PLANTS.length,
     normal: MOCK_PLANTS.filter(p => p.status === 'normal').length,
     warning: MOCK_PLANTS.filter(p => p.status === 'warning').length,
     critical: MOCK_PLANTS.filter(p => p.status === 'critical').length,
  };

  return (
    <div className="min-h-screen bg-industrial-100 font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-industrial-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-industrial-800">
            <Server className="w-6 h-6 text-brand-main" />
            <h1 className="text-xl font-bold tracking-tight">System Control Center</h1>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm font-semibold text-industrial-500">Superadmin Privilege</span>
            <div className="h-8 w-px bg-industrial-200"></div>
            <button onClick={() => navigate('/login')} className="flex items-center space-x-2 text-sm font-medium text-industrial-600 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* System Overview KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-blue-500">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                 <Server size={24} />
              </div>
              <div>
                 <p className="text-sm text-industrial-500 font-medium tracking-wide">TOTAL PLANTS</p>
                 <h3 className="text-2xl font-bold text-industrial-900">{overviewStats.total}</h3>
              </div>
           </div>
           
           <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-emerald-500">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                 <CheckCircle size={24} />
              </div>
              <div>
                 <p className="text-sm text-industrial-500 font-medium tracking-wide">OPTIMAL STATE</p>
                 <h3 className="text-2xl font-bold text-industrial-900">{overviewStats.normal}</h3>
              </div>
           </div>

           <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-amber-500">
              <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                 <AlertTriangle size={24} />
              </div>
              <div>
                 <p className="text-sm text-industrial-500 font-medium tracking-wide">WARNING STATE</p>
                 <h3 className="text-2xl font-bold text-industrial-900">{overviewStats.warning}</h3>
              </div>
           </div>

           <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-rose-500">
              <div className="bg-rose-50 p-3 rounded-xl text-rose-600">
                 <ShieldAlert size={24} />
              </div>
              <div>
                 <p className="text-sm text-industrial-500 font-medium tracking-wide">CRITICAL ACTIONS</p>
                 <h3 className="text-2xl font-bold text-industrial-900">{overviewStats.critical}</h3>
              </div>
           </div>
        </div>

        {/* Global Controls / Slicers */}
        <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center space-x-3 w-full md:w-auto">
              {['all', 'normal', 'warning', 'critical'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                     filterStatus === status 
                        ? 'bg-industrial-800 text-white shadow-sm' 
                        : 'bg-industrial-100 text-industrial-600 hover:bg-industrial-200'
                  }`}
                >
                  {status === 'all' ? 'All Global Plants' : status}
                </button>
              ))}
           </div>
           
           <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-industrial-400 w-4 h-4" />
                 <input 
                    type="text" 
                    placeholder="Search plant or client..." 
                    className="input-field pl-9 h-10 py-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
              <button className="btn-secondary flex items-center h-10 px-4">
                 <Filter size={16} className="mr-2" /> Filters
              </button>
           </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {filteredPlants.map(plant => (
              <div key={plant.id} className="glass-card p-0 overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
                 <div className="p-5 border-b border-industrial-100 bg-white flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h3 className="text-lg font-bold text-industrial-900">{plant.name}</h3>
                           {getStatusBadge(plant.status)}
                        </div>
                        <div className="flex items-center text-sm text-industrial-500 font-medium">
                           <Building2 size={14} className="mr-1" /> {plant.client}
                           <span className="mx-2">•</span>
                           <MapPin size={14} className="mr-1" /> {plant.location}
                        </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-industrial-50 flex items-center justify-center text-brand-main opacity-0 group-hover:opacity-100 transition-opacity">
                       <ArrowUpRight size={18} />
                    </button>
                 </div>
                 
                 <div className="bg-industrial-50 p-5 grid grid-cols-3 gap-4">
                    <div className="text-center">
                       <p className="text-xs text-industrial-500 font-semibold mb-1 uppercase tracking-wide">Capacity</p>
                       <p className="text-xl font-bold text-industrial-800">{plant.capacity} <span className="text-sm font-medium">MLD</span></p>
                    </div>
                    <div className="text-center border-x border-industrial-200">
                       <p className="text-xs text-industrial-500 font-semibold mb-1 uppercase tracking-wide">BOD Level</p>
                       <p className={`text-xl font-bold ${plant.bod > 30 ? 'text-red-600' : plant.bod > 25 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {plant.bod.toFixed(1)} <span className="text-sm font-medium">mg/L</span>
                       </p>
                    </div>
                    <div className="text-center">
                       <p className="text-xs text-industrial-500 font-semibold mb-1 uppercase tracking-wide">COD Level</p>
                       <p className={`text-xl font-bold ${plant.cod > 250 ? 'text-red-600' : plant.cod > 200 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {plant.cod} <span className="text-sm font-medium">mg/L</span>
                       </p>
                    </div>
                 </div>

                 {/* Quick Action Bar for Critical/Warning Items */}
                 {(plant.status === 'critical' || plant.status === 'warning') && (
                    <div className={`p-3 text-sm font-semibold text-center hover:brightness-95 transition-all cursor-pointer ${
                       plant.status === 'critical' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                       Review Diagnostics & Alert Logs &rarr;
                    </div>
                 )}
              </div>
           ))}
           {filteredPlants.length === 0 && (
              <div className="col-span-full py-20 text-center text-industrial-500">
                 <Server size={48} className="mx-auto mb-4 opacity-20" />
                 <p className="text-lg font-medium">No plants match the current slicer criteria.</p>
              </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
