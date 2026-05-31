import { useState, useEffect } from 'react';
import { SiteDataProvider } from './contexts/SiteDataContext';
import { isSessionValid, destroySession } from './utils/auth';
import LoginScreen from './components/admin/LoginScreen';
import Dashboard from './components/admin/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check for existing valid session
    setLoggedIn(isSessionValid());
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <SiteDataProvider>
      <Dashboard onLogout={() => { destroySession(); setLoggedIn(false); }} />
    </SiteDataProvider>
  );
}

export default App;
