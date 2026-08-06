import React from 'react';
import { Heart, Sparkles, Compass, Gem, Flame } from 'lucide-react';

export const StorySection: React.FC = () => {
  const milestones = [
    {
      year: '٢٠٢٣',
      title: 'اللقاء الأول',
      subtitle: 'حين التقت القلوب مصادفة',
      content:
        'في يوم من أيام الربيع الجميلة، التقت أعيننا لأول مرة. كانت لحظة بسيطة لكنها حملت في طياتها بداية لقصة حب عميقة كُتبت مقاديرها بجمال ولطف.',
      icon: <Compass className="w-6 h-6 text-[#2c1d02]" />,
    },
    {
      year: '٢٠٢٤',
      title: 'شرارة الحب والتوافق',
      subtitle: 'أحاديث تدوم وساعات تمضي كالثواني',
      content:
        'بمرور الأيام، اكتشفنا كم تجمعنا نفس الأحلام والرؤى. كانت كل محادثة تضيف لبنة في صرح محبتنا، وتؤكد لنا أننا خلقنا لنكون سنداً ورفيقاً لبعضنا البعض.',
      icon: <Flame className="w-6 h-6 text-[#2c1d02]" />,
    },
    {
      year: '٢٠٢٥',
      title: 'الخطوبة المباركة',
      subtitle: 'وعد أبدي بالمودة والرحمة',
      content:
        'وسط فرحة الأهل والأحباب، توجنا حبنا بالخطوبة الرسمية. وعدنا بعضنا بالأمان والوفاء، وبدأنا نخطط معاً لبناء بيتنا السعيد المليء بالدفء والبهجة.',
      icon: <Gem className="w-6 h-6 text-[#2c1d02]" />,
    },
    {
      year: '٢٠٢٦',
      title: 'بداية الرحلة الأبدية',
      subtitle: 'حفل الزفاف الميمون',
      content:
        'والآن نفتح صفحة جديدة من كتاب حياتنا كزوجين. نكتمل بحضوركم الغالي لتكتمل فرحتنا وننطلق في رحلتنا السعيدة معا تحت ظل المودة والمحبة.',
      icon: <Heart className="w-6 h-6 text-[#2c1d02] fill-[#2c1d02]/20" />,
    },
  ];

  return (
    <section id="story" className="py-20 px-4 relative z-10 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 text-[#8c6d1d] font-tajawal text-sm font-semibold mb-3">
            <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]/20" />
            <span>رحلة الحب والتوافق</span>
          </div>
          <h2 className="font-amiri text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-sm">
            حكايتنا
          </h2>
          <p className="mt-3 font-tajawal text-lg text-[#5a461b] max-w-xl mx-auto">
            محطات صادقة ومواقف دافئة قادتنا إلى أجمل ليلة في حياتنا
          </p>
        </div>

        {/* Story Milestones - Connected with Curved Path */}
        <div className="relative">
          {/* Central Curved Gold Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-[#d4af37]/30 via-[#d4af37] to-[#d4af37]/30 -translate-x-1/2 rounded-full" />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((story, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card Side */}
                  <div className="w-full md:w-[45%] text-right">
                    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#d4af37]/40 shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
                      {/* Badge year */}
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-white font-bold font-tajawal text-sm mb-3">
                        {story.year}
                      </span>

                      <h3 className="font-amiri text-3xl font-bold text-[#2c1d02] mb-1">
                        {story.title}
                      </h3>
                      <p className="font-aref text-lg text-[#8c6d1d] mb-4">
                        {story.subtitle}
                      </p>
                      <p className="font-tajawal text-base text-[#5a461b] leading-relaxed">
                        {story.content}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b38728] border-4 border-white shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center shrink-0 my-2 md:my-0">
                    {story.icon}
                  </div>

                  {/* Empty Spacer Side for Desktop layout symmetry */}
                  <div className="hidden md:block w-full md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
