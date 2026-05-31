import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, X } from 'lucide-react';
import EditorShell from '../shared/EditorShell';

const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";
const is = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm";

export default function SettingsEditor() {
  const { content, updateContent, updateSection } = useSiteData();
  const [siteName, setSiteName] = useState(content.siteName);
  const [siteDescription, setSiteDescription] = useState(content.siteDescription);
  const [navLinks, setNavLinks] = useState(content.navLinks);
  const [marquee, setMarquee] = useState(content.marquee);

  const handleSave = () => {
    updateContent({ siteName, siteDescription, navLinks });
    updateSection('marquee', marquee);
  };

  const updateNavLink = (i: number, field: string, v: string) => {
    const nl = [...navLinks]; nl[i] = { ...nl[i], [field]: v }; setNavLinks(nl);
  };
  const addNavLink = () => setNavLinks([...navLinks, { name: 'New', href: '#section' }]);
  const removeNavLink = (i: number) => setNavLinks(navLinks.filter((_, idx) => idx !== i));

  const updateMarqueeItem = (i: number, v: string) => { const ni = [...marquee.items]; ni[i] = v; setMarquee({ ...marquee, items: ni }); };
  const addMarqueeItem = () => setMarquee({ ...marquee, items: [...marquee.items, 'NEW'] });
  const removeMarqueeItem = (i: number) => setMarquee({ ...marquee, items: marquee.items.filter((_, idx) => idx !== i) });

  const updateMarqueeStat = (i: number, field: string, v: string) => {
    const ns = [...marquee.stats]; ns[i] = { ...ns[i], [field]: v }; setMarquee({ ...marquee, stats: ns });
  };

  return (
    <EditorShell title="Global Settings" subtitle="Site-wide configuration" onSave={handleSave}>
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Site Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Site Name</label><input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Description</label><input type="text" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} className={ic} /></div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Navigation Links</h3>
          <button onClick={addNavLink} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="space-y-3">
          {navLinks.map((link, i) => (
            <div key={`nav-${i}-${link.name}`} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-500 mb-1">Name</label><input type="text" value={link.name} onChange={(e) => updateNavLink(i, 'name', e.target.value)} className={is} /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Link</label><input type="text" value={link.href} onChange={(e) => updateNavLink(i, 'href', e.target.value)} className={is} /></div>
              </div>
              <button onClick={() => removeNavLink(i)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove link"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Marquee Stats</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marquee.stats.map((stat, i) => (
            <div key={`mstat-${i}`} className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div><label className="block text-xs text-gray-500 mb-1">Icon</label><input type="text" value={stat.icon} onChange={(e) => updateMarqueeStat(i, 'icon', e.target.value)} className={is} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Value</label><input type="text" value={stat.value} onChange={(e) => updateMarqueeStat(i, 'value', e.target.value)} className={is} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Label</label><input type="text" value={stat.label} onChange={(e) => updateMarqueeStat(i, 'label', e.target.value)} className={is} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Marquee Text</h3>
          <button onClick={addMarqueeItem} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {marquee.items.map((item, i) => (
            <div key={`mi-${i}-${item}`} className="flex items-center gap-1 bg-gray-900 rounded-lg overflow-hidden">
              <input type="text" value={item} onChange={(e) => updateMarqueeItem(i, e.target.value)} className="px-3 py-2 bg-transparent text-white text-base sm:text-sm w-28 focus:outline-none" />
              <button onClick={() => removeMarqueeItem(i)} className="p-2.5 text-gray-500 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove item"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Use "✦" as separator</p>
      </div>
    </EditorShell>
  );
}
