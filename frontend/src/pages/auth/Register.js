import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, User, Mail, ArrowRight, ArrowLeft, Droplets, Server, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-100 flex items-center justify-center p-4 relative overflow-hidden" style={{
      backgroundImage: 'radial-gradient(ellipse at top right, #e0f2fe 0%, transparent 60%), radial-gradient(ellipse at bottom left, #eff6ff 0%, transparent 40%)',
    }}>
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 relative z-10 animate-slide-up">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light text-brand-main mb-6 shadow-sm border border-brand-light">
            <Droplets size={32} />
          </div>
          <h2 className="text-3xl font-bold text-industrial-800 mb-2">Onboard Your Facility</h2>
          <p className="text-industrial-500">Register your Plant / STP to Reacto's Enterprise Monitoring Network</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-industrial-100 rounded-full z-0"></div>
          <div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-brand-main rounded-full z-0 transition-all duration-500"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>

          {[
            { id: 1, label: 'Organization' },
            { id: 2, label: 'Facility' },
            { id: 3, label: 'Sensors' }
          ].map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s.id
                ? 'bg-brand-main text-white shadow-md shadow-brand-main/30'
                : 'bg-white text-industrial-400 border-2 border-industrial-200'
                }`}>
                {step > s.id ? <CheckCircle size={20} /> : s.id}
              </div>
              <span className={`absolute -bottom-7 w-max text-xs font-semibold ${step >= s.id ? 'text-industrial-800' : 'text-industrial-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="animate-fade-in relative min-h-[220px]">
            {/* Step 1: Corporate Details */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-industrial-700 mb-1.5 flex items-center gap-2">
                      <Building2 size={16} /> Organization Name
                    </label>
                    <input type="text" required className="input-field" placeholder="e.g. Apex Hospitality Group" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-industrial-700 mb-1.5 flex items-center gap-2">
                      <User size={16} /> Primary Contact
                    </label>
                    <input type="text" required className="input-field" placeholder="John Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-industrial-700 mb-1.5 flex items-center gap-2">
                    <Mail size={16} /> Work Email
                  </label>
                  <input type="email" required className="input-field" placeholder="contact@organization.com" />
                </div>
              </div>
            )}

            {/* Step 2: Plant details */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-industrial-700 mb-1.5 flex items-center gap-2">
                    <Droplets size={16} /> Facility / STP Name
                  </label>
                  <input type="text" required className="input-field" placeholder="e.g. Main Residency STP" />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-industrial-700 mb-1.5 flex items-center gap-2">
                      <MapPin size={16} /> Location / Region
                    </label>
                    <input type="text" required className="input-field" placeholder="e.g. North Sector, Zone D" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-industrial-700 mb-1.5">Capacity (MLD)</label>
                    <input type="number" required className="input-field" placeholder="e.g. 150" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-industrial-700 mb-1.5">Industry Type</label>
                    <select className="input-field text-industrial-700">
                      <option>Hotel / Hospitality</option>
                      <option>Residential Complex</option>
                      <option>Chemical Industry</option>
                      <option>Food Processing</option>
                      <option>Textile</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Integration details */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="bg-brand-50 border border-brand-100 p-5 rounded-xl flex items-start gap-4 mb-6">
                  <Server size={24} className="text-brand-main mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-industrial-900 mb-1">IoT Setup Required</h4>
                    <p className="text-sm text-industrial-600">
                      Our engineering team will provision unique secure tokens for your PLC and sensor relays. By submitting, you agree to technical provisioning.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-industrial-700 mb-1.5">PLC/Controller Manufacturer (Optional)</label>
                  <input type="text" className="input-field" placeholder="e.g. Siemens, Allen Bradley" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-between items-center border-t border-industrial-200 pt-6">
            <button
              type="button"
              onClick={() => step > 1 ? setStep(step - 1) : navigate('/login')}
              className="flex items-center text-industrial-500 hover:text-industrial-800 font-medium transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              {step > 1 ? 'Go Back' : 'Cancel Registration'}
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>
              ) : (
                <>
                  {step === 3 ? 'Complete Setup' : 'Continue'}
                  {step !== 3 && <ArrowRight size={18} className="ml-2" />}
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Register;
