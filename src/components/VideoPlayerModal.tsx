import React from 'react';
import {
  X,
  Play,
  Upload,
  ExternalLink,
  Film,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { VideoProjectTemplate } from '../types';
import { parseVideoUrl } from '../utils/videoUtils';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: VideoProjectTemplate | null;
  onOpenUpload: (template: VideoProjectTemplate) => void;
  onContactClick?: (projectTitle: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  template,
  onOpenUpload,
  onContactClick,
}) => {
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    setVideoError(false);
  }, [template?.id, template?.videoUrl, template?.embedUrl]);

  if (!isOpen || !template) return null;

  const isVertical = template.aspectRatio === '9:16';
  const isSquare = template.aspectRatio === '1:1';

  // Smart detect embed URL if only youtube/vimeo link was supplied as videoUrl
  const parsed = template.videoUrl ? parseVideoUrl(template.videoUrl) : null;
  const effectiveEmbedUrl = template.embedUrl || parsed?.embedUrl;
  const directVideoUrl = template.videoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        className={`relative w-full ${
          isVertical ? 'max-w-2xl' : 'max-w-4xl'
        } bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Work 0{template.templateNumber}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{template.categoryLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {template.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Container */}
        <div className="my-6 flex justify-center">
          <div
            className={`relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex items-center justify-center ${
              isVertical
                ? 'w-full max-w-[340px] aspect-[9/16]'
                : isSquare
                ? 'w-full max-w-[480px] aspect-square'
                : 'w-full aspect-video'
            }`}
          >
            {effectiveEmbedUrl ? (
              <iframe
                src={effectiveEmbedUrl}
                title={template.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : directVideoUrl && !videoError ? (
              <video
                key={directVideoUrl}
                src={directVideoUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
                onError={() => setVideoError(true)}
              >
                <source src={directVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : videoError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950 relative">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-3">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Unable to stream video file directly
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  The video file could not be loaded directly by the browser. You can upload a new video file or connect a YouTube link.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenUpload(template);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-xl"
                >
                  Replace Video
                </button>
              </div>
            ) : (
              /* Simulated Minimal Luxury Studio Canvas */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#111728] via-[#0B0F19] to-black relative">
                {/* Background ambient lighting */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, #06b6d4 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 space-y-4 max-w-sm">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mx-auto shadow-lg">
                    <Film className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                      Visual Post-Production
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {template.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Upload your MP4/WebM video file or paste a YouTube / Shorts / Vimeo link to preview the full edit.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenUpload(template);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Video for this Work</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Metadata & Deliverables */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">Client / Channel:</span>
              <span className="text-sm font-semibold text-white">{template.client}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Key Result / Retention Metric:</span>
              <span className="text-xs font-mono font-semibold text-cyan-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                {template.metrics}
              </span>
            </div>

            {template.duration && (
              <div>
                <span className="text-xs text-slate-400 block">Duration:</span>
                <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {template.duration}
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {template.description}
          </p>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Editing Highlights & Techniques:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {template.editingTechniques.map((tech, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <button
            onClick={() => {
              onClose();
              onOpenUpload(template);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upload / Replace Video</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onContactClick && (
              <button
                onClick={() => {
                  onClose();
                  onContactClick(template.title);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Inquire About Similar Edit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
