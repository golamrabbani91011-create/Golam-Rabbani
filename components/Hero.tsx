'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenShowreel?: () => void;
}

export default function Hero({ onOpenShowreel }: HeroProps) {
  const { t } = useLanguage();
  const [avatarUrl, setAvatarUrl] = React.useState<string>('/images/avatar.jpg');

  React.useEffect(() => {
    const updateAvatar = () => {
      const saved = localStorage.getItem('user_custom_avatar');
      if (saved) {
        setAvatarUrl(saved);
      } else {
        setAvatarUrl('/images/avatar.jpg');
      }
    };

    updateAvatar();

    window.addEventListener('storage', updateAvatar);
    window.addEventListener('avatar_updated', updateAvatar);

    return () => {
      window.removeEventListener('storage', updateAvatar);
      window.removeEventListener('avatar_updated', updateAvatar);
    };
  }, []);

  const orbitIcons = [
    {
      id: 'pr',
      name: 'Pr',
      brandEn: 'Adobe Premiere Pro',
      brandBn: 'এডৌবি প্রিমিয়ার প্রো',
      gradient: 'from-[#2D0064] via-[#000033] to-[#14002B]',
      border: 'border-[#9999FF]/60',
      glow: 'shadow-[0_0_20px_rgba(153,153,255,0.7)]',
      textColor: '#9999FF',
      tag: 'PR'
    },
    {
      id: 'ae',
      name: 'Ae',
      brandEn: 'Adobe After Effects',
      brandBn: 'এডৌবি আফটার ইফেক্টস',
      gradient: 'from-[#00005B] via-[#00002A] to-[#120033]',
      border: 'border-[#9999FF]/60',
      glow: 'shadow-[0_0_20px_rgba(153,153,255,0.7)]',
      textColor: '#9999FF',
      tag: 'AE'
    },
    {
      id: 'ps',
      name: 'Ps',
      brandEn: 'Adobe Photoshop',
      brandBn: 'এডৌবি ফটোশপ',
      gradient: 'from-[#001E36] via-[#000D1A] to-[#001A26]',
      border: 'border-[#31A8FF]/60',
      glow: 'shadow-[0_0_20px_rgba(49,168,255,0.7)]',
      textColor: '#31A8FF',
      tag: 'PS'
    },
    {
      id: 'ai',
      name: 'Ai',
      brandEn: 'Adobe Illustrator',
      brandBn: 'এডৌবি ইলাস্ট্রেটর',
      gradient: 'from-[#330000] via-[#1A0000] to-[#2B0000]',
      border: 'border-[#FF9A00]/60',
      glow: 'shadow-[0_0_20px_rgba(255,154,0,0.7)]',
      textColor: '#FF9A00',
      tag: 'AI'
    },
    {
      id: 'capcut',
      name: 'CapCut',
      brandEn: 'CapCut Video Editor',
      brandBn: 'ক্যাপকাট ভিডিও এডিটর',
      gradient: 'from-[#000000] via-[#0B1528] to-[#001F29]',
      border: 'border-[#00F2FE]/60',
      glow: 'shadow-[0_0_20px_rgba(0,242,254,0.7)]',
      textColor: '#00F2FE',
      isCapCut: true,
      tag: 'CC'
    },
    {
      id: 'generative_ai',
      name: 'AI',
      brandEn: 'Generative AI Tools',
      brandBn: 'এআই ও অটোমেশন টুলস',
      gradient: 'from-emerald-950 via-teal-900 to-slate-950',
      border: 'border-emerald-400/60',
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.7)]',
      textColor: '#34D399',
      isAi: true,
      tag: 'AI'
    }
  ];

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1020] pt-24 pb-20">
      
      {/* 1. Background Particles & Deep Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white/20 blur-[1px] animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 71) % 100}%`,
              width: `${(i % 4) + 2}px`,
              height: `${(i % 4) + 2}px`,
              animationDelay: `${(i % 5)}s`,
              animationDuration: `${(i % 3) + 4}s`
            }}
          />
        ))}
      </div>

      {/* 2. Animated Premiere Pro Timeline Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none flex flex-col justify-center transform -skew-y-3 scale-110">
        <div className="relative w-full h-[60vh] flex flex-col gap-2 animate-[timeline-scroll_40s_linear_infinite]">
          {/* Tracks */}
          {[...Array(6)].map((_, trackIdx) => (
            <div key={trackIdx} className="w-[300vw] flex gap-4 h-12 items-center border-y border-slate-700/30 bg-slate-800/10 px-10">
              {[...Array(12)].map((__, clipIdx) => (
                <div 
                  key={clipIdx} 
                  className="h-8 rounded border border-blue-400/30 bg-blue-500/20 backdrop-blur-sm relative overflow-hidden"
                  style={{ 
                    width: `${((trackIdx * 17 + clipIdx * 41) % 300) + 100}px`, 
                    opacity: ((trackIdx * 11 + clipIdx * 7) % 5) * 0.1 + 0.5 
                  }}
                >
                  {/* Fake Audio Waveform / Keyframes */}
                  {trackIdx % 2 !== 0 && (
                     <div className="absolute inset-0 flex items-center justify-between px-2 opacity-50">
                        <div className="w-1 h-3 bg-blue-300 rounded-full"></div>
                        <div className="w-1 h-6 bg-blue-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-blue-300 rounded-full"></div>
                        <div className="w-1 h-2 bg-blue-300 rounded-full"></div>
                     </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          {/* Playhead */}
          <div className="absolute top-0 bottom-0 left-[30vw] w-px bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] z-10">
            <div className="absolute -top-2 -left-2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-transparent border-t-red-500"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Content Layout */}
        <div className="flex flex-col items-center justify-center text-center space-y-10">
          
          {/* Center Portrait & Orbit Container */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center my-6 group">
            
            {/* Visual Orbit Track Rings */}
            <div className="absolute w-[80%] h-[80%] sm:w-[84%] sm:h-[84%] rounded-full border border-blue-500/20 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[100%] h-[100%] rounded-full border border-dashed border-indigo-500/30 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
            
            {/* Ambient Pulse Aura Behind Avatar */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-pink-500/20 blur-2xl animate-pulse pointer-events-none" />

            {/* The Revolving Orbit Container */}
            <div className="absolute inset-0 animate-[spin_22s_linear_infinite] group-hover:[animation-play-state:paused]">
              {orbitIcons.map((icon, index) => {
                const angle = (index * 360) / orbitIcons.length;
                return (
                  <div
                    key={icon.id}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(0, -115px) sm:translate(0, -155px) md:translate(0, -185px)`
                    }}
                  >
                    {/* Counter-rotation wrapper to keep badge vertical */}
                    <div style={{ transform: `rotate(-${angle}deg)` }}>
                      <div className="animate-[spin_22s_linear_infinite_reverse] group-hover:[animation-play-state:paused]">
                        {/* Interactive Badge Box with Tooltip */}
                        <div className="relative group/badge cursor-pointer">
                          
                          {/* Badge Card */}
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${icon.gradient} ${icon.border} ${icon.glow} border-2 flex flex-col items-center justify-center transition-all duration-300 hover:scale-125 hover:z-50 backdrop-blur-md shadow-2xl relative overflow-hidden`}
                          >
                            {/* Inner Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

                            {icon.isAi ? (
                              <div className="flex flex-col items-center justify-center">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 animate-pulse" />
                                <span className="text-[10px] font-black tracking-widest text-emerald-300 mt-0.5">AI</span>
                              </div>
                            ) : icon.isCapCut ? (
                              <div className="flex flex-col items-center justify-center leading-none">
                                <span className="text-sm sm:text-base md:text-lg font-black tracking-tighter text-cyan-300">
                                  Cap<span className="text-white">Cut</span>
                                </span>
                              </div>
                            ) : (
                              <span
                                className="font-black text-base sm:text-lg md:text-xl font-sans tracking-tight drop-shadow-md"
                                style={{ color: icon.textColor }}
                              >
                                {icon.name}
                              </span>
                            )}
                          </div>

                          {/* Hover Tooltip Popup */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-slate-700 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity duration-200 pointer-events-none shadow-2xl z-50 flex flex-col items-center gap-0.5">
                            <span className="font-bold text-blue-300">{icon.brandEn}</span>
                            <span className="text-[10px] text-slate-400">{icon.brandBn}</span>
                            <div className="w-2 h-2 bg-slate-950 border-r border-b border-slate-700 rotate-45 -mb-2 mt-0.5" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Portrait Image Frame */}
            <div className="relative z-20 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 transition-transform duration-500 group-hover:scale-105">
              
              {/* Glowing Outline Ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 blur-sm opacity-80 animate-pulse" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-blue-400/40 bg-[#0B1020] p-1.5 shadow-[0_0_50px_rgba(59,130,246,0.5)_inset]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt="Creative Professional Profile"
                  className="w-full h-full object-cover rounded-full shadow-inner"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setAvatarUrl('/images/avatar.jpg');
                    try {
                      localStorage.removeItem('user_custom_avatar');
                    } catch {
                      // ignore
                    }
                  }}
                />
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/50 text-emerald-400 font-bold text-[10px] sm:text-xs flex items-center gap-1.5 shadow-xl backdrop-blur-md z-30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Available for Hire</span>
              </div>
            </div>

          </div>

          {/* Typography */}
          <div className="space-y-6 max-w-4xl mx-auto relative z-20 pt-8 sm:pt-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl">
              {t("Creative Video Editor ", "ক্রিয়েটিভ ভিডিও এডিটর ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                &amp; {t("Graphic Designer", "ও গ্রাফিক ডিজাইনার")}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t(
                "I create cinematic videos, premium graphics, AI-powered content, and modern digital experiences.",
                "আমি সিনেমাটিক ভিডিও, প্রিমিয়াম গ্রাফিক্স, এআই-পাওয়ার্ড কন্টেন্ট এবং আধুনিক ডিজিটাল অভিজ্ঞতা তৈরি করি।"
              )}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-20 pt-4 w-full px-4">
            <a
              href="#portfolio"
              className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0B1020] font-black text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">{t('View Portfolio', 'পোর্টফোলিও দেখুন')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0B1020]/80 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 text-white font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              <Mail className="w-5 h-5" />
              <span>{t('Contact Me', 'যোগাযোগ করুন')}</span>
            </a>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes timeline-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50vw); }
        }
      `}} />
    </section>
  );
}

