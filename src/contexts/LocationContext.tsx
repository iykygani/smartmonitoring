import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  safetyScore: number;
}

interface LocationContextType {
  currentLocation: Location | null;
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  updateLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>({
    latitude: 26.1445,
    longitude: 91.7362,
    address: 'Guwahati Central',
    safetyScore: 85
  });
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = () => {
    setIsTracking(true);
    // In a real app, this would start GPS tracking
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const updateLocation = (location: Location) => {
    setCurrentLocation(location);
  };

  // Simulate location updates
  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        // Simulate minor location changes
        if (currentLocation) {
          const newLocation = {
            ...currentLocation,
            latitude: currentLocation.latitude + (Math.random() - 0.5) * 0.001,
            longitude: currentLocation.longitude + (Math.random() - 0.5) * 0.001,
          };
          setCurrentLocation(newLocation);
        }
      }, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isTracking, currentLocation]);

  const value = {
    currentLocation,
    isTracking,
    startTracking,
    stopTracking,
    updateLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}