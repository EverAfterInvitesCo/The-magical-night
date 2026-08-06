import React, { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (!isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      isRunningRef.current = false;
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      isRunningRef.current = true;

      // Romantic Oriental Pentatonic Harp Progression (F#, G#, A#, C#, D#)
      const freqs = [369.99, 415.3, 466.16, 554.37, 622.25, 739.99];

      let noteIndex = 0;

      const playNextNote = () => {
        if (!isRunningRef.current || !audioCtxRef.current) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine wave for harp/flute feel
        osc.type = 'sine';
        const freq = freqs[noteIndex % freqs.length];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 2.6);

        noteIndex = (noteIndex + 1) % freqs.length;

        // Schedule next soft note
        setTimeout(playNextNote, 800 + Math.random() * 400);
      };

      playNextNote();
    } catch (e) {
      console.warn('Web Audio API not allowed without interaction');
    }

    return () => {
      isRunningRef.current = false;
    };
  }, [isPlaying]);

  return null;
};
