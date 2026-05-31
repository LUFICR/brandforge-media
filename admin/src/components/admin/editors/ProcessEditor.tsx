import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2 } from 'lucide-react';
import ColorPicker from '../shared/ColorPicker';
import EditorShell, { uid } from '../shared/EditorShell';

const iconOptions = ['Search', 'Lightbulb', 'PenTool', 'Rocket', 'TrendingUp', 'Target', 'Zap', 'CheckCircle'];
const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";
const is = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm";

export default function ProcessEditor() {
  const { content, updateSection } = useSiteData();
  const [process, setProcess] = useState(content.process);

  const handleSave = () => updateSection('process', process);

  const updateStep = (id: string, field: string, value: string) => {
    setProcess({ ...process, steps: process.steps.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const addStep = () => {
    const num = (process.steps.length + 1).toString().padStart(2, '0');
    setProcess({ ...process, steps: [...process.steps, { id: uid(), num, title: 'New Step', description: 'Description.', icon: 'Zap', color: 'from-blue-500 to-cyan-500' }] });
  };

  const removeStep = (id: string) => {
    setProcess({ ...process, steps: process.steps.filter(s => s.id !== id) });
  };

  return (
    <EditorShell title="Process Section" subtitle="Define your workflow steps" onSave={handleSave}>
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Header</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Badge</label><input type="text" value={process.badge} onChange={(e) => setProcess({ ...process, badge: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={process.title} onChange={(e) => setProcess({ ...process, title: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Highlight</label><input type="text" value={process.titleHighlight} onChange={(e) => setProcess({ ...process, titleHighlight: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtitle</label><input type="text" value={process.subtitle} onChange={(e) => setProcess({ ...process, subtitle: e.target.value })} className={ic} /></div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Steps ({process.steps.length})</h3>
          <button onClick={addStep} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="space-y-4">
          {process.steps.map((step) => (
            <div key={step.id} className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-700/50">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{step.num}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div><label className="block text-xs text-gray-500 mb-1">Number</label><input type="text" value={step.num} onChange={(e) => updateStep(step.id, 'num', e.target.value)} className={is} /></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Title</label><input type="text" value={step.title} onChange={(e) => updateStep(step.id, 'title', e.target.value)} className={is} /></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Icon</label><select value={step.icon} onChange={(e) => updateStep(step.id, 'icon', e.target.value)} className={is}>{iconOptions.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
                  </div>
                  <div><label className="block text-xs text-gray-500 mb-1">Description</label><textarea value={step.description} onChange={(e) => updateStep(step.id, 'description', e.target.value)} rows={2} className={is + " resize-none"} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1.5">Color</label><ColorPicker value={step.color} onChange={(c) => updateStep(step.id, 'color', c)} preset="process" /></div>
                </div>
                <button onClick={() => removeStep(step.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0" aria-label="Remove step"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
