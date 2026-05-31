interface ColorOption {
  label: string;
  value: string;
  from: string;
  to: string;
}

const serviceColors: ColorOption[] = [
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-600', from: '#8b5cf6', to: '#9333ea' },
  { label: 'Cyan → Blue', value: 'from-cyan-500 to-blue-600', from: '#06b6d4', to: '#2563eb' },
  { label: 'Pink → Rose', value: 'from-pink-500 to-rose-600', from: '#ec4899', to: '#e11d48' },
  { label: 'Emerald → Green', value: 'from-emerald-500 to-green-600', from: '#10b981', to: '#16a34a' },
  { label: 'Orange → Amber', value: 'from-orange-500 to-amber-600', from: '#f97316', to: '#d97706' },
  { label: 'Indigo → Violet', value: 'from-indigo-500 to-violet-600', from: '#6366f1', to: '#7c3aed' },
  { label: 'Red → Orange', value: 'from-red-500 to-orange-600', from: '#ef4444', to: '#ea580c' },
  { label: 'Teal → Cyan', value: 'from-teal-500 to-cyan-600', from: '#14b8a6', to: '#0891b2' },
  { label: 'Fuchsia → Pink', value: 'from-fuchsia-500 to-pink-600', from: '#d946ef', to: '#db2777' },
  { label: 'Yellow → Orange', value: 'from-yellow-500 to-orange-600', from: '#eab308', to: '#ea580c' },
  { label: 'Sky → Indigo', value: 'from-sky-500 to-indigo-600', from: '#0ea5e9', to: '#4f46e5' },
  { label: 'Rose → Purple', value: 'from-rose-500 to-purple-600', from: '#f43f5e', to: '#9333ea' },
];

const portfolioColors: ColorOption[] = [
  { label: 'Violet → Indigo', value: 'from-violet-600 to-indigo-600', from: '#7c3aed', to: '#4f46e5' },
  { label: 'Pink → Rose', value: 'from-pink-600 to-rose-600', from: '#db2777', to: '#e11d48' },
  { label: 'Amber → Orange', value: 'from-amber-600 to-orange-600', from: '#d97706', to: '#ea580c' },
  { label: 'Emerald → Teal', value: 'from-emerald-600 to-teal-600', from: '#059669', to: '#0d9488' },
  { label: 'Cyan → Blue', value: 'from-cyan-600 to-blue-600', from: '#0891b2', to: '#2563eb' },
  { label: 'Lime → Green', value: 'from-lime-600 to-green-600', from: '#65a30d', to: '#16a34a' },
  { label: 'Red → Rose', value: 'from-red-600 to-rose-600', from: '#dc2626', to: '#e11d48' },
  { label: 'Fuchsia → Purple', value: 'from-fuchsia-600 to-purple-600', from: '#c026d3', to: '#9333ea' },
  { label: 'Sky → Violet', value: 'from-sky-600 to-violet-600', from: '#0284c7', to: '#7c3aed' },
  { label: 'Yellow → Red', value: 'from-yellow-600 to-red-600', from: '#ca8a04', to: '#dc2626' },
];

const processColors: ColorOption[] = [
  { label: 'Blue → Cyan', value: 'from-blue-500 to-cyan-500', from: '#3b82f6', to: '#06b6d4' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-500', from: '#8b5cf6', to: '#a855f7' },
  { label: 'Pink → Rose', value: 'from-pink-500 to-rose-500', from: '#ec4899', to: '#f43f5e' },
  { label: 'Orange → Amber', value: 'from-orange-500 to-amber-500', from: '#f97316', to: '#f59e0b' },
  { label: 'Emerald → Green', value: 'from-emerald-500 to-green-500', from: '#10b981', to: '#22c55e' },
  { label: 'Red → Orange', value: 'from-red-500 to-orange-500', from: '#ef4444', to: '#f97316' },
  { label: 'Indigo → Blue', value: 'from-indigo-500 to-blue-500', from: '#6366f1', to: '#3b82f6' },
  { label: 'Teal → Emerald', value: 'from-teal-500 to-emerald-500', from: '#14b8a6', to: '#10b981' },
];

export type ColorPreset = 'service' | 'portfolio' | 'process';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  preset: ColorPreset;
}

function getColors(preset: ColorPreset): ColorOption[] {
  switch (preset) {
    case 'service': return serviceColors;
    case 'portfolio': return portfolioColors;
    case 'process': return processColors;
    default: return serviceColors;
  }
}

export default function ColorPicker({ value, onChange, preset }: ColorPickerProps) {
  const colors = getColors(preset);
  const selected = colors.find(c => c.value === value);

  return (
    <div>
      {/* Selected Preview */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded-md shrink-0"
          style={{ background: selected ? `linear-gradient(135deg, ${selected.from}, ${selected.to})` : '#374151' }}
        />
        <span className="text-xs text-gray-400 truncate">{selected?.label || 'Select a color'}</span>
      </div>

      {/* Color Grid */}
      <div className="flex flex-wrap gap-1.5">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            title={color.label}
            className={`w-8 h-8 rounded-lg transition-all ${
              value === color.value 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110' 
                : 'hover:scale-110 hover:ring-1 hover:ring-white/30'
            }`}
            style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
          />
        ))}
      </div>
    </div>
  );
}
