import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Menu, ArrowLeft, Home, ChevronRight, X } from 'lucide-react';
import { extendSession } from '../../utils/auth';
import { useSiteData } from '../../contexts/SiteDataContext';
import Sidebar from './Sidebar';
import Overview from './Overview';

// Lazy load editors for better performance
const Preview = lazy(() => import('./Preview'));
const ExportModal = lazy(() => import('./ExportModal'));
const HeroEditor = lazy(() => import('./editors/HeroEditor'));
const ServicesEditor = lazy(() => import('./editors/ServicesEditor'));
const AboutEditor = lazy(() => import('./editors/AboutEditor'));
const PortfolioEditor = lazy(() => import('./editors/PortfolioEditor'));
const TestimonialsEditor = lazy(() => import('./editors/TestimonialsEditor'));
const FAQEditor = lazy(() => import('./editors/FAQEditor'));
const ProcessEditor = lazy(() => import('./editors/ProcessEditor'));
const ContactEditor = lazy(() => import('./editors/ContactEditor'));
const FooterEditor = lazy(() => import('./editors/FooterEditor'));
const SettingsEditor = lazy(() => import('./editors/SettingsEditor'));
const AccountSettings = lazy(() => import('./editors/AccountSettings'));
const PublishSettings = lazy(() => import('./editors/PublishSettings'));

interface DashboardProps {
  onLogout: () => void;
}

const sectionLabels: Record<string, string> = {
  overview: 'Overview',
  hero: 'Hero Section',
  services: 'Services',
  about: 'About',
  portfolio: 'Portfolio',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  process: 'Process',
  contact: 'Contact',
  footer: 'Footer',
  settings: 'Site Settings',
  account: 'Account Settings',
  publish: 'Publish to Website',
};

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-[3px] border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
    </div>
  );
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const { contentVersion } = useSiteData();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // BUG FIX: Use refs for popstate handler to avoid stale closures
  const showPreviewRef = useRef(showPreview);
  const showExportRef = useRef(showExport);
  const activeSectionRef = useRef(activeSection);
  
  useEffect(() => { showPreviewRef.current = showPreview; }, [showPreview]);
  useEffect(() => { showExportRef.current = showExport; }, [showExport]);
  useEffect(() => { activeSectionRef.current = activeSection; }, [activeSection]);

  // Throttled session extension
  const handleActivity = useCallback(() => {
    extendSession();
  }, []);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'touchstart'];
    const options = { passive: true, capture: false };
    events.forEach(event => window.addEventListener(event, handleActivity, options));
    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [handleActivity]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showExport) setShowExport(false);
        else if (showPreview) setShowPreview(false);
        else if (sidebarOpen) setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showExport, showPreview, sidebarOpen]);

  // Body scroll lock for sidebar on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // BUG FIX: Handle browser back button using refs to avoid stale state
  useEffect(() => {
    const handlePopState = () => {
      if (showPreviewRef.current) {
        setShowPreview(false);
      } else if (showExportRef.current) {
        setShowExport(false);
      } else if (activeSectionRef.current !== 'overview') {
        setActiveSection('overview');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // Empty deps - handler uses refs

  // BUG FIX: Only push history for preview (not every section change)
  const handleSectionChange = useCallback((section: string) => {
    if (section === 'preview') {
      window.history.pushState({ preview: true }, '');
      setShowPreview(true);
    } else if (section === 'export' || section === 'reset') {
      setShowExport(true);
    } else {
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const renderEditor = () => {
    switch (activeSection) {
      case 'overview': return <Overview onNavigate={handleSectionChange} />;
      case 'hero': return <HeroEditor />;
      case 'services': return <ServicesEditor />;
      case 'about': return <AboutEditor />;
      case 'portfolio': return <PortfolioEditor />;
      case 'testimonials': return <TestimonialsEditor />;
      case 'faq': return <FAQEditor />;
      case 'process': return <ProcessEditor />;
      case 'contact': return <ContactEditor />;
      case 'footer': return <FooterEditor />;
      case 'settings': return <SettingsEditor />;
      case 'account': return <AccountSettings />;
      case 'publish': return <PublishSettings />;
      default: return <Overview onNavigate={handleSectionChange} />;
    }
  };

  // Preview mode
  if (showPreview) {
    return (
      <div className="min-h-screen min-h-[100dvh]">
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between safe-area-top">
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] -ml-2 pl-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          <span className="text-sm text-gray-400">Preview</span>
          <button onClick={() => setShowPreview(false)} className="p-2 text-gray-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="pt-14">
          <Suspense fallback={<LoadingSpinner />}><Preview /></Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-950">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} isOpen={sidebarOpen} onToggle={closeSidebar} onLogout={onLogout} />

      <div className="lg:ml-64 flex flex-col min-h-screen min-h-[100dvh]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 safe-area-top">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
              <button onClick={() => handleSectionChange('overview')} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all min-h-[44px] ${activeSection === 'overview' ? 'bg-violet-500/20 text-violet-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </button>
              {activeSection !== 'overview' && (
                <div className="flex items-center gap-1 text-sm min-w-0">
                  <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
                  <span className="text-white font-medium truncate">{sectionLabels[activeSection] || activeSection}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-8 pb-safe" key={contentVersion}>
          <Suspense fallback={<LoadingSpinner />}>{renderEditor()}</Suspense>
        </main>
      </div>

      {showExport && (
        <Suspense fallback={null}><ExportModal onClose={() => setShowExport(false)} /></Suspense>
      )}
    </div>
  );
}
