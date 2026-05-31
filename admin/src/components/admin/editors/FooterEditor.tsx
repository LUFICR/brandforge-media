import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { X } from 'lucide-react';
import EditorShell from '../shared/EditorShell';

const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";

export default function FooterEditor() {
  const { content, updateSection } = useSiteData();
  const [footer, setFooter] = useState(content.footer);

  const handleSave = () => updateSection('footer', footer);

  const updateLink = (cat: 'services' | 'company' | 'support', i: number, v: string) => {
    const nl = { ...footer.links }; nl[cat] = [...nl[cat]]; nl[cat][i] = v; setFooter({ ...footer, links: nl });
  };
  const addLink = (cat: 'services' | 'company' | 'support') => {
    const nl = { ...footer.links }; nl[cat] = [...nl[cat], 'New Link']; setFooter({ ...footer, links: nl });
  };
  const removeLink = (cat: 'services' | 'company' | 'support', i: number) => {
    const nl = { ...footer.links }; nl[cat] = nl[cat].filter((_, idx) => idx !== i); setFooter({ ...footer, links: nl });
  };

  return (
    <EditorShell title="Footer Section" subtitle="Customize your footer content" onSave={handleSave}>
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Brand Information</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Brand Name</label><input type="text" value={footer.brandName} onChange={(e) => setFooter({ ...footer, brandName: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Tagline</label><input type="text" value={footer.brandTagline} onChange={(e) => setFooter({ ...footer, brandTagline: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Copyright</label><input type="text" value={footer.copyright} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} className={ic} /></div>
        </div>
        <div className="mt-4"><label className="block text-sm text-gray-400 mb-2">Description</label><textarea value={footer.description} onChange={(e) => setFooter({ ...footer, description: e.target.value })} rows={2} className={ic + " resize-none"} /></div>
        <div className="mt-4"><label className="block text-sm text-gray-400 mb-2">"Made With" Text</label><input type="text" value={footer.madeWithText} onChange={(e) => setFooter({ ...footer, madeWithText: e.target.value })} className={ic} /></div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">CTA Banner</h3>
        <div className="space-y-4">
          <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={footer.ctaTitle} onChange={(e) => setFooter({ ...footer, ctaTitle: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtitle</label><textarea value={footer.ctaSubtitle} onChange={(e) => setFooter({ ...footer, ctaSubtitle: e.target.value })} rows={2} className={ic + " resize-none"} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Button Text</label><input type="text" value={footer.ctaButton} onChange={(e) => setFooter({ ...footer, ctaButton: e.target.value })} className={ic} /></div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Footer Links</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {(['services', 'company', 'support'] as const).map((cat) => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-300 capitalize">{cat}</h4>
                <button onClick={() => addLink(cat)} className="text-xs text-violet-400 hover:text-violet-300 min-h-[44px] px-2 flex items-center" aria-label={`Add ${cat} link`}>+ Add</button>
              </div>
              <div className="space-y-2">
                {footer.links[cat].map((link, i) => (
                  <div key={`${cat}-${i}-${link}`} className="flex items-center gap-1 bg-gray-900 rounded overflow-hidden">
                    <input type="text" value={link} onChange={(e) => updateLink(cat, i, e.target.value)} className="flex-1 px-3 py-2.5 bg-transparent text-white text-base sm:text-sm focus:outline-none" />
                    <button onClick={() => removeLink(cat, i)} className="p-2.5 text-gray-500 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove link"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
