import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollPx / totalHeight) * 100));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-900/40 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-300 transition-[width] duration-75 ease-out relative"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.6), 0 0 4px rgba(6, 182, 212, 0.9)',
        }}
      >
        {/* Subtle glowing beacon at the front edge */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_8px_#22d3ee] pointer-events-none -mr-0.5" />
        )}
      </div>
    </div>
  );
};
