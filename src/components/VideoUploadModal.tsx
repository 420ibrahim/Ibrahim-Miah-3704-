import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { VideoProjectTemplate } from '../types';
import { parseVideoUrl } from '../utils/videoUtils';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: VideoProjectTemplate | null;
  onSave: (updatedTemplate: VideoProjectTemplate) => void;
  onReset: (templateId: string) => void;
}

export const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  isOpen,
  onClose,
  template,
  onSave,
  onReset,
}) => {
  if (!isOpen || !template) return null;

  // Local form state
  const [formData, setFormData] = useState<Partial<VideoProjectTemplate>>({
    title: template.title,
    client: template.client,
    description: template.description,
    metrics: template.metrics,
    duration: template.duration,
    videoUrl: template.videoUrl,
    embedUrl: template.embedUrl,
    thumbnailUrl: template.thumbnailUrl,
    videoSourceType: template.videoSourceType,
    toolsUsed: [...template.toolsUsed],
  });

  const [inputMode, setInputMode] = useState<'upload' | 'url'>(
    template.embedUrl || (template.videoUrl && template.videoUrl.startsWith('http')) ? 'url' : 'upload'
  );

  const [urlInput, setUrlInput] = useState<string>(
    template.embedUrl || template.videoUrl || ''
  );

  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const videoFileRef = useRef<HTMLInputElement>(null);
  const thumbFileRef = useRef<HTMLInputElement>(null);

  const handleVideoFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file (.mp4, .webm, .mov, etc.)');
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      videoUrl: blobUrl,
      embedUrl: undefined,
      videoSourceType: 'upload',
      isCustomUploaded: true,
    }));
  };

  const handleThumbnailFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setFormData((prev) => ({
          ...prev,
          thumbnailUrl: e.target?.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (value: string) => {
    setUrlInput(value);
    const parsed = parseVideoUrl(value);
    if (parsed.type === 'youtube' || parsed.type === 'vimeo') {
      const vType: 'youtube' | 'vimeo' = parsed.type;
      setFormData((prev) => ({
        ...prev,
        videoSourceType: vType,
        videoUrl: value,
        embedUrl: parsed.embedUrl,
        isCustomUploaded: true,
      }));
    } else if (parsed.directUrl) {
      setFormData((prev) => ({
        ...prev,
        videoSourceType: 'url',
        videoUrl: parsed.directUrl,
        embedUrl: undefined,
        isCustomUploaded: true,
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!template) return;

    const updated: VideoProjectTemplate = {
      ...template,
      title: formData.title || template.title,
      client: formData.client || template.client,
      description: formData.description || template.description,
      metrics: formData.metrics || template.metrics,
      duration: formData.duration || template.duration,
      videoUrl: formData.videoUrl,
      embedUrl: formData.embedUrl,
      thumbnailUrl: formData.thumbnailUrl,
      videoSourceType: formData.videoSourceType || template.videoSourceType,
      isCustomUploaded: Boolean(
        formData.videoUrl || formData.embedUrl || formData.thumbnailUrl
      ),
    };

    onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  Work 0{template.templateNumber}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{template.categoryLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Upload & Replace Showcase Video
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSave} className="space-y-6 my-6">
          {/* Video Ingestion Source Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Step 1: Choose Video Source for this Work
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setInputMode('upload')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  inputMode === 'upload'
                    ? 'bg-amber-950/30 border-amber-400 text-amber-200 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Video (MP4/WebM)</span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  inputMode === 'url'
                    ? 'bg-amber-950/30 border-amber-400 text-amber-200 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4 text-amber-400" />
                <span>YouTube / Shorts / Vimeo Link</span>
              </button>
            </div>

            {/* Mode 1: Local Video File Dropzone */}
            {inputMode === 'upload' ? (
              <div>
                <input
                  ref={videoFileRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && handleVideoFile(e.target.files[0])}
                  className="hidden"
                />
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingVideo(true);
                  }}
                  onDragLeave={() => setIsDraggingVideo(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingVideo(false);
                    if (e.dataTransfer.files?.[0]) handleVideoFile(e.dataTransfer.files[0]);
                  }}
                  onClick={() => videoFileRef.current?.click()}
                  className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isDraggingVideo
                      ? 'border-amber-400 bg-amber-950/20'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {formData.videoUrl && formData.videoSourceType === 'upload'
                      ? 'Video Loaded · Click to Change Video File'
                      : 'Drop your project video here, or click to browse'}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Supports MP4, WebM, MOV (High bitrate supported)
                  </span>
                  {formData.videoUrl && formData.videoSourceType === 'upload' && (
                    <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                      <Check className="w-3.5 h-3.5" /> Video File Ready for Playback
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Mode 2: YouTube / Vimeo URL Input */
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtube.com/shorts/..."
                    className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Automatically extracts embed code for standard YouTube, YouTube Shorts, Vimeo, or direct MP4 streams.
                </p>
                {formData.embedUrl && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                    <Check className="w-3.5 h-3.5" /> Embed Link Verified & Ready
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Live Video Preview Box if available */}
          {(formData.videoUrl || formData.embedUrl) && (
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Live Player Preview:</span>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                {formData.embedUrl ? (
                  <iframe
                    src={formData.embedUrl}
                    title="Video preview"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : formData.videoUrl ? (
                  <video
                    src={formData.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </div>
            </div>
          )}

          {/* Step 2: Custom Thumbnail (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Step 2: Video Thumbnail / Poster (Optional)
            </label>
            <input
              ref={thumbFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleThumbnailFile(e.target.files[0])}
              className="hidden"
            />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => thumbFileRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/40 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>{formData.thumbnailUrl ? 'Change Thumbnail Image' : 'Upload Custom Cover Image'}</span>
              </button>

              {formData.thumbnailUrl && (
                <div className="flex items-center gap-2">
                  <img
                    src={formData.thumbnailUrl}
                    alt="Thumbnail preview"
                    className="w-12 h-8 rounded-lg object-cover border border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, thumbnailUrl: undefined }))}
                    className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Project Deliverable Metadata */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Step 3: Edit Project Details & Metrics
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Commercial Brand Edit"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Client / Channel Name
                </label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Creator Brand / SaaS Co"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Key Metric / Result Highlight
                </label>
                <input
                  type="text"
                  value={formData.metrics || ''}
                  onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                  placeholder="e.g. 84% 30s Retention · 1.2M Views or 4.5x ROAS"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Video Duration
                </label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 04:30 or 00:45"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Overview & Editing Highlights
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your editing decisions, audio balancing, pacing, or campaign strategy..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset this project back to original demo state?')) {
                  onReset(template.id);
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 rounded-lg border border-slate-800 hover:border-rose-500/30 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Showcase Video</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
