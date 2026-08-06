import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Eye } from 'lucide-react';

interface ScratchCircleProps {
  label: string; // اليوم / الشهر / السنة
  hiddenValue: string; // 13 / 9 / 2026
}

const ScratchCircleCard: React.FC<ScratchCircleProps> = ({ label, hiddenValue }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Initialize Canvas Gold Foil Layer
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 180;
    canvas.width = size;
    canvas.height = size;

    // Draw Gold Metallic Gradient Foil
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, '#fcf6ba');
    gradient.addColorStop(0.3, '#bf953f');
    gradient.addColorStop(0.7, '#b38728');
    gradient.addColorStop(1, '#aa771c');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fcf6ba';
    ctx.lineWidth = 3;
    ctx.stroke();

    setIsRevealed(false);
    setScratchPercent(0);
  };

  useEffect(() => {
    initCanvas();
  }, [hiddenValue]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 60; // Large stroke diameter for rapid, smooth scratching
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    lastPos.current = { x, y };

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percent = Math.round((transparentCount / (pixels.length / 16)) * 100);
    setScratchPercent(percent);

    if (percent > 20 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    lastPos.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDrawing.current = true;
      lastPos.current = null;
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDrawing.current && e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Label above */}
      <span className="font-aref text-2xl text-[#8c6d1d] font-bold mb-3 tracking-wide drop-shadow-xs">
        {label}
      </span>

      {/* Circle Container holding the hidden value and the scratch canvas */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-[#D4AF37] bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#B8860B] shadow-[0_0_35px_rgba(212,175,55,0.45)] flex items-center justify-center overflow-hidden transition-transform hover:scale-105">
        {/* Hidden Number underneath */}
        <div className="absolute inset-0 flex items-center justify-center p-2 text-center bg-white/95">
          <span className="font-amiri text-5xl sm:text-6xl font-bold text-[#0A1128] drop-shadow-sm">
            {hiddenValue}
          </span>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className={`scratch-canvas absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-500 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};

export const ScratchCountdown: React.FC = () => {
  // Target date: September 13, 2026 18:00 (Cairo local time)
  const targetDate = new Date('2026-09-13T18:00:00+02:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Eastern Arabic numerals converter helper
  const toArabicNumerals = (num: number) => {
    return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  };

  return (
    <section id="countdown" className="py-20 px-4 relative z-10 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#d4af37]/40 text-[#8c6d1d] font-tajawal text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>موعدنا المبارك</span>
          </div>
          <h2 className="font-amiri text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-sm">
            تاريخ اليوم المشهود
          </h2>
          <p className="mt-3 font-tajawal text-lg text-[#5a461b] max-w-lg mx-auto">
            احك الذهبي بأصبعك أو الماوس لاكتشاف تاريخ حفل الزفاف!
          </p>
        </div>

        {/* 3 Large Scratch Circles for Day, Month, Year */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-16">
          <ScratchCircleCard label="اليوم" hiddenValue="13" />
          <ScratchCircleCard label="الشهر" hiddenValue="9" />
          <ScratchCircleCard label="السنة" hiddenValue="2026" />
        </div>

        {/* Live Countdown Timer below */}
        <div className="glass-card max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl border-2 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />
          
          <h3 className="font-aref text-2xl text-[#8c6d1d] font-bold mb-6">
            العد التنازلي لحفل الزفاف
          </h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-6 text-center">
            {/* Days */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/80 border border-[#d4af37]/30 shadow-xs">
              <span className="font-amiri text-3xl sm:text-5xl font-bold text-gold-gradient">
                {toArabicNumerals(timeLeft.days)}
              </span>
              <span className="font-tajawal text-xs sm:text-base text-[#5a461b] font-semibold mt-1">
                الأيام
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/80 border border-[#d4af37]/30 shadow-xs">
              <span className="font-amiri text-3xl sm:text-5xl font-bold text-gold-gradient">
                {toArabicNumerals(timeLeft.hours)}
              </span>
              <span className="font-tajawal text-xs sm:text-base text-[#5a461b] font-semibold mt-1">
                الساعات
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/80 border border-[#d4af37]/30 shadow-xs">
              <span className="font-amiri text-3xl sm:text-5xl font-bold text-gold-gradient">
                {toArabicNumerals(timeLeft.minutes)}
              </span>
              <span className="font-tajawal text-xs sm:text-base text-[#5a461b] font-semibold mt-1">
                الدقائق
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/80 border border-[#d4af37]/30 shadow-xs">
              <span className="font-amiri text-3xl sm:text-5xl font-bold text-gold-gradient animate-pulse">
                {toArabicNumerals(timeLeft.seconds)}
              </span>
              <span className="font-tajawal text-xs sm:text-base text-[#5a461b] font-semibold mt-1">
                الثواني
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
