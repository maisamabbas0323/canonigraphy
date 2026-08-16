import React from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface TopHeaderProps {
  onNavigateHome: () => void;
  onOpenAbout: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  visitedCount: number;
  totalBreeds: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onNavigateHome,
  onOpenAbout,
  isMuted,
  onToggleMute,
  visitedCount,
  totalBreeds,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-6 md:px-10 py-5 flex items-center justify-between pointer-events-none">
      {/* Brand Wordmark */}
      <div className="flex items-center space-x-3 pointer-events-auto">
        <button
          id="top-brand-btn"
          onClick={() => {
            soundEffects.playTab();
            onNavigateHome();
          }}
          className="text-left focus:outline-none group flex items-baseline space-x-3"
        >
          <span className="text-sm md:text-base font-serif-display font-semibold tracking-[0.25em] text-[#F5F5F0] uppercase transition-colors group-hover:text-white">
            CANINOGRAPHY
          </span>
          <span className="hidden sm:inline-block text-[11px] font-sans text-[#8C8C87] tracking-wider uppercase">
            A Living Archive of Earth's Dogs
          </span>
        </button>
      </div>

      {/* Right quiet controls: Progress & Audio toggle */}
      <div className="flex items-center space-x-4 pointer-events-auto">
        {/* Subtle exploration progress */}
        <div className="text-[12px] font-sans text-[#8C8C87] tracking-wide hidden sm:block">
          <span className="text-[#F5F5F0] font-medium">{visitedCount}</span> of {totalBreeds} explored
        </div>

        {/* UI Feedback sound toggle */}
        <button
          id="top-audio-toggle"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute UI Sound Effects' : 'Mute UI Sound Effects'}
          className="p-2 rounded-full text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors focus:outline-none"
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white/50" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {/* Information modal button */}
        <button
          id="top-info-btn"
          onClick={() => {
            soundEffects.playClick();
            onOpenAbout();
          }}
          aria-label="About Caninography Archive"
          className="p-2 rounded-full text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors focus:outline-none"
          title="Archive Information"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
