import { useState, useRef, useEffect, memo } from 'react';
import { Sparkles, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { verifyLogin, createSession, getUsername, hasCustomCredentials } from '../../utils/auth';

interface LoginScreenProps {
  onLogin: () => void;
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  
  const usernameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const isDefault = !hasCustomCredentials();
  const displayName = getUsername();
  const isLockedOut = lockoutTime > 0;

  // Focus username field on mount
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // Lockout countdown
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) return;

    // Check attempts
    if (attempts >= 5) {
      setLockoutTime(30); // 30 second lockout
      setError('Too many failed attempts. Please wait.');
      return;
    }

    const trimmedUsername = username.trim();
    const trimmedPassword = password;

    if (!trimmedUsername || !trimmedPassword) {
      setError('Please enter username and password');
      return;
    }

    setError('');
    setLoading(true);

    // Slight delay for UX and to prevent timing attacks
    setTimeout(() => {
      if (verifyLogin(trimmedUsername, trimmedPassword)) {
        createSession();
        onLogin();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          setLockoutTime(30);
          setError('Too many failed attempts. Wait 30 seconds.');
        } else {
          setError('Invalid username or password');
        }
        setLoading(false);
        
        // Clear password on failed attempt
        setPassword('');
      }
    }, 300 + Math.random() * 200); // Random delay to prevent timing attacks
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-950 flex items-center justify-center p-4 safe-area-top safe-area-bottom">
      {/* Background effects - reduced on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-400 mb-4 shadow-lg shadow-violet-500/20">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">BrandForge Admin</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Sign in to manage your website</p>
        </div>

        {/* Form */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-gray-900 rounded-2xl p-5 sm:p-8 border border-gray-800 shadow-xl"
          autoComplete="on"
        >
          <div className="space-y-4 sm:space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm text-gray-400 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  ref={usernameRef}
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors text-base"
                  placeholder="Enter username"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  disabled={loading || isLockedOut}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-colors text-base"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  disabled={loading || isLockedOut}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {error}
                  {attempts >= 3 && attempts < 5 && (
                    <span className="block mt-1 text-xs text-red-400/70">
                      {5 - attempts} attempts remaining
                    </span>
                  )}
                  {isLockedOut && (
                    <span className="block mt-1 text-xs text-red-400/70">
                      Retry in {lockoutTime}s
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || isLockedOut}
              className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLockedOut ? (
                <span>Wait {lockoutTime}s</span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Info footer */}
          <div className="mt-5 pt-5 border-t border-gray-800">
            {isDefault ? (
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-500">Default credentials:</p>
                <p className="text-sm font-mono">
                  <span className="text-gray-400">admin</span>
                  <span className="text-gray-600 mx-2">/</span>
                  <span className="text-gray-400">admin123</span>
                </p>
                <p className="text-xs text-gray-600 mt-2">Change in Account Settings after login</p>
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                Signing in as <span className="text-gray-400 font-medium">@{displayName}</span>
              </p>
            )}
          </div>
        </form>

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
          © 2025 BrandForge Media
        </p>
      </div>
    </div>
  );
}

export default memo(LoginScreen);
