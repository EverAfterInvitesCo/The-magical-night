import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import audioFile from '../assets/images/Ehsasimaak.mp3';

export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    // Try automatic playback on load
    audio.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
    }).catch(() => {
      // Browser blocked autoplay; wait for user interaction
      const handleFirstInteraction = () => {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(err => console.log("Audio play error:", err));
        
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
    });
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioFile} preload="auto" />

      {/* Floating Audio Control Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#d4af37]/60 text-[#8c6d1d] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-110 transition flex items-center justify-center cursor-pointer"
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse text-[#d4af37]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </>
  );
};