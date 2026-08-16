import React, { useState, useEffect } from 'react';
import { Play, FastForward, Activity, Terminal } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 3200);
    const timer3 = setTimeout(() => setStep(3), 6400);
    const timer4 = setTimeout(() => setStep(4), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col justify-between p-6 md:p-12 select-none animate-fadeIn text-slate-300">
      <div className="absolute inset-0 film-grain pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono-meta text-slate-500 border-b border-slate-800 pb-3">
        <div className="tracking-wider uppercase text-emerald-400 flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>PROLOGUE // THE_ANCIENT_BOND</span>
        </div>
        <button
          id="intro-skip-btn"
          onClick={onSkip}
          className="flex items-center space-x-1.5 text-slate-400 hover:text-indigo-400 transition-colors uppercase"
        >
          <span>SKIP PROLOGUE</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Cinematic Card Transitions */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto space-y-6">
        {step >= 1 && (
          <div className="text-[10px] font-mono-meta tracking-widest text-indigo-400 uppercase transition-all duration-1000 ease-out transform translate-y-0 opacity-100">
            PROLOGUE // SEQUENCE_01
          </div>
        )}

        {step >= 1 && (
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display text-white tracking-wider leading-none uppercase">
            CANIS FAMILIARIS
          </h2>
        )}

        {step >= 2 && (
          <div className="space-y-3 text-lg sm:text-xl md:text-2xl font-editorial italic text-slate-300 leading-relaxed transition-all duration-1000">
            <p className="text-white">Before the breed standard, there was the bond.</p>
            <p className="text-slate-400">Before the nomenclature, there was the shared survival.</p>
          </div>
        )}

        {step >= 3 && (
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto leading-relaxed border-t border-slate-800 pt-4 transition-all duration-1000">
            Across millennia, working canines journeyed beside humanity—adapting through distinct geographies, working roles, and cultural lineages across every continent.
          </p>
        )}

        {step >= 4 && (
          <div className="pt-6 space-y-4 transition-all duration-700">
            <div className="text-[10px] font-mono-meta tracking-widest text-emerald-400 uppercase">
              ARCHIVE_READY // INITIALIZE_SYSTEM
            </div>

            <button
              id="intro-begin-btn"
              onClick={onComplete}
              className="inline-flex items-center space-x-2.5 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded text-xs font-mono-meta tracking-wider uppercase font-bold transition-all shadow-xl active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>ENTER THE ARCHIVE</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom pagination */}
      <div className="relative z-10 flex justify-center space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-6 h-0.5 rounded-full transition-all duration-500 ${
              step >= i ? 'bg-indigo-500' : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

