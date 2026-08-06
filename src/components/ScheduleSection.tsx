import React from 'react';
import { Users, BookOpen, Music, Utensils, HeartHandshake, Sparkles, Clock } from 'lucide-react';
import { ScheduleItem } from '../types';

export const ScheduleSection: React.FC = () => {
  const scheduleItems: ScheduleItem[] = [
    {
      time: '٥:٠٠ مساءً',
      title: 'استقبال الضيوف الكرام',
      description: 'الترحيب بالضيوف في البستان المضيء وتقديم المشروبات والحلويات الفاخرة',
      icon: 'users',
    },
    {
      time: '٦:٠٠ مساءً',
      title: 'عقد القران المبارك',
      description: 'مراسم عقد القران وتوثيق لحظات الوفاء بالعهد والمودة',
      icon: 'book',
    },
    {
      time: '٧:٠٠ مساءً',
      title: 'بداية الاحتفال والزفة',
      description: 'دخول العروسين بالزفة الملكية وبداية الأمسية السعيدة',
      icon: 'music',
    },
    {
      time: '٩:٠٠ مساءً',
      title: 'بوفيه العشاء الملكي',
      description: 'افتتاح بوفيه العشاء الفاخر بوفاء وكرم الضيافة',
      icon: 'utensils',
    },
    {
      time: '١١:٠٠ مساءً',
      title: 'ختام الأمسية السعيدة',
      description: 'وداع العروسين وتمني حياة ملؤها السعادة والمودة الأبدية',
      icon: 'heart',
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-6 h-6 text-[#2c1d02]" />;
      case 'book':
        return <BookOpen className="w-6 h-6 text-[#2c1d02]" />;
      case 'music':
        return <Music className="w-6 h-6 text-[#2c1d02]" />;
      case 'utensils':
        return <Utensils className="w-6 h-6 text-[#2c1d02]" />;
      case 'heart':
        return <HeartHandshake className="w-6 h-6 text-[#2c1d02]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#2c1d02]" />;
    }
  };

  return (
    <section id="schedule" className="py-20 px-4 relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 text-[#8c6d1d] font-tajawal text-sm font-semibold mb-3">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <span>برنامج الليلة</span>
          </div>
          <h2 className="font-amiri text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-sm">
            جدول الحفل
          </h2>
          <p className="mt-3 font-tajawal text-lg text-[#5a461b]">
            تسلسل أوقات الفرح والبهجة في ليلتنا المباركة
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-r-2 border-[#d4af37]/50 mr-4 md:mr-0 md:mx-auto max-w-2xl text-right">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className="mb-12 relative pr-10 md:pr-12 group transition-transform duration-300 hover:translate-x-[-4px]"
            >
              {/* Timeline Gold Dot & Icon Badge */}
              <div className="absolute right-[-21px] top-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b38728] border-2 border-white shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIconComponent(item.icon)}
              </div>

              {/* Schedule Card */}
              <div className="glass-card p-6 rounded-2xl border border-[#d4af37]/40 shadow-sm transition-all group-hover:shadow-md group-hover:border-[#d4af37]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#f3e5ab]/40 border border-[#d4af37]/30 text-[#8c6d1d] font-bold font-tajawal text-sm">
                    {item.time}
                  </span>
                  <span className="text-xs text-[#8c6d1d]/70 font-tajawal">
                    الفقرة رقم {index + 1}
                  </span>
                </div>

                <h3 className="font-amiri text-2xl font-bold text-[#2c1d02] mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="font-tajawal text-base text-[#5a461b] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
