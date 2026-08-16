import React, { useEffect } from 'react';
import { Play, ArrowRight, Activity, Terminal } from 'lucide-react';
import { ChapterInfo } from '../types';

interface ChapterCardProps {
  chapter: ChapterInfo;
  onContinue: () => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onContinue }) => {
  useEffect(() => {
    const autoTimer = setTimeout(() => {
      onContinue();
    }, 4500);

    return () => clearTimeout(autoTimer);
  }, [chapter.id, onContinue]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col justify-between p-6 md:p-12 select-none animate-fadeIn text-slate-300">
      <div className="absolute inset-0 film-grain pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-meta text-slate-500 tracking-wider uppercase border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CANINOGRAPHY_DOCUMENTARY // CHAPTER_SEQUENCE</span>
        </div>
        <div className="text-slate-400">CHAPTER {chapter.numberRoman} OF VI</div>
      </div>

      {/* Center Cinematic Title */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto space-y-6">
        <div className="text-xs font-mono-meta tracking-widest text-indigo-400 uppercase">
          CHAPTER {chapter.numberRoman}
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white uppercase tracking-wider">
          {chapter.title}
        </h2>

        <p className="text-lg sm:text-xl font-editorial italic text-slate-300 max-w-xl mx-auto leading-relaxed">
          "{chapter.subtitle}"
        </p>

        <p className="text-xs font-light text-slate-400 max-w-lg mx-auto pt-4 border-t border-slate-800">
          {chapter.description}
        </p>

        <div className="pt-4">
          <button
            onClick={onContinue}
            className="inline-flex items-center space-x-2.5 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded text-xs font-mono-meta tracking-wider font-bold uppercase transition-all shadow-xl active:scale-95"
          >
            <span>BEGIN CHAPTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono-meta text-slate-500 border-t border-slate-800 pt-3">
        <div className="flex items-center space-x-2">
          <span>ENVIRONMENT:</span>
          <span className="text-slate-300">{chapter.ambienceCategory}</span>
        </div>
        <div className="text-indigo-400 animate-pulse">AUTO-ADVANCING...</div>
      </div>
    </div>
  );
};

