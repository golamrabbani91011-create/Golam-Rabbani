'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film, Layers, Music } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'reels' | 'vlogs' | 'motion'>('reels');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{t('Video Editing Showreel 2026', 'ভিডিও এডিটিং শো-রিল ২০২৬')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  4K Ultra HD
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t('Editing samples by Golam Rabbani', 'গোলাম রব্বানী কর্তৃক সম্পাদিত কাজসমূহ')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Area */}
        <div className="relative aspect-video bg-black w-full overflow-hidden flex items-center justify-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/showreel.jpg"
            alt="Video Showreel Preview"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* Animated Video Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 flex flex-col justify-between p-4 sm:p-6">
            
            {/* Top Info Bar inside video */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('reels')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeTab === 'reels'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-black/60 text-slate-300 hover:bg-black/80'
                  }`}
                >
                  {t('Reels & TikToks', 'রিলস ও টিকটক')}
                </button>
                <button
                  onClick={() => setActiveTab('vlogs')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeTab === 'vlogs'
                      ? 'bg-purple-500 text-white'
                      : 'bg-black/60 text-slate-300 hover:bg-black/80'
                  }`}
                >
                  {t('YouTube Vlogs', 'ইউটিউব ব্লগ')}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Play/Pause Central Button Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="self-center w-16 h-16 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-white" />
              ) : (
                <Play className="w-8 h-8 fill-white ml-1" />
              )}
            </button>

            {/* Bottom Timeline & Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                <span>00:42</span>
                <span className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-sans">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  {isPlaying ? t('Playing Demo Footage...', 'ডেমো এডিটিং প্লে হচ্ছে...') : t('Paused', 'পজ করা')}
                </span>
                <span>01:45</span>
              </div>

              {/* Simulated Progress Timeline Bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? '45%' : '20%' }}
                ></div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer / Feature Highlights */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">
                {t('Smooth Transitions & FX', 'স্মুথ ট্রানজিশন ও ভিজ্যুয়াল ইফেক্ট')}
              </h4>
              <p className="text-[11px] text-slate-400">
                {t('Masking, zoom cuts, speed ramps', 'মাস্কিং, জুম শট, স্পিড র‍্যাম্পিং')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Music className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">
                {t('Sound Design & Beat Sync', 'সাউন্ড ডিজাইন ও বিট সিঙ্ক')}
              </h4>
              <p className="text-[11px] text-slate-400">
                {t('Custom SFX, trend audio mixing', 'ট্রেন্ডিং মিউজিক, বিট ম্যাচিং সাউন্ড')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">
                {t('Engaging Animated Subtitles', 'অ্যানিমেটেড সাবটাইটেল')}
              </h4>
              <p className="text-[11px] text-slate-400">
                {t('Dynamic captions for high retention', 'হাই ওয়াচ-টাইমের জন্য ক্যাপশন')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
