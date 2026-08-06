import React from 'react';
import { Sparkles, Calendar, MapPin, Heart, Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 text-center z-10 overflow-hidden">
      {/* Decorative Gold Arch Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl h-[80vh] max-h-[700px] border border-[#d4af37]/30 rounded-t-[200px] pointer-events-none bg-gradient-to-b from-[#d4af37]/5 via-transparent to-transparent shadow-[0_0_80px_rgba(212,175,55,0.08)]" />

      {/* Floating Flowers & Glow Highlights */}
      <div className="absolute top-12 right-10 w-24 h-24 bg-[#fcf6ba]/20 rounded-full blur-2xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#d4af37]/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Top Welcome Card Frame */}
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="mb-6 relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#d4af37] bg-white/80 backdrop-blur-md flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.25)] relative overflow-hidden transition-transform duration-500 hover:scale-105">
            <span className="font-amiri text-4xl md:text-5xl font-bold text-gold-gradient tracking-widest drop-shadow-sm">
              ع م
            </span>
            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
          {/* Subtle Crown / Arch Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#d4af37]">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '15s' }} />
          </div>
        </div>

        {/* Lead Welcome Heading */}
        <h2 className="font-aref text-2xl md:text-3xl lg:text-4xl text-[#8c6d1d] tracking-wide mb-4 drop-shadow-xs">
          يتشرفون بدعوتكم لحضور حفل زفاف
        </h2>

        {/* Groom & Bride Names - Very Large Arabic Calligraphy */}
        <div className="my-3 py-3 px-8 rounded-3xl bg-white/50 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_10px_40px_rgba(212,175,55,0.2)] max-w-3xl w-full">
          <h1 className="font-amiri text-6xl sm:text-7xl md:text-[95px] font-extrabold text-gold-bold tracking-tight leading-tight drop-shadow-[0_8px_20px_rgba(212,175,55,0.4)]">
            عيسى & مرام
          </h1>
        </div>

        {/* Subtitle Message */}
        <p className="mt-4 font-tajawal text-xl md:text-2xl text-[#4a3e28] max-w-xl leading-relaxed font-medium">
          يسعدنا حضوركم ومشاركتكم أجمل ليلة في حياتنا
        </p>

        {/* Date & Location Pill Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-tajawal text-sm md:text-base text-[#5a461b]">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 shadow-sm">
            <Calendar className="w-5 h-5 text-[#d4af37]" />
            <span className="font-semibold">الأحد، ١٣ سبتمبر ٢٠٢٦ م</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 shadow-sm">
            <MapPin className="w-5 h-5 text-[#d4af37]" />
            <span className="font-semibold">القاهرة الجديدة، مصر</span>
          </div>
        </div>
      </div>
    </section>
  );
};
