import React from 'react';
import { Shield, Users, MapPin, AlertTriangle, Smartphone, Globe } from 'lucide-react';
import type { AppRoute } from './Router';

interface LandingPageProps {
  onNavigate: (route: AppRoute, type?: 'tourist' | 'authority') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">Tourist Safety System</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('tourist-registration')}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                Tourist Login
              </button>
              <button
                onClick={() => onNavigate('authority-dashboard')}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Authority Portal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Smart Tourist Safety Monitoring
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            AI-powered safety monitoring system ensuring tourist security through real-time tracking, 
            blockchain-verified digital IDs, and instant emergency response capabilities.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => onNavigate('tourist-registration')}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Register as Tourist
            </button>
            <button
              onClick={() => onNavigate('authority-dashboard')}
              className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-colors shadow-lg"
            >
              Authority Dashboard
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Shield className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Digital ID Security</h3>
            <p className="text-blue-100">
              Blockchain-based secure digital IDs with KYC verification and tamper-proof travel records.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <MapPin className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Geo-Fencing Alerts</h3>
            <p className="text-blue-100">
              Real-time location monitoring with automated alerts when entering high-risk zones.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <AlertTriangle className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Emergency Response</h3>
            <p className="text-blue-100">
              One-touch panic button with instant alert dispatch to nearest authorities and emergency contacts.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Users className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">AI Anomaly Detection</h3>
            <p className="text-blue-100">
              Machine learning algorithms detect unusual patterns and potential safety concerns automatically.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Smartphone className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Mobile App</h3>
            <p className="text-blue-100">
              User-friendly mobile application with offline capabilities and voice-enabled emergency access.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Globe className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Multilingual Support</h3>
            <p className="text-blue-100">
              Available in 10+ Indian languages with voice and text support for all demographics.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">&lt;2 min</div>
              <div className="text-blue-100">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-blue-100">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-blue-100">
            <p>&copy; 2025 Smart Tourist Safety Monitoring System. Ensuring safe travels across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}