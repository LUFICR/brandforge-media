// ═══════════════════════════════════════════════════════════════════════════
// 🛡️ INPUT SANITIZATION & VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

const MAX_TEXT_LENGTH = 500;
const MAX_LONG_TEXT_LENGTH = 2000;
const MAX_URL_LENGTH = 500;
const MAX_ARRAY_LENGTH = 50;

// Remove potentially dangerous characters while preserving readability
export function sanitizeText(input: string, maxLength = MAX_TEXT_LENGTH): string {
  if (typeof input !== 'string') return '';
  
  return input
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JS protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

export function sanitizeLongText(input: string): string {
  return sanitizeText(input, MAX_LONG_TEXT_LENGTH);
}

export function sanitizeUrl(input: string): string {
  if (typeof input !== 'string') return '';
  
  const trimmed = input.trim().slice(0, MAX_URL_LENGTH);
  
  // Only allow safe protocols
  if (trimmed.startsWith('http://') || 
      trimmed.startsWith('https://') || 
      trimmed.startsWith('/') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('tel:')) {
    return trimmed;
  }
  
  // Block data: URLs (XSS vector)
  if (trimmed.startsWith('data:')) {
    return '';
  }
  
  // If no protocol, assume relative path
  if (!trimmed.includes('://')) {
    return trimmed;
  }
  
  return ''; // Block other protocols
}

export function sanitizeNumber(input: unknown, min = 0, max = 99999): number {
  const num = typeof input === 'number' ? input : parseInt(String(input), 10);
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

export function sanitizeArray<T>(arr: T[], maxLength = MAX_ARRAY_LENGTH): T[] {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, maxLength);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Deep sanitize an object (for imported JSON)
export function sanitizeImportedData(data: unknown): Record<string, unknown> | null {
  if (typeof data !== 'object' || data === null) return null;
  
  const sanitized: Record<string, unknown> = {};
  const obj = data as Record<string, unknown>;
  
  // Only allow known safe keys (whitelist approach)
  const allowedTopLevelKeys = [
    'siteName', 'siteDescription', 'navLinks', 'hero', 'services',
    'about', 'portfolio', 'testimonials', 'faq', 'process', 'contact',
    'footer', 'marquee'
  ];
  
  for (const key of allowedTopLevelKeys) {
    if (key in obj) {
      sanitized[key] = deepSanitizeValue(obj[key]);
    }
  }
  
  return sanitized;
}

function deepSanitizeValue(value: unknown, depth = 0): unknown {
  // Prevent infinite recursion
  if (depth > 10) return null;
  
  if (value === null || value === undefined) return value;
  
  if (typeof value === 'string') {
    return sanitizeLongText(value);
  }
  
  if (typeof value === 'number') {
    return sanitizeNumber(value);
  }
  
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (Array.isArray(value)) {
    return sanitizeArray(value).map(item => deepSanitizeValue(item, depth + 1));
  }
  
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    
    // Limit number of keys to prevent DoS
    const keys = Object.keys(obj).slice(0, 100);
    
    for (const key of keys) {
      // Sanitize key name too
      const safeKey = key.slice(0, 50).replace(/[^a-zA-Z0-9_]/g, '');
      if (safeKey) {
        result[safeKey] = deepSanitizeValue(obj[key], depth + 1);
      }
    }
    
    return result;
  }
  
  return null; // Unknown type
}

// Validate required fields exist
export function validateContentStructure(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) return false;
  
  const obj = data as Record<string, unknown>;
  
  // Check for at least some expected structure
  const requiredSections = ['hero', 'services', 'about'];
  
  for (const section of requiredSections) {
    if (!(section in obj)) return false;
  }
  
  return true;
}
