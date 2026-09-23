import React, { useEffect, useRef, useState } from 'react';
import { Play, ArrowUpRight, Eye } from 'lucide-react';

type CursorMode = 'default' | 'button' | 'video' | 'card' | 'text';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [badgeLabel, setBadgeLabel] = useState<string>('');
  const [isClicked, setIsClicked] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  // Position references for physics spring interpolation (lerp)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const lightPos = useRef({ x: -100, y: -100 });

  // DOM elements refs for zero-overhead direct transform updates
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only mount custom cursor on devices with a mouse / trackpad
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    // Apply custom cursor class to body for custom cursor hiding
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Direct transform for the center precision dot (0 latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Contextual detection matching world-class Awwwards & Cuberto video portfolio standards
      const target = e.target as HTMLElement | null;
      if (target) {
        // 1. Video / Media Player Hover State (Iconic signature feature for video editors)
        const isVideoPlayer = Boolean(
          target.closest('.group\\/player, [data-cursor="play"], .video-screen-container')
        );

        if (isVideoPlayer) {
          setCursorMode('video');
          setBadgeLabel('PLAY');
          return;
        }

        // 2. View / Explore Card State
        const isViewCard = Boolean(
          target.closest('[data-cursor="view"], .card-hover-zoom, .project-spec-card')
        );

        // 3. Interactive Buttons, Links, Pills
        const isButtonOrLink = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, .file-item-zoom')
        );

        // 4. Headline / Key Typography Lens
        const isTextElement = Boolean(
          target.closest('h1, h2, h3, h4, .text-hover-zoom')
        );

        if (isButtonOrLink) {
          setCursorMode('button');
          setBadgeLabel('');
        } else if (isViewCard) {
          setCursorMode('card');
          setBadgeLabel('VIEW');
        } else if (isTextElement) {
          setCursorMode('text');
          setBadgeLabel('');
        } else {
          setCursorMode('default');
          setBadgeLabel('');
        }
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        !e.relatedTarget &&
        (e.clientX <= 0 ||
          e.clientY <= 0 ||
          e.clientX >= window.innerWidth ||
          e.clientY >= window.innerHeight)
      ) {
        setIsVisible(false);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Main animation loop: Smooth spring follow for outer follower and studio ambient keylight
    const loop = () => {
      // Dynamic lerp speed based on mode (snappier when hovering interactive elements)
      const ringLerp = cursorMode !== 'default' ? 0.28 : 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringLerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringLerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Smooth ambient spotlight following mouse
      const lightLerp = 0.1;
      lightPos.current.x += (mousePos.current.x - lightPos.current.x) * lightLerp;
      lightPos.current.y += (mousePos.current.y - lightPos.current.y) * lightLerp;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${lightPos.current.x}px, ${lightPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [hasFinePointer, isVisible, cursorMode]);

  if (!hasFinePointer) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Cinematic Studio Keylight (Subtle atmospheric radiance behind cursor) */}
      <div
        ref={lightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
        style={{
          width: cursorMode === 'video' ? '540px' : cursorMode !== 'default' ? '460px' : '380px',
          height: cursorMode === 'video' ? '540px' : cursorMode !== 'default' ? '460px' : '380px',
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: cursorMode === 'video'
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.26) 0%, rgba(14, 165, 233, 0.14) 30%, rgba(2, 132, 199, 0.05) 55%, transparent 75%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(14, 165, 233, 0.08) 32%, rgba(2, 132, 199, 0.02) 60%, transparent 75%)',
            filter: 'blur(35px)',
          }}
        />
      </div>

      {/* 2. Magnetic Follower Capsule & Reticle (Awwwards / Cuberto Standard) */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform flex items-center justify-center select-none"
      >
        {/* Dynamic morphing shape depending on what you're hovering */}
        <div
          className={`flex items-center justify-center transition-all duration-250 ease-out ${
            isClicked ? 'scale-90' : 'scale-100'
          } ${
            /* VIDEO / REEL HOVER: Bold Cyan Floating PLAY Badge */
            cursorMode === 'video'
              ? 'w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-cyan-300 to-sky-300 text-slate-950 font-extrabold shadow-[0_0_35px_rgba(6,182,212,0.85)] border-2 border-white'
              /* CARD / PROJECT HOVER: High-Contrast VIEW Badge */
              : cursorMode === 'card'
              ? 'w-18 h-18 rounded-full bg-slate-950/90 border-2 border-cyan-400/90 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] backdrop-blur-md'
              /* BUTTON / LINK HOVER: Sleek Magnetic Frosted Glass Ring */
              : cursorMode === 'button'
              ? 'w-13 h-13 rounded-full border-2 border-cyan-300 bg-cyan-400/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(6,182,212,0.6)]'
              /* TEXT HOVER: Clean Text Focus Capsule */
              : cursorMode === 'text'
              ? 'w-10 h-10 rounded-full border border-cyan-300/80 bg-cyan-400/15 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              /* DEFAULT RESTING: Minimalist Geometric Ethereal Ring */
              : 'w-8 h-8 rounded-full border border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
          }`}
        >
          {/* Internal badge content when in VIDEO or CARD mode */}
          {cursorMode === 'video' && (
            <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200">
              <Play className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" />
              <span className="text-[11px] font-black tracking-wider uppercase leading-none mt-1">
                {badgeLabel}
              </span>
            </div>
          )}

          {cursorMode === 'card' && (
            <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200">
              <Eye className="w-4 h-4 text-cyan-300" />
              <span className="text-[10px] font-bold tracking-wider uppercase leading-none mt-1 font-mono">
                {badgeLabel}
              </span>
            </div>
          )}

          {/* Micro crosshair ticks for button hover */}
          {cursorMode === 'button' && (
            <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
          )}
        </div>
      </div>

      {/* 3. Instant Zero-Lag Precision Center Dot */}
      {/* Fades out seamlessly when in VIDEO badge mode so the badge stays clean and readable */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform transition-opacity duration-150 ${
          cursorMode === 'video' || cursorMode === 'card' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`rounded-full transition-all duration-150 ease-out flex items-center justify-center ${
            isClicked
              ? 'w-3 h-3 bg-cyan-200 shadow-[0_0_14px_#22d3ee] scale-90'
              : cursorMode === 'button'
              ? 'w-1.5 h-1.5 bg-white shadow-[0_0_8px_#22d3ee]'
              : 'w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
          }`}
        >
          <span className="w-0.5 h-0.5 rounded-full bg-white opacity-90" />
        </div>
      </div>
    </div>
  );
};
