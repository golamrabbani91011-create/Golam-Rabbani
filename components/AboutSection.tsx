'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { User, Award, Video, Palette, Share2 } from 'lucide-react';

export default function AboutSection() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Video,
      titleEn: 'Video Editing',
      titleBn: 'ভিডিও এডিটিং',
      descEn: 'Premiere Pro, After Effects',
      descBn: 'প্রিমিয়ার প্রো, আফটার ইফেক্টস'
    },
    {
      icon: Palette,
      titleEn: 'Graphic Design',
      titleBn: 'গ্রাফিক ডিজাইন',
      descEn: 'Photoshop, Illustrator, Canva Pro',
      descBn: 'ফটোপশপ, ইলাস্ট্রেটর, ক্যানভা প্রো'
    },
    {
      icon: Share2,
      titleEn: 'Social Media Marketing',
      titleBn: 'সোশ্যাল মিডিয়া মার্কেটিং',
      descEn: 'FB & IG Ads, Content Strategy',
      descBn: 'ফেসবুক ও ইনস্টাগ্রাম এডস, কন্টেন্ট প্ল্যানিং'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-slate-800/20 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md space-y-8">
          
          {/* Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-white">
                <User className="w-3.5 h-3.5" />
                <span>{t('About Me', 'আমার সম্পর্কে')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Golam Rabbani
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('Creative Editor & Designer', 'ক্রিয়েটিভ এডিটর ও ডিজাইনার')}</span>
            </div>
          </div>

          {/* About Paragraph strictly matching prompt */}
          <div className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p>
              {t(
                "I recently completed training in Video Editing, Graphic Design, and Social Media Marketing. I enjoy creating creative visual content and continuously improving my skills through real projects.",
                "আমি সম্প্রতি ভিডিও এডিটিং, গ্রাফিক ডিজাইন এবং সোশ্যাল মিডিয়া মার্কেটিংয়ে ট্রেনিং সম্পন্ন করেছি। আমি সৃজনশীল ভিজ্যুয়াল কন্টেন্ট তৈরি করতে আনন্দ পাই এবং রিয়েল প্রজেক্টের মাধ্যমে প্রতিনিয়ত স্কিল ডেভেলপ করি।"
              )}
            </p>
          </div>

          {/* 3 Core Highlight Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {t(item.titleEn, item.titleBn)}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t(item.descEn, item.descBn)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
