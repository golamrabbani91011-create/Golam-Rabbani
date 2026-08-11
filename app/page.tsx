'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import YouTubeShowcase from '@/components/YouTubeShowcase';
import PortfolioGallery from '@/components/PortfolioGallery';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import ShowreelModal from '@/components/ShowreelModal';

export default function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-slate-200 selection:text-slate-950">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <Hero onOpenShowreel={() => setShowreelOpen(true)} />

        {/* About Me Section */}
        <AboutSection />

        {/* Video Portfolio (YouTube Showcase) */}
        <YouTubeShowcase />

        {/* Graphic Design Portfolio Gallery */}
        <PortfolioGallery />

        {/* Skills Section */}
        <SkillsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Showreel Video Modal */}
        <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
      </div>
    </LanguageProvider>
  );
}
