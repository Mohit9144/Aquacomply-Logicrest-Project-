import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IndustrialCharts = () => {
  // Historical data for BOD trends
  const bodData = [
    { time: '00:00', value: 28.5, limit: 30 },
    { time: '04:00', value: 31.2, limit: 30 },
    { time: '08:00', value: 35.8, limit: 30 },
    { time: '12:00', value: 42.1, limit: 30 },
    { time: '16:00', value: 45.8, limit: 30 },
    { time: '20:00', value: 38.4, limit: 30 },
    { time: '23:59', value: 41.2, limit: 30 },
  ];

  // COD trends
  const codData = [
    { time: '00:00', value: 245, limit: 250 },
    { time: '04:00', value: 258, limit: 250 },
    { time: '08:00', value: 272, limit: 250 },
    { time: '12:00', value: 285, limit: 250 },
    { time: '16:00', value: 291, limit: 250 },
    { time: '20:00', value: 278, limit: 250 },
    { time: '23:59', value: 285, limit: 250 },
  ];

  // Flow rate data
  const flowData = [
    { time: '00:00', inflow: 110, treated: 105, reused: 78 },
    { time: '04:00', inflow: 95, treated: 92, reused: 65 },
    { time: '08:00', inflow: 135, treated: 128, reused: 92 },
    { time: '12:00', inflow: 142, treated: 135, reused: 98 },
    { time: '16:00', inflow: 138, treated: 132, reused: 94 },
    { time: '20:00', inflow: 125, treated: 118, reused: 85 },
    { time: '23:59', inflow: 118, treated: 112, reused: 80 },
  ];

  // Efficiency breakdown
  const efficiencyData = [
    { name: 'Primary Treatment', value: 35, color: '#3b82f6' },
    { name: 'Secondary Treatment', value: 40, color: '#10b981' },
    { name: 'Tertiary Treatment', value: 20, color: '#f59e0b' },
    { name: 'Losses', value: 5, color: '#ef4444' },
  ];

  // Compliance status
  const complianceData = [
    { parameter: 'BOD', current: 45.8, limit: 30, status: 'critical' },
    { parameter: 'COD', current: 285.3, limit: 250, status: 'warning' },
    { parameter: 'Turbidity', current: 3.2, limit: 5, status: 'normal' },
    { parameter: 'pH', current: 7.2, limit: 8.5, status: 'normal' },
    { parameter: 'Chlorine', current: 0.8, limit: 2.0, status: 'normal' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'normal': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Series Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BOD Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">BOD Levels - 24 Hour Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                labelStyle={{ color: '#111827', fontWeight: 600 }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="BOD (mg/L)"
                dot={{ fill: '#ef4444', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="limit" 
                stroke="#6b7280" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Limit"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* COD Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">COD Levels - 24 Hour Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={codData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                labelStyle={{ color: '#111827', fontWeight: 600 }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="COD (mg/L)"
                dot={{ fill: '#f59e0b', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="limit" 
                stroke="#6b7280" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Limit"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flow Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Flow Analysis</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={flowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="inflow" 
              stackId="1"
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6}
              name="Inflow (MLD)"
            />
            <Area 
              type="monotone" 
              dataKey="treated" 
              stackId="2"
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.6}
              name="Treated (MLD)"
            />
            <Area 
              type="monotone" 
              dataKey="reused" 
              stackId="3"
              stroke="#8b5cf6" 
              fill="#8b5cf6" 
              fillOpacity={0.6}
              name="Reused (MLD)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Efficiency and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treatment Efficiency */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Efficiency Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={efficiencyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {efficiencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complianceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="parameter" type="category" stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                labelStyle={{ color: '#111827', fontWeight: 600 }}
              />
              <Bar dataKey="current" fill="#3b82f6" name="Current" />
              <Bar dataKey="limit" fill="#6b7280" name="Limit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndustrialCharts;
