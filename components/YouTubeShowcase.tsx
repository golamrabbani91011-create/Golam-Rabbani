'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Youtube, Play, Plus, Trash2, ExternalLink, Sparkles, Check, Image as ImageIcon, Link as LinkIcon, Video, Film, Upload, X, AlertCircle, RefreshCw } from 'lucide-react';

export interface YouTubeItem {
  id: string;
  youtubeId?: string;
  videoUrl?: string; // Blob URL, Data URL or Direct MP4 link
  thumbnailUrl?: string;
  isLocalFile?: boolean;
  title: string;
  titleBn: string;
  category: 'premiere_pro' | 'after_effects' | 'vlog' | 'tutorial' | 'shorts';
  views?: string;
  duration?: string;
  width?: number;
  height?: number;
  aspectRatioLabel?: string;
  fitMode?: 'contain' | 'cover';
}

// IndexedDB storage for local video files so uploaded files persist across page reloads
const DB_NAME = 'VideoPortfolioDB';
const STORE_NAME = 'video_blobs';

function openVideoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject('IndexedDB not supported');
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveVideoBlob(id: string, fileOrBlob: Blob): Promise<void> {
  try {
    const db = await openVideoDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(fileOrBlob, id);
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (err) {
    console.error('Failed to save video blob to IndexedDB', err);
  }
}

async function getVideoBlob(id: string): Promise<Blob | null> {
  try {
    const db = await openVideoDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(id);
    return new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function deleteVideoBlob(id: string): Promise<void> {
  try {
    const db = await openVideoDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
  } catch {
    // ignore
  }
}

const INITIAL_YOUTUBE_VIDEOS: YouTubeItem[] = [
  {
    id: 'yt-1',
    youtubeId: 'dQw4w9WgXcQ', // Standard embed demo
    title: 'Shorts Video Editing Tricks & Sound FX Walkthrough',
    titleBn: 'শর্টস ভিডিও এডিটিং ট্রিকস ও সাউন্ড এফেক্টস টিউটোরিয়াল',
    category: 'premiere_pro',
    views: '24K views',
    duration: '00:58',
    aspectRatioLabel: '9:16 Vertical'
  },
  {
    id: 'yt-ae-1',
    youtubeId: 'L_LUpnjgPso',
    title: 'After Effects 3D Logo Motion & Particle Intro',
    titleBn: 'আফটার ইফেক্টস থ্রিডি লোগো মোশন ও পার্টিকেল ইন্ট্রো',
    category: 'after_effects',
    views: '38K views',
    duration: '01:45',
    aspectRatioLabel: '16:9 Landscape'
  },
  {
    id: 'yt-ae-2',
    youtubeId: '3JZ_D3ELwOQ',
    title: 'Kinetic Typography & Visual Effects (AE Composition)',
    titleBn: 'কাইনেটিক টাইপোগ্রাফি এবং ভিজ্যুয়াল ইফেক্টস (আফটার ইফেক্টস)',
    category: 'after_effects',
    views: '29K views',
    duration: '01:10',
    aspectRatioLabel: '9:16 Vertical Shorts'
  },
  {
    id: 'yt-2',
    youtubeId: 'L_LUpnjgPso', // Example promo video
    title: 'Top 5 Meta Ads Strategies for E-commerce in 2026',
    titleBn: 'ই-কমার্সের জন্য মেটা এডসের সেরা ৫টি সিক্রেট স্ট্র্যাটেজি',
    category: 'tutorial',
    views: '45K views',
    duration: '12:40',
    aspectRatioLabel: '16:9 Landscape'
  },
  {
    id: 'yt-3',
    youtubeId: '3JZ_D3ELwOQ', // Example design breakdown
    title: 'Graphic Design Masterclass: High CTR Thumbnails in Photoshop',
    titleBn: 'ফটোপশপে হাই CTR ইউটিউব থাম্বনেইল তৈরির সহজ নিয়ম',
    category: 'vlog',
    views: '18K views',
    duration: '15:20',
    aspectRatioLabel: '16:9 Landscape'
  }
];

// Helper function outside component
function createUniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export default function YouTubeShowcase() {
  const { lang, t } = useLanguage();
  const [videos, setVideos] = useState<YouTubeItem[]>(INITIAL_YOUTUBE_VIDEOS);

  useEffect(() => {
    const savedVideos = localStorage.getItem('user_youtube_videos');
    if (savedVideos) {
      try {
        let parsed: YouTubeItem[] = JSON.parse(savedVideos);
        // Correct legacy categories without clobbering user-chosen categories
        parsed = parsed.map((v: any) => ({
          ...v,
          category: v.category === 'shorts' ? 'premiere_pro' : (v.category || 'premiere_pro')
        }));

        async function restoreVideoBlobs() {
          const restored = await Promise.all(
            parsed.map(async (v) => {
              if (v.isLocalFile && v.id) {
                const blob = await getVideoBlob(v.id);
                if (blob) {
                  return {
                    ...v,
                    videoUrl: URL.createObjectURL(blob)
                  };
                }
              }
              return v;
            })
          );
          setVideos(restored);
        }

        restoreVideoBlobs();
      } catch {
        // ignore
      }
    }
  }, []);

  const [activeTab, setActiveTab] = useState<'all' | 'premiere_pro' | 'after_effects' | 'vlog' | 'tutorial'>('all');
  const [activePlayingVideo, setActivePlayingVideo] = useState<YouTubeItem | null>(null);

  // Add video modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [inputUrl, setInputUrl] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState<'premiere_pro' | 'after_effects' | 'vlog' | 'tutorial'>('premiere_pro');
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');

  // Video File state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [autoThumbnail, setAutoThumbnail] = useState<string | null>(null);
  const [detectedWidth, setDetectedWidth] = useState<number | undefined>(undefined);
  const [detectedHeight, setDetectedHeight] = useState<number | undefined>(undefined);
  const [detectedRatioLabel, setDetectedRatioLabel] = useState<string>('16:9');
  const [detectedDuration, setDetectedDuration] = useState<string>('00:00');
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Custom avatar state
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>('/images/avatar.jpg');
  useEffect(() => {
    const savedAvatar = localStorage.getItem('user_custom_avatar');
    if (savedAvatar) {
      const timer = setTimeout(() => {
        setCustomAvatarUrl(savedAvatar);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlayVideo = async (item: YouTubeItem) => {
    if (item.isLocalFile) {
      const blob = await getVideoBlob(item.id);
      if (blob) {
        const restoredUrl = URL.createObjectURL(blob);
        const updatedItem = { ...item, videoUrl: restoredUrl };
        setVideos((prev) => prev.map((v) => (v.id === item.id ? updatedItem : v)));
        setActivePlayingVideo(updatedItem);
        return;
      }
    }
    setActivePlayingVideo(item);
  };

  const calculateRatioLabel = (w: number, h: number) => {
    const ratio = w / h;
    if (Math.abs(ratio - 16 / 9) < 0.08) return '16:9 Landscape';
    if (Math.abs(ratio - 9 / 16) < 0.08) return '9:16 Vertical Shorts';
    if (Math.abs(ratio - 1) < 0.08) return '1:1 Square';
    if (Math.abs(ratio - 4 / 5) < 0.08) return '4:5 Portrait';
    if (Math.abs(ratio - 3 / 4) < 0.08) return '3:4 Portrait';
    if (Math.abs(ratio - 4 / 3) < 0.08) return '4:3 Standard';
    if (Math.abs(ratio - 21 / 9) < 0.08) return '21:9 Ultrawide';
    return `${w}×${h} Custom Ratio`;
  };

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Validate size (max 250MB)
    const MAX_SIZE_MB = 250;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadError(t(`File size exceeds ${MAX_SIZE_MB}MB limit!`, `ভিডিও ফাইলের সাইজ ${MAX_SIZE_MB}MB এর চেয়ে বড় হতে পারবে না!`));
      return;
    }

    // Validate format (MP4, MOV, WebM, MKV or any video/*)
    const isValidVideo = file.type.startsWith('video/') || /\.(mp4|mov|webm|mkv)$/i.test(file.name);
    if (!isValidVideo) {
      setUploadError(t('Please select a valid video file (MP4, MOV, WebM, MKV)', 'অনুগ্রহ করে সঠিক ভিডিও ফাইল নির্বাচন করুন (MP4, MOV, WebM, MKV)'));
      return;
    }

    setVideoFile(file);
    setIsProcessingVideo(true);

    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(objectUrl);

    // Load in offscreen video element to detect dimensions & extract thumbnail
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = objectUrl;
    tempVideo.muted = true;
    tempVideo.playsInline = true;

    tempVideo.onloadedmetadata = () => {
      const w = tempVideo.videoWidth;
      const h = tempVideo.videoHeight;
      const durSec = Math.floor(tempVideo.duration || 0);
      const mins = Math.floor(durSec / 60);
      const secs = durSec % 60;
      const formattedDuration = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      setDetectedWidth(w);
      setDetectedHeight(h);
      setDetectedDuration(formattedDuration);
      setDetectedRatioLabel(calculateRatioLabel(w, h));

      if (!inputTitle) {
        // Auto set title from file name
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setInputTitle(cleanName);
      }

      // Seek to capture thumbnail snapshot
      tempVideo.currentTime = Math.min(1, Math.max(0.5, (tempVideo.duration || 2) / 2));
    };

    tempVideo.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = tempVideo.videoWidth || 640;
        canvas.height = tempVideo.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          const thumb = canvas.toDataURL('image/jpeg', 0.85);
          setAutoThumbnail(thumb);
        }
      } catch (err) {
        console.error('Failed to generate thumbnail', err);
      } finally {
        setIsProcessingVideo(false);
      }
    };

    tempVideo.onerror = () => {
      setIsProcessingVideo(false);
      setUploadError(t('Could not process video file format.', 'ভিডিও ফাইলটি প্রসেস করা সম্ভব হয়নি।'));
    };
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadType === 'file') {
      if (!videoFile || !videoPreviewUrl) {
        alert(t('Please select a video file first!', 'অনুগ্রহ করে প্রথমে একটি ভিডিও ফাইল সিলেক্ট করুন!'));
        return;
      }

      const uniqueId = createUniqueId('yt-user');
      const newVideo: YouTubeItem = {
        id: uniqueId,
        videoUrl: videoPreviewUrl,
        thumbnailUrl: autoThumbnail || undefined,
        isLocalFile: true,
        title: inputTitle || videoFile.name,
        titleBn: inputTitle || videoFile.name,
        category: inputCategory,
        views: 'Uploaded Video',
        duration: detectedDuration || '00:00',
        width: detectedWidth,
        height: detectedHeight,
        aspectRatioLabel: detectedRatioLabel,
        fitMode: fitMode
      };

      // Store file in IndexedDB so video persists across page reloads
      await saveVideoBlob(uniqueId, videoFile);

      const updated = [newVideo, ...videos];
      setVideos(updated);
      
      // Save metadata without huge blob url to avoid localStorage quota crash
      const storableVideos = updated.map((v) => {
        if (v.isLocalFile) {
          return {
            ...v,
            videoUrl: v.videoUrl?.startsWith('blob:') ? '' : v.videoUrl // keep thumbnail & metadata
          };
        }
        return v;
      });
      try {
        localStorage.setItem('user_youtube_videos', JSON.stringify(storableVideos));
      } catch {
        // ignore localStorage errors
      }

      // Reset
      resetUploadForm();
      setIsAddModalOpen(false);
      return;
    }

    // Otherwise Link mode (YouTube or MP4 link)
    const ytId = extractYouTubeId(inputUrl);
    if (!ytId && !inputUrl.startsWith('http')) {
      alert(t('Please enter a valid YouTube Video URL or Video Link!', 'অনুগ্রহ করে সঠিক ইউটিউব ভিডিও বা ডাইরেক্ট ভিডিও লিংক দিন!'));
      return;
    }

    const linkId = createUniqueId('yt-user');
    const newVideo: YouTubeItem = {
      id: linkId,
      youtubeId: ytId || undefined,
      videoUrl: !ytId ? inputUrl : undefined,
      title: inputTitle || 'My Video Showcase',
      titleBn: inputTitle || 'আমার ভিডিও শোকেস',
      category: inputCategory,
      views: 'Featured Link',
      duration: '03:45',
      fitMode: fitMode,
      aspectRatioLabel: ytId ? '16:9 Landscape' : 'Custom Ratio'
    };

    const updated = [newVideo, ...videos];
    setVideos(updated);
    try {
      localStorage.setItem('user_youtube_videos', JSON.stringify(updated));
    } catch {
      // ignore
    }

    resetUploadForm();
    setIsAddModalOpen(false);
  };

  const resetUploadForm = () => {
    setInputUrl('');
    setInputTitle('');
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setAutoThumbnail(null);
    setDetectedWidth(undefined);
    setDetectedHeight(undefined);
    setUploadError(null);
    setIsProcessingVideo(false);
  };

  const handleDeleteVideo = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteVideoBlob(id);
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    try {
      localStorage.setItem('user_youtube_videos', JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (activePlayingVideo?.id === id) {
      setActivePlayingVideo(null);
    }
  };

  const toggleFitMode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = videos.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          fitMode: v.fitMode === 'cover' ? ('contain' as const) : ('cover' as const)
        };
      }
      return v;
    });
    setVideos(updated);
    if (activePlayingVideo?.id === id) {
      setActivePlayingVideo((prev) => (prev ? { ...prev, fitMode: prev.fitMode === 'cover' ? 'contain' : 'cover' } : null));
    }
  };

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setTempAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempAvatarUrl) return;
    setCustomAvatarUrl(tempAvatarUrl);
    try {
      localStorage.setItem('user_custom_avatar', tempAvatarUrl);
      window.dispatchEvent(new Event('avatar_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore
    }
    setIsAvatarModalOpen(false);
  };

  const handleResetAvatar = () => {
    setCustomAvatarUrl('/images/avatar.jpg');
    setTempAvatarUrl('/images/avatar.jpg');
    try {
      localStorage.removeItem('user_custom_avatar');
      window.dispatchEvent(new Event('avatar_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore
    }
    setIsAvatarModalOpen(false);
  };

  const filteredVideos = videos.filter((v) => {
    if (activeTab === 'all') return true;
    return v.category === activeTab;
  });

  return (
    <section id="youtube" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800/80 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-xs font-semibold text-red-400">
              <Film className="w-4 h-4 text-red-500" />
              <span>{t('Video Portfolio & Media Showcase', 'ভিডিও পোর্টফোলিও ও মিডিয়া শোরুম')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('My Video Showcases & Edits', 'আমার সম্পাদনা করা ভিডিওসমূহ')}
            </h2>
            <p className="text-sm text-slate-400">
              {t(
                'Upload your videos directly in any aspect ratio (16:9, 9:16 Shorts, 1:1, 4:5) or embed YouTube links. Supports MP4, MOV, WebM, and MKV formats.',
                'কম্পিউটার বা মোবাইল থেকে যেকোনো সাইজ (১৬:৯, ৯:১৬ শর্টস, ১:১, ৪:৫) এর ভিডিও সরাসরি আপলোড করুন অথবা ইউটিউব লিংক যোগ করুন।'
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.youtube.com/@GolamRabbani-t2t"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800/60 hover:bg-red-900/50 text-red-300 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>{t('YouTube Channel', 'ইউটিউব চ্যানেল')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            </a>

            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>{t('Change Profile Photo', 'প্রোফাইল ছবি পরিবর্তন করুন')}</span>
            </button>

            <button
              onClick={() => {
                resetUploadForm();
                setIsAddModalOpen(true);
              }}
              id="upload-video-btn"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>{t('+ Upload Video / Link', '+ ভিডিও আপলোড বা লিংক')}</span>
            </button>
          </div>
        </div>

        {/* Video Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('All Videos', 'সব ভিডিও')} ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('premiere_pro')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'premiere_pro'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Premiere Pro', 'প্রিমিয়ার প্রো')}
          </button>
          <button
            onClick={() => setActiveTab('after_effects')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'after_effects'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('After Effects', 'আফটার ইফেক্টস')}
          </button>
          <button
            onClick={() => setActiveTab('vlog')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'vlog'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Vlogs & Showcases', 'ব্লগ ও শো-কেস')}
          </button>
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tutorial'
                ? 'bg-red-600 text-white shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t('Tutorials & Ads', 'টিউটোরিয়াল ও এডস')}
          </button>
        </div>

        {/* Video Player Modal / Active Player Container */}
        {activePlayingVideo && (
          <div className="mb-12 rounded-2xl bg-slate-900 border border-red-500/40 p-4 sm:p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {t(activePlayingVideo.title, activePlayingVideo.titleBn)}
                </h3>
                {activePlayingVideo.aspectRatioLabel && (
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300">
                    {activePlayingVideo.aspectRatioLabel}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleFitMode(activePlayingVideo.id, e)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                  title="Toggle Fit Mode (Contain / Cover)"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{activePlayingVideo.fitMode === 'cover' ? 'Fit: Cover' : 'Fit: Contain'}</span>
                </button>
                <button
                  onClick={() => setActivePlayingVideo(null)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                >
                  {t('Close Player', 'প্লেয়ার বন্ধ করুন')}
                </button>
              </div>
            </div>

            {/* Responsive Container Preserving Original Aspect Ratio */}
            {(() => {
              const isVertical =
                activePlayingVideo.aspectRatioLabel?.includes('9:16') ||
                activePlayingVideo.aspectRatioLabel?.includes('Vertical') ||
                (activePlayingVideo.width && activePlayingVideo.height && activePlayingVideo.height > activePlayingVideo.width);

              return (
                <div
                  className={`relative w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner flex items-center justify-center ${
                    isVertical
                      ? 'max-w-[380px] h-[72vh] mx-auto aspect-[9/16]'
                      : 'w-full max-h-[70vh] min-h-[280px] aspect-video'
                  }`}
                >
                  {activePlayingVideo.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activePlayingVideo.youtubeId}?autoplay=1`}
                      title={t(activePlayingVideo.title, activePlayingVideo.titleBn)}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : activePlayingVideo.videoUrl ? (
                    <video
                      src={activePlayingVideo.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className={`w-full h-full rounded-lg ${
                        activePlayingVideo.fitMode === 'cover' ? 'object-cover' : 'object-contain'
                      }`}
                      onError={async () => {
                        console.warn('Video failed to render or codec unsupported');
                        if (activePlayingVideo.isLocalFile) {
                          const blob = await getVideoBlob(activePlayingVideo.id);
                          if (blob) {
                            const freshUrl = URL.createObjectURL(blob);
                            setVideos((prev) =>
                              prev.map((v) => (v.id === activePlayingVideo.id ? { ...v, videoUrl: freshUrl } : v))
                            );
                            setActivePlayingVideo((prev) => (prev ? { ...prev, videoUrl: freshUrl } : null));
                            return;
                          }
                        }
                        setActivePlayingVideo((prev) => (prev ? { ...prev, videoUrl: '' } : null));
                      }}
                    />
                  ) : (
                    <div className="p-8 text-center text-slate-300 space-y-4 max-w-md mx-auto">
                      <Video className="w-10 h-10 text-red-500 mx-auto opacity-80" />
                      <p className="text-xs text-slate-300 font-medium">
                        {t(
                          'Local video file needs to be selected to play on this device/session.',
                          'ভিডিওটি প্লে করার জন্য আপনার ডিভাইস থেকে ফাইলটি সিলেক্ট করুন।'
                        )}
                      </p>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-lg transition-all active:scale-95">
                        <Upload className="w-4 h-4" />
                        <span>{t('Select Video File to Play', 'ভিডিও ফাইল সিলেক্ট করে প্লে করুন')}</span>
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm,video/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file && activePlayingVideo) {
                              const newUrl = URL.createObjectURL(file);
                              await saveVideoBlob(activePlayingVideo.id, file);
                              const updated = videos.map((v) =>
                                v.id === activePlayingVideo.id ? { ...v, videoUrl: newUrl } : v
                              );
                              setVideos(updated);
                              setActivePlayingVideo({ ...activePlayingVideo, videoUrl: newUrl });
                            }
                          }}
                        />
                      </label>
                      {activePlayingVideo.category === 'after_effects' && (
                        <p className="text-[11px] text-purple-400 bg-purple-950/60 p-2.5 rounded-lg border border-purple-500/30">
                          💡 {t('For After Effects exports, MP4 (H.264) provides best video & audio playback in all web browsers.', 'আফটার ইফেক্টস টিপস: ব্রাউজারে সহজে প্লে করার জন্য ভিডিও H.264 MP4 ফরম্যাটে সেভ করুন।')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Video Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((item) => {
            const fitClass = item.fitMode === 'cover' ? 'object-cover' : 'object-contain';
            return (
              <div
                key={item.id}
                onClick={() => handlePlayVideo(item)}
                className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-4px] shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Video Box - Responsive container preserving aspect ratio without cropping */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center p-1">
                    {item.youtubeId ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={t(item.title, item.titleBn)}
                        className={`w-full h-full ${fitClass} group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100`}
                        referrerPolicy="no-referrer"
                      />
                    ) : item.thumbnailUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.thumbnailUrl}
                        alt={t(item.title, item.titleBn)}
                        className={`w-full h-full ${fitClass} group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100`}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                        <Video className="w-10 h-10 text-slate-600" />
                      </div>
                    )}

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>

                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    {item.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-white font-semibold">
                        {item.duration}
                      </div>
                    )}

                    {/* Aspect Ratio Badge */}
                    {item.aspectRatioLabel && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[9px] font-semibold text-slate-300 border border-slate-700">
                        {item.aspectRatioLabel}
                      </div>
                    )}

                    {/* Category Pill */}
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-red-400 border border-red-500/30 uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {t(item.title, item.titleBn)}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>{item.views}</span>
                      <span className="text-[11px] text-cyan-400 flex items-center gap-1">
                        <span>{t('Click to Play', 'প্লে করতে ক্লিক করুন')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Control Action Footer */}
                <div className="px-5 pb-4 pt-1 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={(e) => toggleFitMode(item.id, e)}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                    title="Toggle fit mode"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{item.fitMode === 'cover' ? 'Fit: Cover' : 'Fit: Contain'}</span>
                  </button>

                  {item.id.startsWith('yt-user-') && (
                    <button
                      onClick={(e) => handleDeleteVideo(item.id, e)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('Remove', 'মুছে ফেলুন')}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Upload / Add Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                <span>{t('Upload Video / Embed Link', 'ভিডিও আপলোড বা লিংক যুক্ত করুন')}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Mode: File Upload vs URL Link */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  uploadType === 'file' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>{t('Upload File (MP4/MOV)', 'ভিডিও ফাইল আপলোড')}</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadType('link')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  uploadType === 'link' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                <span>{t('YouTube / Video Link', 'ইউটিউব বা ভিডিও লিংক')}</span>
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-4">
              {uploadType === 'file' ? (
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t('Select Video File (MP4, MOV, WebM, MKV - Any Ratio)', 'ভিডিও ফাইল সিলেক্ট করুন (যেকোনো সাইজ/অনুপাত)')}
                  </label>

                  {/* Drag and Drop / File Input Box */}
                  <div className="p-6 rounded-xl border-2 border-dashed border-slate-700 hover:border-red-500 bg-slate-950 text-center space-y-3 transition-colors">
                    {videoFile && videoPreviewUrl ? (
                      <div className="space-y-3">
                        <div className="relative max-h-48 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center mx-auto">
                          {autoThumbnail ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={autoThumbnail} alt="Thumbnail" className="max-h-48 object-contain" />
                          ) : (
                            <video src={videoPreviewUrl} className="max-h-48 object-contain" />
                          )}
                        </div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <p className="font-bold text-white truncate max-w-xs mx-auto">{videoFile.name}</p>
                          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
                            <span>{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                            {detectedWidth && detectedHeight && (
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                                {detectedWidth}×{detectedHeight} ({detectedRatioLabel})
                              </span>
                            )}
                            {detectedDuration && <span>Duration: {detectedDuration}</span>}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoPreviewUrl(null);
                            setAutoThumbnail(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-rose-400 font-semibold"
                        >
                          {t('Change Video File', 'অন্য ফাইল সিলেক্ট করুন')}
                        </button>
                      </div>
                    ) : (
                      <>
                        <Video className="w-10 h-10 text-slate-500 mx-auto" />
                        <p className="text-xs text-slate-300 font-semibold">
                          {t('Click or drag video file here to upload', 'কম্পিউটার বা মোবাইল থেকে ভিডিও সিলেক্ট করুন')}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {t('Supports 16:9, 9:16 Shorts, 1:1 Square, 4:5, 21:9 or any custom ratio', '১৬:৯, ৯:১৬ শর্টস, ১:১ স্কয়ার সহ যেকোনো রেজোলিউশন সাপোর্ট করবে')}
                        </p>
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm,video/x-matroska,video/*"
                          onChange={handleVideoFileSelect}
                          className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-500 cursor-pointer"
                        />
                      </>
                    )}
                  </div>

                  {uploadError && (
                    <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t('YouTube Video URL or Direct Video Link *', 'ইউটিউব বা ভিডিওর সরাসরি লিংক (URL) *')}
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('Video Title / ক্যাপশন *', 'ভিডিওর শিরোনাম বা ক্যাপশন *')}
                </label>
                <input
                  type="text"
                  required
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="e.g. High Engagement Reels Edit 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('Category', 'ক্যাটাগরি')}
                </label>
                <select
                  value={inputCategory}
                  onChange={(e) => setInputCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="after_effects">{t('After Effects Motion', 'আফটার ইফেক্টস মোশন')}</option>
                  <option value="premiere_pro">{t('Premiere Pro Editing', 'প্রিমিয়ার প্রো এডিটিং')}</option>
                  <option value="vlog">{t('YouTube Vlogs & Videos', 'ইউটিউব ব্লগ ও লং ভিডিও')}</option>
                  <option value="tutorial">{t('Tutorials & Ads', 'টিউটোরিয়াল ও প্রমোশনাল এডস')}</option>
                </select>
                {inputCategory === 'after_effects' && (
                  <p className="text-[11px] text-purple-300 bg-purple-950/60 p-2.5 rounded-lg border border-purple-500/30 flex items-center gap-1.5 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{t('Tip: Export After Effects compositions as H.264 MP4 for smooth web playback.', 'টিপস: ব্রাউজারে সহজে প্লে করার জন্য আফটার ইফেক্টসের ভিডিওটি H.264 MP4 ফরম্যাটে সেভ/রেন্ডার করুন।')}</span>
                  </p>
                )}
              </div>

              {/* Display Fit Preference */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('Display Rendering Mode', 'ডিসপ্লে স্টাইল')}
                </label>
                <select
                  value={fitMode}
                  onChange={(e) => setFitMode(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="contain">{t('Contain (Full Video, No Crop)', 'কনটেইন (সম্পূর্ণ ভিডিও দেখাবে, কোনো ক্রপ হবে না)')}</option>
                  <option value="cover">{t('Cover (Fill Container)', 'কভার (পুরো কার্ড জুড়ে ফিল করবে)')}</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isProcessingVideo}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {isProcessingVideo ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('Processing Video...', 'ভিডিও প্রসেস করা হচ্ছে...')}</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t('Save & Add Video', 'সংরক্ষণ ও গ্যালারিতে যোগ করুন')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Profile Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-cyan-400" />
                <span>{t('Customize Profile Picture', 'প্রোফাইল ছবি পরিবর্তন করুন')}</span>
              </h3>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateAvatar} className="space-y-4">
              {/* Option 1: File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('Upload Photo from Computer / Phone:', 'কম্পিউটার বা মোবাইল থেকে ছবি সিলেক্ট করুন:')}
                </label>
                <label className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 text-cyan-300 font-bold text-xs cursor-pointer transition-all shadow-md active:scale-95">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>{t('Choose Image File', 'গ্যালারি / ডিভাইস থেকে ছবি সিলেক্ট করুন')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarFileSelect}
                  />
                </label>
              </div>

              {/* Option 2: Image URL input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('Or Enter Image URL Link:', 'অথবা ছবির ডাইরেক্ট ওয়েব লিংক দিন:')}
                </label>
                <input
                  type="text"
                  value={tempAvatarUrl}
                  onChange={(e) => setTempAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Live Preview if tempAvatarUrl is set */}
              {tempAvatarUrl && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-cyan-500 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tempAvatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs text-slate-300">
                    <p className="font-semibold text-cyan-400">{t('Preview Ready', 'ছবি প্রিভিউ রেডি')}</p>
                    <p className="text-[11px] text-slate-400">{t('Click Save below to update portfolio', 'নিচের সেভ বাটনে ক্লিক করুন')}</p>
                  </div>
                </div>
              )}

              {/* Sample Presets */}
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-semibold block">
                  {t('Or Choose Preset Avatar:', 'অথবা ডিফল্ট প্রফেশনাল ছবি সিলেক্ট করুন:')}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTempAvatarUrl('/images/avatar.jpg')}
                    className="w-12 h-12 rounded-full border-2 border-cyan-500 overflow-hidden shrink-0 hover:scale-105 transition-transform"
                    title="Default Professional Avatar"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/avatar.jpg" alt="Default Avatar" className="w-full h-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-400 hover:text-white text-xs font-medium transition-all"
                  >
                    {t('Reset Default', 'ডিফল্ট ছবি রিমেক')}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                >
                  {t('Save Profile Picture', 'প্রোফাইল ছবি সেভ করুন')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}

