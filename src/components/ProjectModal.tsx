import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Layers, CheckCircle, ArrowRight } from 'lucide-react';
import { ProjectDomain } from '../types';

interface ProjectModalProps {
  project: ProjectDomain | null;
  onClose: () => void;
  onRequestReel: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onRequestReel }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFormat, setActiveFormat] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [progress, setProgress] = useState(25);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (project) {
      if (project.format === '9:16') setActiveFormat('9:16');
      else if (project.format === '1:1') setActiveFormat('1:1');
      else setActiveFormat('16:9');
    }
  }, [project]);

  // Audio Waveform Animation in canvas
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 48;
      const width = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const heightMultiplier = isPlaying ? Math.sin(time + i * 0.25) * 0.4 + 0.6 : 0.15;
        const barHeight = heightMultiplier * (canvas.height * 0.7);
        const x = i * width;
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = i % 2 === 0 ? '#06B6D4' : '#38BDF8';
        ctx.fillRect(x + 1, y, width - 2, barHeight);
      }

      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15));
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
              {project.previewTheme.badge}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Interactive Player / Visualizer Simulator */}
          <div className="rounded-xl bg-slate-950 border border-slate-800/90 p-4 sm:p-5 editor-viewport-dark">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-medium text-slate-200">Interactive Canvas & Timeline Preview</span>
              {/* Aspect Ratio Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg">
                <button
                  onClick={() => setActiveFormat('16:9')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    activeFormat === '16:9' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  16:9 Wide
                </button>
                <button
                  onClick={() => setActiveFormat('9:16')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    activeFormat === '9:16' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  9:16 Reel
                </button>
                <button
                  onClick={() => setActiveFormat('1:1')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    activeFormat === '1:1' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1:1 Square
                </button>
              </div>
            </div>

            {/* Video Viewport Frame */}
            <div className="flex items-center justify-center py-4 bg-slate-900/60 rounded-xl border border-slate-800/60">
              <div
                className={`relative bg-gradient-to-br from-slate-900 via-[#0c1527] to-slate-950 rounded-lg border border-cyan-500/30 overflow-hidden flex flex-col justify-between p-4 shadow-lg transition-all duration-300 ${
                  activeFormat === '16:9'
                    ? 'w-full max-w-lg aspect-video'
                    : activeFormat === '9:16'
                    ? 'w-56 aspect-[9/16]'
                    : 'w-64 aspect-square'
                }`}
              >
                {/* Header within frame */}
                <div className="flex items-center justify-between text-[11px] text-cyan-300">
                  <span className="font-mono">{activeFormat} Master Frame</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-[10px] text-cyan-300">
                    4K Rec.709
                  </span>
                </div>

                {/* Center Content: Animated Waveform and Title */}
                <div className="my-auto text-center space-y-2">
                  <div className="inline-block p-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-1">
                    <Layers className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white px-2 leading-snug">{project.title}</h4>
                  <p className="text-[11px] text-slate-400 px-4 line-clamp-2">{project.tagline}</p>
                </div>

                {/* Audio Waveform Canvas */}
                <div className="w-full h-8 bg-slate-950/70 rounded border border-slate-800/80 px-2 flex items-center">
                  <canvas ref={canvasRef} width={280} height={24} className="w-full h-6" />
                </div>
              </div>
            </div>

            {/* Scrubber & Controls */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold transition-colors"
                  aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-slate-400 tabular-nums text-[11px]">
                  00:{Math.floor(progress / 10).toString().padStart(2, '0')}:
                  {Math.floor((progress % 10) * 6).toString().padStart(2, '0')} / 00:30:00
                </span>
              </div>

              {/* Progress track */}
              <div className="flex-1 mx-3 hidden sm:block">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-cyan-400 font-mono">
                {project.toolsUsed[0]}
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Production Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">{project.overview}</p>

              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Tools & Tech Utilized:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.toolsUsed.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-800 border border-slate-700/80 text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Key Deliverables & Specifications
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Pipeline Techniques:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {project.pipelineHighlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Honest Client Work Notice */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-semibold text-white block">
                Looking for unlisted client commercials or private showreels?
              </span>
              <p className="text-slate-400">
                To honor client confidentiality and NDAs, direct client links and private campaign edits
                are shared privately upon inquiry.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onRequestReel(project.title);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Request Tailored Reel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
