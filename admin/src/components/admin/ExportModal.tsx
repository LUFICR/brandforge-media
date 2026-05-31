import { useState, useEffect, useRef, memo } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import { Download, Upload, Copy, Check, X, AlertTriangle } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
}

function ExportModal({ onClose }: ExportModalProps) {
  const { exportContent, importContent, resetToDefault } = useSiteData();
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  useEffect(() => {
    closeButtonRef.current?.focus();
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCopy = async () => {
    const text = exportContent();
    try {
      // Modern API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: textarea + execCommand (deprecated but widely supported)
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // If all fails, show error
      setImportError('Copy failed. Use Download instead.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportContent()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brandforge-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportError('');
    const trimmed = importText.trim();
    
    if (!trimmed) {
      setImportError('Please paste your JSON content');
      return;
    }
    
    setIsProcessing(true);
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const result = importContent(trimmed);
      
      if (result.success) {
        setImportSuccess(true);
        setImportText('');
        setTimeout(() => {
          setImportSuccess(false);
          onClose();
        }, 1500);
      } else {
        setImportError(result.error || 'Invalid JSON format');
      }
      setIsProcessing(false);
    }, 100);
  };

  const handleReset = () => {
    resetToDefault();
    setShowReset(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] max-h-[90dvh] overflow-hidden border border-gray-700 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700 shrink-0">
          <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-white">Export / Import</h2>
          <button 
            ref={closeButtonRef}
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6">
          {/* Export Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Export Content</h3>
            <p className="text-sm text-gray-400 mb-4">
              Download your content as JSON backup.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2.5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-lg font-medium transition-colors min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all min-h-[44px] ${
                  copied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700" />

          {/* Import Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Import Content</h3>
            <p className="text-sm text-gray-400 mb-4">
              Paste exported JSON to restore content.
            </p>
            <textarea
              value={importText}
              onChange={(e) => {
                setImportText(e.target.value);
                setImportError('');
              }}
              placeholder="Paste JSON here..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none resize-none font-mono text-sm"
              spellCheck={false}
            />
            {importError && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {importError}
              </p>
            )}
            {importSuccess && (
              <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Imported successfully!
              </p>
            )}
            <button
              onClick={handleImport}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg font-medium transition-colors mt-3 min-h-[44px] disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Import
            </button>
          </div>

          <div className="border-t border-gray-700" />

          {/* Reset Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Reset to Default</h3>
            <p className="text-sm text-gray-400 mb-4">
              Remove all changes and restore original content.
            </p>
            {!showReset ? (
              <button
                onClick={() => setShowReset(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 text-red-400 rounded-lg font-medium transition-colors min-h-[44px]"
              >
                <AlertTriangle className="w-4 h-4" />
                Reset All Content
              </button>
            ) : (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium">Are you sure?</p>
                    <p className="text-sm text-gray-400 mt-1">This cannot be undone.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReset(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 active:bg-red-700 transition-colors min-h-[44px]"
                  >
                    Yes, Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ExportModal);
