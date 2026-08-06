import React, { useState, useEffect, useRef } from 'react';
import localIntroVideo from '../assets/images/intro.mp4';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleFinish = () => {
    setFading(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A1128] overflow-hidden transition-opacity duration-1000 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Full screen intro.mp4 video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={localIntroVideo} type="video/mp4" />
      </video>
    </div>
  );
};

