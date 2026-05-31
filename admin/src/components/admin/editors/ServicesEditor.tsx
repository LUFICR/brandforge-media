import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import ColorPicker from '../shared/ColorPicker';
import EditorShell, { uid } from '../shared/EditorShell';

const iconOptions = ['Palette', 'Globe', 'Share2', 'BarChart3', 'Megaphone', 'Camera', 'Code', 'Zap', 'Heart', 'Star'];
const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";

export default function ServicesEditor() {
  const { content, updateSection } = useSiteData();
  const [services, setServices] = useState(content.services);

  const handleSave = () => updateSection('services', services);

  const updateService = (id: string, field: string, value: string) => {
    setServices({ ...services, items: services.items.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const addService = () => {
    setServices({ ...services, items: [...services.items, { id: uid(), icon: 'Star', title: 'New Service', description: 'Description.', color: 'from-violet-500 to-purple-600' }] });
  };

  const removeService = (id: string) => {
    setServices({ ...services, items: services.items.filter(s => s.id !== id) });
  };

  return (
    <EditorShell title="Services Section" subtitle="Manage your service offerings" onSave={handleSave}>
      {/* Section Header */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Header</h3>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-sm text-gray-400 mb-2">Badge</label><input type="text" value={services.badge} onChange={(e) => setServices({ ...services, badge: e.target.value })} className={ic} /></div>
            <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={services.title} onChange={(e) => setServices({ ...services, title: e.target.value })} className={ic} /></div>
            <div><label className="block text-sm text-gray-400 mb-2">Highlight</label><input type="text" value={services.titleHighlight} onChange={(e) => setServices({ ...services, titleHighlight: e.target.value })} className={ic} /></div>
          </div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtitle</label><input type="text" value={services.subtitle} onChange={(e) => setServices({ ...services, subtitle: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">CTA Button</label><input type="text" value={services.ctaText} onChange={(e) => setServices({ ...services, ctaText: e.target.value })} className={ic} /></div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Services ({services.items.length})</h3>
          <button onClick={addService} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="space-y-4">
          {services.items.map((service) => (
            <div key={service.id} className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-700/50">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-2 text-gray-600"><GripVertical className="w-5 h-5" /></div>
                <div className="flex-1 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs text-gray-500 mb-1">Icon</label><select value={service.icon} onChange={(e) => updateService(service.id, 'icon', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm">{iconOptions.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Title</label><input type="text" value={service.title} onChange={(e) => updateService(service.id, 'title', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm" /></div>
                  </div>
                  <div><label className="block text-xs text-gray-500 mb-1">Description</label><textarea value={service.description} onChange={(e) => updateService(service.id, 'description', e.target.value)} rows={2} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm resize-none" /></div>
                  <div><label className="block text-xs text-gray-500 mb-1.5">Card Color</label><ColorPicker value={service.color} onChange={(c) => updateService(service.id, 'color', c)} preset="service" /></div>
                </div>
                <button onClick={() => removeService(service.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0" aria-label="Remove service"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
