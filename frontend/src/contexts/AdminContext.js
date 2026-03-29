import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../config/environment';

const AdminContext = createContext();

export const useAdminData = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [clients, setClients] = useState([]);
  const [plantsMonitoring, setPlantsMonitoring] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch admin dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl('/admin/dashboard'));
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients
  const fetchClients = async () => {
    try {
      const response = await axios.get(apiUrl('/admin/clients'));
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  // Fetch plants monitoring
  const fetchPlantsMonitoring = async () => {
    try {
      const response = await axios.get(apiUrl('/admin/plants-monitoring'));
      setPlantsMonitoring(response.data);
    } catch (error) {
      console.error('Failed to fetch plants monitoring:', error);
    }
  };

  // Fetch alerts
  const fetchAlerts = async () => {
    try {
      const response = await axios.get(apiUrl('/admin/alerts'));
      setAlerts(response.data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  // Fetch devices
  const fetchDevices = async () => {
    try {
      const response = await axios.get(apiUrl('/admin/devices'));
      setDevices(response.data);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    }
  };

  // Resolve alert
  const resolveAlert = async (alertId) => {
    try {
      await axios.post(apiUrl(`/admin/alerts/${alertId}/resolve`));
      // Update local state
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, status: 'resolved' } : alert
      ));
      return true;
    } catch (error) {
      console.error('Failed to resolve alert:', error);
      return false;
    }
  };

  // Create client
  const createClient = async (clientData) => {
    try {
      const response = await axios.post(apiUrl('/admin/clients'), clientData);
      setClients(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to create client:', error);
      return { success: false, error: error.response?.data?.detail || 'Failed to create client' };
    }
  };

  const value = {
    dashboardData,
    clients,
    plantsMonitoring,
    alerts,
    devices,
    loading,
    fetchDashboardData,
    fetchClients,
    fetchPlantsMonitoring,
    fetchAlerts,
    fetchDevices,
    resolveAlert,
    createClient
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
