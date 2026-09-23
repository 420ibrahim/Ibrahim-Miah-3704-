import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, FileDown, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortrait } from '../context/PortraitContext';
import { useCv } from '../context/CvContext';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { portraitSrc } = usePortrait();
  const { openOrDownloadCv, setIsCvModalOpen, hasCustomCv } = useCv();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    openOrDownloadCv();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Monogram Badge matching reference AT */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {portraitSrc ? (
            <img
              src={portraitSrc}
              alt="Ibrahim Miah"
              className="w-8 h-8 rounded-xl object-cover object-top border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-400 font-mono text-xs shadow-[0_0_10px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform">
              IM
            </div>
          )}
          <span>Ibrahim Miah</span>
        </a>

        {/* Navigation Links matching reference */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative py-1 hover:text-cyan-300 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Download CV + Contact */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download CV button group */}
          <div className="hidden sm:inline-flex items-center rounded-xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/60 p-0.5 shadow-sm transition-all">
            <button
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-all duration-200 cursor-pointer"
              title={hasCustomCv ? 'Click to open or download CV' : 'Connect your CV link or file'}
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CV</span>
            </button>
            <button
              onClick={() => setIsCvModalOpen(true)}
              className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/15 rounded-lg transition-colors cursor-pointer"
              title="Set or update CV link / upload PDF"
              aria-label="Set or update CV link"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center group"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600 transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>

          <button
            onClick={onContactClick}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all duration-200 shadow-md shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070B14]/95 backdrop-blur-xl border-b border-slate-800 px-6 py-5 transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownloadCV();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 cursor-pointer"
              >
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
