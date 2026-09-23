/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortraitProvider } from './context/PortraitContext';
import { CvProvider } from './context/CvContext';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TrainingEducation } from './components/TrainingEducation';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export default function App() {
  const [contactSubject, setContactSubject] = useState<string>('Commercial Video Editing (16:9)');

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectForContact = (projectTitle: string) => {
    setContactSubject(projectTitle);
    scrollToContact();
  };

  return (
    <ThemeProvider>
      <PortraitProvider>
        <CvProvider>
          <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200 transition-colors duration-300">
            {/* Interactive Luxurious Ambient Light & Cyber Custom Cursor */}
            <CustomCursor />

            {/* Scroll Progress Bar at very top of screen */}
            <ScrollProgress />

            {/* Fixed Navigation Bar */}
            <Navbar onContactClick={scrollToContact} />

            {/* Main Content Sections */}
            <main className="flex-1">
              {/* Hero Section */}
              <Hero onViewWorkClick={scrollToWork} onContactClick={scrollToContact} />

              {/* Section 1: About Me */}
              <About />

              {/* Section 2: Skills & Expertise */}
              <Skills />

              {/* Section 3: Selected Work / Projects */}
              <Projects onSelectProjectForContact={handleSelectProjectForContact} />

              {/* Section 4 & 5: Professional Training & Education */}
              <TrainingEducation />

              {/* Section 6: Creative Process */}
              <Process />

              {/* Section 7: Contact */}
              <Contact initialSubject={contactSubject} />
            </main>

            {/* Section 8: Footer */}
            <Footer />

            {/* CV Link & Upload Modal */}
            <CvModal />
          </div>
        </CvProvider>
      </PortraitProvider>
    </ThemeProvider>
  );
}
