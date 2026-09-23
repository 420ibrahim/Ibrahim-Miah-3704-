import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_DOMAINS } from '../data/portfolioData';
import { INITIAL_VIDEO_TEMPLATES } from '../data/videoTemplatesData';
import { ProjectDomain, VideoProjectTemplate } from '../types';
import { ProjectModal } from './ProjectModal';
import { VideoUploadModal } from './VideoUploadModal';
import { VideoPlayerModal } from './VideoPlayerModal';
import {
  Film,
  Play,
  ArrowUpRight,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

interface ProjectsProps {
  onSelectProjectForContact: (projectTitle: string) => void;
}

const STORAGE_KEY = 'ibrahim_portfolio_video_projects_v3';

export const Projects: React.FC<ProjectsProps> = ({ onSelectProjectForContact }) => {
  // Video Templates state with LocalStorage persistence
  const [videoTemplates, setVideoTemplates] = useState<VideoProjectTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load video templates from storage', e);
    }
    return INITIAL_VIDEO_TEMPLATES;
  });

  // Current Slide Index for uniform showcase slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Modal states
  const [editingTemplate, setEditingTemplate] = useState<VideoProjectTemplate | null>(null);
  const [playingTemplate, setPlayingTemplate] = useState<VideoProjectTemplate | null>(null);
  const [selectedSpecProject, setSelectedSpecProject] = useState<ProjectDomain | null>(null);

  // Sync to localStorage
  const saveTemplates = (newTemplates: VideoProjectTemplate[]) => {
    setVideoTemplates(newTemplates);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTemplates));
    } catch (e) {
      console.warn('LocalStorage save failed (possible quota limit)', e);
    }
  };

  const handleSaveTemplate = (updated: VideoProjectTemplate) => {
    const updatedList = videoTemplates.map((t) => (t.id === updated.id ? updated : t));
    saveTemplates(updatedList);
  };

  const handleResetTemplate = (templateId: string) => {
    const defaultTemplate = INITIAL_VIDEO_TEMPLATES.find((t) => t.id === templateId);
    if (!defaultTemplate) return;
    const updatedList = videoTemplates.map((t) => (t.id === templateId ? defaultTemplate : t));
    saveTemplates(updatedList);
  };

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev + 1) % videoTemplates.length);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + videoTemplates.length) % videoTemplates.length);
  };

  const goToSlide = (idx: number) => {
    setSlideDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const currentTemplate = videoTemplates[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 70 : -70,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -70 : 70,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="work" className="py-24 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean, Dedicated Section Header: Video Editing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>02. Portfolio</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Video Editing
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Showcase of professional commercial edits, high-retention short reels, and narrative video cuts.
            </p>
          </div>

          {/* Slide Indicator Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold text-cyan-300 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              Video 0{currentIndex + 1} of 0{videoTemplates.length}
            </span>
          </div>
        </motion.div>

        {/* Uniform Size Video Showcase Container with Prominent Right-Middle Slide Button */}
        <div className="relative mb-10">
          {/* Prominent Right Middle Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:-right-6 md:-right-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-900/95 border-2 border-cyan-400 text-cyan-300 hover:text-slate-950 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-sky-400 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.95)] hover:scale-105 active:scale-95 group"
            aria-label="Next Video"
            title="Next Video"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Left Middle Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:-left-6 md:-left-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-900/95 border-2 border-cyan-400 text-cyan-300 hover:text-slate-950 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-sky-400 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.95)] hover:scale-105 active:scale-95 group"
            aria-label="Previous Video"
            title="Previous Video"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3] group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Active Uniform Slide */}
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentTemplate.id}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden card-hover-zoom"
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Uniform 16:9 Video Screen Container */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setPlayingTemplate(currentTemplate)}
                    data-cursor="play"
                    className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-cyan-400/60 shadow-2xl group/player cursor-pointer transition-all duration-300 flex items-center justify-center"
                  >
                    {/* Thumbnail or Video Background */}
                    {currentTemplate.thumbnailUrl ? (
                      <img
                        src={currentTemplate.thumbnailUrl}
                        alt={currentTemplate.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/player:scale-105"
                      />
                    ) : currentTemplate.embedUrl ? (
                      <div className="w-full h-full pointer-events-none opacity-85">
                        <iframe
                          src={currentTemplate.embedUrl}
                          title={currentTemplate.title}
                          className="w-full h-full border-0"
                          tabIndex={-1}
                        />
                      </div>
                    ) : (
                      /* Minimal Studio Screen Graphic */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0F1626] via-[#0A0F1A] to-[#060A12] relative">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `radial-gradient(circle at center, #06b6d4 0%, transparent 70%)`,
                          }}
                        />
                        <div className="relative z-10 space-y-3">
                          <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mx-auto shadow-lg">
                            <Film className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-slate-200 block">
                              {currentTemplate.title}
                            </span>
                            <span className="text-xs text-slate-400 block mt-1">
                              Click to launch video theater
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Glowing Cyan Play Button Overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 group-hover/player:bg-slate-950/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-slate-950/90 border-2 border-cyan-400/70 text-cyan-300 flex items-center justify-center shadow-xl shadow-cyan-500/25 group-hover/player:scale-110 group-hover/player:bg-gradient-to-r group-hover/player:from-cyan-400 group-hover/player:to-sky-400 group-hover/player:text-slate-950 group-hover/player:border-transparent transition-all">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    {currentTemplate.duration && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-xs font-mono text-slate-200 border border-slate-700/60 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{currentTemplate.duration}</span>
                      </div>
                    )}

                    {/* Aspect Ratio Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-xs font-mono text-cyan-300 border border-slate-700/60 font-semibold">
                      {currentTemplate.aspectRatio}
                    </div>
                  </div>
                </div>

                {/* Right Column: Uniform Template Metadata & Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Top tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono text-xs font-bold">
                        Video 0{currentTemplate.templateNumber}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Video Editing
                      </span>
                      {currentTemplate.isCustomUploaded && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Custom Video Active
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3 text-hover-zoom cursor-pointer"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {currentTemplate.title}
                    </h3>

                    {/* Client & Metric */}
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 mb-4 pb-3 border-b border-slate-800">
                      <span>Client: <strong className="text-white">{currentTemplate.client}</strong></span>
                      <span className="text-slate-600">·</span>
                      <span className="font-mono text-cyan-300 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                        {currentTemplate.metrics}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {currentTemplate.description}
                    </p>

                    {/* Tools Used */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Mastered Tools:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentTemplate.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 text-xs rounded-lg bg-slate-950 text-slate-300 border border-slate-800 file-item-zoom cursor-pointer"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setPlayingTemplate(currentTemplate)}
                      className="flex-1 py-3 px-5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Play Video</span>
                    </button>

                    <button
                      onClick={() => setEditingTemplate(currentTemplate)}
                      className="py-3 px-4 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/40 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      title="Upload or replace video link/file"
                    >
                      <Upload className="w-4 h-4 text-cyan-400" />
                      <span>Upload / Replace Video</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Slide Selector Tabs (Jump directly to any of the 5 video works) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {videoTemplates.map((template, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={template.id}
                onClick={() => goToSlide(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md shadow-cyan-400/25 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-slate-950' : 'bg-cyan-400'}`} />
                <span>Video 0{template.templateNumber}: {template.title.split(' ')[0]} {template.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Technical Production Standards & Workflows */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Technical Production Standards
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Production Disciplines & Workflow Specifications
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_DOMAINS.map((project) => (
              <div
                key={project.id}
                data-cursor="view"
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors flex flex-col justify-between card-hover-zoom cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-cyan-300 font-semibold">{project.previewTheme.badge}</span>
                    <span className="font-mono text-slate-400">{project.format}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.overview}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.toolsUsed.slice(0, 2).map((tool) => (
                      <span key={tool} className="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedSpecProject(project)}
                    className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <span>View Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NDA & Private Reel Transparency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Client Privacy & Direct Reel Access
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                To comply with non-disclosure agreements, actual client brand edits, unlisted commercial files,
                and project files are shared directly with prospective employers and clients upon request.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectProjectForContact('Tailored Video Showreel')}
            className="w-full md:w-auto px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl whitespace-nowrap transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-cyan-500/20"
          >
            <span>Request Direct Showreel</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Video Project Upload & Edit Modal */}
      <VideoUploadModal
        isOpen={Boolean(editingTemplate)}
        onClose={() => setEditingTemplate(null)}
        template={editingTemplate}
        onSave={handleSaveTemplate}
        onReset={handleResetTemplate}
      />

      {/* Video Theater Player Modal */}
      <VideoPlayerModal
        isOpen={Boolean(playingTemplate)}
        onClose={() => setPlayingTemplate(null)}
        template={playingTemplate}
        onOpenUpload={(t) => setEditingTemplate(t)}
        onContactClick={onSelectProjectForContact}
      />

      {/* Interactive Project Specs Modal */}
      <ProjectModal
        project={selectedSpecProject}
        onClose={() => setSelectedSpecProject(null)}
        onRequestReel={(title) => {
          setSelectedSpecProject(null);
          onSelectProjectForContact(title);
        }}
      />
    </section>
  );
};
