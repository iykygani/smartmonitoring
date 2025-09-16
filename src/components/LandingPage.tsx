import React from 'react';
import { Shield, Users, MapPin, AlertTriangle, Smartphone, Globe } from 'lucide-react';
import type { AppRoute } from './Router';

interface LandingPageProps {
  onNavigate: (route: AppRoute, type?: 'tourist' | 'authority') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen landing-hero">
      {/* Header */}
      <header className="landing-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: '4rem' }}>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">Tourist Safety System</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('tourist-registration')}
                className="btn btn-outline text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                Tourist Login
              </button>
              <button
                onClick={() => onNavigate('authority-dashboard')}
                className="btn btn-secondary"
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
              className="btn text-blue-900 font-semibold text-lg shadow-lg" style={{ backgroundColor: '#ffffff', padding: '1rem 2rem', borderRadius: '0.75rem' }}
            >
              Register as Tourist
            </button>
            <button
              onClick={() => onNavigate('authority-dashboard')}
              className="btn btn-secondary font-semibold text-lg shadow-lg" style={{ padding: '1rem 2rem', borderRadius: '0.75rem' }}
            >
              Authority Dashboard
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="feature-card">
            <Shield className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Digital ID Security</h3>
            <p className="text-blue-100">
              Blockchain-based secure digital IDs with KYC verification and tamper-proof travel records.
            </p>
          </div>
          
          <div className="feature-card">
            <MapPin className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Geo-Fencing Alerts</h3>
            <p className="text-blue-100">
              Real-time location monitoring with automated alerts when entering high-risk zones.
            </p>
          </div>
          
          <div className="feature-card">
            <AlertTriangle className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Emergency Response</h3>
            <p className="text-blue-100">
              One-touch panic button with instant alert dispatch to nearest authorities and emergency contacts.
            </p>
          </div>
          
          <div className="feature-card">
            <Users className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">AI Anomaly Detection</h3>
            <p className="text-blue-100">
              Machine learning algorithms detect unusual patterns and potential safety concerns automatically.
            </p>
          </div>
          
          <div className="feature-card">
            <Smartphone className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Mobile App</h3>
            <p className="text-blue-100">
              User-friendly mobile application with offline capabilities and voice-enabled emergency access.
            </p>
          </div>
          
          <div className="feature-card">
            <Globe className="h-12 w-12 text-teal-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Multilingual Support</h3>
            <p className="text-blue-100">
              Available in 10+ Indian languages with voice and text support for all demographics.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-card">
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
      <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }} className="mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-blue-100">
            <p>&copy; 2025 Smart Tourist Safety Monitoring System. Ensuring safe travels across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}