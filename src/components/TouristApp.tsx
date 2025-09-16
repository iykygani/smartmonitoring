import React, { useState, useEffect } from 'react';
import { Shield, MapPin, AlertTriangle, Phone, Users, Navigation, Clock, Battery, MessageCircle, Bot, Route } from 'lucide-react';
import { AIChat } from './AIChat';
import { SmartRouting } from './SmartRouting';

export function TouristApp() {
  const [currentLocation, setCurrentLocation] = useState('Guwahati Central');
  const [safetyScore, setSafetyScore] = useState(85);
  const [isTracking, setIsTracking] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showRouting, setShowRouting] = useState(false);
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

  const handleRouteSelect = (route: any) => {
    const newAlert = {
      id: Date.now(),
      type: 'info',
      message: `Route selected: ${route.name} - Safety Score: ${route.safetyScore}%`,
      time: new Date().toLocaleTimeString()
    };
    setAlerts([newAlert, ...alerts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="tourist-app-header">
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
              <div className={`w-3 h-3 rounded-full animate-pulse ${isTracking ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>
        </div>
      </header>

      {/* Safety Score Card */}
      <div className="px-4 py-4">
        <div className="safety-score-card">
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
          <div className="safety-score-bar">
            <div 
              className="safety-score-fill" 
              style={{ width: `${safetyScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Emergency Panic Button */}
      <div className="px-4 mb-6">
        <button
          onClick={handlePanicButton}
          className="panic-button"
        >
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          EMERGENCY PANIC BUTTON
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button className="card p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors cursor-pointer">
            <Phone className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium">Call Police</span>
          </button>
          <button 
            onClick={() => setShowAIChat(true)}
            className="card p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <MessageCircle className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">AI Assistant</span>
          </button>
          <button 
            onClick={() => setShowRouting(true)}
            className="card p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Route className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium">Safe Routes</span>
          </button>
          <button className="card p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors cursor-pointer">
            <Users className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Emergency Contacts</span>
          </button>
        </div>
      </div>

      {/* Location Status */}
      <div className="px-4 mb-6">
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Current Location</span>
            </h3>
          </div>
          <div className="card-body">
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
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Nearby Risks & Alerts</h3>
          </div>
          <div className="card-body space-y-3">
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
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Recent Alerts</h3>
          </div>
          <div className="card-body space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'emergency' ? 'alert-emergency' :
                alert.type === 'warning' ? 'alert-warning' :
                alert.type === 'success' ? 'alert-success' :
                'alert-info'
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
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Location Tracking</h4>
              <p className="text-sm text-gray-500">
                {isTracking ? 'Active - Your location is being monitored for safety' : 'Disabled'}
              </p>
            </div>
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`toggle-switch ${isTracking ? 'active' : 'inactive'}`}
            >
              <div className={`toggle-knob ${isTracking ? 'active' : 'inactive'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat 
        isOpen={showAIChat} 
        onClose={() => setShowAIChat(false)}
        currentLocation={currentLocation}
      />

      {/* Smart Routing Modal */}
      {showRouting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">AI Smart Route Planning</h2>
                <button
                  onClick={() => setShowRouting(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <SmartRouting 
                currentLocation={currentLocation}
                onRouteSelect={handleRouteSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}