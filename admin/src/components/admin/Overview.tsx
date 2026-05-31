import { useSiteData } from '../../contexts/SiteDataContext';
import { 
  Home, Briefcase, Users, FolderOpen, MessageSquare, 
  HelpCircle, GitBranch, Mail, Menu as MenuIcon, Settings,
  TrendingUp, Clock, CheckCircle2, ArrowRight
} from 'lucide-react';

interface OverviewProps {
  onNavigate: (section: string) => void;
}

export default function Overview({ onNavigate }: OverviewProps) {
  const { content, hasChanges } = useSiteData();

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: Home, count: content.hero.stats.length + ' stats', color: 'from-violet-500 to-purple-600', desc: 'Title, subtitle, CTA, video' },
    { id: 'services', name: 'Services', icon: Briefcase, count: content.services.items.length + ' services', color: 'from-blue-500 to-cyan-600', desc: 'Service cards & descriptions' },
    { id: 'about', name: 'About', icon: Users, count: content.about.features.length + ' features', color: 'from-emerald-500 to-green-600', desc: 'Company info, stats, tags' },
    { id: 'portfolio', name: 'Portfolio', icon: FolderOpen, count: content.portfolio.projects.length + ' projects', color: 'from-pink-500 to-rose-600', desc: 'Projects & categories' },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare, count: content.testimonials.items.length + ' reviews', color: 'from-yellow-500 to-amber-600', desc: 'Client reviews & ratings' },
    { id: 'faq', name: 'FAQ', icon: HelpCircle, count: content.faq.items.length + ' questions', color: 'from-cyan-500 to-teal-600', desc: 'Questions & answers' },
    { id: 'process', name: 'Process', icon: GitBranch, count: content.process.steps.length + ' steps', color: 'from-orange-500 to-red-600', desc: 'Workflow timeline steps' },
    { id: 'contact', name: 'Contact', icon: Mail, count: content.contact.info.length + ' info items', color: 'from-rose-500 to-pink-600', desc: 'Contact info, form, WhatsApp' },
    { id: 'footer', name: 'Footer', icon: MenuIcon, count: Object.values(content.footer.links).flat().length + ' links', color: 'from-indigo-500 to-violet-600', desc: 'Footer links, CTA banner' },
    { id: 'settings', name: 'Settings', icon: Settings, count: content.navLinks.length + ' nav links', color: 'from-gray-500 to-gray-600', desc: 'Navigation, marquee, site info' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your website content from one place. Click any section to start editing.</p>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl p-6 border border-violet-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{content.siteName}</p>
              <p className="text-sm text-gray-400">{content.siteDescription}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-6 border border-emerald-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {hasChanges ? 'Unsaved Changes' : 'All Saved'}
              </p>
              <p className="text-sm text-gray-400">
                {hasChanges ? 'Click save in each section' : 'Your content is up to date'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Auto-Saved</p>
              <p className="text-sm text-gray-400">Changes persist in browser</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Grid - CLICKABLE */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Content Sections — Click to Edit</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-violet-500/40 transition-all group text-left hover:bg-gray-800/80 hover:shadow-lg hover:shadow-violet-500/5 active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}>
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                {section.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 mb-2">{section.desc}</p>
              <span className="inline-block px-2.5 py-1 bg-gray-700/50 rounded-md text-xs text-gray-400">
                {section.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Publish CTA */}
      <button
        onClick={() => onNavigate('publish')}
        className="w-full p-5 sm:p-6 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-emerald-500/20 border border-violet-500/30 rounded-xl hover:from-violet-500/30 hover:to-emerald-500/30 transition-all text-left group active:scale-[0.99]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-white group-hover:text-violet-300">🚀 Publish to Website</p>
            <p className="text-sm text-gray-400 mt-1">Push your changes live instantly — no code needed</p>
          </div>
          <span className="text-2xl hidden sm:block group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </button>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('preview')}
          className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all group text-left"
        >
          <p className="font-semibold text-emerald-400 group-hover:text-emerald-300">👁️ Live Preview</p>
          <p className="text-sm text-gray-500 mt-1">See how your website looks</p>
        </button>
        <button
          onClick={() => onNavigate('export')}
          className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all group text-left"
        >
          <p className="font-semibold text-blue-400 group-hover:text-blue-300">📤 Export / Import</p>
          <p className="text-sm text-gray-500 mt-1">Backup or restore content</p>
        </button>
        <button
          onClick={() => onNavigate('account')}
          className="p-5 bg-violet-500/10 border border-violet-500/20 rounded-xl hover:bg-violet-500/20 transition-all group text-left"
        >
          <p className="font-semibold text-violet-400 group-hover:text-violet-300">🔐 Account Settings</p>
          <p className="text-sm text-gray-500 mt-1">Change username & password</p>
        </button>
        <button
          onClick={() => onNavigate('reset')}
          className="p-5 bg-orange-500/10 border border-orange-500/20 rounded-xl hover:bg-orange-500/20 transition-all group text-left"
        >
          <p className="font-semibold text-orange-400 group-hover:text-orange-300">🔄 Reset Content</p>
          <p className="text-sm text-gray-500 mt-1">Restore default content</p>
        </button>
      </div>

      {/* How it works */}
      <div className="bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">⚡ How It Works</h3>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center">
          <div className="flex-1 w-full p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">📝</div>
            <p className="text-white font-medium text-sm">Edit Here</p>
            <p className="text-gray-500 text-xs mt-1">Change any content</p>
          </div>
          <div className="text-gray-600 text-xl hidden sm:block">→</div>
          <div className="text-gray-600 text-xl sm:hidden">↓</div>
          <div className="flex-1 w-full p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-white font-medium text-sm">Press Publish</p>
            <p className="text-gray-500 text-xs mt-1">One click</p>
          </div>
          <div className="text-gray-600 text-xl hidden sm:block">→</div>
          <div className="text-gray-600 text-xl sm:hidden">↓</div>
          <div className="flex-1 w-full p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            <div className="text-2xl mb-2">🌐</div>
            <p className="text-emerald-400 font-medium text-sm">Website Updated!</p>
            <p className="text-gray-500 text-xs mt-1">Live in seconds</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          First time? Go to <button onClick={() => onNavigate('publish')} className="text-violet-400 hover:text-violet-300 underline">Publish Settings</button> for one-time setup (10 min)
        </p>
      </div>

      {/* Quick Tips */}
      <div className="bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">💡 Quick Tips</h3>
        <ul className="space-y-3 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            Click on any section card above or use the sidebar to edit content
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            Changes are saved to your browser — they persist between visits
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            Use "Live Preview" to see how your website looks before exporting
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            Export regularly as backup — browser data can be cleared
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">✓</span>
            After export, replace the old JSON file in your Next.js project and deploy
          </li>
        </ul>
      </div>
    </div>
  );
}
