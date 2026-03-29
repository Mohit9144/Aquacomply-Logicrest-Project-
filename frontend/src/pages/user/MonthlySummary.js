import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../contexts/UserContext';
import { Droplets, BarChart3, TrendingUp, DropletIcon, Recycle } from 'lucide-react';

const UserMonthlySummary = () => {
  const { monthlySummary, fetchMonthlySummary } = useUserData();

  useEffect(() => {
    fetchMonthlySummary();
  }, [fetchMonthlySummary]);

  if (!monthlySummary) {
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
              <h1 className="text-xl font-bold text-gray-900">Monthly Summary</h1>
            </div>
            <Link to="/user/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{monthlySummary.month}</h2>
          <p className="text-gray-600 mt-2">Performance overview and water treatment metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg BOD</p>
                <p className="text-2xl font-bold text-gray-900">{monthlySummary.avg_bod.toFixed(1)}</p>
                <p className="text-xs text-gray-500">mg/L</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span className={`text-xs font-medium ${
                  monthlySummary.avg_bod <= 30 ? 'text-success-600' : 'text-warning-600'
                }`}>
                  {monthlySummary.avg_bod <= 30 ? 'Good' : 'Needs Attention'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg COD</p>
                <p className="text-2xl font-bold text-gray-900">{monthlySummary.avg_cod.toFixed(1)}</p>
                <p className="text-xs text-gray-500">mg/L</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span className={`text-xs font-medium ${
                  monthlySummary.avg_cod <= 250 ? 'text-success-600' : 'text-warning-600'
                }`}>
                  {monthlySummary.avg_cod <= 250 ? 'Good' : 'Needs Attention'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <DropletIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Treated Water</p>
                <p className="text-2xl font-bold text-gray-900">{monthlySummary.total_water_treated.toFixed(1)}</p>
                <p className="text-xs text-gray-500">MLD</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Daily Avg</span>
                <span className="text-xs font-medium text-gray-700">
                  {(monthlySummary.total_water_treated / 30).toFixed(1)} MLD
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Reused Water</p>
                <p className="text-2xl font-bold text-gray-900">{monthlySummary.total_water_reused.toFixed(1)}</p>
                <p className="text-xs text-gray-500">MLD</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Efficiency</span>
                <span className="text-xs font-medium text-success-600">
                  {monthlySummary.efficiency_percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Reuse Efficiency</h3>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div 
                className="bg-gradient-to-r from-success-500 to-success-600 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                style={{ width: `${Math.min(monthlySummary.efficiency_percentage, 100)}%` }}
              >
                {monthlySummary.efficiency_percentage.toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-gray-600">Total Treated</p>
              <p className="font-semibold text-gray-900">{monthlySummary.total_water_treated.toFixed(1)} MLD</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-gray-600">Total Reused</p>
              <p className="font-semibold text-success-600">{monthlySummary.total_water_reused.toFixed(1)} MLD</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-gray-600">Savings</p>
              <p className="font-semibold text-blue-600">
                {((monthlySummary.total_water_reused * 1000).toFixed(0))} KL/month
              </p>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Quality Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">BOD Levels</span>
                  <span className={`text-sm font-medium ${
                    monthlySummary.avg_bod <= 30 ? 'text-success-600' : 'text-warning-600'
                  }`}>
                    {monthlySummary.avg_bod.toFixed(1)} mg/L
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      monthlySummary.avg_bod <= 30 ? 'bg-success-500' : 'bg-warning-500'
                    }`}
                    style={{ width: `${Math.min((monthlySummary.avg_bod / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Standard: ≤30 mg/L</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">COD Levels</span>
                  <span className={`text-sm font-medium ${
                    monthlySummary.avg_cod <= 250 ? 'text-success-600' : 'text-warning-600'
                  }`}>
                    {monthlySummary.avg_cod.toFixed(1)} mg/L
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      monthlySummary.avg_cod <= 250 ? 'bg-success-500' : 'bg-warning-500'
                    }`}
                    style={{ width: `${Math.min((monthlySummary.avg_cod / 400) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Standard: ≤250 mg/L</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  monthlySummary.efficiency_percentage >= 70 ? 'bg-success-500' : 'bg-warning-500'
                }`}></div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Reuse Efficiency</p>
                  <p className="text-xs text-gray-600">
                    {monthlySummary.efficiency_percentage >= 70 
                      ? 'Excellent water reuse performance' 
                      : 'Room for improvement in water reuse'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  monthlySummary.avg_bod <= 30 && monthlySummary.avg_cod <= 250 ? 'bg-success-500' : 'bg-warning-500'
                }`}></div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Compliance Status</p>
                  <p className="text-xs text-gray-600">
                    {monthlySummary.avg_bod <= 30 && monthlySummary.avg_cod <= 250 
                      ? 'Meeting environmental standards' 
                      : 'Some parameters exceed limits'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-1.5 bg-blue-500"></div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Cost Savings</p>
                  <p className="text-xs text-gray-600">
                    Estimated monthly savings: ₹{((monthlySummary.total_water_reused * 1000) * 15).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Priorities */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Operational Priorities for Next Month</h3>
          <div className="space-y-2 text-blue-800">
            {monthlySummary.avg_bod > 30 && (
              <p>• Focus on reducing BOD levels through improved aeration and biological treatment.</p>
            )}
            {monthlySummary.avg_cod > 250 && (
              <p>• Optimize chemical dosing and filtration to control COD levels.</p>
            )}
            {monthlySummary.efficiency_percentage < 70 && (
              <p>• Implement additional water reuse strategies to improve efficiency.</p>
            )}
            {monthlySummary.efficiency_percentage >= 70 && monthlySummary.avg_bod <= 30 && monthlySummary.avg_cod <= 250 && (
              <p>• Maintain current performance levels and consider expanding reuse applications.</p>
            )}
            <p>• Schedule regular maintenance to ensure consistent treatment quality.</p>
            <p>• Monitor sensor calibration for accurate measurements.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserMonthlySummary;
