import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050810] border-t border-slate-800/80 py-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Monogram Badge like reference AT */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-400 font-mono text-sm shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              IM
            </div>
            <span
              className="text-base font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ibrahim Miah
            </span>
          </div>

          {/* Copyright notice */}
          <div className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Ibrahim Miah. All rights reserved.
          </div>

          {/* Nav links and Circular Scroll to Top */}
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-4 text-xs text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
