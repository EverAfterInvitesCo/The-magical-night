import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Car, Sparkles } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const venueName = "قصر الفردوس الملكي للمناسبات";
  const venueAddress = "شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة، مصر";
  const mapUrl = "https://maps.app.goo.gl/NewCairoEgypt"; // Update with your exact map pin if needed

  const handleOpenMaps = () => {
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("حفل زفاف عيسى ومرام 💍");
    const details = encodeURIComponent("يسعدنا حضوركم ومشاركتكم أجمل ليلة في حياتنا بقصر الفردوس الملكي");
    const location = encodeURIComponent(`${venueName} - ${venueAddress}`);
    // Sept 13, 2026 18:00 to 23:00 UTC+2
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260913T160000Z/20260913T210000Z`;
    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="venue" className="py-20 px-4 relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 text-[#8c6d1d] font-tajawal text-sm font-semibold mb-3">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span>مكان اللقاء</span>
          </div>
          <h2 className="font-amiri text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-sm">
            عنوان الحفل
          </h2>
          <p className="mt-3 font-tajawal text-lg text-[#5a461b]">
            ننتظركم بشوق في أجواء القصر الفاخرة للاحتفال سوياً
          </p>
        </div>

        {/* Main Venue Card */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-[#d4af37]/50 shadow-[0_25px_60px_rgba(212,175,55,0.18)] relative overflow-hidden text-right">
          {/* Subtle Decorative Arch Corner Graphic */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#d4af37]/20 to-transparent pointer-events-none rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#d4af37]/20 to-transparent pointer-events-none rounded-tr-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left/Right Text Content */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#d4af37] font-semibold text-sm mb-1 font-tajawal">
                  <Sparkles className="w-4 h-4" />
                  <span>القاعة الرئيسية</span>
                </div>
                <h3 className="font-amiri text-3xl md:text-4xl font-bold text-gold-gradient">
                  {venueName}
                </h3>
              </div>

              {/* Address details */}
              <div className="flex items-start gap-3 bg-white/60 p-4 rounded-2xl border border-[#d4af37]/30">
                <MapPin className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
                <div className="font-tajawal text-[#4a3e28] text-base leading-relaxed">
                  <span className="font-bold block text-[#2c1d02] mb-1">العنوان التفصيلي:</span>
                  {venueAddress}
                </div>
              </div>

              {/* Timing & Parking info badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-tajawal text-sm text-[#5a461b]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#d4af37]/20">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span>يبدأ الاستقبال الساعة ٥:٠٠ مساءً</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#d4af37]/20">
                  <Car className="w-5 h-5 text-[#d4af37]" />
                  <span>خدمة الفاليت وموقف السيارات متاح</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleOpenMaps}
                  className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b38728] text-[#2c1d02] font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-5 h-5 text-[#2c1d02]" />
                  <span>افتح في خرائط جوجل</span>
                </button>

                <button
                  onClick={handleAddToCalendar}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white border border-[#d4af37]/60 text-[#8c6d1d] font-bold text-base hover:bg-[#fffdf8] transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-5 h-5 text-[#d4af37]" />
                  <span>إضافة للتقويم</span>
                </button>
              </div>
            </div>

            {/* Interactive Google Maps Embed Preview Card */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-inner group">
              <iframe
                title="Google Maps Location Preview"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4!2d31.4165!3d30.0165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVFJFVUZJTFMgUEFMQUNF!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
              <div className="absolute bottom-3 right-3 left-3 bg-black/60 backdrop-blur-md p-3 rounded-xl text-white text-right border border-white/10 pointer-events-none">
                <div className="flex items-center gap-2 text-[#fcf6ba] font-bold text-sm mb-0.5 font-tajawal">
                  <MapPin className="w-4 h-4 text-[#d4af37] animate-bounce" />
                  <span>القاهرة الجديدة</span>
                </div>
                <h4 className="font-amiri text-lg font-bold">شارع التسعين الشمالي - التجمع الخامس</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
