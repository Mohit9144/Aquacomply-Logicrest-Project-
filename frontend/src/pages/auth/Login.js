import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Shield, Droplets, ArrowRight } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('owner');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'owner') {
      navigate('/owner/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-industrial-100 flex items-center justify-center p-4" style={{ 
      backgroundImage: 'radial-gradient(circle at 50% 0%, #e0f2fe 0%, transparent 60%), radial-gradient(circle at 100% 100%, #eff6ff 0%, transparent 40%)',
    }}>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden animate-slide-up">
        {/* Left Side: Branding & Visuals */}
        <div className="bg-brand-main p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-dark opacity-50 mix-blend-multiply blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-50 mix-blend-multiply blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10 flex items-center space-x-3 mb-10">
            <Droplets size={36} className="text-white" />
            <h1 className="text-3xl font-bold tracking-tight">Reacto Platform</h1>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-4 leading-snug">Enterprise Water Treatment Intelligence</h2>
            <p className="text-brand-light/90 text-lg mb-8">
              Real-time visibility, automated compliance, and actionable insights for your STP facilities.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-brand-light">
                <Shield size={20} className="text-blue-200" />
                <span>256-bit AES Encryption</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-brand-light">
                <Settings size={20} className="text-blue-200" />
                <span>99.9% Historical Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center animate-fade-in relative z-10 bg-white">
          <div className="mb-10 text-center md:text-left text-industrial-800">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-industrial-500">Sign in to your professional workspace</p>
          </div>

          <div className="flex p-1 bg-industrial-100 rounded-lg mb-8" role="group">
            <button
              onClick={() => setRole('owner')}
              className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                role === 'owner' 
                  ? 'bg-white text-brand-main shadow-sm ring-1 ring-industrial-200' 
                  : 'text-industrial-500 hover:text-industrial-700'
              }`}
            >
              Plant Owner
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                role === 'admin' 
                  ? 'bg-white text-brand-main shadow-sm ring-1 ring-industrial-200' 
                  : 'text-industrial-500 hover:text-industrial-700'
              }`}
            >
              System Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1.5">Email Address / User ID</label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="enterprise@domain.com"
                defaultValue={role === 'owner' ? "owner@reacto.com" : "admin@reacto.com"}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-industrial-700">Password</label>
                <a href="#" className="text-xs font-semibold text-brand-main hover:text-brand-dark transition-colors">Forgot password?</a>
              </div>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                defaultValue="password"
              />
            </div>

            <button type="submit" className="w-full btn-primary flex justify-center items-center space-x-2 mt-4">
              <span>Secure Login</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-industrial-500">
              New client?{' '}
              <button onClick={() => navigate('/register')} className="font-semibold text-brand-main hover:text-brand-dark transition-colors border-b border-transparent hover:border-brand-main">
                Register your plant
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
