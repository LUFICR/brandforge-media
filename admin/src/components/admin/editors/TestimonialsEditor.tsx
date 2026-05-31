import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, Star } from 'lucide-react';
import EditorShell, { uid } from '../shared/EditorShell';

export default function TestimonialsEditor() {
  const { content, updateSection } = useSiteData();
  const [testimonials, setTestimonials] = useState(content.testimonials);

  const handleSave = () => updateSection('testimonials', testimonials);

  const updateTestimonial = (id: string, field: string, value: string | number) => {
    setTestimonials({
      ...testimonials,
      items: testimonials.items.map(t => t.id === id ? { ...t, [field]: value } : t),
    });
  };

  const addTestimonial = () => {
    setTestimonials({
      ...testimonials,
      items: [...testimonials.items, { id: uid(), quote: 'New testimonial.', name: 'Client Name', role: 'Role, Company', rating: 5 }],
    });
  };

  const removeTestimonial = (id: string) => {
    setTestimonials({ ...testimonials, items: testimonials.items.filter(t => t.id !== id) });
  };

  return (
    <EditorShell title="Testimonials Section" subtitle="Manage client reviews and feedback" onSave={handleSave}>
      {/* Section Header */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Header</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Badge</label><input type="text" value={testimonials.badge} onChange={(e) => setTestimonials({ ...testimonials, badge: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={testimonials.title} onChange={(e) => setTestimonials({ ...testimonials, title: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Highlight</label><input type="text" value={testimonials.titleHighlight} onChange={(e) => setTestimonials({ ...testimonials, titleHighlight: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtitle</label><input type="text" value={testimonials.subtitle} onChange={(e) => setTestimonials({ ...testimonials, subtitle: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" /></div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Testimonials ({testimonials.items.length})</h3>
          <button onClick={addTestimonial} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 transition-colors min-h-[44px]">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {testimonials.items.map((t) => (
            <div key={t.id} className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-700/50">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center shrink-0">
                  <span className="text-white text-lg font-bold">{t.name[0] || '?'}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div><label className="block text-xs text-gray-500 mb-1">Name</label><input type="text" value={t.name} onChange={(e) => updateTestimonial(t.id, 'name', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm" /></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Role</label><input type="text" value={t.role} onChange={(e) => updateTestimonial(t.id, 'role', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm" /></div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Rating</label>
                      <div className="flex items-center gap-1 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button" onClick={() => updateTestimonial(t.id, 'rating', star)} className={`p-1 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors ${star <= t.rating ? 'text-yellow-400' : 'text-gray-600'}`} aria-label={`${star} star`}>
                            <Star className="w-5 h-5 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div><label className="block text-xs text-gray-500 mb-1">Quote</label><textarea value={t.quote} onChange={(e) => updateTestimonial(t.id, 'quote', e.target.value)} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm resize-none" /></div>
                </div>
                <button onClick={() => removeTestimonial(t.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0" aria-label="Remove testimonial">
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
