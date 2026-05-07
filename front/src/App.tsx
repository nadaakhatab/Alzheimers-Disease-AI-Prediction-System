import { useState } from 'react';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentView === 'home' ? (
        <Home onNavigate={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard onNavigateHome={() => setCurrentView('home')} />
      )}
    </div>
  );
}
