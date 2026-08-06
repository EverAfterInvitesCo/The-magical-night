import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Heart, Sparkles, User, ThumbsUp } from 'lucide-react';
import { GuestbookMessage } from '../types';

const INITIAL_MESSAGES: GuestbookMessage[] = [
  {
    id: '1',
    name: 'د. طارق السعيد والعائلة',
    message: 'ألف ألف مبروك لأحلى عرسان عيسى ومرام! ربنا يتمملكم على خير ويكتبلكم السعادة والسكينة طول العمر.',
    date: 'منذ يومين',
    emoji: '💍',
    likes: 12,
  },
  {
    id: '2',
    name: 'مهندس أحمد فهمي',
    message: 'من القلب لأجمل ثنائي.. مبارك الزفاف الميمون وبداية حياة ملؤها المودة والمحبة والنجاح معاً.',
    date: 'أمس',
    emoji: '❤️',
    likes: 8,
  },
  {
    id: '3',
    name: 'سارة ونور الشربيني',
    message: 'مرام حبيبتي وعيسى العريس الراقي، منتظرين أجمل ليلة في السنة لنحتفل معكم ونفرح من قلوبنا!',
    date: 'اليوم',
    emoji: '🌸',
    likes: 15,
  },
  {
    id: '4',
    name: 'خالد عبد الوهاب',
    message: 'ربنا يبارك جمعكما ويجعل بيتكم عامر بالأفراح والطاعات والخير الدائم، مبروك يا غاليين!',
    date: 'اليوم',
    emoji: '✨',
    likes: 6,
  },
];

export const GuestbookSection: React.FC = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('❤️');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('everafter_guestbook');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages(INITIAL_MESSAGES);
      }
    } else {
      setMessages(INITIAL_MESSAGES);
    }
  }, []);

  const saveMessages = (newList: GuestbookMessage[]) => {
    setMessages(newList);
    localStorage.setItem('everafter_guestbook', JSON.stringify(newList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newMessage: GuestbookMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: 'الآن',
      emoji: selectedEmoji,
      likes: 1,
    };

    const updated = [newMessage, ...messages];
    saveMessages(updated);

    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleLike = (id: string) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, likes: (m.likes || 0) + 1 } : m
    );
    saveMessages(updated);
  };

  const emojis = ['❤️', '💍', '🌸', '✨', '🎉', '🥂', '🕊️'];

  return (
    <section id="guestbook" className="py-20 px-4 relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 text-[#8c6d1d] font-tajawal text-sm font-semibold mb-3">
            <MessageSquare className="w-4 h-4 text-[#d4af37]" />
            <span>سجل التهاني والشركاء</span>
          </div>
          <h2 className="font-amiri text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-sm">
            اتركوا لنا رسالة
          </h2>
          <p className="mt-3 font-tajawal text-lg text-[#5a461b]">
            شاركونا أمنياتكم ودعواتكم الصادقة لعيسى ومرام
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border-2 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(212,175,55,0.15)] mb-16 text-right max-w-2xl mx-auto">
          {submitted && (
            <div className="mb-6 p-4 rounded-2xl bg-[#f0fdf4] border border-[#86efac] text-[#166534] font-tajawal text-center font-bold animate-fade-in flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#22c55e]" />
              <span>شكراً لكم! تم إضافة رسالتكم العطرة بنجاح ✨</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-tajawal text-base font-bold text-[#2c1d02] mb-2">
                الاسم الكريم
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: أحمد عبد الله"
                  className="w-full px-4 py-3.5 pr-11 rounded-2xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] font-tajawal focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
                />
                <User className="w-5 h-5 text-[#d4af37] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block font-tajawal text-base font-bold text-[#2c1d02] mb-2">
                الرسالة والتهنئة
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تهنئتك الدافئة للعروسين..."
                className="w-full px-4 py-3.5 rounded-2xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] font-tajawal focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
              />
            </div>

            {/* Emoji Selector */}
            <div>
              <label className="block font-tajawal text-sm text-[#5a461b] mb-2 font-semibold">
                اختر رمزاً للتعبير:
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {emojis.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-2 rounded-xl transition cursor-pointer ${
                      selectedEmoji === emoji
                        ? 'bg-[#fcf6ba] border-2 border-[#d4af37] scale-110 shadow-xs'
                        : 'bg-white/60 hover:bg-white border border-[#d4af37]/20'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b38728] text-[#2c1d02] font-bold text-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-5 h-5 text-[#2c1d02]" />
              <span>إرسال التهاني</span>
            </button>
          </form>
        </div>

        {/* Floating Message Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
          {messages.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 rounded-2xl border border-[#d4af37]/40 shadow-sm hover:shadow-md transition duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#d4af37]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji || '❤️'}</span>
                    <h4 className="font-amiri text-2xl font-bold text-[#2c1d02]">
                      {item.name}
                    </h4>
                  </div>
                  <span className="font-tajawal text-xs text-[#8c6d1d]">
                    {item.date}
                  </span>
                </div>

                <p className="font-tajawal text-base text-[#5a461b] leading-relaxed mb-4">
                  "{item.message}"
                </p>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-[#d4af37]/10">
                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-1.5 text-xs font-tajawal text-[#8c6d1d] hover:text-[#2c1d02] bg-white/70 px-3 py-1 rounded-full border border-[#d4af37]/20 transition cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{item.likes || 0} إعجاب</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
