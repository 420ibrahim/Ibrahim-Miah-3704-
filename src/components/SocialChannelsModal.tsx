import React, { useState } from 'react';
import { X, Check, RotateCcw, Link as LinkIcon, Sparkles } from 'lucide-react';
import { SocialChannelConfig } from '../data/socialChannelsData';
import {
  FacebookIcon,
  WhatsAppIcon,
  GmailIcon,
  InstagramIcon,
  XTwitterIcon,
  LinkedInIcon,
} from './SocialIcons';

interface SocialChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: SocialChannelConfig[];
  onSave: (updatedChannels: SocialChannelConfig[]) => void;
  onReset: () => void;
}

export const SocialChannelsModal: React.FC<SocialChannelsModalProps> = ({
  isOpen,
  onClose,
  channels,
  onSave,
  onReset,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<SocialChannelConfig[]>(channels);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFieldChange = (id: string, field: 'url' | 'handle', value: string) => {
    setFormData((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleQuickWhatsAppPhone = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    setFormData((prev) =>
      prev.map((c) =>
        c.id === 'whatsapp'
          ? {
              ...c,
              url: `https://wa.me/${cleanPhone}`,
              handle: phone.startsWith('+') ? phone : `+${phone}`,
            }
          : c
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon className="w-5 h-5 text-[#1877F2]" />;
      case 'whatsapp':
        return <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />;
      case 'gmail':
        return <GmailIcon className="w-5 h-5" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5 text-[#E1306C]" />;
      case 'x':
        return <XTwitterIcon className="w-5 h-5 text-white" />;
      case 'linkedin':
        return <LinkedInIcon className="w-5 h-5 text-[#0A66C2]" />;
      default:
        return <LinkIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Customize Your Contact & Social IDs
              </h3>
              <p className="text-xs text-slate-400">
                Paste your exact URLs/handles so visitors jump directly to your profile.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channels Form */}
        <form onSubmit={handleSubmit} className="space-y-4 my-5 max-h-[60vh] overflow-y-auto pr-1">
          {formData.map((channel) => (
            <div
              key={channel.id}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getIcon(channel.platform)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {channel.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {channel.category}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {channel.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Direct Click URL (opens on click)
                  </label>
                  <input
                    type="text"
                    required
                    value={channel.url}
                    onChange={(e) => handleFieldChange(channel.id, 'url', e.target.value)}
                    placeholder={
                      channel.platform === 'whatsapp'
                        ? 'https://wa.me/8801...'
                        : channel.platform === 'gmail'
                        ? 'mailto:yourname@gmail.com'
                        : 'https://...'
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Display Handle / Number
                  </label>
                  <input
                    type="text"
                    required
                    value={channel.handle}
                    onChange={(e) => handleFieldChange(channel.id, 'handle', e.target.value)}
                    placeholder="e.g. @yourhandle or +880 17..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {channel.platform === 'whatsapp' && (
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span>💡 Tip:</span>
                  <span>
                    Format WhatsApp as{' '}
                    <code className="text-emerald-400">https://wa.me/8801XXXXXXXXX</code> (include country code without + or spaces).
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset all social links back to initial defaults?')) {
                  onReset();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All to Defaults</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save Social IDs</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
