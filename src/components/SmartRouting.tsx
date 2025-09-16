import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, AlertTriangle, Shield, Clock, Route, Zap } from 'lucide-react';

interface RoutePoint {
  lat: number;
  lng: number;
  name: string;
  type: 'start' | 'waypoint' | 'destination' | 'danger' | 'safe_zone';
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
}

interface SmartRoute {
  id: string;
  name: string;
  distance: string;
  duration: string;
  safetyScore: number;
  riskFactors: string[];
  waypoints: RoutePoint[];
  recommended: boolean;
}

interface SmartRoutingProps {
  currentLocation?: string;
  destination?: string;
  onRouteSelect?: (route: SmartRoute) => void;
}

export function SmartRouting({ currentLocation = "Guwahati Central", destination, onRouteSelect }: SmartRoutingProps) {
  const [routes, setRoutes] = useState<SmartRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<SmartRoute | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [destinationInput, setDestinationInput] = useState(destination || '');
  const [dangerZones, setDangerZones] = useState([
    { name: 'Construction Zone - NH37', level: 'medium', distance: '2.1 km' },
    { name: 'Political Rally Route', level: 'high', distance: '3.5 km' },
    { name: 'Flood Prone Area', level: 'critical', distance: '1.8 km' },
    { name: 'Wildlife Crossing', level: 'medium', distance: '5.2 km' }
  ]);

  const generateSmartRoutes = (dest: string): SmartRoute[] => {
    return [
      {
        id: 'route-1',
        name: 'AI Recommended - Safest Route',
        distance: '12.4 km',
        duration: '28 min',
        safetyScore: 92,
        riskFactors: ['Light traffic', 'Well-lit roads', 'Police checkpoints'],
        waypoints: [
          { lat: 26.1445, lng: 91.7362, name: currentLocation, type: 'start', riskLevel: 'safe' },
          { lat: 26.1520, lng: 91.7420, name: 'Tourist Police Station', type: 'safe_zone', riskLevel: 'safe' },
          { lat: 26.1580, lng: 91.7480, name: dest, type: 'destination', riskLevel: 'safe' }
        ],
        recommended: true
      },
      {
        id: 'route-2',
        name: 'Fastest Route',
        distance: '9.8 km',
        duration: '18 min',
        safetyScore: 67,
        riskFactors: ['Heavy traffic', 'Construction zone nearby', 'Limited lighting'],
        waypoints: [
          { lat: 26.1445, lng: 91.7362, name: currentLocation, type: 'start', riskLevel: 'safe' },
          { lat: 26.1500, lng: 91.7400, name: 'Construction Zone', type: 'danger', riskLevel: 'medium' },
          { lat: 26.1580, lng: 91.7480, name: dest, type: 'destination', riskLevel: 'safe' }
        ],
        recommended: false
      },
      {
        id: 'route-3',
        name: 'Scenic Route',
        distance: '15.2 km',
        duration: '35 min',
        safetyScore: 78,
        riskFactors: ['Mountain roads', 'Weather dependent', 'Wildlife area'],
        waypoints: [
          { lat: 26.1445, lng: 91.7362, name: currentLocation, type: 'start', riskLevel: 'safe' },
          { lat: 26.1600, lng: 91.7300, name: 'Scenic Viewpoint', type: 'waypoint', riskLevel: 'low' },
          { lat: 26.1650, lng: 91.7350, name: 'Wildlife Crossing', type: 'danger', riskLevel: 'medium' },
          { lat: 26.1580, lng: 91.7480, name: dest, type: 'destination', riskLevel: 'safe' }
        ],
        recommended: false
      }
    ];
  };

  const handleCalculateRoute = () => {
    if (!destinationInput.trim()) return;
    
    setIsCalculating(true);
    
    // Simulate AI route calculation
    setTimeout(() => {
      const newRoutes = generateSmartRoutes(destinationInput);
      setRoutes(newRoutes);
      setSelectedRoute(newRoutes[0]); // Auto-select recommended route
      setIsCalculating(false);
    }, 2000);
  };

  const handleRouteSelect = (route: SmartRoute) => {
    setSelectedRoute(route);
    onRouteSelect?.(route);
  };

  const getSafetyColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Route Planning Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Navigation className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI Smart Route Planning</h2>
            <p className="text-sm text-gray-500">Get the safest route with real-time danger zone avoidance</p>
          </div>
        </div>

        {/* Route Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={currentLocation}
                disabled
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                placeholder="Enter destination..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleCalculateRoute}
              disabled={!destinationInput.trim() || isCalculating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Route className="h-4 w-4" />
                  <span>Find Safe Routes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Status */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI Route Analysis Active</span>
          </div>
          <p className="text-xs text-blue-700">
            Analyzing real-time traffic, weather conditions, danger zones, and safety checkpoints...
          </p>
        </div>
      </div>

      {/* Route Options */}
      {routes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Route Options</h3>
            <p className="text-sm text-gray-500">AI-analyzed routes ranked by safety score</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {routes.map((route) => (
              <div
                key={route.id}
                className={`p-6 cursor-pointer transition-colors ${
                  selectedRoute?.id === route.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleRouteSelect(route)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{route.name}</h4>
                      {route.recommended && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Navigation className="h-4 w-4 mr-1" />
                        {route.distance}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {route.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getSafetyColor(route.safetyScore)}`}>
                      <Shield className="h-4 w-4 mr-1" />
                      {route.safetyScore}% Safe
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Risk Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {route.riskFactors.map((factor, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Route Waypoints:</p>
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                      {route.waypoints.map((point, index) => (
                        <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full ${
                            point.type === 'start' ? 'bg-green-500' :
                            point.type === 'destination' ? 'bg-blue-500' :
                            point.type === 'danger' ? 'bg-red-500' :
                            point.type === 'safe_zone' ? 'bg-green-400' :
                            'bg-gray-400'
                          }`} />
                          <span className="text-xs text-gray-600 whitespace-nowrap">{point.name}</span>
                          {index < route.waypoints.length - 1 && (
                            <div className="w-4 h-0.5 bg-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Danger Zones Alert */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Current Danger Zones</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">Areas to avoid based on real-time intelligence</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dangerZones.map((zone, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getRiskLevelColor(zone.level)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{zone.name}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelColor(zone.level)}`}>
                    {zone.level.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm opacity-75">{zone.distance} from current location</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Route Details */}
      {selectedRoute && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Active Route Monitoring</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700 mb-1">Real-time Tracking</p>
              <p className="text-gray-600">Your location is being monitored for deviations and safety</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Dynamic Rerouting</p>
              <p className="text-gray-600">Route will be updated if new dangers are detected</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1">Emergency Ready</p>
              <p className="text-gray-600">Instant alerts to authorities if you deviate or need help</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}