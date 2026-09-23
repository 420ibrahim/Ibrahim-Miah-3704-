import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  PenTool,
  Film,
  CheckCircle,
  Rocket,
  Quote,
  Users,
  Layers,
  Clock,
  Star,
} from 'lucide-react';

export const Process: React.FC = () => {
  const processSteps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understanding goals, target audience, and footage assets.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Plan',
      desc: 'Script hook analysis, pacing roadmap, and storyboarding.',
      icon: FileText,
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Color palette, kinetic typography, and motion style frames.',
      icon: PenTool,
    },
    {
      num: '04',
      title: 'Edit & Polish',
      desc: 'Timeline cutting, dynamic sound design, and color grading.',
      icon: Film,
    },
    {
      num: '05',
      title: 'Test & Review',
      desc: 'Hook retention test, audio loudness, and client revisions.',
      icon: CheckCircle,
    },
    {
      num: '06',
      title: 'Deploy & Scale',
      desc: 'Master 4K delivery, platform aspect ratios, and Meta ad launch.',
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>03. Execution Pipeline</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            My Work Process
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A battle-tested 6-step post-production methodology designed to eliminate delays,
            maintain cinematic storytelling quality, and deliver high-converting creative assets.
          </p>
        </motion.div>

        {/* 6-Step Connected Process (Exact Match to Web Design.jpg) */}
        <div className="relative mb-20">
          {/* Connecting line behind circles on desktop */}
          <div className="hidden lg:block absolute top-9 left-12 right-12 h-[2px] bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-cyan-500/20 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Glowing Circular Icon */}
                  <div className="w-18 h-18 rounded-full bg-slate-900 border-2 border-cyan-400/40 group-hover:border-cyan-300 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center text-cyan-400 group-hover:scale-110 mb-4 bg-gradient-to-b from-slate-800 to-slate-950 shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-400 mb-1">
                    {step.num}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed px-1">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* By The Numbers & What Clients Say (Exact Match to reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-slate-800/80">
          {/* Left: What Clients Say */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-md relative overflow-hidden card-hover-zoom cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
                <Quote className="w-4 h-4 fill-cyan-400/20" />
                <span>What Clients Say</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                “Ibrahim is an exceptional video editor! He delivered our video campaign on time with pristine timeline cuts, dynamic motion graphics, and amazing attention to detail. Hook retention increased significantly. Highly recommended!”
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-sky-300 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-cyan-300">
                    JD
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">Hamza Ali</div>
                  <div className="text-[11px] text-slate-400">CEO, Digital Growth Agency</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-4 text-cyan-400">
              <Star className="w-4 h-4 fill-cyan-400" />
              <Star className="w-4 h-4 fill-cyan-400" />
              <Star className="w-4 h-4 fill-cyan-400" />
              <Star className="w-4 h-4 fill-cyan-400" />
              <Star className="w-4 h-4 fill-cyan-400" />
              <span className="text-xs font-bold text-white ml-2">5.0 / 5.0 Rating</span>
            </div>
          </motion.div>

          {/* Right: By The Numbers (4 Stats Cards matching reference) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-md card-hover-zoom"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase mb-6">
              <Layers className="w-4 h-4" />
              <span>By The Numbers</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center hover:border-cyan-400/40 transition-colors file-item-zoom cursor-pointer">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 font-mono">
                  20+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">
                  Happy Clients
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center hover:border-cyan-400/40 transition-colors file-item-zoom cursor-pointer">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 font-mono">
                  50+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">
                  Videos Delivered
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center hover:border-cyan-400/40 transition-colors file-item-zoom cursor-pointer">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 font-mono">
                  3+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">
                  Months Experience
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center hover:border-cyan-400/40 transition-colors file-item-zoom cursor-pointer">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 font-mono">
                  99%
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>High Bitrate 4K & ProRes Master Exports</span>
              <span className="text-cyan-400 font-mono">100% On-Time Delivery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
