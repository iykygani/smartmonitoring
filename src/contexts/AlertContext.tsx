import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Alert {
  id: number;
  type: 'emergency' | 'warning' | 'info' | 'success';
  message: string;
  time: string;
  tourist?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'time'>) => void;
  removeAlert: (id: number) => void;
  clearAlerts: () => void;
  emergencyAlert: (location: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alertData: Omit<Alert, 'id' | 'time'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now(),
      time: new Date().toLocaleTimeString()
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const emergencyAlert = (location: string) => {
    addAlert({
      type: 'emergency',
      message: 'EMERGENCY ALERT SENT - Authorities and emergency contacts notified',
      priority: 'high',
      location
    });

    // Simulate emergency response
    setTimeout(() => {
      addAlert({
        type: 'success',
        message: 'Emergency services dispatched to your location. Estimated arrival: 3-5 minutes.',
        priority: 'high',
        location
      });
    }, 2000);
  };

  const value = {
    alerts,
    addAlert,
    removeAlert,
    clearAlerts,
    emergencyAlert
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}