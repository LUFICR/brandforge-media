import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import EditorShell, { uid } from '../shared/EditorShell';

export default function FAQEditor() {
  const { content, updateSection } = useSiteData();
  const [faq, setFaq] = useState(content.faq);

  const handleSave = () => updateSection('faq', faq);

  const updateFAQ = (id: string, field: string, value: string) => {
    setFaq({
      ...faq,
      items: faq.items.map(f => f.id === id ? { ...f, [field]: value } : f),
    });
  };

  const addFAQ = () => {
    setFaq({
      ...faq,
      items: [...faq.items, { id: uid(), question: 'New Question?', answer: 'Answer goes here.' }],
    });
  };

  const removeFAQ = (id: string) => {
    setFaq({ ...faq, items: faq.items.filter(f => f.id !== id) });
  };

  return (
    <EditorShell title="FAQ Section" subtitle="Manage frequently asked questions" onSave={handleSave}>
      {/* Section Header */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Header</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Badge</label>
            <input type="text" value={faq.badge} onChange={(e) => setFaq({ ...faq, badge: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input type="text" value={faq.title} onChange={(e) => setFaq({ ...faq, title: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Highlight</label>
            <input type="text" value={faq.titleHighlight} onChange={(e) => setFaq({ ...faq, titleHighlight: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitle</label>
            <input type="text" value={faq.subtitle} onChange={(e) => setFaq({ ...faq, subtitle: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Questions ({faq.items.length})</h3>
          <button onClick={addFAQ} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 transition-colors min-h-[44px]">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <div key={item.id} className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-700/50">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 mt-2 shrink-0">
                  <GripVertical className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500 font-medium">#{index + 1}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Question</label>
                    <input type="text" value={item.question} onChange={(e) => updateFAQ(item.id, 'question', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Answer</label>
                    <textarea value={item.answer} onChange={(e) => updateFAQ(item.id, 'answer', e.target.value)} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm resize-none" />
                  </div>
                </div>
                <button onClick={() => removeFAQ(item.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0" aria-label="Remove question">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
