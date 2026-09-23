import React, { useRef, useState } from 'react';
import {
  X,
  Camera,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Palette,
  Sun,
  Contrast,
  Focus,
  Maximize2,
} from 'lucide-react';
import { usePortrait, type PortraitStyle } from '../context/PortraitContext';

interface PortraitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortraitModal: React.FC<PortraitModalProps> = ({ isOpen, onClose }) => {
  const { portraitSrc, style, setPortraitSrc, updateStyle, applyPreset, resetPortrait } = usePortrait();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'adjustments'>('presets');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPortraitSrc(e.target.result);
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const glowColorOptions = [
    { label: 'Cyan Accent', value: '#06b6d4' },
    { label: 'Sky Blue', value: '#0ea5e9' },
    { label: 'Royal Indigo', value: '#6366f1' },
    { label: 'Emerald Mint', value: '#10b981' },
    { label: 'Sunset Amber', value: '#f59e0b' },
  ];

  const presets: { id: PortraitStyle['preset']; label: string; desc: string; icon: string }[] = [
    {
      id: 'cyan',
      label: 'Cyan Rim Studio',
      desc: 'Tech-forward neon backlight with balanced tone',
      icon: '⚡',
    },
    {
      id: 'cinematic',
      label: 'Cinematic Dark',
      desc: 'High-contrast director tone with rich shadows',
      icon: '🎬',
    },
    {
      id: 'executive',
      label: 'Executive Clean',
      desc: 'Neutral soft corporate studio lighting',
      icon: '💼',
    },
    {
      id: 'cyber',
      label: 'Cyber Indigo',
      desc: 'Deep purple-blue edge rim for video creators',
      icon: '🟣',
    },
    {
      id: 'mono',
      label: 'Executive Mono',
      desc: 'Classy monochrome subject with cyan accent rim',
      icon: '🖤',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Profile Photo Studio & Customizer
              </h3>
              <p className="text-xs text-slate-400">
                Customize Ibrahim Miah's portrait with studio lighting presets, framing, and rim effects.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-center">
          {/* Left: Interactive 3:4 Preview Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px]">
              {/* Dynamic Backlight Halo */}
              {style.borderGlow && (
                <div
                  className="absolute -inset-2 rounded-3xl blur-xl opacity-75 transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundColor: style.glowColor,
                    opacity: style.glowIntensity / 100,
                  }}
                />
              )}

              {/* Main Portrait Frame */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden border transition-all duration-300 shadow-2xl bg-slate-950 flex items-center justify-center group ${
                  isDragging ? 'border-cyan-400 ring-4 ring-cyan-400/20' : 'border-slate-800'
                }`}
              >
                {portraitSrc ? (
                  <img
                    src={portraitSrc}
                    alt="Ibrahim Miah Customized Profile Portrait"
                    className="w-full h-full object-cover object-top transition-transform duration-200"
                    style={{
                      transform: `scale(${style.zoom / 100})`,
                      filter: `brightness(${style.brightness}%) contrast(${style.contrast}%) ${
                        style.preset === 'mono' ? 'grayscale(100%)' : ''
                      }`,
                    }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Stylized Authentic Default Illustration of Ibrahim in Suit */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 via-[#0D1527] to-[#080E1C] relative">
                    <div className="relative w-44 h-44 rounded-full border-2 border-cyan-400/40 overflow-hidden shadow-lg mb-3 flex items-center justify-center bg-slate-800/80">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <defs>
                          <linearGradient id="suitGradModal" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1E293B" />
                            <stop offset="100%" stopColor="#0F172A" />
                          </linearGradient>
                          <linearGradient id="skinGradModal" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C49272" />
                            <stop offset="100%" stopColor="#9C6B4E" />
                          </linearGradient>
                        </defs>
                        <rect width="200" height="200" fill="#0B1120" />
                        <circle cx="100" cy="80" r="70" fill={style.glowColor} opacity={style.glowIntensity / 400} />
                        {/* Suit */}
                        <path d="M 20 200 L 45 135 L 75 145 L 100 190 L 125 145 L 155 135 L 180 200 Z" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
                        <polygon points="75,145 100,185 125,145 110,135 100,150 90,135" fill="#F8FAFC" />
                        <polygon points="95,148 105,148 108,185 100,195 92,185" fill="#020617" />
                        <rect x="88" y="115" width="24" height="28" fill="url(#skinGradModal)" rx="4" />
                        <ellipse cx="100" cy="85" rx="38" ry="46" fill="url(#skinGradModal)" />
                        {/* Facial hair */}
                        <path d="M 68 85 Q 100 135 132 85 Q 134 115 100 128 Q 66 115 68 85 Z" fill="#1C1917" />
                        <path d="M 85 96 Q 100 90 115 96 Q 100 102 85 96 Z" fill="#1C1917" />
                        {/* Hair */}
                        <path d="M 62 80 C 60 40, 140 40, 138 80 C 135 55, 65 55, 62 80 Z" fill="#09090B" />
                        {/* Eyes */}
                        <circle cx="86" cy="84" r="3.5" fill="#1C1917" />
                        <circle cx="114" cy="84" r="3.5" fill="#1C1917" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-cyan-300">Ibrahim Miah</span>
                    <span className="text-[11px] text-slate-400">Formal Suit & Tie Studio Portrait</span>
                  </div>
                )}

                {/* Studio Vignette Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,${style.vignette / 100}) 100%)`,
                  }}
                />

                {/* Quick Upload Hover overlay */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Click or Drop Photo Here</span>
                  <span className="text-[10px] text-slate-400 mt-1">Upload ChatGPT Image Sep 21 file</span>
                </div>
              </div>

              {/* Status info bar */}
              <div className="mt-3 flex items-center justify-between text-xs px-1 text-slate-400">
                <span className="font-mono text-[11px] text-cyan-400">{style.filterPresetName}</span>
                <span className="text-[11px]">{portraitSrc ? 'Custom Photo Active' : 'Default Visual'}</span>
              </div>
            </div>
          </div>

          {/* Right: Controls & Presets Suite */}
          <div className="lg:col-span-7 space-y-5">
            {/* Primary Action: Direct File Upload */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Upload Your Portrait Photo</span>
                  <span className="text-[11px] text-slate-400 block">
                    Select `ChatGPT Image Sep 21` or any custom photo from your device
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
                >
                  <Camera className="w-4 h-4" />
                  <span>Choose Photo File</span>
                </button>
                {portraitSrc && (
                  <button
                    onClick={() => {
                      setPortraitSrc(null);
                    }}
                    className="p-2 text-xs text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 rounded-xl transition-colors cursor-pointer"
                    title="Remove custom photo and use default"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Customizer Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('presets')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'presets'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Studio Lighting Presets</span>
              </button>

              <button
                onClick={() => setActiveTab('adjustments')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'adjustments'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Fine-Tuning & Framing</span>
              </button>
            </div>

            {/* Tab 1: Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {presets.map((preset) => {
                    const isSelected = style.preset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400/80 shadow-sm'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{preset.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{preset.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{preset.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Backlight Color Picker */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Backlight Edge Glow Tint:
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {glowColorOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateStyle({ glowColor: opt.value })}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          style.glowColor === opt.value
                            ? 'border-cyan-400 bg-slate-800 text-white'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.value }} />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Fine-Tuning Adjustments */}
            {activeTab === 'adjustments' && (
              <div className="space-y-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
                {/* Zoom / Scale */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      Framing & Zoom:
                    </span>
                    <span className="font-mono text-cyan-400">{style.zoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="140"
                    value={style.zoom}
                    onChange={(e) => updateStyle({ zoom: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Backlight Glow Intensity */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-cyan-400" />
                      Ambient Halo Intensity:
                    </span>
                    <span className="font-mono text-cyan-400">{style.glowIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={style.glowIntensity}
                    onChange={(e) => updateStyle({ glowIntensity: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Contrast */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Contrast className="w-3.5 h-3.5 text-cyan-400" />
                      Studio Contrast:
                    </span>
                    <span className="font-mono text-cyan-400">{style.contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="135"
                    value={style.contrast}
                    onChange={(e) => updateStyle({ contrast: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Studio Vignette */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Focus className="w-3.5 h-3.5 text-cyan-400" />
                      Dark Studio Vignette:
                    </span>
                    <span className="font-mono text-cyan-400">{style.vignette}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="70"
                    value={style.vignette}
                    onChange={(e) => updateStyle({ vignette: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={resetPortrait}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            {saveToast && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> Saved to Profile!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Done & Apply to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
