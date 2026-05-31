import { useState, useRef, useCallback, useEffect } from 'react';
import { Save } from 'lucide-react';

interface EditorShellProps {
  title: string;
  subtitle: string;
  onSave: () => void;
  children: React.ReactNode;
}

/**
 * Wrapper for all editors — provides consistent header with Save button,
 * handles save feedback with proper cleanup, and consistent mobile styling.
 */
export default function EditorShell({ title, subtitle, onSave, children }: EditorShellProps) {
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount to prevent React state-update warning
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSave = useCallback(() => {
    onSave();
    setSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  }, [onSave]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{title}</h2>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors min-h-[44px] shrink-0 ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white'
          }`}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save Changes'}</span>
          <span className="sm:hidden">{saved ? '✓' : 'Save'}</span>
        </button>
      </div>
      {children}
    </div>
  );
}

/** Generate a stable unique ID for list items */
let _counter = 0;
export function uid(): string {
  return `uid-${Date.now().toString(36)}-${(++_counter).toString(36)}`;
}
