'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { lang, toggleLang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-[2px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-white text-sm">
                GR
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-base block">Golam Rabbani</span>
              <span className="text-[11px] text-slate-400">
                {t('Video Editor • Graphic Designer • Social Media Marketer', 'ভিডিও এডিটর • গ্রাফিক ডিজাইনার • সোশ্যাল মিডিয়া মার্কেটার')}
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">
              {t('About', 'আমার সম্পর্কে')}
            </a>
            <a href="#youtube" className="hover:text-white transition-colors">
              {t('Video Portfolio', 'ভিডিও পোর্টফোলিও')}
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              {t('Graphic Design', 'গ্রাফিক ডিজাইন')}
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              {t('Skills', 'দক্ষতা')}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {t('Contact', 'যোগাযোগ')}
            </a>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Scroll To Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer text strictly adhering to prompt: © 2026 Mohammad Golam Rabbani - Made with ❤️ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-center sm:text-left">
          <p className="font-medium text-slate-300">
            © 2026 Golam Rabbani — Made with ❤️
          </p>
          <p className="text-[11px] text-slate-500">
            Video Editor • Graphic Designer • Social Media Marketer
          </p>
        </div>

      </div>
    </footer>
  );
}
