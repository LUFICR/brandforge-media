import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, X } from 'lucide-react';
import EditorShell from '../shared/EditorShell';

const colorOptions = [
  { label: 'Violet', value: 'text-violet-400' }, { label: 'Emerald', value: 'text-emerald-400' },
  { label: 'Pink', value: 'text-pink-400' }, { label: 'Amber', value: 'text-amber-400' },
  { label: 'Cyan', value: 'text-cyan-400' }, { label: 'Blue', value: 'text-blue-400' },
];
const iconOptions = ['Mail', 'Phone', 'MapPin', 'Clock', 'Globe', 'MessageSquare'];
const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";
const is = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm";

export default function ContactEditor() {
  const { content, updateSection } = useSiteData();
  const [contact, setContact] = useState(content.contact);

  const handleSave = () => updateSection('contact', contact);

  const updateInfo = (i: number, field: string, v: string) => {
    const ni = [...contact.info]; ni[i] = { ...ni[i], [field]: v }; setContact({ ...contact, info: ni });
  };
  const addInfo = () => setContact({ ...contact, info: [...contact.info, { icon: 'Mail', label: 'New', value: 'Value', color: 'text-violet-400' }] });
  const removeInfo = (i: number) => setContact({ ...contact, info: contact.info.filter((_, idx) => idx !== i) });

  const updateServiceOption = (i: number, v: string) => { const ns = [...contact.serviceOptions]; ns[i] = v; setContact({ ...contact, serviceOptions: ns }); };
  const addServiceOption = () => setContact({ ...contact, serviceOptions: [...contact.serviceOptions, 'New Service'] });
  const removeServiceOption = (i: number) => setContact({ ...contact, serviceOptions: contact.serviceOptions.filter((_, idx) => idx !== i) });

  return (
    <EditorShell title="Contact Section" subtitle="Manage contact information and form" onSave={handleSave}>
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Header</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Badge</label><input type="text" value={contact.badge} onChange={(e) => setContact({ ...contact, badge: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={contact.title} onChange={(e) => setContact({ ...contact, title: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Highlight</label><input type="text" value={contact.titleHighlight} onChange={(e) => setContact({ ...contact, titleHighlight: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtitle</label><input type="text" value={contact.subtitle} onChange={(e) => setContact({ ...contact, subtitle: e.target.value })} className={ic} /></div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Contact Information</h3>
          <button onClick={addInfo} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="space-y-3">
          {contact.info.map((info, i) => (
            <div key={`ci-${i}-${info.label}`} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                <div><label className="block text-xs text-gray-500 mb-1">Icon</label><select value={info.icon} onChange={(e) => updateInfo(i, 'icon', e.target.value)} className={is}>{iconOptions.map(ic2 => <option key={ic2} value={ic2}>{ic2}</option>)}</select></div>
                <div><label className="block text-xs text-gray-500 mb-1">Label</label><input type="text" value={info.label} onChange={(e) => updateInfo(i, 'label', e.target.value)} className={is} /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Value</label><input type="text" value={info.value} onChange={(e) => updateInfo(i, 'value', e.target.value)} className={is} /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Color</label><select value={info.color} onChange={(e) => updateInfo(i, 'color', e.target.value)} className={is}>{colorOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
              </div>
              <button onClick={() => removeInfo(i)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0" aria-label="Remove info"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">WhatsApp</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Number</label><input type="text" value={contact.whatsappNumber} onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })} placeholder="919311267085" className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Button Text</label><input type="text" value={contact.whatsappText} onChange={(e) => setContact({ ...contact, whatsappText: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtext</label><input type="text" value={contact.whatsappSubtext} onChange={(e) => setContact({ ...contact, whatsappSubtext: e.target.value })} className={ic} /></div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Service Options</h3>
          <button onClick={addServiceOption} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {contact.serviceOptions.map((opt, i) => (
            <div key={`so-${i}-${opt}`} className="flex items-center gap-1 bg-gray-900 rounded-lg overflow-hidden">
              <input type="text" value={opt} onChange={(e) => updateServiceOption(i, e.target.value)} className="px-3 py-2 bg-transparent text-white text-base sm:text-sm w-36 focus:outline-none" />
              <button onClick={() => removeServiceOption(i)} className="p-2.5 text-gray-500 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove option"><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Form Labels</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.entries(contact.formLabels).map(([key, value]) => (
            <div key={key}><label className="block text-sm text-gray-400 mb-2 capitalize">{key}</label><input type="text" value={value} onChange={(e) => setContact({ ...contact, formLabels: { ...contact.formLabels, [key]: e.target.value } })} className={ic} /></div>
          ))}
        </div>
        <div className="mt-4"><label className="block text-sm text-gray-400 mb-2">Response Time</label><input type="text" value={contact.responseTime} onChange={(e) => setContact({ ...contact, responseTime: e.target.value })} className={ic} /></div>
      </div>
    </EditorShell>
  );
}
