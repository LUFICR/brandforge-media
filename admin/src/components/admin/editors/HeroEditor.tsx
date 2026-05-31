import { useState, useRef, useCallback, useEffect } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import { Save, Plus, Trash2, Image, Video, Upload, Link, AlertCircle, CheckCircle, X, FileVideo, FileImage } from 'lucide-react';

export default function HeroEditor() {
  const { content, updateSection } = useSiteData();
  const [hero, setHero] = useState(content.hero);
  const [saved, setSaved] = useState(false);
  const [mediaTab, setMediaTab] = useState<'url' | 'upload'>('url');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [dragOverVideo, setDragOverVideo] = useState(false);
  const [dragOverImage, setDragOverImage] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // BUG FIX: Revoke blob URLs on cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [videoPreviewUrl, imagePreviewUrl]);

  const handleSave = () => {
    updateSection('hero', hero);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateStat = (index: number, field: string, value: string | number) => {
    const newStats = [...hero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setHero({ ...hero, stats: newStats });
  };

  const addStat = () => {
    setHero({
      ...hero,
      stats: [...hero.stats, { value: 0, suffix: '+', label: 'New Stat' }],
    });
  };

  const removeStat = (index: number) => {
    setHero({
      ...hero,
      stats: hero.stats.filter((_, i) => i !== index),
    });
  };

  // Handle video file selection
  const handleVideoFile = useCallback((file: File) => {
    setUploadError('');

    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Only MP4, WebM, and OGG videos are supported');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadError('Video must be under 50MB');
      return;
    }

    // BUG FIX: Revoke old blob URL before creating new one
    setVideoPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    // BUG FIX: Videos should NOT be stored as data URLs (too large for localStorage)
    // Always guide user to use URL instead
    if (file.size > 512 * 1024) {
      setUploadError('Video is too large for browser storage. Upload it to your hosting (Google Drive, Cloudinary, etc.) and use the "Paste URL" tab instead.');
    } else {
      // Only allow tiny videos (<512KB) as data URLs
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setHero(prev => ({ ...prev, videoUrl: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle image file selection
  const handleImageFile = useCallback((file: File) => {
    setUploadError('');

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG, WebP, and AVIF images are supported');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be under 10MB');
      return;
    }

    // BUG FIX: Revoke old blob URL before creating new one
    setImagePreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    // Images under 800KB can be stored as data URLs
    if (file.size > 800 * 1024) {
      setUploadError('Image is large. For best results, upload to your hosting and use the "Paste URL" tab.');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setHero(prev => ({ ...prev, backgroundImage: dataUrl }));
    };
    reader.readAsDataURL(file);
  }, []);

  const clearVideo = useCallback(() => {
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    setVideoPreviewUrl(null);
    setHero(prev => ({ ...prev, videoUrl: '' }));
  }, [videoPreviewUrl]);

  const clearImage = useCallback(() => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    setHero(prev => ({ ...prev, backgroundImage: '' }));
  }, [imagePreviewUrl]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Hero Section</h2>
          <p className="text-gray-400 text-sm mt-1">Edit your main landing section</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all min-h-[44px] shrink-0 ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white'
          }`}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save Changes'}</span>
          <span className="sm:hidden">{saved ? '✓' : 'Save'}</span>
        </button>
      </div>

      {/* Title Lines */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Main Title</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title Line 1</label>
            <input type="text" value={hero.titleLine1} onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title Line 2 (Animated)</label>
            <input type="text" value={hero.titleLine2} onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title Line 3 (Gradient)</label>
            <input type="text" value={hero.titleLine3} onChange={(e) => setHero({ ...hero, titleLine3: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
        </div>
      </div>

      {/* Subtitle & CTAs */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Subtitle & Buttons</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tagline (Badge)</label>
            <input type="text" value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitle/Description</label>
            <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none resize-none text-base" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Primary CTA Button</label>
              <input type="text" value={hero.ctaPrimary} onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Secondary CTA Button</label>
              <input type="text" value={hero.ctaSecondary} onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Scroll Text</label>
            <input type="text" value={hero.scrollText} onChange={(e) => setHero({ ...hero, scrollText: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MEDIA SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-violet-400" />
            Media (Video & Image)
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 p-1 bg-gray-900 rounded-lg mb-6 w-fit">
          <button onClick={() => setMediaTab('url')} className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all min-h-[44px] ${mediaTab === 'url' ? 'bg-violet-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <Link className="w-4 h-4" /> Paste URL
          </button>
          <button onClick={() => setMediaTab('upload')} className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all min-h-[44px] ${mediaTab === 'upload' ? 'bg-violet-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
            <Upload className="w-4 h-4" /> Upload File
          </button>
        </div>

        {uploadError && (
          <div className="p-3 mb-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ── HERO VIDEO ────────────────────────────────────────── */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileVideo className="w-4 h-4 text-violet-400" />
              Hero Video
            </h4>

            {mediaTab === 'url' ? (
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Video URL (.mp4, .webm)</label>
                <input type="text" value={hero.videoUrl} onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })} placeholder="https://yoursite.com/video.mp4" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
                <p className="text-xs text-gray-600 mt-1.5">Paste a direct link to your video file</p>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOverVideo(true); }}
                onDragLeave={() => setDragOverVideo(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverVideo(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleVideoFile(file);
                }}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${dragOverVideo ? 'border-violet-400 bg-violet-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-900/50'}`}
                onClick={() => videoInputRef.current?.click()}
              >
                <input ref={videoInputRef} type="file" accept="video/mp4,video/webm,video/ogg" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleVideoFile(file); e.target.value = ''; }} />
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-400 font-medium">Tap to upload or drag & drop</p>
                <p className="text-xs text-gray-600 mt-1">MP4, WebM • Best results with URL</p>
              </div>
            )}

            {(hero.videoUrl || videoPreviewUrl) && (
              <div className="mt-3 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 relative">
                <video src={videoPreviewUrl || hero.videoUrl} className="w-full h-32 sm:h-40 object-cover" muted loop playsInline autoPlay onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-white/80 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Video loaded</span>
                    <button onClick={clearVideo} className="p-1.5 bg-red-500/80 text-white rounded-md hover:bg-red-500 text-xs flex items-center gap-1 min-h-[32px]"><X className="w-3 h-3" /> Remove</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── BACKGROUND IMAGE ──────────────────────────────────── */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileImage className="w-4 h-4 text-emerald-400" />
              Background Image
            </h4>

            {mediaTab === 'url' ? (
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Image URL (.jpg, .png, .webp)</label>
                <input type="text" value={hero.backgroundImage} onChange={(e) => setHero({ ...hero, backgroundImage: e.target.value })} placeholder="https://yoursite.com/hero-bg.jpg" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base" />
                <p className="text-xs text-gray-600 mt-1.5">Paste a direct link to your image file</p>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOverImage(true); }}
                onDragLeave={() => setDragOverImage(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverImage(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleImageFile(file);
                }}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${dragOverImage ? 'border-emerald-400 bg-emerald-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-900/50'}`}
                onClick={() => imageInputRef.current?.click()}
              >
                <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageFile(file); e.target.value = ''; }} />
                <Image className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-400 font-medium">Tap to upload or drag & drop</p>
                <p className="text-xs text-gray-600 mt-1">JPG, PNG, WebP • Max 10MB</p>
              </div>
            )}

            {(hero.backgroundImage || imagePreviewUrl) && (
              <div className="mt-3 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 relative">
                <img src={imagePreviewUrl || hero.backgroundImage} alt="Background preview" className="w-full h-32 sm:h-40 object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-white/80 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Image loaded</span>
                    <button onClick={clearImage} className="p-1.5 bg-red-500/80 text-white rounded-md hover:bg-red-500 text-xs flex items-center gap-1 min-h-[32px]"><X className="w-3 h-3" /> Remove</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Guide */}
        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
          <h4 className="text-sm font-semibold text-white mb-2">💡 How to change your hero video</h4>
          <ol className="text-xs text-gray-500 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-gray-400">Best method:</strong> Upload video to your hosting → paste URL in "Paste URL" tab</li>
            <li><strong className="text-gray-400">Public folder:</strong> Place in <code className="text-violet-400 bg-violet-500/10 px-1 rounded">/public</code> → use path like <code className="text-violet-400 bg-violet-500/10 px-1 rounded">/my-video.mp4</code></li>
            <li><strong className="text-gray-400">Small files only:</strong> Upload tab works for files under 512KB</li>
          </ol>
          <p className="text-xs text-gray-600 mt-2">Recommended: MP4 format, under 10MB, 1920×1080</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Stats</h3>
          <button onClick={addStat} className="flex items-center gap-1 px-3 py-2 bg-violet-500/20 text-violet-400 rounded-lg text-sm hover:bg-violet-500/30 transition-colors min-h-[44px]">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {hero.stats.map((stat, index) => (
            <div key={`stat-${index}-${stat.label}`} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 rounded-lg">
              <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Value</label>
                  <input type="number" value={stat.value} onChange={(e) => updateStat(index, 'value', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Suffix</label>
                  <input type="text" value={stat.suffix} onChange={(e) => updateStat(index, 'suffix', e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Label</label>
                  <input type="text" value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                </div>
              </div>
              <button onClick={() => removeStat(index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
