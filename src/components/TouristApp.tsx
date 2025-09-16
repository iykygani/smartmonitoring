import React, { useState, useEffect } from 'react';
import { Shield, MapPin, AlertTriangle, Phone, Users, Navigation, Clock, Battery } from 'lucide-react';

export function TouristApp() {
  const [currentLocation, setCurrentLocation] = useState('Guwahati Central');
  const [safetyScore, setSafetyScore] = useState(85);
  const [isTracking, setIsTracking] = useState(true);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info', message: 'Welcome to Guwahati! Stay safe and enjoy your visit.', time: '10:30 AM' },
    { id: 2, type: 'warning', message: 'Heavy rainfall expected in the afternoon. Plan accordingly.', time: '9:15 AM' }
  ]);

  const [nearbyRisks] = useState([
    { name: 'Construction Zone', distance: '0.5 km', level: 'low' },
    { name: 'Political Rally Route', distance: '1.2 km', level: 'medium' },
  ]);

  const handlePanicButton = () => {
    const newAlert = {
      id: Date.now(),
      type: 'emergency',
      message: 'EMERGENCY ALERT SENT - Authorities and emergency contacts notified',
      time: new Date().toLocaleTimeString()
    };
    setAlerts([newAlert, ...alerts]);
    
    // Simulate emergency response
    setTimeout(() => {
      const responseAlert = {
        id: Date.now() + 1,
        type: 'success',
        message: 'Emergency services dispatched to your location. Estimated arrival: 3-5 minutes.',
        time: new Date().toLocaleTimeString()
      };
      setAlerts(prev => [responseAlert, ...prev]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Tourist Safety</h1>
                <p className="text-sm text-gray-500">ID: TS-2025-001234</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5 text-green-500" />
              <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            </div>
          </div>
        </div>
      </header>

      {/* Safety Score Card */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Safety Score</h2>
              <p className="text-blue-100">Current location safety rating</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{safetyScore}</div>
              <div className="text-sm text-blue-100">out of 100</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500" 
              style={{ width: `${safetyScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Emergency Panic Button */}
      <div className="px-4 mb-6">
        <button
          onClick={handlePanicButton}
          className="w-full bg-red-600 text-white py-6 rounded-xl font-bold text-xl shadow-lg hover:bg-red-700 transition-colors border-4 border-red-200"
        >
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          EMERGENCY PANIC BUTTON
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center space-y-2 hover:bg-gray-50">
            <Phone className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium">Call Police</span>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center space-y-2 hover:bg-gray-50">
            <Users className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Contact Family</span>
          </button>
        </div>
      </div>

      {/* Location Status */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Current Location</span>
            </h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">{currentLocation}</span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Updated 1 min ago
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-green-600">Safe Zone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Risks */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Nearby Risks & Alerts</h3>
          </div>
          <div className="p-4 space-y-3">
            {nearbyRisks.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    risk.level === 'low' ? 'bg-yellow-400' : 
                    risk.level === 'medium' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{risk.name}</p>
                    <p className="text-sm text-gray-500">{risk.distance} away</p>
                  </div>
                </div>
                <Navigation className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Recent Alerts</h3>
          </div>
          <div className="p-4 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'emergency' ? 'bg-red-50 border-red-500' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                alert.type === 'success' ? 'bg-green-50 border-green-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium ${
                    alert.type === 'emergency' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-yellow-800' :
                    alert.type === 'success' ? 'text-green-800' :
                    'text-blue-800'
                  }`}>
                    {alert.message}
                  </p>
                  <span className="text-xs text-gray-500 ml-2">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracking Status */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Location Tracking</h4>
              <p className="text-sm text-gray-500">
                {isTracking ? 'Active - Your location is being monitored for safety' : 'Disabled'}
              </p>
            </div>
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`w-12 h-6 rounded-full transition-colors ${
                isTracking ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                isTracking ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}