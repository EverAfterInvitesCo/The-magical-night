import React, { useState, useRef } from 'react';
import { Upload, X, Video, Link, Sparkles, Check, Play, RefreshCw } from 'lucide-react';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoSelect: (url: string) => void;
  currentVideoUrl?: string;
}

const PUBLIC_SAMPLE_VIDEOS = [
  {
    name: 'فيديو بستان الزفاف الملكي المضيء',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-garden-42861-large.mp4',
    desc: 'مشهد هادئ لعروسين في بستان ملكي تحيط به الزهور',
  },
  {
    name: 'عرض الخواتم الذهبية والزهور',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-wedding-rings-on-a-flower-41584-large.mp4',
    desc: 'خواتم الزفاف الذهبية وسط الورود الناعمة',
  },
  {
    name: 'الممر الملكي والإضاءة الرومانسية',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-decorations-for-a-wedding-party-41582-large.mp4',
    desc: 'إضاءة وديكورات زفاف فاخرة بلمسات ذهبية',
  },
];

export const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  isOpen,
  onClose,
  onVideoSelect,
  currentVideoUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'samples'>('upload');
  const [customUrl, setCustomUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('يرجى اختيار ملف فيديو بصيغة MP4 أو WebM أو MOV');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFileName(file.name);
    
    // Save to localStorage
    try {
      localStorage.setItem('everafter_custom_video_url', objectUrl);
      localStorage.setItem('everafter_custom_video_name', file.name);
    } catch (e) {
      console.warn('LocalStorage limit exceeded, using active object URL session');
    }

    onVideoSelect(objectUrl);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    localStorage.setItem('everafter_custom_video_url', customUrl.trim());
    localStorage.setItem('everafter_custom_video_name', 'رابط فيديو خارجي');
    onVideoSelect(customUrl.trim());
  };

  const handleSampleSelect = (url: string, name: string) => {
    localStorage.setItem('everafter_custom_video_url', url);
    localStorage.setItem('everafter_custom_video_name', name);
    onVideoSelect(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-tajawal">
      <div className="relative w-full max-w-xl glass-card p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.4)] text-right overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#8c6d1d] border border-[#d4af37]/30 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#B8860B] text-[#0A1128] flex items-center justify-center mx-auto mb-2 shadow-md">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="font-amiri text-3xl font-bold text-gold-bold">
            رفع فيديو الانترو (Intro Video)
          </h3>
          <p className="text-sm text-[#5a461b] mt-1">
            قم برفع فيديو الانترو الخاص بك أو اختر رابطاً عاماً لمشاهدته في العرض السينمائي
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#d4af37]/30 mb-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-center transition cursor-pointer border-b-2 ${
              activeTab === 'upload'
                ? 'border-[#D4AF37] text-[#8c6d1d] bg-[#fcf6ba]/30'
                : 'border-transparent text-[#5a461b] hover:text-[#8c6d1d]'
            }`}
          >
            <Upload className="w-4 h-4 inline-block ml-1.5" />
            <span>رفع ملف فيديو</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 text-center transition cursor-pointer border-b-2 ${
              activeTab === 'url'
                ? 'border-[#D4AF37] text-[#8c6d1d] bg-[#fcf6ba]/30'
                : 'border-transparent text-[#5a461b] hover:text-[#8c6d1d]'
            }`}
          >
            <Link className="w-4 h-4 inline-block ml-1.5" />
            <span>رابط فيديو عام</span>
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={`flex-1 py-3 text-center transition cursor-pointer border-b-2 ${
              activeTab === 'samples'
                ? 'border-[#D4AF37] text-[#8c6d1d] bg-[#fcf6ba]/30'
                : 'border-transparent text-[#5a461b] hover:text-[#8c6d1d]'
            }`}
          >
            <Sparkles className="w-4 h-4 inline-block ml-1.5" />
            <span>فيديوهات جاهزة</span>
          </button>
        </div>

        {/* Tab Content: File Upload */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                dragActive
                  ? 'border-[#D4AF37] bg-[#fcf6ba]/40 scale-102'
                  : 'border-[#d4af37]/50 bg-white/60 hover:bg-white'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-[#d4af37] mx-auto mb-3 animate-bounce" />
              <p className="font-bold text-base text-[#2c1d02]">
                اسحب ملف الفيديو هنا أو اضغط للاختيار من جهازك
              </p>
              <p className="text-xs text-[#8c6d1d] mt-2">
                يدعم صيغ MP4, WebM, MOV (حجم موصى به حتى 100 ميجابايت)
              </p>

              {selectedFileName && (
                <div className="mt-4 p-3 bg-[#f0fdf4] border border-[#86efac] text-[#166534] rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-[#22c55e]" />
                  <span>تم تحميل: {selectedFileName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Public URL */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#2c1d02] mb-2">
                رابط فيديو مباشر (Public MP4 Video URL)
              </label>
              <input
                type="url"
                required
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/my-intro-video.mp4"
                className="w-full px-4 py-3.5 rounded-xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-left dir-ltr"
              />
              <p className="text-xs text-[#8c6d1d] mt-1.5">
                تأكد أن الرابط ينتهي بصيغة mp4 ويسمح بالتشغيل المباشر
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-base shadow-md hover:shadow-lg transition cursor-pointer"
            >
              حفظ وتطبيق الرابط
            </button>
          </form>
        )}

        {/* Tab Content: Sample Public Videos */}
        {activeTab === 'samples' && (
          <div className="space-y-3">
            {PUBLIC_SAMPLE_VIDEOS.map((sample, idx) => (
              <div
                key={idx}
                onClick={() => handleSampleSelect(sample.url, sample.name)}
                className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#d4af37]/40 hover:border-[#d4af37] transition cursor-pointer flex items-center justify-between gap-4 group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fcf6ba] border border-[#d4af37] flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Play className="w-4 h-4 text-[#8c6d1d] fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#2c1d02]">{sample.name}</h4>
                    <p className="text-xs text-[#8c6d1d]">{sample.desc}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-[#d4af37]/20 text-[#8c6d1d] font-bold text-xs group-hover:bg-[#d4af37] group-hover:text-white transition">
                  اختيار
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Current status info */}
        {currentVideoUrl && (
          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex items-center justify-between text-xs text-[#8c6d1d]">
            <span>الفيديو الحالي محدد ونشط</span>
            <button
              onClick={() => {
                localStorage.removeItem('everafter_custom_video_url');
                localStorage.removeItem('everafter_custom_video_name');
                onVideoSelect('');
              }}
              className="text-red-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>إعادة ضبط للافتراضي</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
