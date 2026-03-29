import React, { useState, useEffect } from 'react';
import { Settings, LogOut, Bell, Activity, Droplets, Filter, AlertTriangle, CheckCircle, TrendingDown, RefreshCcw, ShieldCheck, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    bod: 28.4,
    cod: 185.0,
    turbidity: 4.2,
    chlorine: 0.6,
    ph: 7.2,
    inflow: 125,
    treated: 120,
    efficiency: 96,
  });

  // Simulated live telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => ({
        ...prev,
        bod: +(prev.bod + (Math.random() - 0.5)).toFixed(1),
        cod: +(prev.cod + (Math.random() - 0.5) * 5).toFixed(1),
        turbidity: +(prev.turbidity + (Math.random() - 0.5) * 0.2).toFixed(1),
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Status computation logic
  const getBODStatus = (val) => val > 30 ? 'bg-rose-50 text-rose-700 border-rose-200' : val > 25 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
  const getCODStatus = (val) => val > 250 ? 'bg-rose-50 text-rose-700 border-rose-200' : val > 200 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  return (
    <div className="min-h-screen bg-[#f3f7fa] font-sans">
      {/* Enterprise Deep Blue Header matching Landing Page */}
      <header className="bg-[#00142b] border-b border-[#0a315e] sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            
            {/* Nav Reacto Logo (Same vector styling as landing page) */}
            <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate('/')}>
               <div className="relative flex items-center justify-center h-[38px] w-[38px] bg-gradient-to-br from-[#4fc3f7] to-[#005ea8] rounded-full shadow-inner group-hover:scale-105 transition-all duration-500 overflow-hidden">
                   <Droplets size={22} className="text-white relative z-10 fill-white" />
                   <div className="absolute -bottom-2 -left-2 w-full h-full border-[3px] border-[#2e7d32] rounded-full opacity-90 group-hover:rotate-180 transition-transform duration-[1.5s] ease-in-out"></div>
                   <div className="absolute -top-1 -right-1 w-6 h-6 border-[2px] border-[#f57c00] rounded-full opacity-70"></div>
               </div>
               <span className="text-[26px] font-black tracking-tighter text-white uppercase">REACT<span className="text-[#4fc3f7]">O</span></span>
            </div>
            
            <div className="h-8 w-px bg-white/20"></div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Apex Hospitality Group <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </h1>
              <p className="text-[13px] text-[#8fbdeb] font-medium tracking-wide">Main Residency STP (150 MLD) · Sector 4</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Live Telemetry Ping */}
            <div className="hidden md:flex items-center gap-2 bg-[#001f42] border border-[#005ea8]/50 px-4 py-1.5 rounded-full shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fc3f7] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4fc3f7]"></span>
                </span>
                <span className="text-[#a0c4eb] font-bold text-[10px] uppercase tracking-widest">Global Telemetry Active</span>
            </div>

            <button className="relative p-2 text-white/70 hover:text-white transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#00142b]"></span>
            </button>
            <div className="h-8 w-px bg-white/20"></div>
            <button onClick={() => navigate('/login')} className="flex items-center space-x-2 text-sm font-bold text-white/70 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-md hover:bg-rose-500/20 hover:text-rose-400">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Plant Overview & Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold text-[#133d6b] tracking-tight">Plant Performance Console</h2>
          <div className="flex items-center space-x-2 text-[13px] bg-emerald-500/10 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200 font-bold shadow-sm uppercase tracking-widest">
            <RefreshCcw className="w-4 h-4 mr-1 animate-spin text-emerald-500" />
            Live Sync: Online
          </div>
        </div>

        {/* Realistic Treatment Visualization Overhauled */}
        <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <h3 className="text-lg font-bold text-[#133d6b] mb-8 flex items-center">
             <Cpu className="w-5 h-5 mr-2 text-[#00a6ed]" /> Treatment Process Flowboard
          </h3>
          
          <div className="flex flex-col md:flex-row items-stretch justify-between relative z-10">
             {/* Incoming Water */}
             <div className="flex-1 bg-[#f8fbff] rounded-2xl p-6 border border-[#e1eef9] flex flex-col items-center">
               <span className="text-sm font-black text-[#5a7b9e] uppercase tracking-widest mb-6">Incoming Raw Effluent</span>
               <div className="w-36 h-36 rounded-full border-4 border-[#cbdcff] flex items-center justify-center shadow-lg relative bg-gradient-to-b from-[#8fbdeb] to-[#5a7b9e]">
                 <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/40 animate-[spin_10s_linear_infinite]"></div>
                 <div className="relative z-10 text-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm">
                    <span className="block text-3xl font-black text-[#133d6b]">{data.inflow}</span>
                    <span className="text-[10px] font-bold text-[#5a7b9e] uppercase tracking-widest">MLD Inflow</span>
                 </div>
               </div>
             </div>

             {/* Connecting Animated Pipe */}
             <div className="hidden md:flex flex-col items-center justify-center relative w-32">
               <div className="absolute w-full h-3 bg-[#e1eef9] rounded-full overflow-hidden">
                 <div className="w-full h-full bg-[#4fc3f7] origin-left animate-[pulse_1s_ease-in-out_infinite]"></div>
               </div>
               <div className="absolute top-1/2 -translate-y-1/2 w-14 h-14 bg-white border-4 border-[#005ea8] shadow-[0_0_15px_rgba(0,94,168,0.2)] rounded-2xl flex items-center justify-center z-10">
                  <Filter className="text-[#005ea8] w-6 h-6" />
               </div>
             </div>

             {/* Outgoing Clean Water */}
             <div className="flex-1 bg-gradient-to-br from-[#ebf5fb] to-[#e1f0fa] rounded-2xl p-6 border border-[#b3daff] flex flex-col items-center shadow-inner relative overflow-hidden">
               {/* Background shine effect */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
               
               <span className="text-sm font-black text-[#005ea8] uppercase tracking-widest mb-6 relative z-10">Purified Permeate</span>
               <div className="w-36 h-36 rounded-full border-4 border-[#4fc3f7] flex items-center justify-center shadow-[0_0_30px_rgba(79,195,247,0.3)] relative bg-gradient-to-b from-[#e1f0fa] to-[#4fc3f7]">
                 <div className="absolute inset-2 rounded-full border-2 border-[#b3daff] animate-[ping_3s_ease-in-out_infinite]"></div>
                 <div className="relative z-10 text-center bg-white/95 px-4 py-2 rounded-lg shadow-sm">
                    <span className="block text-3xl font-black text-[#005ea8]">{data.treated}</span>
                    <span className="text-[10px] font-bold text-[#5a7b9e] uppercase tracking-widest">MLD Outflow</span>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Live Sensor Metrics Grid */}
        <div>
           <h3 className="text-lg font-bold text-[#133d6b] flex items-center mb-4 mt-2">
              <Activity className="w-5 h-5 mr-2 text-[#00a6ed]" /> Primary Telemetry Sensors
           </h3>

           <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
              {/* BOD Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[13px] font-extrabold text-[#5a7b9e] uppercase tracking-widest">BOD</span>
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border ${getBODStatus(data.bod)}`}>
                          {data.bod > 30 ? 'CRITICAL' : data.bod > 25 ? 'WARNING' : 'NORMAL'}
                       </span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                       <span className="text-4xl font-black text-[#133d6b] group-hover:text-[#005ea8] transition-colors">{data.bod.toFixed(1)}</span>
                       <span className="text-sm font-bold text-[#8fbdeb]">mg/L</span>
                    </div>
                 </div>
                 <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between tracking-wide font-medium text-[11px] text-[#5a7b9e]">
                    <span>Threshold: ≤30.0</span>
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                 </div>
              </div>

              {/* COD Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[13px] font-extrabold text-[#5a7b9e] uppercase tracking-widest">COD</span>
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border ${getCODStatus(data.cod)}`}>
                          {data.cod > 250 ? 'CRITICAL' : data.cod > 200 ? 'WARNING' : 'NORMAL'}
                       </span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                       <span className="text-4xl font-black text-[#133d6b] group-hover:text-[#005ea8] transition-colors">{Math.round(data.cod)}</span>
                       <span className="text-sm font-bold text-[#8fbdeb]">mg/L</span>
                    </div>
                 </div>
                 <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between tracking-wide font-medium text-[11px] text-[#5a7b9e]">
                    <span>Threshold: ≤250.0</span>
                 </div>
              </div>

              {/* Turbidity */}
              <div className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[13px] font-extrabold text-[#5a7b9e] uppercase tracking-widest">Turbidity</span>
                       <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border bg-emerald-50 text-emerald-700 border-emerald-200">NORMAL</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                       <span className="text-4xl font-black text-[#133d6b] group-hover:text-[#005ea8] transition-colors">{data.turbidity.toFixed(1)}</span>
                       <span className="text-sm font-bold text-[#8fbdeb]">NTU</span>
                    </div>
                 </div>
                 <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between tracking-wide font-medium text-[11px] text-[#5a7b9e]">
                    <span>Target: &lt;5.0</span>
                 </div>
              </div>

              {/* Chlorine */}
              <div className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[13px] font-extrabold text-[#5a7b9e] uppercase tracking-widest">Chlorine</span>
                       <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border bg-emerald-50 text-emerald-700 border-emerald-200">NORMAL</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                       <span className="text-4xl font-black text-[#133d6b] group-hover:text-[#005ea8] transition-colors">{data.chlorine}</span>
                       <span className="text-sm font-bold text-[#8fbdeb]">mg/L</span>
                    </div>
                 </div>
                 <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between tracking-wide font-medium text-[11px] text-[#5a7b9e]">
                    <span>Target: ~0.5</span>
                 </div>
              </div>

              {/* pH Level */}
              <div className="bg-white p-5 rounded-xl border border-t-4 border-t-[#4fc3f7] shadow-lg group flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute right-0 top-0 opacity-[0.03] transform scale-150 -translate-y-4 translate-x-4">
                    <Droplets size={120} />
                 </div>
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[13px] font-extrabold text-[#133d6b] uppercase tracking-widest">pH Level</span>
                       <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border bg-[#4fc3f7]/20 text-[#005ea8] border-[#4fc3f7]/40">OPTIMAL</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                       <span className="text-5xl font-black text-[#005ea8]">{data.ph}</span>
                    </div>
                 </div>
                 <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between tracking-wide font-medium text-[11px] text-[#5a7b9e] relative z-10">
                    <span>Range: 6.5 - 8.5</span>
                 </div>
              </div>
           </div>
        </div>

      {/* Operations Insight & Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
           {/* Alerts */}
           <div className="bg-white border border-gray-200/60 rounded-xl rounded-t-lg overflow-hidden shadow-sm">
              <div className="bg-white p-5 text-[#133d6b] flex flex-col items-start border-b border-gray-100">
                  <h3 className="font-extrabold text-lg flex items-center">
                     <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" /> System Action Required
                  </h3>
              </div>
              <div className="p-5 space-y-4">
                 <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                       <span className="font-extrabold text-rose-800 text-[14px]">Elevated BOD Detected</span>
                       <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">2 mins ago</span>
                    </div>
                    <p className="text-[13px] font-medium text-rose-700/80 mt-1">BOD levels are actively approaching critical threshold (28.4 mg/L).</p>
                 </div>
                 <div className="p-4 bg-[#f8fbff] border border-[#e1eef9] rounded-lg shadow-sm flex items-center justify-between group">
                    <div>
                        <span className="font-extrabold text-[#133d6b] text-[14px] block">Sensor Calibration Reminder</span>
                        <span className="text-[13px] font-medium text-[#5a7b9e]">Turbidity sensor 1B needs standard calibration block.</span>
                    </div>
                    <button className="text-[11px] font-black tracking-widest bg-white border border-[#4fc3f7] text-[#00a6ed] px-3 py-1.5 rounded uppercase hover:bg-[#4fc3f7] hover:text-white transition">Done</button>
                 </div>
              </div>
           </div>

           {/* Reacto Operations Insight Terminal */}
           <div className="bg-[#00142b] border border-[#0a315e] rounded-xl overflow-hidden shadow-xl flex flex-col">
              <div className="bg-gradient-to-r from-[#00142b] to-[#01254d] p-5 flex items-start justify-between border-b border-[#0a315e]">
                 <div className="text-white">
                    <h3 className="font-extrabold text-lg flex items-center tracking-tight text-white gap-2">
                       <span className="bg-gradient-to-r from-[#4fc3f7] to-white bg-clip-text text-transparent">Reacto Ops™</span> Cortex
                    </h3>
                    <p className="text-[12px] text-[#4fc3f7] font-bold mt-1 uppercase tracking-widest">Live Operations Engine</p>
                 </div>
                 <div className="bg-[#005ea8]/30 px-3 py-1.5 rounded-full border border-[#4fc3f7]/30 flex items-center gap-2">
                    <Activity className="text-[#4fc3f7] w-4 h-4 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Processing</span>
                 </div>
              </div>
              <div className="p-6 flex-1 space-y-5">
                 <div className="flex items-start gap-4">
                    <div className="bg-[#4fc3f7]/10 p-2 rounded shrink-0">
                       <CheckCircle className="w-5 h-5 text-[#4fc3f7]" />
                    </div>
                    <div>
                       <p className="text-[14px] text-white/90 leading-relaxed font-medium">System identifies a slight upward trend in biological oxygen demand processing.</p>
                       <div className="mt-2 bg-[#001f42] border border-[#4fc3f7]/20 p-3 rounded-md">
                              <span className="text-[#4fc3f7] font-extrabold text-sm uppercase tracking-wider block mb-1">Operational Guidance</span>
                           <span className="text-white text-sm font-medium">Increase aeration flow in sequential batch reactor #2 by <span className="text-amber-400 font-bold">15%</span> to maintain optimal DO levels and preempt violation.</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-[#4fc3f7]/10 p-2 rounded shrink-0">
                       <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-[14px] text-emerald-100/80 leading-relaxed font-medium mt-1">Chemical dosing algorithms are operating optimally for the detected inflow volume.</p>
                 </div>
              </div>
              <div className="bg-[#000f22] p-3 text-center border-t border-[#0a315e]">
                  <button className="text-[12px] font-black text-[#4fc3f7] uppercase tracking-widest hover:text-white transition-colors">
                     Execute Optimization Plan &rarr;
                  </button>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

export default OwnerDashboard;
