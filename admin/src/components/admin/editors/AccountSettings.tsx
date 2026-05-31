import { useState } from 'react';
import { 
  User, Lock, Eye, EyeOff, Save, CheckCircle, 
  AlertTriangle, Shield, Clock, Info
} from 'lucide-react';
import { 
  getUsername, 
  changeUsername, 
  changePassword,
  hasCustomCredentials,
  credentialsLastChanged,
} from '../../../utils/auth';

export default function AccountSettings() {
  // BUG FIX: Use state so it updates after changes
  const [displayUsername, setDisplayUsername] = useState(getUsername());
  const [displayIsDefault, setDisplayIsDefault] = useState(!hasCustomCredentials());
  const [displayLastChanged, setDisplayLastChanged] = useState(credentialsLastChanged());
  
  // Username change
  const [newUsername, setNewUsername] = useState('');
  const [usernamePassword, setUsernamePassword] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  
  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setUsernameLoading(true);

    setTimeout(() => {
      const result = changeUsername(newUsername, usernamePassword);
      if (result.ok) {
        setUsernameSuccess(true);
        setNewUsername('');
        setUsernamePassword('');
        // BUG FIX: Refresh displayed values after successful change
        setDisplayUsername(getUsername());
        setDisplayIsDefault(!hasCustomCredentials());
        setDisplayLastChanged(credentialsLastChanged());
        setTimeout(() => setUsernameSuccess(false), 3000);
      } else {
        setUsernameError(result.error || 'Failed to change username');
      }
      setUsernameLoading(false);
    }, 300);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);

    setTimeout(() => {
      const result = changePassword(currentPassword, newPassword);
      if (result.ok) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // BUG FIX: Refresh displayed values after successful change
        setDisplayIsDefault(!hasCustomCredentials());
        setDisplayLastChanged(credentialsLastChanged());
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(result.error || 'Failed to change password');
      }
      setPasswordLoading(false);
    }, 300);
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'Never (using defaults)';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Change your admin username and password — no code editing needed</p>
      </div>

      {/* Default credentials warning */}
      {displayIsDefault && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-400">You're using default credentials</h3>
            <p className="text-sm text-gray-400 mt-1">
              Your login is still <strong className="text-white">admin / admin123</strong>. 
              Change them below to secure your dashboard.
            </p>
          </div>
        </div>
      )}

      {/* Current Account Info */}
      <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-6 border border-violet-500/20">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xl font-bold uppercase">{displayUsername.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">@{displayUsername}</h3>
            <p className="text-violet-400 text-sm">Admin</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Last changed: {formatDate(displayLastChanged)}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                {displayIsDefault ? 'Default credentials' : 'Custom credentials'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Username */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-400" />
          Change Username
        </h3>
        <p className="text-sm text-gray-500 mb-5">Enter your new username and current password to confirm</p>
        
        <form onSubmit={handleUsernameChange} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">New Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => { setNewUsername(e.target.value); setUsernameError(''); }}
                placeholder="e.g. brandforge"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-600 mt-1">Letters, numbers, underscores only</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Password</label>
              <input
                type="password"
                value={usernamePassword}
                onChange={(e) => { setUsernamePassword(e.target.value); setUsernameError(''); }}
                placeholder="Enter current password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {usernameError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {usernameError}
            </div>
          )}
          {usernameSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              Username changed successfully to @{getUsername()}!
            </div>
          )}

          <button
            type="submit"
            disabled={usernameLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
          >
            {usernameLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Update Username
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-violet-400" />
            Change Password
          </h3>
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-700"
          >
            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPasswords ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-5">Enter your current password, then choose a new one</p>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Current Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => { setCurrentPassword(e.target.value); setPasswordError(''); }}
              placeholder="Enter current password"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">New Password</label>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
                placeholder="Min 6 characters"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
                placeholder="Repeat new password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Strength meter */}
          {newPassword.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      newPassword.length >= i * 3
                        ? newPassword.length >= 12 ? 'bg-emerald-500'
                        : newPassword.length >= 8 ? 'bg-yellow-500'
                        : 'bg-orange-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Strength:{' '}
                <span className={
                  newPassword.length >= 12 ? 'text-emerald-400' :
                  newPassword.length >= 8 ? 'text-yellow-400' :
                  newPassword.length >= 6 ? 'text-orange-400' : 'text-red-400'
                }>
                  {newPassword.length < 6 ? 'Too short' :
                   newPassword.length < 8 ? 'Weak' :
                   newPassword.length < 12 ? 'Good' : 'Strong'}
                </span>
              </p>
            </div>
          )}

          {passwordError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              Password changed successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={passwordLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
          >
            {passwordLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Shield className="w-4 h-4" />
            )}
            Update Password
          </button>
        </form>
      </div>

      {/* How it works */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" />
          How It Works
        </h3>
        <ul className="space-y-3 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            <span>Default login is <strong className="text-white">admin / admin123</strong> — change it above</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            Passwords are hashed and stored securely in your browser
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            Sessions last 24 hours before requiring re-login
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            If you clear browser data, credentials reset to defaults
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            No code editing needed — manage everything from this page
          </li>
        </ul>
      </div>
    </div>
  );
}
