'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Palette, Maximize2, X, ChevronLeft, ChevronRight, Upload, Plus, Trash2, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export interface DesignItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'posters' | 'social' | 'thumbnails' | 'banners' | 'logos';
  categoryLabelEn: string;
  categoryLabelBn: string;
  image: string;
  descriptionEn: string;
  descriptionBn: string;
  isCustom?: boolean;
  width?: number;
  height?: number;
  dimensionLabel?: string;
}

const DESIGN_PORTFOLIO_ITEMS: DesignItem[] = [
  {
    id: 'design-1',
    title: 'E-commerce Brand Product Poster',
    titleBn: 'ই-কমার্স ব্র্যান্ড প্রমোশনাল পোস্টার',
    category: 'posters',
    categoryLabelEn: 'Posters',
    categoryLabelBn: 'পোস্টার',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    descriptionEn: 'High contrast promotional product poster designed in Photoshop with custom lighting.',
    descriptionBn: 'আকর্ষণীয় লাইটিং ও ফটো ম্যানিপুলেশন সহ ই-কমার্স পোস্টার ডিজাইন।'
  },
  {
    id: 'design-2',
    title: 'Instagram & Facebook Promo Post',
    titleBn: 'ইনস্টাগ্রাম ও ফেসবুক প্রমোশনাল পোস্ট',
    category: 'social',
    categoryLabelEn: 'Social Media Posts',
    categoryLabelBn: 'সোশ্যাল মিডিয়া পোস্ট',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    descriptionEn: 'Engaging social media post banner designed to boost campaign engagement and CTR.',
    descriptionBn: 'সোশ্যাল মিডিয়ায় বেশি কাস্টমার এনগেজমেন্ট পাওয়ার জন্য সোশ্যাল ব্যানার।'
  },
  {
    id: 'design-3',
    title: 'High-CTR YouTube Gaming/Tech Thumbnail',
    titleBn: 'হাই-CTR টেক ও গেমিং ইউটিউব থাম্বনেইল',
    category: 'thumbnails',
    categoryLabelEn: 'Thumbnails',
    categoryLabelBn: 'থাম্বনেইল',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    descriptionEn: 'High-contrast, bold typography YouTube thumbnail designed in Photoshop.',
    descriptionBn: 'ইউটিউব ভিডিওতে বেশি ক্লিক পাওয়ার জন্য হাই-কন্ট্রাস্ট থাম্বনেইল।'
  },
  {
    id: 'design-4',
    title: 'YouTube Channel Header Banner',
    titleBn: 'ইউটিউব চ্যানেল আর্ট ও হেডার ব্যানার',
    category: 'banners',
    categoryLabelEn: 'Banners',
    categoryLabelBn: 'ব্যানার',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    descriptionEn: 'Clean, modern YouTube channel banner layout created in Adobe Illustrator.',
    descriptionBn: 'প্রফেশনাল লুকিং ইউটিউব চ্যানেল কভার আর্টওয়ার্ক ডিজাইন।'
  },
  {
    id: 'design-5',
    title: 'Minimalist Modern Tech Brand Logo',
    titleBn: 'মিনিমালিস্ট ব্র্যান্ড লোগো ডিজাইন',
    category: 'logos',
    categoryLabelEn: 'Logos',
    categoryLabelBn: 'লোগো',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    descriptionEn: 'Vector brand logo mark and typography design created in Illustrator.',
    descriptionBn: 'ভেক্টর গ্রাফিক্স ও নিখুঁত টাইপোগ্রাফি সহ ব্র্যান্ড লোগো ডিজাইন।'
  },
  {
    id: 'design-6',
    title: 'E-commerce Discount Offer Banner',
    titleBn: 'ডিজিটাল ডিসকাউন্ট ও অফার পোস্টার',
    category: 'posters',
    categoryLabelEn: 'Posters',
    categoryLabelBn: 'পোস্টার',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    descriptionEn: 'Bold promotional poster layout tailored for Meta Ad campaigns.',
    descriptionBn: 'সেলস ও প্রমোশনের জন্য স্পেশাল এডভারটাইজিং অফার পোস্টার।'
  }
];

const CATEGORY_MAP = {
  posters: { en: 'Posters', bn: 'পোস্টার' },
  social: { en: 'Social Media Posts', bn: 'সোশ্যাল মিডিয়া পোস্ট' },
  thumbnails: { en: 'Thumbnails', bn: 'থাম্বনেইল' },
  banners: { en: 'Banners', bn: 'ব্যানার' },
  logos: { en: 'Logos', bn: 'লোগো' }
};

// Helper function outside component
function createUniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export default function PortfolioGallery() {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<DesignItem[]>(DESIGN_PORTFOLIO_ITEMS);
  const [activeTab, setActiveTab] = useState<'all' | 'posters' | 'social' | 'thumbnails' | 'banners' | 'logos'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Upload Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'posters' | 'social' | 'thumbnails' | 'banners' | 'logos'>('posters');
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_graphic_design_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const timer = setTimeout(() => {
            setItems(parsed);
          }, 0);
          return () => clearTimeout(timer);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const saveItems = (updated: DesignItem[]) => {
    setItems(updated);
    localStorage.setItem('user_graphic_design_items', JSON.stringify(updated));
  };

  // Additional dimension state for uploaded graphic artwork
  const [imgWidth, setImgWidth] = useState<number | undefined>(undefined);
  const [imgHeight, setImgHeight] = useState<number | undefined>(undefined);
  const [imgDimensionLabel, setImgDimensionLabel] = useState<string | undefined>(undefined);

  const calculateImageLabel = (w: number, h: number) => {
    const ratio = w / h;
    let type = 'Custom Format';
    if (Math.abs(ratio - 1) < 0.05) type = '1:1 Square Post';
    else if (Math.abs(ratio - 0.8) < 0.05) type = '4:5 Portrait Post';
    else if (Math.abs(ratio - 9/16) < 0.05) type = '9:16 Story/Reel';
    else if (Math.abs(ratio - 16/9) < 0.05) type = '16:9 Landscape Banner';
    else if (Math.abs(ratio - 1.91) < 0.05) type = '1.91:1 Landscape Ad';
    return `${w}×${h} px (${type})`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert(t('Image file size exceeds 50MB limit!', 'ছবির সাইজ ৫০ মেগাবাইটের চেয়ে বড় হতে পারবে না!'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadPreview(result);
        setNewImage(result);

        // Detect dimensions
        const img = new Image();
        img.src = result;
        img.onload = () => {
          setImgWidth(img.naturalWidth);
          setImgHeight(img.naturalHeight);
          setImgDimensionLabel(calculateImageLabel(img.naturalWidth, img.naturalHeight));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImage.trim()) return;

    const catObj = CATEGORY_MAP[newCategory];

    const customId = createUniqueId('custom-design');
    const newItem: DesignItem = {
      id: customId,
      title: newTitle.trim(),
      titleBn: newTitle.trim(),
      category: newCategory,
      categoryLabelEn: catObj.en,
      categoryLabelBn: catObj.bn,
      image: newImage.trim(),
      descriptionEn: newDescription.trim() || 'Custom Graphic Design Artwork',
      descriptionBn: newDescription.trim() || 'কাস্টম গ্রাফিক ডিজাইন কাজ',
      isCustom: true,
      width: imgWidth,
      height: imgHeight,
      dimensionLabel: imgDimensionLabel || 'High Resolution Artwork'
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    setNewTitle('');
    setNewImage('');
    setNewDescription('');
    setUploadPreview(null);
    setImgWidth(undefined);
    setImgHeight(undefined);
    setImgDimensionLabel(undefined);
    setUploadSuccessMsg(true);

    setTimeout(() => {
      setUploadSuccessMsg(false);
      setIsModalOpen(false);
    }, 1200);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t('Are you sure you want to delete this design?', 'আপনি কি এই ডিজাইনটি মুছে ফেলতে চান?'))) {
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-slate-800/20 blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-white">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('Graphic Design Portfolio', 'গ্রাফিক ডিজাইন পোর্টফোলিও')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('Explore Visual & Graphic Artwork', 'আমার তৈরি গ্রাফিক ডিজাইন গ্যালারি')}
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              {t(
                'Browse posters, social media posts, thumbnails, banners, and logos. Click any image to view in full screen lightbox or upload your own work below.',
                'পোস্টার, সোশ্যাল পোস্ট, থাম্বনেইল, ব্যানার ও লোগো গ্রিডে দেখুন এবং আপনার নতুন ডিজাইন কাজ আপলোড করুন।'
              )}
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            id="upload-graphic-design-btn"
            className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <Upload className="w-4 h-4 text-slate-950" />
            <span>{t('Upload Graphic Work', 'নতুন ডিজাইন আপলোড করুন')}</span>
          </button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('All Designs', 'সব ডিজাইন')} ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('posters')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'posters'
                ? 'bg-white text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Posters', 'পোস্টার')}
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'social'
                ? 'bg-white text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Social Media Posts', 'সোশ্যাল মিডিয়া পোস্ট')}
          </button>
          <button
            onClick={() => setActiveTab('thumbnails')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'thumbnails'
                ? 'bg-white text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Thumbnails', 'থাম্বনেইল')}
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'banners'
                ? 'bg-white text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Banners', 'ব্যানার')}
          </button>
          <button
            onClick={() => setActiveTab('logos')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'logos'
                ? 'bg-white text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Logos', 'লোগো')}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-4px] shadow-xl flex flex-col relative"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={t(item.title, item.titleBn)}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 pointer-events-none"></div>

                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    <span>{t('Open Lightbox', 'ফুল স্ক্রিনে দেখুন')}</span>
                  </span>
                </div>

                {/* Category tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-white border border-slate-800 uppercase tracking-wider">
                  {t(item.categoryLabelEn, item.categoryLabelBn)}
                </div>

                {/* Dimension label if available */}
                {item.dimensionLabel && (
                  <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[9px] font-mono text-cyan-400 border border-slate-800">
                    {item.dimensionLabel}
                  </div>
                )}

                {/* Custom badge & delete option */}
                {item.isCustom && (
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-rose-500/80 text-white hover:bg-rose-600 transition-colors z-20"
                    title={t('Delete item', 'ডিজাইন মুছে ফেলুন')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors">
                    {t(item.title, item.titleBn)}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {t(item.descriptionEn, item.descriptionBn)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors z-50"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous image */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:bg-slate-800 transition-all z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next image */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:bg-slate-800 transition-all z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[65vh] rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filteredItems[lightboxIndex].image}
                alt={t(filteredItems[lightboxIndex].title, filteredItems[lightboxIndex].titleBn)}
                className="max-h-[65vh] max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-center space-y-1.5 max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {t(filteredItems[lightboxIndex].categoryLabelEn, filteredItems[lightboxIndex].categoryLabelBn)}
              </span>
              <h3 className="text-lg font-bold text-white">
                {t(filteredItems[lightboxIndex].title, filteredItems[lightboxIndex].titleBn)}
              </h3>
              <p className="text-xs text-slate-300">
                {t(filteredItems[lightboxIndex].descriptionEn, filteredItems[lightboxIndex].descriptionBn)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Graphic Work Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-white" />
                <h3 className="text-lg font-bold text-white">
                  {t('Upload Graphic Design Work', 'নতুন গ্রাফিক কাজ আপলোড করুন')}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadSuccessMsg ? (
              <div className="p-8 text-center space-y-3 bg-slate-950 border border-slate-800 rounded-2xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-white">
                  {t('Design Uploaded Successfully!', 'ডিজাইন সফলভাবে আপলোড হয়েছে!')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddItem} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {t('Design Title', 'ডিজাইনের টাইটেল / নাম')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('e.g. Food Festival Poster', 'যেমন: ফুড ফেস্টিভাল পোস্টার')}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {t('Category', 'ক্যাটাগরি')}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-slate-600"
                  >
                    <option value="posters">{t('Posters', 'পোস্টার')}</option>
                    <option value="social">{t('Social Media Posts', 'সোশ্যাল মিডিয়া পোস্ট')}</option>
                    <option value="thumbnails">{t('Thumbnails', 'থাম্বনেইল')}</option>
                    <option value="banners">{t('Banners', 'ব্যানার')}</option>
                    <option value="logos">{t('Logos', 'লোগো')}</option>
                  </select>
                </div>

                {/* Image Upload / File Pick or URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    {t('Design Image', 'ডিজাইনের ছবি')} *
                  </label>

                  {/* File Upload Box */}
                  <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950 text-center space-y-2">
                    {uploadPreview ? (
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={uploadPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setUploadPreview(null);
                            setNewImage('');
                          }}
                          className="absolute top-2 right-2 p-1 rounded-md bg-slate-950/80 text-white hover:bg-slate-900"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-slate-500 mx-auto" />
                        <p className="text-xs text-slate-400">
                          {t('Choose Image File from your computer', 'কম্পিউটার বা ফোন থেকে ছবি সিলেক্ট করুন')}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
                        />
                      </>
                    )}
                  </div>

                  {/* Or Image URL */}
                  {!uploadPreview && (
                    <div className="pt-1">
                      <span className="text-[10px] text-slate-500 block mb-1">
                        {t('Or paste Image URL:', 'অথবা ছবির ডিরেক্ট লিংক (URL) দিন:')}
                      </span>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {t('Description (Optional)', 'বিবরণ (ঐচ্ছিক)')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('Short details about tools used or style...', 'ডিজাইন বা টুলস সম্পর্কে সংক্ষিপ্ত তথ্য...')}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('Save & Add to Gallery', 'গ্যালারিতে যুক্ত করুন')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
