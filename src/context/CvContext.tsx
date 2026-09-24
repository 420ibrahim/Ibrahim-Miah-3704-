import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CvConfig {
  type: 'link' | 'file';
  url?: string;
  fileName?: string;
  fileData?: string; // base64 data URI if uploaded
  updatedAt?: string;
}

export const DEFAULT_CV_CONFIG: CvConfig = {
  type: 'file',
  url: '/Ibrahim_Miah_Video_Editor_CV.pdf',
  fileName: 'Ibrahim_Miah_Video_Editor_CV.pdf',
  updatedAt: '2026-09-24T02:00:00.000Z',
};

interface CvContextType {
  cvConfig: CvConfig;
  isCvModalOpen: boolean;
  isUploading: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  setCvLink: (url: string) => Promise<boolean>;
  setCvFile: (fileName: string, fileData: string) => Promise<boolean>;
  clearCv: () => Promise<void>;
  openOrDownloadCv: () => void;
  hasCustomCv: boolean;
}

const STORAGE_CV_KEY = 'ibrahim_portfolio_cv_config_v2';

const CvContext = createContext<CvContextType | undefined>(undefined);

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvConfig, setCvConfig] = useState<CvConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CV_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_CV_CONFIG;
  });

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Sync with persistent backend store on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((payload) => {
        if (!isMounted || !payload?.success || !payload.data) return;
        const serverData = payload.data;
        if (serverData.cvConfig) {
          setCvConfig(serverData.cvConfig);
          try {
            localStorage.setItem(STORAGE_CV_KEY, JSON.stringify(serverData.cvConfig));
          } catch {
            // ignore
          }
        }
      })
      .catch((err) => {
        console.warn('Could not sync CV config with server, using local fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setCvLink = async (url: string): Promise<boolean> => {
    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const newConfig: CvConfig = {
      type: 'link',
      url: cleanUrl,
      fileName: 'Ibrahim_Miah_CV_Link',
      updatedAt: new Date().toISOString(),
    };

    setCvConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_CV_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }

    // Persist to server
    try {
      const res = await fetch('/api/save-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvConfig: newConfig }),
      });
      const data = await res.json();
      return Boolean(data.success);
    } catch (e) {
      console.error('Error saving CV link to server:', e);
      return false;
    }
  };

  const setCvFile = async (fileName: string, fileData: string): Promise<boolean> => {
    setIsUploading(true);
    try {
      // Upload file directly to server
      const res = await fetch('/api/upload-cv-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileData }),
      });
      const data = await res.json();

      if (data.success && data.cvConfig) {
        setCvConfig(data.cvConfig);
        try {
          localStorage.setItem(STORAGE_CV_KEY, JSON.stringify(data.cvConfig));
        } catch {
          // ignore
        }
        setIsUploading(false);
        return true;
      }
      setIsUploading(false);
      return false;
    } catch (e) {
      console.error('Failed to upload CV to server:', e);
      setIsUploading(false);
      return false;
    }
  };

  const clearCv = async () => {
    setCvConfig(DEFAULT_CV_CONFIG);
    try {
      localStorage.setItem(STORAGE_CV_KEY, JSON.stringify(DEFAULT_CV_CONFIG));
    } catch {
      // ignore
    }

    try {
      await fetch('/api/save-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvConfig: DEFAULT_CV_CONFIG }),
      });
    } catch (e) {
      console.error('Error resetting CV on server:', e);
    }
  };

  const openOrDownloadCv = () => {
    // 1. External Cloud Link (Google Drive, Dropbox, OneDrive, etc.)
    if (cvConfig.type === 'link' && cvConfig.url) {
      const link = document.createElement('a');
      link.href = cvConfig.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 2. Direct File Download via dedicated download endpoint
    const downloadFileName = cvConfig.fileName || 'Ibrahim_Miah_Video_Editor_CV.pdf';
    const downloadUrl = '/api/download-cv';

    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadFileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.warn('Anchor download failed, navigating directly:', e);
      window.location.href = downloadUrl;
    }
  };

  const hasCustomCv = Boolean(
    cvConfig &&
      cvConfig.url !== DEFAULT_CV_CONFIG.url &&
      (cvConfig.type === 'link' || (cvConfig.type === 'file' && cvConfig.url?.startsWith('/uploads/')))
  );

  return (
    <CvContext.Provider
      value={{
        cvConfig,
        isCvModalOpen,
        isUploading,
        setIsCvModalOpen,
        setCvLink,
        setCvFile,
        clearCv,
        openOrDownloadCv,
        hasCustomCv,
      }}
    >
      {children}
    </CvContext.Provider>
  );
};

export const useCv = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error('useCv must be used within a CvProvider');
  }
  return context;
};
