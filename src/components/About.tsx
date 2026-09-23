import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Code2,
  Film,
  Sparkles,
  TrendingUp,
  Cpu,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const expertiseSkills = [
    { name: 'Adobe Premiere Pro (Editing & Pacing)', level: 95 },
    { name: 'Adobe After Effects (Motion Graphics)', level: 90 },
    { name: 'Meta Ads Manager (ROAS & Creatives)', level: 88 },
    { name: 'Photoshop (High-CTR Thumbnails)', level: 85 },
    { name: 'Make.com (Workflow Automation)', level: 80 },
    { name: 'Sound Design & Audio Engineering', level: 92 },
  ];

  return (
    <section id="about" className="py-20 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>01. Profile & Capabilities</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About Me & Technical Expertise
          </h2>
        </motion.div>

        {/* 2-Card Layout (Exact match to reference image Web Design.jpg) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: About Me (Left Side) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md card-hover-zoom"
          >
            {/* Ambient subtle corner glow */}
            <div className="absolute top-0 left-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header with Icon */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                  <User className="w-5 h-5" />
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight text-hover-zoom cursor-pointer"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  About Me
                </h3>
              </div>

              {/* Bio Paragraph */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I'm a Video Editor and Digital Marketing Executive with a strong focus on high-retention video
                storytelling, algorithmic pacing, and performance ads. I enjoy taking raw footage and complex concepts
                and turning them into engaging visual assets that convert viewers into loyal customers.
              </p>

              {/* 4 Metadata Items with Icons matching reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Name */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 file-item-zoom cursor-pointer">
                  <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block">Name</span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      {PERSONAL_INFO.name}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 file-item-zoom cursor-pointer">
                  <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block">Location</span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 file-item-zoom cursor-pointer">
                  <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block">Email</span>
                    <span className="text-xs font-semibold text-white truncate block" title={PERSONAL_INFO.email}>
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 file-item-zoom cursor-pointer">
                  <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block">Availability</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>

              {/* Collapsible Expanded Bio */}
              <AnimatePresence>
                {showFullBio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 text-xs sm:text-sm text-slate-400 space-y-2 leading-relaxed border-t border-slate-800/80 overflow-hidden"
                  >
                    <p>
                      With academic grounding in English and advanced hands-on production in digital media,
                      I build scalable marketing funnels, design high-CTR YouTube thumbnails, and produce
                      commercial-grade video content tested for algorithmic virality.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Button matching reference image: More About Me → */}
            <div className="pt-6 relative z-10">
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer shadow-sm group"
              >
                <span>{showFullBio ? 'Show Less' : 'More About Me'}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: My Expertise (Right Side with glowing progress bars) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md card-hover-zoom"
          >
            {/* Ambient subtle corner glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header with Icon */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight text-hover-zoom cursor-pointer"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  My Expertise
                </h3>
              </div>

              {/* Progress Bars (Exact look from reference image) */}
              <div className="space-y-4 pt-1">
                {expertiseSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-slate-200">{skill.name}</span>
                      <span className="font-mono text-cyan-400 font-bold">{skill.level}%</span>
                    </div>

                    {/* Glowing Cyan Track */}
                    <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-300 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="pt-6 relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 mt-4">
              <span>Performance Verified</span>
              <span className="text-cyan-400 font-mono">10+ Core Production Tools</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
