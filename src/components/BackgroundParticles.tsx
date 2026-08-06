import React, { useEffect, useRef, useState } from 'react';

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definitions (petals & gold dust)
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: string;
      isPetal: boolean;
    }

    const particles: Particle[] = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      const isPetal = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 8 + 6 : Math.random() * 3 + 1,
        speedY: isPetal ? Math.random() * 0.8 + 0.3 : Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.3,
        color: isPetal
          ? ['#fbcfe8', '#f472b6', '#fed7aa', '#ffffff'][Math.floor(Math.random() * 4)]
          : '#fef08a',
        isPetal,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.isPetal) {
          // Draw flower petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw gold glowing particle
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#d4af37';
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      {/* Dynamic Background Transition from Night Sky (#0A1128 / #1E3A5F) to Bright Morning Garden Sky (#E0F2F1) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse at top, #0A1128 0%, #1E3A5F 60%, #030712 100%)`,
          opacity: 1 - scrollProgress * 0.85,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(180deg, #E0F2F1 0%, #e0f2fe 40%, #faf8f5 100%)`,
          opacity: scrollProgress * 0.85,
        }}
      />
      {/* Radial Gold Lighting Orbs */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-[#FFD700] rounded-full blur-[140px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-[#C5A059] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      {/* Floating Canvas for Rose Petals & Gold Dust */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Occasional flying white doves/birds in morning sky */}
      {scrollProgress > 0.3 && (
        <div className="absolute top-16 left-0 right-0 animate-bird opacity-60">
          <svg className="w-8 h-8 text-white/80 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8 2 4 6 2 10c3-1 6-1 8 1 2 2 4 5 8 5 4 0 6-3 6-7 0-4-3-7-10-7z" />
          </svg>
        </div>
      )}
    </div>
  );
};
