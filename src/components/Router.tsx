import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
import { TouristRegistration } from './TouristRegistration';
import { TouristDashboard } from './TouristDashboard';
import { AuthorityDashboard } from './AuthorityDashboard';
import { TouristApp } from './TouristApp';

export type AppRoute = 'landing' | 'tourist-registration' | 'tourist-dashboard' | 'authority-dashboard' | 'tourist-app';

export function Router() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');
  const [userType, setUserType] = useState<'tourist' | 'authority' | null>(null);

  const navigateTo = (route: AppRoute, type?: 'tourist' | 'authority') => {
    setCurrentRoute(route);
    if (type) setUserType(type);
  };

  const renderCurrentRoute = () => {
    switch (currentRoute) {
      case 'tourist-registration':
        return <TouristRegistration onComplete={() => navigateTo('tourist-app')} />;
      case 'tourist-dashboard':
        return <TouristDashboard />;
      case 'authority-dashboard':
        return <AuthorityDashboard />;
      case 'tourist-app':
        return <TouristApp />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return renderCurrentRoute();
}