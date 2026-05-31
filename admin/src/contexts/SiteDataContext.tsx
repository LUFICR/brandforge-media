import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { SiteContent, defaultSiteContent } from '../data/siteContent';
import { sanitizeImportedData, validateContentStructure } from '../utils/sanitize';

interface SiteDataContextType {
  content: SiteContent;
  contentVersion: number; // Increments on import/reset to force editor remount
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  resetToDefault: () => void;
  exportContent: () => string;
  importContent: (json: string) => { success: boolean; error?: string };
  hasChanges: boolean;
  isSaving: boolean;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const STORAGE_KEY = 'brandforge-site-content';
const SAVE_DEBOUNCE_MS = 500;
const MAX_STORAGE_SIZE = 1024 * 1024; // 1MB limit

// Safe localStorage operations
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    // Check size before saving
    if (value.length > MAX_STORAGE_SIZE) {
      console.warn('Content too large to save');
      return false;
    }
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
    return false;
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

function loadInitialContent(): SiteContent {
  const saved = safeGetItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure all fields exist
      return { ...defaultSiteContent, ...parsed };
    } catch {
      return defaultSiteContent;
    }
  }
  return defaultSiteContent;
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadInitialContent);
  const [contentVersion, setContentVersion] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Refs for debouncing
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef(content);
  
  // Keep ref in sync
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Debounced save
  const saveToStorage = useCallback(() => {
    setIsSaving(true);
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      const json = JSON.stringify(contentRef.current);
      safeSetItem(STORAGE_KEY, json);
      setIsSaving(false);
    }, SAVE_DEBOUNCE_MS);
  }, []);

  // Save when content changes
  useEffect(() => {
    saveToStorage();
    
    // Check if content differs from default
    const currentJson = JSON.stringify(content);
    const defaultJson = JSON.stringify(defaultSiteContent);
    setHasChanges(currentJson !== defaultJson);
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, saveToStorage]);

  const updateContent = useCallback((newContent: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  }, []);

  const updateSection = useCallback(<K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent(prev => ({ ...prev, [section]: data }));
  }, []);

  const resetToDefault = useCallback(() => {
    setContent(defaultSiteContent);
    setContentVersion(v => v + 1);
    safeRemoveItem(STORAGE_KEY);
  }, []);

  const exportContent = useCallback(() => {
    return JSON.stringify(content, null, 2);
  }, [content]);

  const importContent = useCallback((json: string): { success: boolean; error?: string } => {
    // Size check
    if (json.length > MAX_STORAGE_SIZE) {
      return { success: false, error: 'Content too large (max 1MB)' };
    }
    
    try {
      const parsed = JSON.parse(json);
      
      // Validate structure
      if (!validateContentStructure(parsed)) {
        return { success: false, error: 'Invalid content structure' };
      }
      
      // Sanitize all values
      const sanitized = sanitizeImportedData(parsed);
      if (!sanitized) {
        return { success: false, error: 'Failed to process content' };
      }
      
      // Merge with defaults
      setContent({ ...defaultSiteContent, ...sanitized as Partial<SiteContent> });
      setContentVersion(v => v + 1);
      return { success: true };
    } catch {
      return { success: false, error: 'Invalid JSON format' };
    }
  }, []);

  return (
    <SiteDataContext.Provider value={{
      content,
      contentVersion,
      updateContent,
      updateSection,
      resetToDefault,
      exportContent,
      importContent,
      hasChanges,
      isSaving,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
