import React from 'react';
import { RotateCcw, BookOpen, Globe, Sparkles, CheckCircle2, Activity, Terminal } from 'lucide-react';

interface ArchiveSummaryProps {
  exploredCount: number;
  totalBreeds: number;
  countriesCount: number;
  chaptersCount: number;
  onReplay: () => void;
  onExploreArchive: () => void;
  onExploreMap: () => void;
}

export const ArchiveSummary: React.FC<ArchiveSummaryProps> = ({
  exploredCount,
  totalBreeds,
  countriesCount,
  chaptersCount,
  onReplay,
  onExploreArchive,
  onExploreMap,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col justify-between p-6 md:p-12 select-none animate-fadeIn text-slate-300">
      <div className="absolute inset-0 film-grain pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono-meta text-slate-500 border-b border-slate-800 pb-3">
        <div className="tracking-wider uppercase text-emerald-400 flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>EPILOGUE // EXPEDITION_COMPENDIUM</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>STATUS: CONCLUDED</span>
        </div>
      </div>

      {/* Center Cinematic Statement & Metrics */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto space-y-6">
        <div className="space-y-1">
          <div className="text-[10px] font-mono-meta tracking-widest text-indigo-400 uppercase">
            THE ARCHIVE ENDS. BUT THE STORY CONTINUES.
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white uppercase tracking-tight">
            CANINOGRAPHY
          </h2>
        </div>

        <p className="text-lg sm:text-xl font-editorial italic text-slate-300 max-w-xl mx-auto leading-relaxed">
          "Thousands of years of working partnership, recorded one lineage at a time."
        </p>

        {/* Real Statistics Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto border-y border-slate-800 py-4 text-xs font-mono-meta">
          <div className="p-3 bg-slate-900/60 rounded border border-slate-800 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-white font-serif-display">
              {exploredCount}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">BREEDS EXPLORED</div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-white font-serif-display">
              {countriesCount}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">NATIONS LOGGED</div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-white font-serif-display">
              {chaptersCount}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">CHAPTERS ARCHIVED</div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800 space-y-0.5">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-serif-display">
              100%
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">EXPEDITION COMPLETE</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onReplay}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded text-xs font-mono-meta tracking-wider font-bold uppercase transition-all shadow-xl active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY DOCUMENTARY</span>
          </button>

          <button
            onClick={onExploreArchive}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 px-5 py-3 rounded text-xs font-mono-meta tracking-wider uppercase transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>EXPLORE ARCHIVE</span>
          </button>

          <button
            onClick={onExploreMap}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 px-5 py-3 rounded text-xs font-mono-meta tracking-wider uppercase transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPLORE ATLAS</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-[10px] font-mono-meta text-slate-500 border-t border-slate-800 pt-3">
        CANINOGRAPHY // THE LIVING TELEMETRY ARCHIVE OF EARTH'S DOGS
      </div>
    </div>
  );
};

