import React from 'react';
import { X, BookOpen, Shield, Sparkles } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="about-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          soundEffects.playDrawerClose();
          onClose();
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[85vh] overflow-y-auto text-[#F5F5F0]">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-medium text-[#F5F5F0]">
              CANINOGRAPHY
            </h2>
            <p className="text-xs font-sans text-[#8C8C87] mt-1">
              A visual natural history archive of the world's dogs.
            </p>
          </div>

          <button
            onClick={() => {
              soundEffects.playDrawerClose();
              onClose();
            }}
            className="p-1.5 rounded-full text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs font-sans text-[#D8D8D2] leading-relaxed font-light">
          <p className="font-serif-display text-sm text-[#F5F5F0] italic leading-normal">
            Caninography is an interactive visual showcase and natural history encyclopedia documenting recognized dog breeds and their evolutionary adaptations from around the globe.
          </p>

          <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 space-y-1.5">
            <h3 className="text-xs font-serif-display uppercase tracking-wider text-[#F5F5F0] flex items-center space-x-2">
              <BookOpen className="w-3.5 h-3.5 text-[#8C8C87]" />
              <span>Historical & Kennel Standards</span>
            </h3>
            <p className="text-[#8C8C87] text-[11px] font-light">
              Breed standards, morphometrics, and geographic coordinates are verified against records from the Fédération Cynologique Internationale (FCI), The Kennel Club (UK), the American Kennel Club (AKC), and historical canine natural history publications.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 space-y-1.5">
            <h3 className="text-xs font-serif-display uppercase tracking-wider text-[#F5F5F0] flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-[#8C8C87]" />
              <span>Visual Imagery & Open Licensing</span>
            </h3>
            <p className="text-[#8C8C87] text-[11px] font-light">
              Visual photography across the archive is curated from verified open cultural collections, Creative Commons photographers, and historic photographic repositories.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[11px] font-sans text-[#8C8C87]">
          <span>Caninography Living Archive</span>
          <button
            onClick={() => {
              soundEffects.playDrawerClose();
              onClose();
            }}
            className="px-5 py-2 bg-white text-black font-medium rounded-full hover:bg-[#F5F5F0] transition-colors text-xs shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
