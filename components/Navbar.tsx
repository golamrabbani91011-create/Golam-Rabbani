'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Menu, X, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', labelEn: 'About', labelBn: 'আমার সম্পর্কে' },
    { href: '#youtube', labelEn: 'Videos', labelBn: 'ভিডিও' },
    { href: '#portfolio', labelEn: 'Design', labelBn: 'ডিজাইন' },
    { href: '#skills', labelEn: 'Skills', labelBn: 'দক্ষতা' },
    { href: '#contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a href="#" id="brand-logo" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white p-[2px] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-base">
                GR
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base">
                Golam Rabbani
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {t('Video Editor • Designer • Marketer', 'ভিডিও এডিটর • ডিজাইনার • মার্কেটার')}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.href.replace('#', '')}`}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              >
                {t(link.labelEn, link.labelBn)}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              id="language-toggle-btn"
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 hover:text-white transition-all"
              title="Switch Language / ভাষা পরিবর্তন করুন"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Contact Button */}
            <a
              href="#contact"
              id="nav-cta-btn"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-white hover:bg-slate-200 text-slate-950 shadow-md transition-all active:scale-95"
            >
              <span>{t('Contact Me', 'যোগাযোগ করুন')}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-lang-btn"
              onClick={toggleLang}
              className="p-2 text-xs font-bold text-white bg-slate-900 border border-slate-800 rounded-lg"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 rounded-lg"
            >
              {t(link.labelEn, link.labelBn)}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold rounded-lg bg-white text-slate-950 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('Contact Me', 'যোগাযোগ করুন')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
