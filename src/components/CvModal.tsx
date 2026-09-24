import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  FileText,
  Upload,
  Link2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Trash2,
  Sparkles,
  Info,
  Loader2,
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export const CvModal: React.FC = () => {
  const {
    cvConfig,
    isCvModalOpen,
    isUploading,
    setIsCvModalOpen,
    setCvLink,
    setCvFile,
    clearCv,
    openOrDownloadCv,
    hasCustomCv,
  } = useCv();

  const [activeTab, setActiveTab] = useState<'link' | 'upload'>('link');
  const [urlInput, setUrlInput] = useState(cvConfig?.url || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cvConfig?.type === 'link' && cvConfig.url) {
      setUrlInput(cvConfig.url);
    }
  }, [cvConfig]);

  if (!isCvModalOpen) return null;

  const handleSaveLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg('Please enter a valid link (e.g., Google Drive or PDF link)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    const success = await setCvLink(urlInput.trim());
    setIsSubmitting(false);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      setErrorMsg('Failed to save CV link to server. Please try again.');
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('File size too large. Please select a file under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      setErrorMsg('');
      const success = await setCvFile(file.name, base64Data);
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        setErrorMsg('Failed to upload CV to server. Please try again or use a cloud link.');
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please try again or use a cloud link.');
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Manage CV / Resume
              </h3>
              <p className="text-xs text-slate-400">
                Connect your Google Drive CV link or upload your PDF resume
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCvModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active CV Status Banner */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            <div>
              <div className="text-xs font-semibold text-slate-200">
                {hasCustomCv ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Custom CV Active
                  </span>
                ) : (
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Official Ibrahim Miah CV (Ready)
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs font-mono">
                {cvConfig?.type === 'link'
                  ? `Link: ${cvConfig.url}`
                  : `File: ${cvConfig.fileName || 'Ibrahim_Miah_Video_Editor_CV.pdf'}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={openOrDownloadCv}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:from-cyan-300 hover:to-sky-300 transition-all cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download & Test</span>
            </button>
            {hasCustomCv && (
              <button
                type="button"
                onClick={clearCv}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Reset to default CV"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'link'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Option 1: Cloud Link (Google Drive)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Option 2: Direct PDF File Upload</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {saveSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>CV updated and saved to server permanently! Anyone clicking &quot;Download CV&quot; will now download your file.</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab 1: Link Form */}
        {activeTab === 'link' && (
          <form onSubmit={handleSaveLink} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Paste your CV URL (Google Drive / Docs / Dropbox / Canva / Public PDF):
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://drive.google.com/file/d/your-cv-id/view?usp=sharing"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
                />
                <Link2 className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Helpful Guide for Google Drive */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200/90 flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">Google Drive Link Tip:</strong>
                In Google Drive, right click your CV PDF → Click <strong>Share</strong> → Set General Access to{' '}
                <strong>&quot;Anyone with the link can view&quot;</strong> → Copy link and paste above.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Saving to Server...' : 'Save CV Link'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: File Upload */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-700 bg-slate-950/60 hover:border-cyan-400/60 hover:bg-slate-950'
              } ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onFileInputChange}
                disabled={isUploading}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {isUploading ? 'Uploading & Saving to Server...' : 'Upload your CV (PDF or DOCX)'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {isUploading
                  ? 'Please wait while your CV is written to the persistent server...'
                  : 'Drag and drop your file here, or click to browse from your device.'}
              </p>
              <span className="inline-block mt-3 text-[10px] text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 font-mono">
                Supports PDF up to 15MB
              </span>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Once saved, clicking <span className="text-cyan-300 font-semibold">&quot;Download CV&quot;</span> in the navigation bar or hero section will immediately download your CV file.
        </div>
      </div>
    </div>
  );
};
