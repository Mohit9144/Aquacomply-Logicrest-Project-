import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { wsUrl } from '../config/environment';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = (userId, role) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }

    const endpoint = wsUrl(`/ws/${userId}/${role}`);
    const ws = new WebSocket(endpoint);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setConnectionStatus('connected');
      reconnectAttempts.current = 0;
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
        
        // Handle different message types
        switch (message.type) {
          case 'sensor_update':
            console.log('Sensor update received:', message.data);
            break;
          case 'new_alert':
            console.log('New alert received:', message.data);
            // Could trigger notification here
            break;
          case 'live_data_update':
            console.log('Live data update received:', message.data);
            break;
          case 'plant_status_update':
            console.log('Plant status update received:', message.data);
            break;
          case 'pong':
            // Response to ping
            break;
          default:
            console.log('Unknown message type:', message.type, message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event);
      setIsConnected(false);
      setConnectionStatus('disconnected');
      setSocket(null);

      // Attempt to reconnect if not manually closed
      if (!event.wasClean && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        setConnectionStatus('reconnecting');
        
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current})`);
        
        reconnectTimeoutRef.current = setTimeout(() => {
          connect(userId, role);
        }, delay);
      } else if (reconnectAttempts.current >= maxReconnectAttempts) {
        setConnectionStatus('failed');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
    };

    // Set up ping interval to keep connection alive
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Ping every 30 seconds

    // Store cleanup function
    ws.pingInterval = pingInterval;
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (socket) {
      if (socket.pingInterval) {
        clearInterval(socket.pingInterval);
      }
      socket.close(1000, 'Manual disconnect');
      setSocket(null);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      return true;
    }
    return false;
  };

  const subscribeToLiveData = () => {
    return sendMessage({
      type: 'subscribe',
      subscription: 'live_data'
    });
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const value = {
    socket,
    isConnected,
    connectionStatus,
    lastMessage,
    connect,
    disconnect,
    sendMessage,
    subscribeToLiveData
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
