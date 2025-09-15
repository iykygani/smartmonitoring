import React, { useState, useEffect } from 'react';
import { Router } from './components/Router';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { AlertProvider } from './contexts/AlertContext';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <AlertProvider>
          <div className="min-h-screen bg-gray-50">
            <Router />
          </div>
        </AlertProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;