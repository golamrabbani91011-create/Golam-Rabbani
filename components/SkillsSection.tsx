'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Wrench, CheckCircle2 } from 'lucide-react';

export default function SkillsSection() {
  const { t } = useLanguage();

  const skillItems = [
    {
      name: 'Adobe Premiere Pro',
      categoryEn: 'Video Editing',
      categoryBn: 'ভিডিও এডিটিং',
      badgeEn: 'Trained & Practiced',
      badgeBn: 'প্রশিক্ষণপ্রাপ্ত ও চর্চাকৃত',
      descEn: 'Basic to intermediate video trimming, timeline pacing, and simple audio synchronization.',
      descBn: 'ভিডিও কাটিং, সঠিক পেসিং এবং বেসিক অডিও সিঙ্ক।'
    },
    {
      name: 'Adobe Photoshop',
      categoryEn: 'Graphic Design',
      categoryBn: 'গ্রাফিক ডিজাইন',
      badgeEn: 'Trained & Practiced',
      badgeBn: 'প্রশিক্ষণপ্রাপ্ত ও চর্চাকৃত',
      descEn: 'Creating YouTube thumbnails, social media banners, and photo editing.',
      descBn: 'ইউটিউব থাম্বনেইল, সোশ্যাল মিডিয়া ব্যানার এবং ফটো এডিটিং।'
    },
    {
      name: 'Adobe Illustrator',
      categoryEn: 'Vector Design',
      categoryBn: 'ভেক্টর ডিজাইন',
      badgeEn: 'Fundamental',
      badgeBn: 'মৌলিক ধারণা',
      descEn: 'Basic vector graphics, logo designs, and vector banner layouts.',
      descBn: 'লোগো এবং ভেক্টর ব্যানার লেআউট তৈরি।'
    },
    {
      name: 'Canva',
      categoryEn: 'Quick Design',
      categoryBn: 'কুইক ডিজাইন',
      badgeEn: 'Proficient',
      badgeBn: 'দক্ষ',
      descEn: 'Fast creation of social media posts, story graphics, and presentations.',
      descBn: 'দ্রুত সোশ্যাল মিডিয়া পোস্ট, কভার এবং প্রেজেন্টেশন ডিজাইন।'
    },
    {
      name: 'Social Media Marketing',
      categoryEn: 'Marketing Basics',
      categoryBn: 'মার্কেটিং বেসিক্স',
      badgeEn: 'Certified',
      badgeBn: 'সার্টিফাইড',
      descEn: 'Understanding Facebook/Instagram page setup, audience targeting, and content planning.',
      descBn: 'ফেসবুক ও ইনস্টাগ্রাম পেজ সেটআপ, অডিয়েন্স প্ল্যানিং ও পোস্ট রিচ।'
    },
    {
      name: 'Adobe After Effects',
      categoryEn: 'Motion Basics',
      categoryBn: 'মোশন বেসিক্স',
      badgeEn: 'Basic Level',
      badgeBn: 'বেসিক লেভেল',
      descEn: 'Basic text animation, lower thirds, and intro/outro transitions.',
      descBn: 'সহজ টেক্সট অ্যানিমেশন, টাইটেল ও ইন্ট্রো ট্রানজিশন।'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-slate-800/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t('Fresher Skills Overview', 'দক্ষতা ও সফটওয়্যার')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t('My Technical Skills', 'আমার সফটওয়্যার ও কাজের অভিজ্ঞতা')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t(
              'As a passionate fresher, I have gained hands-on practical training in video editing, graphic design, and social marketing through real practice projects.',
              'একজন নতুন ফ্রেশার হিসেবে পেশাদার ট্রেনিং ও বাস্তব প্রজেক্ট অনুশীলনের মাধ্যমে এই সফটওয়্যারগুলোতে আমার কাজের ভালো দক্ষতা রয়েছে।'
            )}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillItems.map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 shadow-lg space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {t(skill.categoryEn, skill.categoryBn)}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {skill.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-300 shrink-0">
                  {t(skill.badgeEn, skill.badgeBn)}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {t(skill.descEn, skill.descBn)}
              </p>

              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('Practiced on real demo projects', 'ডেমো প্রজেক্টের অভিজ্ঞতা রয়েছে')}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
