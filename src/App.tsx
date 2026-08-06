import React, { useState } from 'react';
import { IntroVideo } from './components/IntroVideo';
import { BackgroundParticles } from './components/BackgroundParticles';
import { HeroSection } from './components/HeroSection';
import { ScratchCountdown } from './components/ScratchCountdown';
import { VenueSection } from './components/VenueSection';
import { ScheduleSection } from './components/ScheduleSection';
import { StorySection } from './components/StorySection';
import { GuestbookSection } from './components/GuestbookSection';
import { FooterSection } from './components/FooterSection';
import { RsvpModal } from './components/RsvpModal';
import { BackgroundMusic } from './components/BackgroundMusic';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  return (
    <div className="min-h-screen relative text-[#2c2825] font-cairo selection:bg-[#d4af37]/30 selection:text-[#5a461b]">
      {/* Autoplay Fullscreen Intro Video Component */}
      {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}

      {/* Dynamic Night-to-Day Background Atmosphere & Floating Particles */}
      <BackgroundParticles />

      {/* Automatic Background Music Player */}
      <BackgroundMusic />

      {/* Main One-Page Website Content */}
      <main className="relative z-10">
        <HeroSection />

        <ScratchCountdown />

        <VenueSection />

        <ScheduleSection />

        <StorySection />

        <GuestbookSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* RSVP Modal */}
      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </div>
  );
}