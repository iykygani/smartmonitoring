import React, { useState, useEffect } from 'react';
import { Bot, Phone, MessageSquare, Wifi, WifiOff, AlertTriangle, Clock } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: number;
  whatsappEnabled: boolean;
}

interface AIAgentStatus {
  isActive: boolean;
  lastHeartbeat: Date;
  batteryLevel: number;
  networkStatus: 'online' | 'offline' | 'limited';
  locationAccuracy: number;
}

interface EmergencyAlert {
  id: string;
  type: 'device_offline' | 'location_lost' | 'panic_triggered' | 'anomaly_detected';
  timestamp: Date;
  lastKnownLocation: string;
  coordinates: { lat: number; lng: number };
  alertsSent: string[];
  responseReceived: boolean;
}

interface AIEmergencyAgentProps {
  touristId: string;
  emergencyContacts: EmergencyContact[];
  onEmergencyTriggered?: (alert: EmergencyAlert) => void;
}

export function AIEmergencyAgent({ touristId, emergencyContacts, onEmergencyTriggered }: AIEmergencyAgentProps) {
  const [agentStatus, setAgentStatus] = useState<AIAgentStatus>({
    isActive: true,
    lastHeartbeat: new Date(),
    batteryLevel: 85,
    networkStatus: 'online',
    locationAccuracy: 95
  });

  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [smsBackupEnabled, setSmsBackupEnabled] = useState(true);

  // Simulate device monitoring
  useEffect(() => {
    const monitorDevice = () => {
      // Simulate random device status changes
      const scenarios = [
        { networkStatus: 'online' as const, batteryLevel: 85, locationAccuracy: 95 },
        { networkStatus: 'limited' as const, batteryLevel: 65, locationAccuracy: 80 },
        { networkStatus: 'offline' as const, batteryLevel: 45, locationAccuracy: 60 },
      ];

      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      setAgentStatus(prev => ({
        ...prev,
        ...randomScenario,
        lastHeartbeat: new Date()
      }));

      // Trigger emergency if device goes offline
      if (randomScenario.networkStatus === 'offline' && Math.random() < 0.3) {
        triggerEmergencyAlert('device_offline');
      }
    };

    const interval = setInterval(monitorDevice, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const triggerEmergencyAlert = (type: EmergencyAlert['type']) => {
    const newAlert: EmergencyAlert = {
      id: `alert-${Date.now()}`,
      type,
      timestamp: new Date(),
      lastKnownLocation: 'Guwahati Central Market Area',
      coordinates: { lat: 26.1445, lng: 91.7362 },
      alertsSent: [],
      responseReceived: false
    };

    // Simulate sending alerts to emergency contacts
    const alertPromises = emergencyContacts
      .sort((a, b) => a.priority - b.priority)
      .map(contact => sendEmergencyAlert(contact, newAlert));

    Promise.all(alertPromises).then(results => {
      newAlert.alertsSent = results.filter(Boolean);
      setEmergencyAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      onEmergencyTriggered?.(newAlert);
    });
  };

  const sendEmergencyAlert = async (contact: EmergencyContact, alert: EmergencyAlert): Promise<string> => {
    // Simulate sending WhatsApp/SMS alert
    return new Promise((resolve) => {
      setTimeout(() => {
        const alertMessage = generateAlertMessage(alert);
        const method = agentStatus.networkStatus === 'offline' ? 'SMS' : 
                     contact.whatsappEnabled ? 'WhatsApp' : 'SMS';
        resolve(`${method} sent to ${contact.name} (${contact.phone})`);
      }, 1000 + Math.random() * 2000);
    });
  };

  const generateAlertMessage = (alert: EmergencyAlert): string => {
    const messages = {
      device_offline: `🚨 EMERGENCY ALERT: Tourist device offline for 15+ minutes. Last known location: ${alert.lastKnownLocation}. Coordinates: ${alert.coordinates.lat}, ${alert.coordinates.lng}. Please contact local authorities immediately.`,
      location_lost: `⚠️ LOCATION ALERT: GPS signal lost for tourist. Last known position: ${alert.lastKnownLocation}. Time: ${alert.timestamp.toLocaleTimeString()}. Monitoring situation.`,
      panic_triggered: `🆘 PANIC BUTTON ACTIVATED: Tourist has triggered emergency alert at ${alert.lastKnownLocation}. Immediate assistance required. Authorities notified.`,
      anomaly_detected: `🤖 AI ANOMALY DETECTED: Unusual behavior pattern detected for tourist. Location: ${alert.lastKnownLocation}. Investigating situation.`
    };
    return messages[alert.type];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'limited': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'device_offline': return <WifiOff className="h-5 w-5" />;
      case 'location_lost': return <AlertTriangle className="h-5 w-5" />;
      case 'panic_triggered': return <Phone className="h-5 w-5" />;
      case 'anomaly_detected': return <Bot className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Agent Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Emergency Agent</h2>
              <p className="text-sm text-gray-500">Autonomous monitoring and emergency response system</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${agentStatus.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm font-medium text-gray-700">
              {agentStatus.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(agentStatus.networkStatus)}`}>
              {agentStatus.networkStatus === 'online' ? <Wifi className="h-4 w-4 mr-1" /> : <WifiOff className="h-4 w-4 mr-1" />}
              {agentStatus.networkStatus}
            </div>
            <div className="text-xs text-gray-500 mt-1">Network Status</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{agentStatus.batteryLevel}%</div>
            <div className="text-xs text-gray-500">Battery Level</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{agentStatus.locationAccuracy}%</div>
            <div className="text-xs text-gray-500">Location Accuracy</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">
              {agentStatus.lastHeartbeat.toLocaleTimeString()}
            </div>
            <div className="text-xs text-gray-500">Last Heartbeat</div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.relation} • {contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Priority {contact.priority}
                  </span>
                  {contact.whatsappEnabled && (
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offline Mode Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <WifiOff className="h-6 w-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Offline Emergency Mode</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700">SMS Backup System</p>
              <p className="text-sm text-gray-500">Send emergency alerts via SMS when internet is unavailable</p>
            </div>
            <button
              onClick={() => setSmsBackupEnabled(!smsBackupEnabled)}
              className={`toggle-switch ${smsBackupEnabled ? 'active' : 'inactive'}`}
            >
              <div className={`toggle-knob ${smsBackupEnabled ? 'active' : 'inactive'}`} />
            </button>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Offline Mode Features</span>
            </div>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• Automatic SMS alerts to emergency contacts</li>
              <li>• Last known location sharing via SMS</li>
              <li>• Emergency services notification</li>
              <li>• Battery conservation mode activation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Emergency Alerts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Emergency Alerts</h3>
          <p className="text-sm text-gray-500">AI-triggered emergency responses and notifications</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {emergencyAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <Bot className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No emergency alerts triggered. System monitoring normally.</p>
            </div>
          ) : (
            emergencyAlerts.map((alert) => (
              <div key={alert.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600">
                    {getAlertTypeIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {alert.type.replace('_', ' ').toUpperCase()} ALERT
                      </h4>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.timestamp.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      Last known location: {alert.lastKnownLocation}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700">Alerts Sent:</p>
                      <div className="space-y-1">
                        {alert.alertsSent.map((alertSent, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {alertSent}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                      Emergency Response
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Test Emergency System */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Emergency System Test</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => triggerEmergencyAlert('device_offline')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Test Device Offline Alert
          </button>
          <button
            onClick={() => triggerEmergencyAlert('anomaly_detected')}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Test AI Anomaly Alert
          </button>
        </div>
        
        <p className="text-xs text-red-700 mt-3">
          ⚠️ Testing will send actual alerts to emergency contacts. Use only for system verification.
        </p>
      </div>
    </div>
  );
}