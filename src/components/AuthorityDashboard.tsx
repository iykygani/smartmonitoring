import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Clock,
  FileText,
  Phone,
  Eye,
  Filter,
  Brain,
  Bot
} from 'lucide-react';
import { AIAnomalyDetection } from './AIAnomalyDetection';
import { AIEmergencyAgent } from './AIEmergencyAgent';

export function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [tourists] = useState([
    {
      id: 'TS-2025-001234',
      name: 'John Smith',
      nationality: 'USA',
      location: 'Guwahati Central',
      safetyScore: 85,
      status: 'safe',
      lastSeen: '2 min ago',
      destination: 'Kaziranga National Park'
    },
    {
      id: 'TS-2025-001235',
      name: 'Maria Garcia',
      nationality: 'Spain',
      location: 'Shillong Hills',
      safetyScore: 65,
      status: 'warning',
      lastSeen: '5 min ago',
      destination: 'Cherrapunji'
    },
    {
      id: 'TS-2025-001236',
      name: 'David Johnson',
      nationality: 'Canada',
      location: 'Unknown',
      safetyScore: 25,
      status: 'emergency',
      lastSeen: '45 min ago',
      destination: 'Manas National Park'
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'emergency',
      tourist: 'David Johnson (TS-2025-001236)',
      message: 'Tourist missing from planned route for 45+ minutes',
      location: 'Last seen: Manas National Park Entry',
      time: '14:30',
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      tourist: 'Maria Garcia (TS-2025-001235)',
      message: 'Entered medium-risk zone without guide',
      location: 'Shillong Hills - Restricted Area',
      time: '13:45',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      tourist: 'John Smith (TS-2025-001234)',
      message: 'Check-in notification received',
      location: 'Guwahati Tourist Lodge',
      time: '12:15',
      priority: 'low'
    }
  ]);

  const stats = {
    totalTourists: 1247,
    activeTourists: 856,
    emergencyAlerts: 3,
    safetyScore: 78
  };

  const emergencyContacts = [
    {
      id: '1',
      name: 'John Smith Sr.',
      phone: '+1-555-0123',
      relation: 'Father',
      priority: 1,
      whatsappEnabled: true
    },
    {
      id: '2',
      name: 'Emergency Services',
      phone: '100',
      relation: 'Police',
      priority: 2,
      whatsappEnabled: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Authority Dashboard</h1>
                <p className="text-sm text-gray-500">Tourist Safety Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Emergency Response</span>
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-500">Officer</div>
                <div className="font-medium text-gray-900">Inspector Singh</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Tourists</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTourists}</p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-green-600">+12% from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Currently Active</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeTourists}</p>
              </div>
              <MapPin className="h-12 w-12 text-green-600" />
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-sm text-gray-600">Real-time tracking active</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Emergency Alerts</p>
                <p className="text-3xl font-bold text-red-600">{stats.emergencyAlerts}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <div className="mt-4 flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">1 critical, 2 warnings</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Safety Score</p>
                <p className="text-3xl font-bold text-teal-600">{stats.safetyScore}</p>
              </div>
              <Shield className="h-12 w-12 text-teal-600" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${stats.safetyScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Eye },
              { id: 'tourists', name: 'Active Tourists', icon: Users },
              { id: 'alerts', name: 'Alerts & Incidents', icon: AlertTriangle },
              { id: 'ai-anomaly', name: 'AI Anomaly Detection', icon: Brain },
              { id: 'ai-agents', name: 'AI Emergency Agents', icon: Bot },
              { id: 'reports', name: 'Reports', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'tourists' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Active Tourists</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tourist ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Nationality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Safety Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tourists.map((tourist) => (
                    <tr key={tourist.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tourist.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{tourist.name}</div>
                          <div className="text-sm text-gray-500">{tourist.nationality}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{tourist.location}</div>
                          <div className="text-sm text-gray-500">Last seen: {tourist.lastSeen}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 mr-3">{tourist.safetyScore}</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                tourist.safetyScore >= 80 ? 'bg-green-500' :
                                tourist.safetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${tourist.safetyScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          tourist.status === 'safe' ? 'bg-green-100 text-green-800' :
                          tourist.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tourist.status.charAt(0).toUpperCase() + tourist.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-green-600 hover:text-green-900">Contact</button>
                          {tourist.status === 'emergency' && (
                            <button className="text-red-600 hover:text-red-900">Dispatch</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`bg-white rounded-lg shadow-sm border-l-4 ${
                alert.type === 'emergency' ? 'border-red-500' :
                alert.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
              } p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.type === 'emergency' ? 'text-red-500' :
                        alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.priority.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{alert.time}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{alert.tourist}</h3>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {alert.location}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    {alert.type === 'emergency' && (
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Emergency Response
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai-anomaly' && (
          <AIAnomalyDetection 
            isMonitoring={true}
          />
        )}

        {activeTab === 'ai-agents' && (
          <AIEmergencyAgent 
            touristId="TS-2025-001234"
            emergencyContacts={emergencyContacts}
          />
        )}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                        alert.type === 'emergency' ? 'text-red-500' :
                        alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{alert.tourist}</p>
                        <p className="text-sm text-gray-500 truncate">{alert.message}</p>
                        <p className="text-xs text-gray-400">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Zones */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">High-Risk Zones</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                    <div>
                      <p className="font-medium text-red-900">Manas National Park - Buffer Zone</p>
                      <p className="text-sm text-red-700">Wildlife activity reported</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                      HIGH
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div>
                      <p className="font-medium text-yellow-900">Shillong Hills - Restricted Area</p>
                      <p className="text-sm text-yellow-700">Weather conditions</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      MEDIUM
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div>
                      <p className="font-medium text-blue-900">Guwahati Central Market</p>
                      <p className="text-sm text-blue-700">Crowded area - monitor closely</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      LOW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}