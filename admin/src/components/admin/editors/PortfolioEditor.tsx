import { useState } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Plus, Trash2, X } from 'lucide-react';
import ColorPicker from '../shared/ColorPicker';
import EditorShell, { uid } from '../shared/EditorShell';

const ic = "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base";

export default function PortfolioEditor() {
  const { content, updateSection } = useSiteData();
  const [portfolio, setPortfolio] = useState(content.portfolio);

  const handleSave = () => updateSection('portfolio', portfolio);

  const updateProject = (id: string, field: string, value: string | string[]) => {
    setPortfolio({ ...portfolio, projects: portfolio.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const addProject = () => {
    setPortfolio({ ...portfolio, projects: [...portfolio.projects, { id: uid(), title: 'New Project', category: 'Branding', description: 'Description.', gradient: 'from-violet-600 to-indigo-600', tags: ['Tag 1'] }] });
  };

  const removeProject = (id: string) => {
    setPortfolio({ ...portfolio, projects: portfolio.projects.filter(p => p.id !== id) });
  };

  const addTagToProject = (pid: string) => {
    setPortfolio({ ...portfolio, projects: portfolio.projects.map(p => p.id === pid ? { ...p, tags: [...p.tags, 'New'] } : p) });
  };

  const removeTagFromProject = (pid: string, ti: number) => {
    setPortfolio({ ...portfolio, projects: portfolio.projects.map(p => p.id === pid ? { ...p, tags: p.tags.filter((_, idx) => idx !== ti) } : p) });
  };

  const updateProjectTag = (pid: string, ti: number, v: string) => {
    setPortfolio({ ...portfolio, projects: portfolio.projects.map(p => { if (p.id === pid) { const t = [...p.tags]; t[ti] = v; return { ...p, tags: t }; } return p; }) });
  };

  return (
    <EditorShell title="Portfolio Section" subtitle="Showcase your projects" onSave={handleSave}>
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Section Header</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm text-gray-400 mb-2">Badge</label><input type="text" value={portfolio.badge} onChange={(e) => setPortfolio({ ...portfolio, badge: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Title</label><input type="text" value={portfolio.title} onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Highlight</label><input type="text" value={portfolio.titleHighlight} onChange={(e) => setPortfolio({ ...portfolio, titleHighlight: e.target.value })} className={ic} /></div>
          <div><label className="block text-sm text-gray-400 mb-2">Subtitle</label><input type="text" value={portfolio.subtitle} onChange={(e) => setPortfolio({ ...portfolio, subtitle: e.target.value })} className={ic} /></div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Categories</h3>
          <button onClick={() => setPortfolio({ ...portfolio, categories: [...portfolio.categories, 'New'] })} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {portfolio.categories.map((cat, i) => (
            <div key={`cat-${i}-${cat}`} className="flex items-center gap-1 bg-gray-900 rounded-lg overflow-hidden">
              <input type="text" value={cat} onChange={(e) => { const c = [...portfolio.categories]; c[i] = e.target.value; setPortfolio({ ...portfolio, categories: c }); }} className="px-3 py-2 bg-transparent text-white text-base sm:text-sm w-32 focus:outline-none" />
              {i > 0 && <button onClick={() => setPortfolio({ ...portfolio, categories: portfolio.categories.filter((_, idx) => idx !== i) })} className="p-2.5 text-gray-500 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Remove category"><X className="w-3.5 h-3.5" /></button>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Projects ({portfolio.projects.length})</h3>
          <button onClick={addProject} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 min-h-[44px]"><Plus className="w-4 h-4" /> Add</button>
        </div>
        <div className="space-y-4">
          {portfolio.projects.map((project) => (
            <div key={project.id} className="bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-700/50">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-lg font-bold">{project.title[0] || '?'}</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs text-gray-500 mb-1">Title</label><input type="text" value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm" /></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Category</label><select value={project.category} onChange={(e) => updateProject(project.id, 'category', e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm">{portfolio.categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                  </div>
                  <div><label className="block text-xs text-gray-500 mb-1">Description</label><textarea value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)} rows={2} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded text-white text-base sm:text-sm resize-none" /></div>
                  <div><label className="block text-xs text-gray-500 mb-1.5">Color</label><ColorPicker value={project.gradient} onChange={(c) => updateProject(project.id, 'gradient', c)} preset="portfolio" /></div>
                  <div>
                    <label className="flex items-center justify-between text-xs text-gray-500 mb-1">Tags <button type="button" onClick={() => addTagToProject(project.id)} className="text-violet-400 hover:text-violet-300 min-h-[32px] px-1">+ Add</button></label>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, ti) => (
                        <div key={`${project.id}-tag-${ti}-${tag}`} className="flex items-center gap-1 bg-gray-800 rounded overflow-hidden">
                          <input type="text" value={tag} onChange={(e) => updateProjectTag(project.id, ti, e.target.value)} className="px-2 py-1.5 bg-transparent text-white text-xs w-20 focus:outline-none" />
                          <button onClick={() => removeTagFromProject(project.id, ti)} className="p-1.5 text-gray-500 hover:text-red-400 min-h-[32px] min-w-[32px] flex items-center justify-center" aria-label="Remove tag"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeProject(project.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0" aria-label="Remove project"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
