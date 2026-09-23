import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CvConfig {
  type: 'link' | 'file';
  url?: string;
  fileName?: string;
  fileData?: string; // base64 data URI for uploaded PDF
  updatedAt?: string;
}

interface CvContextType {
  cvConfig: CvConfig | null;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  setCvLink: (url: string) => void;
  setCvFile: (fileName: string, fileData: string) => void;
  clearCv: () => void;
  openOrDownloadCv: () => void;
  hasCustomCv: boolean;
}

const STORAGE_CV_KEY = 'ibrahim_portfolio_cv_config_v1';

const CvContext = createContext<CvContextType | undefined>(undefined);

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvConfig, setCvConfig] = useState<CvConfig | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CV_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load CV config from localStorage', e);
    }
    return null;
  });

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const saveConfig = (config: CvConfig | null) => {
    setCvConfig(config);
    try {
      if (config) {
        localStorage.setItem(STORAGE_CV_KEY, JSON.stringify(config));
      } else {
        localStorage.removeItem(STORAGE_CV_KEY);
      }
    } catch (e) {
      console.warn('LocalStorage error while saving CV', e);
    }
  };

  const setCvLink = (url: string) => {
    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }
    saveConfig({
      type: 'link',
      url: cleanUrl,
      updatedAt: new Date().toISOString(),
    });
  };

  const setCvFile = (fileName: string, fileData: string) => {
    saveConfig({
      type: 'file',
      fileName,
      fileData,
      updatedAt: new Date().toISOString(),
    });
  };

  const clearCv = () => {
    saveConfig(null);
  };

  const openOrDownloadCv = () => {
    if (!cvConfig) {
      // If no CV has been configured yet, open the modal so Ibrahim can provide his CV
      setIsCvModalOpen(true);
      return;
    }

    if (cvConfig.type === 'file' && cvConfig.fileData) {
      // Direct PDF/File download
      try {
        const link = document.createElement('a');
        link.href = cvConfig.fileData;
        link.download = cvConfig.fileName || 'Ibrahim_Miah_Video_Editor_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.error('Error triggering file download', e);
        setIsCvModalOpen(true);
      }
    } else if (cvConfig.type === 'link' && cvConfig.url) {
      // Direct Link Open (Google Drive, Dropbox, OneDrive, etc.)
      try {
        window.open(cvConfig.url, '_blank', 'noopener,noreferrer');
      } catch {
        window.location.href = cvConfig.url;
      }
    } else {
      setIsCvModalOpen(true);
    }
  };

  const hasCustomCv = Boolean(
    cvConfig &&
      ((cvConfig.type === 'link' && cvConfig.url) ||
        (cvConfig.type === 'file' && cvConfig.fileData))
  );

  return (
    <CvContext.Provider
      value={{
        cvConfig,
        isCvModalOpen,
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
