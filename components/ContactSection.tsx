'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { Send, Mail, CheckCircle2, MapPin, Youtube, Linkedin, Facebook } from 'lucide-react';

export default function ContactSection() {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/saaduddinkopek',
      icon: Facebook,
      color: 'hover:text-blue-400 hover:border-blue-500/50'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@GolamRabbani-t2t',
      icon: Youtube,
      color: 'hover:text-red-400 hover:border-red-500/50'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
      color: 'hover:text-sky-400 hover:border-sky-500/50'
    },
    {
      name: 'Behance',
      url: 'https://behance.net',
      icon: ({ className }: { className?: string }) => (
        <span className={`font-bold font-mono text-sm leading-none ${className}`}>Bē</span>
      ),
      color: 'hover:text-indigo-400 hover:border-indigo-500/50'
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: ({ className }: { className?: string }) => (
        <span className={`font-bold font-mono text-sm leading-none ${className}`}>GH</span>
      ),
      color: 'hover:text-emerald-400 hover:border-emerald-500/50'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-slate-800/20 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>{t('Contact Me', 'যোগাযোগের মাধ্যম')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('Get In Touch With Golam Rabbani', 'কথা বলুন আমার সাথে')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t(
              'Fill out the form below or reach out directly on social platforms.',
              'নিচের ফর্মে আপনার নাম, ইমেইল ও মেসেজ লিখে পাঠাতে পারেন।'
            )}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Side: Contact Info & Social Icons */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                {t('Direct Contact & Socials', 'যোগাযোগের ঠিকানা ও সোশ্যাল প্রোফাইল')}
              </h3>

              <div className="space-y-3">
                <a
                  href="mailto:golamrabbani91011@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('Email Address', 'ইমেইল অ্যাড্রেস')}</span>
                    <span className="text-xs font-bold text-white">golamrabbani91011@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <MapPin className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('Location', 'লোকেশন')}</span>
                    <span className="text-xs font-bold text-white">Bangladesh (Remote)</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 space-y-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 block">
                  {t('Social Profiles:', 'সোশ্যাল মিডিয়া প্রোফাইল:')}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold ${item.color}`}
                        title={item.name}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl relative">
            
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {t('Send a Message', 'একটি মেসেজ পাঠান')}
              </h3>
            </div>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {t('Thank You! Message Sent.', 'ধন্যবাদ! আপনার মেসেজটি পাঠানো হয়েছে।')}
                </h4>
                <p className="text-xs text-slate-300">
                  {t(
                    'Golam Rabbani will get back to you soon.',
                    'গোলাম রব্বানী দ্রুতই আপনার মেসেজের উত্তর দেবেন।'
                  )}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                >
                  {t('Send Another Message', 'আরেকটি মেসেজ পাঠান')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t('Name *', 'আপনার নাম *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul / Tanvir"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t('Email *', 'আপনার ইমেইল *')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t('Message *', 'আপনার মেসেজ *')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('Write your message or project details here...', 'আপনার মেসেজ বা প্রজেক্ট সংক্রান্ত বিষয় লিখুন...')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('Send Button', 'মেসেজ পাঠান')}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
