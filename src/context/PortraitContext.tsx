import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PortraitStyle {
  preset: 'cyan' | 'cinematic' | 'executive' | 'cyber' | 'mono';
  glowColor: string;
  glowIntensity: number;
  zoom: number;
  brightness: number;
  contrast: number;
  vignette: number;
  borderGlow: boolean;
  filterPresetName: string;
}

export const DEFAULT_PORTRAIT_STYLE: PortraitStyle = {
  preset: 'cyan',
  glowColor: '#10b981',
  glowIntensity: 75,
  zoom: 105,
  brightness: 104,
  contrast: 108,
  vignette: 35,
  borderGlow: true,
  filterPresetName: 'Cyan Rim Studio',
};

const DEFAULT_PORTRAIT_URL = '/uploads/portrait-1790214074938.jpg';

interface PortraitContextType {
  portraitSrc: string | null;
  style: PortraitStyle;
  setPortraitSrc: (src: string | null) => void;
  setStyle: (style: PortraitStyle) => void;
  updateStyle: (partial: Partial<PortraitStyle>) => void;
  applyPreset: (presetName: PortraitStyle['preset']) => void;
  resetPortrait: () => void;
}

const STORAGE_PORTRAIT_KEY = 'ibrahim_portfolio_custom_photo_v2';
const STORAGE_STYLE_KEY = 'ibrahim_portfolio_portrait_style_v2';

const PortraitContext = createContext<PortraitContextType | undefined>(undefined);

export const PortraitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portraitSrc, setPortraitSrcState] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PORTRAIT_KEY);
      return saved || DEFAULT_PORTRAIT_URL;
    } catch {
      return DEFAULT_PORTRAIT_URL;
    }
  });

  const [style, setStyleState] = useState<PortraitStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STYLE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PORTRAIT_STYLE;
  });

  // Fetch persistent server-stored portrait on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((payload) => {
        if (!isMounted || !payload?.success || !payload.data) return;
        const serverData = payload.data;
        if (serverData.portraitSrc) {
          setPortraitSrcState(serverData.portraitSrc);
          try {
            localStorage.setItem(STORAGE_PORTRAIT_KEY, serverData.portraitSrc);
          } catch {
            // ignore
          }
        }
        if (serverData.style) {
          setStyleState(serverData.style);
          try {
            localStorage.setItem(STORAGE_STYLE_KEY, JSON.stringify(serverData.style));
          } catch {
            // ignore
          }
        }
      })
      .catch((err) => {
        console.warn('Could not sync portrait from server, using local fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const saveToServer = (src: string | null, newStyle?: PortraitStyle) => {
    fetch('/api/save-portrait', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        portraitSrc: src,
        style: newStyle || style,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.portraitSrc && data.portraitSrc !== src) {
          // If server stored image and returned a static URL like /uploads/portrait-...
          setPortraitSrcState(data.portraitSrc);
          try {
            localStorage.setItem(STORAGE_PORTRAIT_KEY, data.portraitSrc);
          } catch {
            // ignore
          }
        }
      })
      .catch((e) => {
        console.warn('Could not persist portrait to server:', e);
      });
  };

  const setPortraitSrc = (src: string | null) => {
    const val = src || DEFAULT_PORTRAIT_URL;
    setPortraitSrcState(val);
    try {
      localStorage.setItem(STORAGE_PORTRAIT_KEY, val);
    } catch (e) {
      console.warn('Could not save portrait to localStorage:', e);
    }
    saveToServer(val);
  };

  const setStyle = (newStyle: PortraitStyle) => {
    setStyleState(newStyle);
    try {
      localStorage.setItem(STORAGE_STYLE_KEY, JSON.stringify(newStyle));
    } catch (e) {
      console.warn('Could not save style to localStorage:', e);
    }
    saveToServer(portraitSrc, newStyle);
  };

  const updateStyle = (partial: Partial<PortraitStyle>) => {
    setStyleState((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_STYLE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save style to localStorage:', e);
      }
      saveToServer(portraitSrc, updated);
      return updated;
    });
  };

  const applyPreset = (preset: PortraitStyle['preset']) => {
    let presetStyle: Partial<PortraitStyle> = {};
    switch (preset) {
      case 'cyan':
        presetStyle = {
          preset: 'cyan',
          filterPresetName: 'Cyan Rim Studio',
          glowColor: '#06b6d4',
          glowIntensity: 80,
          brightness: 104,
          contrast: 108,
          vignette: 35,
          borderGlow: true,
        };
        break;
      case 'cinematic':
        presetStyle = {
          preset: 'cinematic',
          filterPresetName: 'Cinematic High Contrast',
          glowColor: '#38bdf8',
          glowIntensity: 65,
          brightness: 102,
          contrast: 120,
          vignette: 55,
          borderGlow: true,
        };
        break;
      case 'executive':
        presetStyle = {
          preset: 'executive',
          filterPresetName: 'Executive Clean',
          glowColor: '#64748b',
          glowIntensity: 40,
          brightness: 105,
          contrast: 102,
          vignette: 15,
          borderGlow: false,
        };
        break;
      case 'cyber':
        presetStyle = {
          preset: 'cyber',
          filterPresetName: 'Cyber Indigo & Teal',
          glowColor: '#818cf8',
          glowIntensity: 90,
          brightness: 106,
          contrast: 114,
          vignette: 45,
          borderGlow: true,
        };
        break;
      case 'mono':
        presetStyle = {
          preset: 'mono',
          filterPresetName: 'Executive Monochrome',
          glowColor: '#06b6d4',
          glowIntensity: 60,
          brightness: 102,
          contrast: 125,
          vignette: 40,
          borderGlow: true,
        };
        break;
    }
    updateStyle(presetStyle);
  };

  const resetPortrait = () => {
    setPortraitSrc(DEFAULT_PORTRAIT_URL);
    setStyle(DEFAULT_PORTRAIT_STYLE);
    fetch('/api/reset-portrait', { method: 'POST' }).catch(() => {});
  };

  return (
    <PortraitContext.Provider
      value={{
        portraitSrc,
        style,
        setPortraitSrc,
        setStyle,
        updateStyle,
        applyPreset,
        resetPortrait,
      }}
    >
      {children}
    </PortraitContext.Provider>
  );
};

export const usePortrait = () => {
  const context = useContext(PortraitContext);
  if (!context) {
    throw new Error('usePortrait must be used within a PortraitProvider');
  }
  return context;
};
