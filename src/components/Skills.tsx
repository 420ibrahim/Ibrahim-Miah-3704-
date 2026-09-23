import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategory } from '../types';
import { Layers, Film, TrendingUp, Palette, Cpu, Check } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory>('all');

  const categories: { id: SkillCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Tools', icon: Layers },
    { id: 'video', label: 'Video & Motion', icon: Film },
    { id: 'marketing', label: 'Digital Marketing', icon: TrendingUp },
    { id: 'design', label: 'Visual Design', icon: Palette },
    { id: 'automation', label: 'Productivity & Automation', icon: Cpu },
  ];

  const filteredSkills =
    activeTab === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeTab);

  return (
    <section id="skills" className="py-24 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>02. Skills & Expertise</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Mastered Software & Practical Workflows
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md">
            Specialized toolkit spanning high-end post-production, motion graphics,
            performance ad creative setups, and automated agency infrastructure.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl mb-10 w-fit backdrop-blur-sm"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm card-hover-zoom cursor-pointer"
              >
                <div>
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{skill.badge}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-cyan-400 font-medium">{skill.experience}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-slate-400 tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 + (idx % 6) * 0.05, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Workflows List */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Applied Workflows:
                  </span>
                  <ul className="space-y-1.5">
                    {skill.workflows.map((wf, wIdx) => (
                      <li key={wIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{wf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

