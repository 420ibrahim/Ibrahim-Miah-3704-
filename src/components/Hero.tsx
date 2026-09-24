import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Film,
  TrendingUp,
  Sliders,
  Camera,
  Upload,
  Briefcase,
  Layers,
  Star,
  Code2,
  MessageSquare,
  CheckCircle2,
  FileDown,
} from 'lucide-react';
import { HIGHLIGHTED_TOOLS, PERSONAL_INFO } from '../data/portfolioData';
import { PortraitModal } from './PortraitModal';
import { usePortrait } from '../context/PortraitContext';
import { useCv } from '../context/CvContext';
import {
  FacebookIcon,
  WhatsAppIcon,
  GmailIcon,
  InstagramIcon,
  XTwitterIcon,
  LinkedInIcon,
} from './SocialIcons';

interface HeroProps {
  onViewWorkClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWorkClick, onContactClick }) => {
  const { portraitSrc, style, setPortraitSrc } = usePortrait();
  const { openOrDownloadCv } = useCv();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (typeof event.target?.result === 'string') {
            setPortraitSrc(event.target.result);
            setIsModalOpen(true);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setPortraitSrc(event.target.result);
          setIsModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-[#070B14]"
    >
      {/* Background ambient lighting - Cyber Cyan & Midnight Blue */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            {/* Status indicator badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300 w-fit backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="font-medium tracking-wide">
                Video Editor & Digital Marketing Executive
              </span>
            </motion.div>

            {/* Main Punchy Headline (Inspired by reference) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">I craft</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">visual stories</span>{' '}
                <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">that matter.</span>
              </h1>
            </motion.div>

            {/* Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              I'm <strong className="text-white">Ibrahim Miah</strong>, a video editor and digital marketing executive
              who loves turning raw footage into scalable, high-retention video stories and high-converting Meta ad campaigns.
            </motion.p>

            {/* CTAs matching the reference image buttons (Full-width on mobile, auto on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto"
            >
              <button
                onClick={onViewWorkClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 whitespace-nowrap cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={openOrDownloadCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-cyan-300 bg-slate-900/90 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400/70 rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer backdrop-blur-md shadow-md"
                title="Download or view CV"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/60 rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer backdrop-blur-md shadow-md"
              >
                <span>Let's Talk</span>
                <MessageSquare className="w-4 h-4 text-cyan-400" />
              </button>
            </motion.div>

            {/* Quick Rounded Social Links Bar matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2 flex items-center justify-start gap-2.5 flex-wrap"
            >
              <a
                href="https://wa.me/8801766644925"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 flex items-center justify-center text-slate-300 hover:text-[#25D366] transition-all cursor-pointer shadow-sm hover:scale-105"
                title="WhatsApp Direct"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/ibrahim.hasan.joy.151127"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/10 flex items-center justify-center text-slate-300 hover:text-[#1877F2] transition-all cursor-pointer shadow-sm hover:scale-105"
                title="Facebook Profile"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="mailto:ibrahimmiahofficialinfo@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 flex items-center justify-center text-slate-300 hover:text-red-400 transition-all cursor-pointer shadow-sm hover:scale-105"
                title="Gmail Inquiries"
              >
                <GmailIcon className="w-4 h-4" />
              </a>

              <a
                href="https://x.com/home"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com/in/ibrahimmiah"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/10 flex items-center justify-center text-slate-300 hover:text-[#0A66C2] transition-all cursor-pointer shadow-sm hover:scale-105"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/ibrahimmiah"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-500/10 flex items-center justify-center text-slate-300 hover:text-[#E1306C] transition-all cursor-pointer shadow-sm hover:scale-105"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Profile Presentation (Seamlessly adjusted with background & 100% Mobile Responsive) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center relative w-full"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[440px] md:max-w-[480px] min-h-[340px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center select-none">
              {/* 1. Ultra-Luxurious Multi-Layered Atmospheric Lighting System */}
              {/* Layer A: Deep Ambient Halo behind subject */}
              <div className="absolute w-[280px] sm:w-[420px] md:w-[480px] h-[280px] sm:h-[420px] md:h-[480px] rounded-full bg-gradient-to-b from-cyan-400/25 via-sky-500/18 to-transparent blur-[80px] sm:blur-[105px] pointer-events-none" />
              
              {/* Layer B: Top Cyan Rim Light */}
              <div className="absolute -top-6 w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] rounded-full bg-cyan-400/20 blur-[50px] sm:blur-[70px] pointer-events-none" />

              {/* Layer C: Ultra-Vibrant Bottom Under-Glow Spotlight (প্রোফাইলের নিচের শক্তিশালী প্রিমিয়াম আলো) */}
              <div className="absolute -bottom-8 sm:-bottom-6 w-[300px] sm:w-[440px] md:w-[500px] h-[160px] sm:h-[220px] rounded-full bg-gradient-to-t from-cyan-400/40 via-sky-400/30 to-transparent blur-[50px] sm:blur-[75px] pointer-events-none" />
              
              {/* Layer D: Intense Neon Core Floor Glow */}
              <div className="absolute -bottom-2 sm:bottom-0 w-[200px] sm:w-[320px] md:w-[360px] h-[60px] sm:h-[80px] rounded-full bg-cyan-300/45 blur-[30px] sm:blur-[40px] pointer-events-none animate-pulse" />

              {/* Layer E: Cinematic Anamorphic Light Streak Beam directly along the bottom */}
              <div className="absolute bottom-2 sm:bottom-4 w-[260px] sm:w-[400px] md:w-[460px] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent blur-[1.5px] pointer-events-none opacity-85" />

              {/* Layer F: Subtle Radial Center Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] rounded-full bg-sky-500/15 blur-[65px] pointer-events-none" />

              {/* Quick Upload / Edit Photo Floating Pill */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute top-1 sm:top-2 left-1 sm:left-4 z-30 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-800/95 border border-slate-700/70 hover:border-cyan-400/60 text-[10px] sm:text-[11px] font-medium text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                title="Upload or customize profile photo"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Upload / Edit Photo</span>
              </button>

              {/* 2. Main Portrait Subject - Seamlessly feathered and integrated into page background */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => setIsModalOpen(true)}
                className="relative z-10 w-[240px] sm:w-[300px] md:w-[350px] h-[330px] sm:h-[420px] md:h-[480px] flex items-end justify-center group cursor-pointer overflow-hidden rounded-2xl"
              >
                <img
                  src={portraitSrc || '/portrait-default.jpg'}
                  alt="Ibrahim Miah — Video Editor & Digital Marketing Executive"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transform: `scale(${style.zoom / 100})`,
                    filter: `brightness(${style.brightness}%) contrast(${style.contrast}%) ${
                      style.preset === 'mono' ? 'grayscale(100%)' : ''
                    }`,
                  }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== window.location.origin + '/portrait-default.jpg') {
                      img.src = '/portrait-default.jpg';
                    }
                  }}
                />

                {/* Subtle bottom vignette to blend naturally into page */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070B14] via-[#070B14]/60 to-transparent pointer-events-none" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/50 text-[11px] font-medium text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </div>
                </div>
              </div>

              {/* 3. Floating Glass Stat Badges (Shown on sm+ screens to preserve 3D atmospheric layout) */}
              
              {/* Badge 1: 3+ Months of Experience (Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="hidden sm:flex absolute -right-2 md:-right-4 top-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] items-center gap-3 card-hover-zoom cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono leading-none">
                    3+
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap mt-0.5">
                    Months of Experience
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: 20+ Projects Completed (Middle Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="hidden sm:flex absolute -right-3 md:-right-6 top-28 sm:top-32 z-20 p-3 sm:p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] items-center gap-3 card-hover-zoom cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono leading-none">
                    20+
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap mt-0.5">
                    Projects Completed
                  </div>
                </div>
              </motion.div>

              {/* Badge 3: 99% Client Satisfaction (Lower Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="hidden sm:flex absolute -right-2 md:-right-4 bottom-16 sm:bottom-20 z-20 p-3 sm:p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] items-center gap-3 card-hover-zoom cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono leading-none">
                    99%
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap mt-0.5">
                    Client Satisfaction
                  </div>
                </div>
              </motion.div>

              {/* Badge 4: Floating Deliverable Card (Centered bottom of portrait on sm+) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="hidden sm:flex absolute bottom-1 z-20 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] items-center gap-3 card-hover-zoom cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="text-left text-xs font-mono">
                  <div className="text-white font-bold leading-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping" />
                    Clean Cuts
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">
                    Video Storytelling · High Retention
                  </div>
                </div>
              </motion.div>

              {/* Hidden file input for quick direct photo selection */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Mobile Responsive Stats Badges (Clean, balanced 2x2 Grid directly below portrait on mobile phones) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="sm:hidden grid grid-cols-2 gap-2.5 w-full max-w-[320px] mt-3 relative z-20"
            >
              {/* Card 1: 3+ Months Experience */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-none">3+</div>
                  <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">Months Exp.</div>
                </div>
              </div>

              {/* Card 2: 20+ Projects Completed */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-none">20+</div>
                  <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">Projects Done</div>
                </div>
              </div>

              {/* Card 3: 99% Satisfaction */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Star className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono leading-none">99%</div>
                  <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">Satisfaction</div>
                </div>
              </div>

              {/* Card 4: Clean Cuts */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2 shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono leading-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping" />
                    Clean Cuts
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">High Retention</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Creative Software & Tools Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-slate-800/80"
        >
          <div className="text-center md:text-left mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-mono">
              Core Toolkit & Creative Stack
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
            {HIGHLIGHTED_TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/70 border border-slate-800 rounded-xl hover:border-cyan-400/50 hover:text-white transition-all cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Portrait Modal for High Resolution Inspection & Studio Customization */}
      <PortraitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
