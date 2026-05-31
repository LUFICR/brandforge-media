// ═══════════════════════════════════════════════════════════════════════════
// 🔐 SECURE AUTHENTICATION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

const AUTH_KEY = 'bf-admin-creds';
const SESSION_KEY = 'bf-admin-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_USERNAME_LENGTH = 32;
const MAX_PASSWORD_LENGTH = 128;
const MIN_PASSWORD_LENGTH = 6;
const MIN_USERNAME_LENGTH = 3;

// ── Secure hash (constant-time comparison, strong mixing) ──────────────
function secureHash(str: string): string {
  // Truncate to prevent DoS via huge strings
  const input = str.slice(0, 1000);
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  let h3 = 0x12345678;
  
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 2246822507);
  }
  
  // Additional mixing rounds for better distribution
  for (let i = 0; i < 3; i++) {
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h3 ^ (h3 >>> 13), 3266489909);
    h3 = Math.imul(h3 ^ (h3 >>> 16), 3266489909) ^ Math.imul(h1 ^ (h1 >>> 13), 2654435761);
  }
  
  return [h1, h2, h3].map(h => (h >>> 0).toString(36)).join('-');
}

// Constant-time string comparison to prevent timing attacks
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do comparison to prevent length-based timing
    let result = 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      result |= (a.charCodeAt(i % a.length) || 0) ^ (b.charCodeAt(i % b.length) || 0);
    }
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function hashPassword(password: string): string {
  return secureHash(password + '::bf-secure-salt-v2-2025');
}

// ── Default credentials ────────────────────────────────────────────────
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD_HASH = hashPassword('admin123');

// ── Types ──────────────────────────────────────────────────────────────
export interface StoredCredentials {
  username: string;
  passwordHash: string;
  updatedAt: number;
  version: number; // For future migrations
}

interface Session {
  token: string;
  expiresAt: number;
  createdAt: number;
}

// ── Secure random token ────────────────────────────────────────────────
function generateSecureToken(): string {
  const arr = new Uint8Array(24);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(arr);
  } else {
    // Fallback with multiple entropy sources
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256) ^ (Date.now() & 0xff) ^ (i * 17);
    }
  }
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

// ── Credential helpers ─────────────────────────────────────────────────
function getCredentials(): StoredCredentials {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredCredentials;
      // Validate structure
      if (
        typeof parsed.username === 'string' &&
        typeof parsed.passwordHash === 'string' &&
        parsed.username.length > 0 &&
        parsed.passwordHash.length > 0
      ) {
        return {
          ...parsed,
          version: parsed.version || 1,
        };
      }
    }
  } catch {
    // Corrupted data - will use defaults
  }
  return {
    username: DEFAULT_USERNAME,
    passwordHash: DEFAULT_PASSWORD_HASH,
    updatedAt: 0,
    version: 1,
  };
}

function saveCredentials(creds: StoredCredentials): boolean {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(creds));
    return true;
  } catch {
    return false; // Storage full or disabled
  }
}

// ── Input Sanitization ─────────────────────────────────────────────────
function sanitizeUsername(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .slice(0, MAX_USERNAME_LENGTH)
    .replace(/[^a-z0-9_]/g, '');
}

function validateUsername(username: string): { valid: boolean; error?: string } {
  const clean = sanitizeUsername(username);
  if (clean.length < MIN_USERNAME_LENGTH) {
    return { valid: false, error: `Username must be at least ${MIN_USERNAME_LENGTH} characters` };
  }
  if (clean.length > MAX_USERNAME_LENGTH) {
    return { valid: false, error: `Username must be less than ${MAX_USERNAME_LENGTH} characters` };
  }
  if (!/^[a-z0-9_]+$/.test(clean)) {
    return { valid: false, error: 'Only lowercase letters, numbers, and underscores allowed' };
  }
  return { valid: true };
}

function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { valid: false, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return { valid: false, error: `Password must be less than ${MAX_PASSWORD_LENGTH} characters` };
  }
  return { valid: true };
}

// ── Public API ─────────────────────────────────────────────────────────

export function verifyLogin(username: string, password: string): boolean {
  const creds = getCredentials();
  const inputUsername = sanitizeUsername(username);
  const inputHash = hashPassword(password);
  
  // Constant-time comparison for both
  const usernameMatch = secureCompare(inputUsername, creds.username);
  const passwordMatch = secureCompare(inputHash, creds.passwordHash);
  
  return usernameMatch && passwordMatch;
}

export function getUsername(): string {
  return getCredentials().username;
}

export function hasCustomCredentials(): boolean {
  return getCredentials().updatedAt > 0;
}

export function credentialsLastChanged(): number {
  return getCredentials().updatedAt;
}

export function changeUsername(
  newUsername: string,
  currentPassword: string,
): { ok: boolean; error?: string } {
  const creds = getCredentials();
  
  // Verify current password
  if (!secureCompare(hashPassword(currentPassword), creds.passwordHash)) {
    return { ok: false, error: 'Current password is incorrect' };
  }
  
  // Validate new username
  const validation = validateUsername(newUsername);
  if (!validation.valid) {
    return { ok: false, error: validation.error };
  }
  
  const sanitized = sanitizeUsername(newUsername);
  creds.username = sanitized;
  creds.updatedAt = Date.now();
  creds.version = 1;
  
  if (!saveCredentials(creds)) {
    return { ok: false, error: 'Failed to save. Storage may be full.' };
  }
  
  return { ok: true };
}

export function changePassword(
  currentPassword: string,
  newPassword: string,
): { ok: boolean; error?: string } {
  const creds = getCredentials();
  
  // Verify current password
  if (!secureCompare(hashPassword(currentPassword), creds.passwordHash)) {
    return { ok: false, error: 'Current password is incorrect' };
  }
  
  // Validate new password
  const validation = validatePassword(newPassword);
  if (!validation.valid) {
    return { ok: false, error: validation.error };
  }
  
  creds.passwordHash = hashPassword(newPassword);
  creds.updatedAt = Date.now();
  creds.version = 1;
  
  if (!saveCredentials(creds)) {
    return { ok: false, error: 'Failed to save. Storage may be full.' };
  }
  
  return { ok: true };
}

// ── Session management ─────────────────────────────────────────────────

export function createSession(): void {
  const session: Session = {
    token: generateSecureToken(),
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Storage error - session won't persist but login will work for this page session
  }
}

export function isSessionValid(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    
    const session = JSON.parse(raw) as Session;
    
    // Validate structure
    if (typeof session.token !== 'string' || typeof session.expiresAt !== 'number') {
      destroySession();
      return false;
    }
    
    // Check expiry
    if (Date.now() > session.expiresAt) {
      destroySession();
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// Debounced session extension (don't extend more than once per minute)
let lastExtend = 0;
export function extendSession(): void {
  const now = Date.now();
  if (now - lastExtend < 60000) return; // Max once per minute
  lastExtend = now;
  
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;
    
    const session = JSON.parse(raw) as Session;
    session.expiresAt = now + SESSION_DURATION;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore
  }
}

export function destroySession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore
  }
}
