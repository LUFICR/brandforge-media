import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, X } from 'lucide-react';
import EditorShell from '../shared/EditorShell';

export default function AboutEditor() {
  const { content, updateSection } = useSiteData();
  const [about, setAbout] = useState(content.about);

  const handleSave = () => updateSection('about', about);

  const updateFeature = (index: number, field: string, value: string) => {
    const f = [...about.features];
    f[index] = { ...f[index], [field]: value };
    setAbout({ ...about, features: f });
  };

  const addFeature = () => {
    const num = (about.features.length + 1).toString().padStart(2, '0');
    setAbout({ ...about, features: [...about.features, { num, icon: 'Star', title: 'New Feature', desc: 'Description' }] });
  };

  const removeFeature = (i: number) => setAbout({ ...about, features: about.features.filter((_, idx) => idx !== i) });

  const addTag = () => setAbout({ ...about, tags: [...about.tags, 'New Tag'] });
  const updateTag = (i: number, v: string) => { const t = [...about.tags]; t[i] = v; setAbout({ ...about, tags: t }); };
  const removeTag = (i: number) => setAbout({ ...about, tags: about.tags.filter((_, idx) => idx !== i) });

  const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";
  const is = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm";

  return (
    <EditorShell title="About Section" subtitle="Edit your company information" onSave={handleSave}>
      {/* Company Info */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Company Name</label><input type="text" value={about.companyName} onChange={(e) => setAbout({ ...about, companyName: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Short Name</label><input type="text" value={about.companyShort} onChange={(e) => setAbout({ ...about, companyShort: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Founded Year</label><input type="text" value={about.foundedYear} onChange={(e) => setAbout({ ...about, foundedYear: e.target.value })} className={ic} /></div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Content</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-sm text-gray-400 mb-2">Badge</label><input type="text" value={about.badge} onChange={(e) => setAbout({ ...about, badge: e.target.value })} className={ic} /></div>
            <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} className={ic} /></div>
            <div><label className="block text-sm text-gray-400 mb-2">Highlight</label><input type="text" value={about.titleHighlight} onChange={(e) => setAbout({ ...about, titleHighlight: e.target.value })} className={ic} /></div>
          </div>
          <div><label className="block text-sm text-gray-400 mb-2">Main Description</label><textarea value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} rows={3} className={ic + " resize-none"} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Secondary Description</label><textarea value={about.descriptionSecondary} onChange={(e) => setAbout({ ...about, descriptionSecondary: e.target.value })} rows={3} className={ic + " resize-none"} /></div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Tags</h3>
          <button onClick={addTag} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {about.tags.map((tag, i) => (
            <div key={`tag-${i}-${tag}`} className="flex items-center gap-1 bg-gray-900 rounded-lg overflow-hidden">
              <input type="text" value={tag} onChange={(e) => updateTag(i, e.target.value)} className="px-3 py-2 bg-transparent text-white text-base sm:text-sm w-32 focus:outline-none" />
              <button onClick={() => removeTag(i)} className="p-2.5 text-gray-500 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove tag"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Stats</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {about.stats.map((stat, i) => (
            <div key={`stat-${i}`} className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div><label className="block text-xs text-gray-500 mb-1">Value</label><input type="text" value={stat.value} onChange={(e) => { const s = [...about.stats]; s[i] = { ...s[i], value: e.target.value }; setAbout({ ...about, stats: s }); }} className={is} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Label</label><input type="text" value={stat.label} onChange={(e) => { const s = [...about.stats]; s[i] = { ...s[i], label: e.target.value }; setAbout({ ...about, stats: s }); }} className={is} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Why Choose Us</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              <input type="text" value={about.whyChooseUsBadge} onChange={(e) => setAbout({ ...about, whyChooseUsBadge: e.target.value })} placeholder="Badge" className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-base sm:text-sm w-28" />
              <input type="text" value={about.whyChooseUsTitle} onChange={(e) => setAbout({ ...about, whyChooseUsTitle: e.target.value })} placeholder="Title" className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-base sm:text-sm flex-1 min-w-[120px]" />
              <input type="text" value={about.whyChooseUsHighlight} onChange={(e) => setAbout({ ...about, whyChooseUsHighlight: e.target.value })} placeholder="Highlight" className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-base sm:text-sm w-24" />
            </div>
          </div>
          <button onClick={addFeature} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px] shrink-0"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {about.features.map((f, i) => (
            <div key={`feat-${i}-${f.num}`} className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs text-gray-500 mb-1">Number</label><input type="text" value={f.num} onChange={(e) => updateFeature(i, 'num', e.target.value)} className={is} /></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Title</label><input type="text" value={f.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} className={is} /></div>
                  </div>
                  <div><label className="block text-xs text-gray-500 mb-1">Description</label><input type="text" value={f.desc} onChange={(e) => updateFeature(i, 'desc', e.target.value)} className={is} /></div>
                </div>
                <button onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove feature"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
