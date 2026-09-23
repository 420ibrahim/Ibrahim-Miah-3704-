import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION_DATA, TRAINING_DATA } from '../data/portfolioData';
import { Award, GraduationCap, CheckCircle2, Calendar, BookOpen } from 'lucide-react';

export const TrainingEducation: React.FC = () => {
  return (
    <section id="training" className="py-24 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Professional Training */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>04. Professional Training</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Specialized Enterprise Training
              </h2>
            </div>

            {/* As-Sunnah Skill Development Institute Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg relative overflow-hidden group card-hover-zoom cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
                    {TRAINING_DATA.status}
                  </span>
                  <h3
                    className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {TRAINING_DATA.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">
                    {TRAINING_DATA.institution}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {TRAINING_DATA.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Core Management Competencies:
                </span>
                <ul className="space-y-2">
                  {TRAINING_DATA.skillsAcquired.map((skill, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Agency Mindset Callout */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <span className="text-slate-200 font-semibold block">
                Professional Commercial Discipline
              </span>
              <p>
                This business management foundation ensures accurate milestone estimates, structured client agreements,
                organized invoice workflows, and transparent project communication.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Academic Education Timeline */}
          <motion.div
            id="education"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>05. Education & Credentials</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Academic Background & Qualifications
              </h2>
            </div>

            {/* Academic Cards */}
            <div className="space-y-4">
              {EDUCATION_DATA.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 group card-hover-zoom cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700/60">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.degree}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs">
                      {item.grade && (
                        <span className="px-2.5 py-1 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 font-mono font-bold tabular-nums">
                          {item.grade}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                    {item.highlights.map((hl, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span>{hl}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

