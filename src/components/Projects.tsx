import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Clock,
  TrendingUp,
  Check,
} from 'lucide-react';

interface ProjectsProps {
  onSelectProjectForContact: (projectTitle: string) => void;
}

const STORAGE_KEY = 'ibrahim_portfolio_video_projects_v5';

export const Projects: React.FC<ProjectsProps> = ({ onSelectProjectForContact }) => {
  // Video Templates state with LocalStorage persistence
  const [videoTemplates, setVideoTemplates] = useState<VideoProjectTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed;
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          return INITIAL_VIDEO_TEMPLATES.map((initT) => {
            const found = parsed.find((p: VideoProjectTemplate) => p.id === initT.id);
            return found ? { ...initT, ...found } : initT;
          });
        }
      }
    } catch (e) {
      console.error('Failed to load video templates from storage', e);
    }
    return INITIAL_VIDEO_TEMPLATES;
  });

  // Sync with persistent server storage on mount
  React.useEffect(() => {
    let isMounted = true;
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((payload) => {
        if (!isMounted || !payload?.success || !payload.data) return;
        const serverTemplates = payload.data.videoTemplates;
        if (Array.isArray(serverTemplates) && serverTemplates.length > 0) {
          setVideoTemplates((prev) => {
            const merged = INITIAL_VIDEO_TEMPLATES.map((initT) => {
              const found = serverTemplates.find((p: VideoProjectTemplate) => p.id === initT.id);
              return found ? { ...initT, ...found } : initT;
            });
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {
              // ignore
            }
            return merged;
          });
        }
      })
      .catch((err) => {
        console.warn('Could not sync video templates from server:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Modal states
  const [editingTemplate, setEditingTemplate] = useState<VideoProjectTemplate | null>(null);
  const [playingTemplate, setPlayingTemplate] = useState<VideoProjectTemplate | null>(null);
  const [selectedSpecProject, setSelectedSpecProject] = useState<ProjectDomain | null>(null);

  // Sync to localStorage and Server
  const saveTemplates = (newTemplates: VideoProjectTemplate[]) => {
    setVideoTemplates(newTemplates);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTemplates));
    } catch (e) {
      console.warn('LocalStorage save failed (possible quota limit)', e);
    }

    // Persist to server backend so published site has all videos
    fetch('/api/save-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoTemplates: newTemplates }),
    }).catch((err) => {
      console.warn('Failed to persist projects to server:', err);
    });
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
              Showcase of professional commercial edits, high-retention short reels, narrative cuts, and motion visuals.
            </p>
          </div>

          {/* 6 Templates Status Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold text-cyan-300 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              06 Video Templates
            </span>
          </div>
        </motion.div>

        {/* 6 Video Templates Side-by-Side (2 per row grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {videoTemplates.slice(0, 6).map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl bg-slate-900/85 border border-slate-800/90 hover:border-cyan-500/50 p-5 sm:p-6 shadow-xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_35px_rgba(6,182,212,0.15)] flex flex-col justify-between group"
            >
              {/* Subtle top ambient glow on hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

              <div>
                {/* 16:9 Video Showcase Screen */}
                <div
                  onClick={() => setPlayingTemplate(template)}
                  data-cursor="play"
                  className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group-hover:border-cyan-400/60 shadow-2xl group/player cursor-pointer transition-all duration-300 flex items-center justify-center mb-5"
                >
                  {/* Thumbnail / Background */}
                  {template.thumbnailUrl ? (
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/player:scale-105"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (template.videoUrl && template.videoUrl.includes('youtu')) {
                          const parts = template.videoUrl.split('?')[0].split('/');
                          const id = parts.pop();
                          if (id && !img.src.includes('img.youtube.com')) {
                            img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                          }
                        }
                      }}
                    />
                  ) : template.embedUrl ? (
                    <div className="w-full h-full pointer-events-none opacity-85">
                      <iframe
                        src={template.embedUrl}
                        title={template.title}
                        className="w-full h-full border-0"
                        tabIndex={-1}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0F1626] via-[#0A0F1A] to-[#060A12] relative">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mx-auto shadow-lg">
                        <Film className="w-6 h-6" />
                      </div>
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 group-hover/player:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-950/90 border-2 border-cyan-400/80 text-cyan-300 flex items-center justify-center shadow-xl shadow-cyan-500/30 group-hover/player:scale-110 group-hover/player:bg-gradient-to-r group-hover/player:from-cyan-400 group-hover/player:to-sky-400 group-hover/player:text-slate-950 group-hover/player:border-transparent transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Left Number & Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-xs font-mono text-cyan-300 border border-slate-700/60 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>0{template.templateNumber || index + 1}</span>
                  </div>

                  {/* Top Right Aspect Ratio Badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-slate-950/90 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-slate-700/60">
                    {template.aspectRatio}
                  </div>

                  {/* Bottom Right Duration Badge */}
                  {template.duration && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-xs font-mono text-slate-200 border border-slate-700/60 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{template.duration}</span>
                    </div>
                  )}

                  {/* Bottom Left Metric Badge */}
                  {template.metrics && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-[11px] font-medium text-cyan-300 border border-slate-700/60 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-cyan-400" />
                      <span>{template.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Minimal Header (Title + Category - NO extra long paragraphs) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                      {template.categoryLabel || `Video Editing 0${template.templateNumber || index + 1}`}
                    </span>
                    {template.isCustomUploaded && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Custom
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setPlayingTemplate(template)}
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {template.title}
                  </h3>

                  <div className="text-xs text-slate-400 flex items-center gap-2 pt-0.5">
                    <span>Client: <strong className="text-slate-200">{template.client}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  onClick={() => setPlayingTemplate(template)}
                  className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Play Video</span>
                </button>

                <button
                  onClick={() => setEditingTemplate(template)}
                  className="py-2.5 px-3.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/40 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  title="Upload or replace video link/file"
                >
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Replace</span>
                </button>
              </div>
            </motion.div>
          ))}
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
