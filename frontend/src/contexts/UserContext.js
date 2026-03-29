import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../config/environment';

const UserContext = createContext();

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl('/user/dashboard'));
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch live monitoring data
  const fetchLiveData = async () => {
    try {
      const response = await axios.get(apiUrl('/user/live-monitoring'));
      setLiveData(response.data);
    } catch (error) {
      console.error('Failed to fetch live data:', error);
    }
  };

  // Fetch alerts
  const fetchAlerts = async () => {
    try {
      const response = await axios.get(apiUrl('/user/alerts'));
      setAlerts(response.data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  // Fetch monthly summary
  const fetchMonthlySummary = async () => {
    try {
      const response = await axios.get(apiUrl('/user/monthly-summary'));
      setMonthlySummary(response.data);
    } catch (error) {
      console.error('Failed to fetch monthly summary:', error);
    }
  };

  // Mark alert as read
  const markAlertAsRead = async (alertId) => {
    try {
      await axios.post(apiUrl(`/user/alerts/${alertId}/mark-read`));
      // Update local state
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, status: 'read' } : alert
      ));
      return true;
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
      return false;
    }
  };

  const value = {
    dashboardData,
    liveData,
    alerts,
    monthlySummary,
    loading,
    fetchDashboardData,
    fetchLiveData,
    fetchAlerts,
    fetchMonthlySummary,
    markAlertAsRead
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
