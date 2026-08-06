import React, { useState } from 'react';
import { X, Heart, CheckCircle2, User, Phone, Users, FileText, Sparkles } from 'lucide-react';
import { RsvpSubmission } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp: RsvpSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('everafter_rsvps') || '[]');
    localStorage.setItem('everafter_rsvps', JSON.stringify([...existing, newRsvp]));

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl border-2 border-[#d4af37] shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-right overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#8c6d1d] border border-[#d4af37]/30 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-amiri text-3xl font-bold text-gold-gradient">
            تأكيد الحضور (RSVP)
          </h3>
          <p className="font-tajawal text-sm text-[#5a461b] mt-1">
            يرجى تأكيد حضوركم لمساعدتنا في تنظيم الضيافة الملكية
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#22c55e] mx-auto animate-bounce" />
            <h4 className="font-amiri text-2xl font-bold text-[#2c1d02]">
              تم تسجيل ردكم بنجاح!
            </h4>
            <p className="font-tajawal text-base text-[#5a461b] max-w-xs mx-auto">
              يسعدنا جداً مشاركتكم ولحظات الفرح معنا في قصر الفردوس الملكي ✨
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-white font-bold font-tajawal shadow-md hover:shadow-lg transition cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-tajawal">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-[#2c1d02] mb-1">
                الاسم بالكامل *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك الكريم"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <User className="w-4 h-4 text-[#d4af37] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-[#2c1d02] mb-1">
                رقم الجوال / الواتساب
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <Phone className="w-4 h-4 text-[#d4af37] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-sm font-bold text-[#2c1d02] mb-2">
                تأكيد الحضور *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    attending === 'yes'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-white border-[#d4af37] shadow-xs'
                      : 'bg-white/80 text-[#5a461b] border-[#d4af37]/30 hover:bg-white'
                  }`}
                >
                  نعم، يسعدني الحضور ✨
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('maybe')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    attending === 'maybe'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-white border-[#d4af37] shadow-xs'
                      : 'bg-white/80 text-[#5a461b] border-[#d4af37]/30 hover:bg-white'
                  }`}
                >
                  غير متأكد حالياً
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    attending === 'no'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-white border-[#d4af37] shadow-xs'
                      : 'bg-white/80 text-[#5a461b] border-[#d4af37]/30 hover:bg-white'
                  }`}
                >
                  أعتذر عن الحضور
                </button>
              </div>
            </div>

            {/* Guest Count */}
            {attending === 'yes' && (
              <div>
                <label className="block text-sm font-bold text-[#2c1d02] mb-1">
                  عدد الأشخاص المرافقين (شامل حضوري)
                </label>
                <div className="relative">
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value={1}>شخص واحد (أنا فقط)</option>
                    <option value={2}>شخصان (2)</option>
                    <option value={3}>3 أشخاص</option>
                    <option value={4}>4 أشخاص</option>
                    <option value={5}>5 أشخاص أو أكثر</option>
                  </select>
                  <Users className="w-4 h-4 text-[#d4af37] absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-[#2c1d02] mb-1">
                ملاحظات أو تهنئة خاصة
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي ملاحظات تفضل إبلاغنا بها..."
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/90 border border-[#d4af37]/40 text-[#2c1d02] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <FileText className="w-4 h-4 text-[#d4af37] absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b38728] text-[#2c1d02] font-bold text-base shadow-md hover:shadow-lg transition cursor-pointer mt-4"
            >
              تأكيد وإرسال الرد
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
