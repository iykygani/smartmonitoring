import React, { useState, useEffect } from 'react';
import { Brain, AlertTriangle, TrendingUp, MapPin, Clock, Zap } from 'lucide-react';

interface AnomalyAlert {
  id: number;
  type: 'location_dropout' | 'route_deviation' | 'prolonged_inactivity' | 'speed_anomaly' | 'geo_fence_breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  tourist: string;
  location: string;
  timestamp: Date;
  description: string;
  confidence: number;
  autoActions: string[];
}

interface AIAnomalyDetectionProps {
  touristId?: string;
  isMonitoring: boolean;
}

export function AIAnomalyDetection({ touristId, isMonitoring }: AIAnomalyDetectionProps) {
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>([]);
  const [aiStatus, setAiStatus] = useState<'active' | 'learning' | 'offline'>('active');
  const [detectionStats, setDetectionStats] = useState({
    totalDetections: 247,
    accuracyRate: 94.2,
    falsePositives: 8,
    emergenciesPreventedToday: 3
  });

  // Simulate AI anomaly detection
  useEffect(() => {
    if (!isMonitoring) return;

    const simulateAnomalyDetection = () => {
      const anomalyTypes = [
        {
          type: 'location_dropout' as const,
          severity: 'critical' as const,
          description: 'GPS signal lost for 15+ minutes in remote area',
          confidence: 89,
          autoActions: ['Alert emergency contacts', 'Dispatch nearest patrol', 'Activate search protocol']
        },
        {
          type: 'route_deviation' as const,
          severity: 'medium' as const,
          description: 'Tourist deviated 2km from planned route without notification',
          confidence: 76,
          autoActions: ['Send route correction alert', 'Monitor for 10 minutes', 'Check with tourist']
        },
        {
          type: 'prolonged_inactivity' as const,
          severity: 'high' as const,
          description: 'No movement detected for 45 minutes in non-accommodation area',
          confidence: 82,
          autoActions: ['Send wellness check', 'Alert local authorities', 'Contact emergency contacts']
        },
        {
          type: 'speed_anomaly' as const,
          severity: 'medium' as const,
          description: 'Unusual speed pattern detected - possible vehicle breakdown',
          confidence: 71,
          autoActions: ['Check transportation status', 'Offer assistance', 'Monitor location']
        },
        {
          type: 'geo_fence_breach' as const,
          severity: 'high' as const,
          description: 'Entered restricted military zone without authorization',
          confidence: 95,
          autoActions: ['Immediate alert to authorities', 'Send evacuation notice', 'Deploy security response']
        }
      ];

      // Randomly trigger anomaly detection
      if (Math.random() < 0.3) {
        const randomAnomaly = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
        const newAnomaly: AnomalyAlert = {
          id: Date.now(),
          ...randomAnomaly,
          tourist: touristId || `TS-2025-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`,
          location: `${26.1445 + (Math.random() - 0.5) * 0.1}°N, ${91.7362 + (Math.random() - 0.5) * 0.1}°E`,
          timestamp: new Date()
        };

        setAnomalies(prev => [newAnomaly, ...prev.slice(0, 9)]);
        
        // Update stats
        setDetectionStats(prev => ({
          ...prev,
          totalDetections: prev.totalDetections + 1,
          emergenciesPreventedToday: randomAnomaly.severity === 'critical' ? prev.emergenciesPreventedToday + 1 : prev.emergenciesPreventedToday
        }));
      }
    };

    const interval = setInterval(simulateAnomalyDetection, 15000); // Check every 15 seconds
    return () => clearInterval(interval);
  }, [isMonitoring, touristId]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'location_dropout': return <MapPin className="h-5 w-5" />;
      case 'route_deviation': return <TrendingUp className="h-5 w-5" />;
      case 'prolonged_inactivity': return <Clock className="h-5 w-5" />;
      case 'speed_anomaly': return <Zap className="h-5 w-5" />;
      case 'geo_fence_breach': return <AlertTriangle className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Status Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Anomaly Detection</h2>
              <p className="text-sm text-gray-500">Real-time behavioral pattern analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              aiStatus === 'active' ? 'bg-green-500 animate-pulse' :
              aiStatus === 'learning' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span className="text-sm font-medium text-gray-700 capitalize">{aiStatus}</span>
          </div>
        </div>

        {/* Detection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{detectionStats.totalDetections}</div>
            <div className="text-xs text-gray-500">Total Detections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{detectionStats.accuracyRate}%</div>
            <div className="text-xs text-gray-500">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{detectionStats.falsePositives}</div>
            <div className="text-xs text-gray-500">False Positives</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{detectionStats.emergenciesPreventedToday}</div>
            <div className="text-xs text-gray-500">Emergencies Prevented</div>
          </div>
        </div>
      </div>

      {/* Recent Anomalies */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Anomaly Detections</h3>
          <p className="text-sm text-gray-500">AI-powered behavioral analysis and threat detection</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {anomalies.length === 0 ? (
            <div className="p-8 text-center">
              <Brain className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No anomalies detected. AI monitoring is active.</p>
            </div>
          ) : (
            anomalies.map((anomaly) => (
              <div key={anomaly.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg border ${getSeverityColor(anomaly.severity)}`}>
                    {getAnomalyIcon(anomaly.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {anomaly.tourist}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {anomaly.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{anomaly.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {anomaly.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {anomaly.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-700">Automated Actions Taken:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {anomaly.autoActions.map((action, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    {anomaly.severity === 'critical' && (
                      <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                        Emergency Response
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI Learning Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Learning & Adaptation</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-1">Pattern Recognition</p>
            <p className="text-gray-600">Continuously learning from tourist behavior patterns and local risk factors</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Predictive Analysis</p>
            <p className="text-gray-600">Forecasting potential risks based on historical data and current conditions</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Real-time Adaptation</p>
            <p className="text-gray-600">Adjusting detection sensitivity based on location, time, and environmental factors</p>
          </div>
        </div>
      </div>
    </div>
  );
}