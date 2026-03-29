import React, { useState } from 'react';
import { 
  Droplets, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Settings,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Shield,
  Zap,
  Activity
} from 'lucide-react';

const PlantRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    plantName: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    plantType: '',
    capacity: '',
    
    // Step 2: Location Details
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Step 3: Technical Specifications
    treatmentType: '',
    inflowCapacity: '',
    technology: '',
    automationLevel: '',
    
    // Step 4: Contact & Support
    technicalContact: '',
    technicalEmail: '',
    technicalPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Step 5: Documentation
    agreeTerms: false,
    agreePrivacy: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plantTypes = [
    { id: 'hotel', name: 'Hotel & Resort', icon: Building, description: 'Hospitality industry wastewater treatment' },
    { id: 'industrial', name: 'Industrial', icon: Settings, description: 'Manufacturing and industrial effluent treatment' },
    { id: 'residential', name: 'Residential', icon: Users, description: 'Apartment complexes and housing societies' },
    { id: 'commercial', name: 'Commercial', icon: Building, description: 'Office buildings and commercial complexes' }
  ];

  const treatmentTypes = [
    { id: 'mbr', name: 'MBR (Membrane Bioreactor)', description: 'Advanced membrane technology' },
    { id: 'sbr', name: 'SBR (Sequencing Batch Reactor)', description: 'Batch treatment process' },
    { id: 'asp', name: 'ASP (Activated Sludge Process)', description: 'Conventional treatment method' },
    { id: 'stp', name: 'STP (Sewage Treatment Plant)', description: 'Standard sewage treatment' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.plantName) newErrors.plantName = 'Plant name is required';
      if (!formData.clientName) newErrors.clientName = 'Client name is required';
      if (!formData.clientEmail) newErrors.clientEmail = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) newErrors.clientEmail = 'Invalid email format';
      if (!formData.clientPhone) newErrors.clientPhone = 'Phone number is required';
      if (!formData.plantType) newErrors.plantType = 'Plant type is required';
      if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    }
    
    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    }
    
    if (step === 3) {
      if (!formData.treatmentType) newErrors.treatmentType = 'Treatment type is required';
      if (!formData.inflowCapacity) newErrors.inflowCapacity = 'Inflow capacity is required';
      if (!formData.technology) newErrors.technology = 'Technology is required';
      if (!formData.automationLevel) newErrors.automationLevel = 'Automation level is required';
    }
    
    if (step === 4) {
      if (!formData.technicalContact) newErrors.technicalContact = 'Technical contact is required';
      if (!formData.technicalEmail) newErrors.technicalEmail = 'Technical email is required';
      if (!formData.technicalPhone) newErrors.technicalPhone = 'Technical phone is required';
      if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency phone is required';
    }
    
    if (step === 5) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';
      if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Plant registration successful! We will contact you within 24 hours.');
      // Reset form or redirect
    }, 2000);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : step < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 5 && (
                <div
                  className={`w-20 h-1 mx-2 transition-colors ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Basic Info</span>
          <span>Location</span>
          <span>Technical</span>
          <span>Contacts</span>
          <span>Review</span>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <p className="text-gray-600 mb-6">Tell us about your plant and organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plant Name *</label>
          <input
            type="text"
            name="plantName"
            value={formData.plantName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.plantName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., Hotel Paradise STP"
          />
          {errors.plantName && <p className="mt-1 text-sm text-red-600">{errors.plantName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.clientName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., Hotel Paradise Ltd"
          />
          {errors.clientName && <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 border ${errors.clientEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="client@example.com"
            />
          </div>
          {errors.clientEmail && <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 border ${errors.clientPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="+91-9876543210"
            />
          </div>
          {errors.clientPhone && <p className="mt-1 text-sm text-red-600">{errors.clientPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plant Type *</label>
          <select
            name="plantType"
            value={formData.plantType}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.plantType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">Select plant type</option>
            {plantTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          {errors.plantType && <p className="mt-1 text-sm text-red-600">{errors.plantType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plant Capacity (MLD) *</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., 150"
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
        <p className="text-gray-600 mb-6">Where is your plant located?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Complete address with landmark"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., Mumbai"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., Maharashtra"
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., 400001"
          />
          {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            disabled
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
        <p className="text-gray-600 mb-6">Tell us about your plant's technical details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Type *</label>
          <select
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.treatmentType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">Select treatment type</option>
            {treatmentTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          {errors.treatmentType && <p className="mt-1 text-sm text-red-600">{errors.treatmentType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Inflow Capacity (MLD) *</label>
          <input
            type="number"
            name="inflowCapacity"
            value={formData.inflowCapacity}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.inflowCapacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., 150"
          />
          {errors.inflowCapacity && <p className="mt-1 text-sm text-red-600">{errors.inflowCapacity}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technology Used *</label>
          <input
            type="text"
            name="technology"
            value={formData.technology}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.technology ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="e.g., MBR Technology, Ultrafiltration"
          />
          {errors.technology && <p className="mt-1 text-sm text-red-600">{errors.technology}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Automation Level *</label>
          <select
            name="automationLevel"
            value={formData.automationLevel}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.automationLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">Select automation level</option>
            <option value="manual">Manual</option>
            <option value="semi-auto">Semi-Automatic</option>
            <option value="full-auto">Fully Automatic</option>
            <option value="smart">Smart System</option>
          </select>
          {errors.automationLevel && <p className="mt-1 text-sm text-red-600">{errors.automationLevel}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Support</h3>
        <p className="text-gray-600 mb-6">Technical and emergency contact information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technical Contact Person *</label>
          <input
            type="text"
            name="technicalContact"
            value={formData.technicalContact}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.technicalContact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Name of technical person"
          />
          {errors.technicalContact && <p className="mt-1 text-sm text-red-600">{errors.technicalContact}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technical Email *</label>
          <input
            type="email"
            name="technicalEmail"
            value={formData.technicalEmail}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.technicalEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="technical@example.com"
          />
          {errors.technicalEmail && <p className="mt-1 text-sm text-red-600">{errors.technicalEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technical Phone *</label>
          <input
            type="tel"
            name="technicalPhone"
            value={formData.technicalPhone}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.technicalPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="+91-9876543210"
          />
          {errors.technicalPhone && <p className="mt-1 text-sm text-red-600">{errors.technicalPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Person *</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Emergency contact name"
          />
          {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone *</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="+91-9876543210"
          />
          {errors.emergencyPhone && <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Submit</h3>
        <p className="text-gray-600 mb-6">Please review your information and agree to terms</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Plant Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Plant Name:</span>
            <span className="ml-2 font-medium">{formData.plantName}</span>
          </div>
          <div>
            <span className="text-gray-600">Client:</span>
            <span className="ml-2 font-medium">{formData.clientName}</span>
          </div>
          <div>
            <span className="text-gray-600">Type:</span>
            <span className="ml-2 font-medium">{formData.plantType}</span>
          </div>
          <div>
            <span className="text-gray-600">Capacity:</span>
            <span className="ml-2 font-medium">{formData.capacity} MLD</span>
          </div>
          <div>
            <span className="text-gray-600">Location:</span>
            <span className="ml-2 font-medium">{formData.city}, {formData.state}</span>
          </div>
          <div>
            <span className="text-gray-600">Treatment:</span>
            <span className="ml-2 font-medium">{formData.treatmentType}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            className={`mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${errors.agreeTerms ? 'border-red-500' : ''}`}
          />
          <label className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms and Conditions</a> and understand that Reacto Platform will process my plant data for monitoring purposes.
          </label>
        </div>
        {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreePrivacy"
            checked={formData.agreePrivacy}
            onChange={handleInputChange}
            className={`mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${errors.agreePrivacy ? 'border-red-500' : ''}`}
          />
          <label className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a> and consent to the collection and processing of my personal information.
          </label>
        </div>
        {errors.agreePrivacy && <p className="mt-1 text-sm text-red-600">{errors.agreePrivacy}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reacto Platform</h1>
              <p className="text-xs text-gray-500">Plant Registration</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="p-8">
            {renderProgressBar()}

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? Contact us at <a href="mailto:support@reacto.com" className="text-blue-600 hover:text-blue-800">support@reacto.com</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default PlantRegistration;
