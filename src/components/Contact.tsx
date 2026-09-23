import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Check,
  Copy,
  Send,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  SlidersHorizontal,
  MessageCircle,
  Clock,
  ShieldCheck,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  INITIAL_SOCIAL_CHANNELS,
  SocialChannelConfig,
} from '../data/socialChannelsData';
import {
  FacebookIcon,
  WhatsAppIcon,
  GmailIcon,
  InstagramIcon,
  XTwitterIcon,
  LinkedInIcon,
} from './SocialIcons';
import { SocialChannelsModal } from './SocialChannelsModal';

interface ContactProps {
  initialSubject?: string;
}

const STORAGE_KEY = 'ibrahim_portfolio_social_channels_v3';

export const Contact: React.FC<ContactProps> = ({ initialSubject }) => {
  // Social channels with localStorage persistence
  const [socialChannels, setSocialChannels] = useState<SocialChannelConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse social channels from localStorage', e);
    }
    return INITIAL_SOCIAL_CHANNELS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Commercial Video Editing',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const handleSaveChannels = (updated: SocialChannelConfig[]) => {
    setSocialChannels(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const handleResetChannels = () => {
    setSocialChannels(INITIAL_SOCIAL_CHANNELS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('LocalStorage clear failed', e);
    }
  };

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const projectOptions = [
    'Commercial Video Editing (16:9)',
    'High-Retention Short-Form & Reels (9:16)',
    'Motion Graphics & Title Animations',
    'Meta Ads Campaign Strategy',
    'Workflow Automation (Make.com)',
    'Full-Time / Contract Executive Role',
  ];

  const getPlatformIcon = (platform: string) => {
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
        return <MessageCircle className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Let's Build Something Great Card (Exact match to reference Web Design.jpg) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md mb-16"
        >
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Column: Let's Build Something Great Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Get In Touch</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Let's Build Something Great
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Have a project in mind or want to collaborate? I'd love to hear from you.
                  Let's discuss footage ingestion, video timelines, or digital marketing campaigns.
                </p>
              </div>

              {/* Direct Info List matching reference */}
              <div className="space-y-3 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-400/40 transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block font-medium">Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Phone / WhatsApp */}
                <a
                  href="https://wa.me/8801766644925"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/40 transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Phone & WhatsApp</span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      +880 1766-644925
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Location</span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Availability</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Open to new opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Clean Form (Exact match to reference Web Design.jpg) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-xl">
                {submitted ? (
                  <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name || 'there'}</strong>.
                      Your inquiry has been received. I will review your requirements and respond to{' '}
                      <span className="text-cyan-300 font-medium">{formData.email}</span> within 2 hours.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            subject: 'Commercial Video Editing',
                            message: '',
                          });
                        }}
                        className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Your Email"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                      >
                        {projectOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your Message..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-50 rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verified Social Media Accounts Grid (6 Platforms) */}
        <div className="pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Instant 1-on-1 Routing</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Direct Social & Communication Channels
              </h3>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize Channels</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialChannels.map((channel, idx) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 transition-all p-5 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="p-2.5 rounded-xl border flex items-center justify-center"
                      style={{
                        backgroundColor: channel.accentBg,
                        borderColor: channel.hoverBorder,
                      }}
                    >
                      {getPlatformIcon(channel.platform)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                      {channel.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {channel.name}
                  </h4>
                  <div className="text-xs font-mono text-cyan-300 font-medium truncate mb-2">
                    {channel.handle}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {channel.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center text-white bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Open {channel.name} ID</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopy(channel.id, channel.handle)}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    title={`Copy ${channel.name} handle`}
                  >
                    {copiedId === channel.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Channels Customization Modal */}
      <SocialChannelsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        channels={socialChannels}
        onSave={handleSaveChannels}
        onReset={handleResetChannels}
      />
    </section>
  );
};
