import { useEffect, useRef, memo } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  Briefcase, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  HelpCircle, 
  GitBranch, 
  Mail, 
  Menu as MenuIcon,
  Settings,
  Eye,
  Download,
  RotateCcw,
  Sparkles,
  LogOut,
  UserCircle,
  Rocket,
  X
} from 'lucide-react';
import { getUsername } from '../../utils/auth';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'hero', label: 'Hero Section', icon: Home },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'about', label: 'About', icon: Users },
  { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'process', label: 'Process', icon: GitBranch },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'footer', label: 'Footer', icon: MenuIcon },
];

const settingsItems = [
  { id: 'publish', label: 'Publish', icon: Rocket },
  { id: 'settings', label: 'Site Settings', icon: Settings },
  { id: 'account', label: 'Account', icon: UserCircle },
];

function Sidebar({ activeSection, onSectionChange, isOpen, onToggle, onLogout }: SidebarProps) {
  const username = getUsername();
  const sidebarRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle clicks on nav items
  const handleNavClick = (id: string) => {
    onSectionChange(id);
    // Close on mobile
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-800 z-50
          transition-transform duration-300 ease-out
          w-[280px] sm:w-64 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col safe-area-left
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header with close button on mobile */}
        <div className="p-4 sm:p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-white truncate">BrandForge</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          
          {/* Close button - mobile only */}
          <button
            ref={closeButtonRef}
            onClick={onToggle}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - scrollable */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto overscroll-contain">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Content</p>
          
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200 min-h-[44px]
                ${activeSection === item.id 
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white active:bg-gray-700'
                }
              `}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}

          <div className="pt-3 mt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Settings</p>
            {settingsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 min-h-[44px]
                  ${activeSection === item.id 
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white active:bg-gray-700'
                  }
                `}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="p-3 sm:p-4 border-t border-gray-800 safe-area-bottom">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button 
              onClick={() => handleNavClick('preview')}
              className="flex flex-col items-center gap-1 p-2 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition-colors min-h-[52px]"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-gray-400">Preview</span>
            </button>
            <button 
              onClick={() => handleNavClick('export')}
              className="flex flex-col items-center gap-1 p-2 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition-colors min-h-[52px]"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] text-gray-400">Export</span>
            </button>
            <button 
              onClick={() => handleNavClick('reset')}
              className="flex flex-col items-center gap-1 p-2 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition-colors min-h-[52px]"
            >
              <RotateCcw className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] text-gray-400">Reset</span>
            </button>
          </div>

          {/* User & Logout */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold uppercase">
                  {username.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">@{username}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);
