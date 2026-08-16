import React from 'react';
import { Play, ArrowDown, Sparkles, BookOpen, Activity, Terminal } from 'lucide-react';

interface HeroProps {
  onStartDocumentary: () => void;
  onExploreArchive: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartDocumentary,
  onExploreArchive,
}) => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-between p-6 md:p-12 bg-[#030712] overflow-hidden select-none">
      {/* Background cinematic photograph with monochrome film treatment & telemetry grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=2400&q=85"
          alt="Canine cinematic archive portrait"
          className="w-full h-full object-cover img-monochrome opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-[#030712]/90" />
        <div className="absolute inset-0 vignette-overlay pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none" />
        <div className="absolute inset-0 telemetry-grid opacity-40 pointer-events-none" />
      </div>

      {/* Top micro metadata header */}
      <div className="relative z-10 flex items-center justify-between pt-12 md:pt-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono-meta tracking-widest text-emerald-400 uppercase">
            ARCHIVE_COMMAND // EST. GLOBAL_REPOSITORY
          </span>
        </div>
        <div className="text-[10px] font-mono-meta tracking-wider text-slate-500 hidden sm:flex items-center gap-2">
          <span>CLASSIFICATION_TIER:</span>
          <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 text-[9px]">FCI_AKC_VERIFIED</span>
        </div>
      </div>

      {/* Central hero display statement */}
      <div className="relative z-10 max-w-4xl space-y-6 my-auto">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[10px] font-mono-meta text-indigo-400">
            <Terminal className="w-3 h-3 text-indigo-400" />
            <span>IMMERSIVE_NATURAL_HISTORY_ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display font-bold text-white tracking-tight leading-[0.95] uppercase">
            CANINOGRAPHY
          </h1>
        </div>

        <div className="border-l-2 border-indigo-500/60 pl-5 space-y-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-editorial text-slate-100 italic font-light leading-snug">
            "Every breed has an origin. Every origin has a story."
          </p>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
            Spanning millennia of human migration, geographic radiation, working purpose, and ancient partnership across seven continents.
          </p>
        </div>

        {/* High Density Telemetry Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl pt-2">
          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-semibold text-slate-500 uppercase">Documented Breeds</span>
              <span className="text-emerald-400 text-[9px] font-mono">+100%</span>
            </div>
            <div className="text-xl font-light text-white mt-0.5">12+</div>
            <div className="mt-1 w-full bg-slate-800 h-1 rounded overflow-hidden">
              <div className="bg-indigo-500 h-full w-full"></div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-semibold text-slate-500 uppercase">Working Clusters</span>
              <span className="text-indigo-400 text-[9px] font-mono">Verified</span>
            </div>
            <div className="text-xl font-light text-white mt-0.5">8</div>
            <div className="mt-1 flex gap-1">
              <div className="h-1 flex-1 bg-emerald-500 rounded"></div>
              <div className="h-1 flex-1 bg-emerald-500 rounded"></div>
              <div className="h-1 flex-1 bg-indigo-500 rounded"></div>
              <div className="h-1 flex-1 bg-slate-800 rounded"></div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-semibold text-slate-500 uppercase">Regional Origins</span>
              <span className="text-slate-400 text-[9px] font-mono">Global</span>
            </div>
            <div className="text-xl font-light text-white mt-0.5">10+</div>
            <div className="mt-1 text-[9px] font-mono text-slate-500">
              Across 5 Continents
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-semibold text-slate-500 uppercase">Narration Engine</span>
              <span className="text-emerald-400 text-[9px] font-mono">Active</span>
            </div>
            <div className="text-xl font-light text-white mt-0.5">Gemini</div>
            <div className="mt-1 text-[9px] font-mono text-slate-600">
              AUDIO_DUCKING // ON
            </div>
          </div>
        </div>

        {/* Primary CTA controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            id="hero-play-doc-btn"
            onClick={onStartDocumentary}
            className="group flex items-center space-x-2.5 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded text-xs font-mono-meta tracking-wider uppercase font-semibold transition-all shadow-lg active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:translate-x-0.5" />
            <span>PLAY DOCUMENTARY</span>
          </button>

          <button
            id="hero-explore-archive-btn"
            onClick={onExploreArchive}
            className="flex items-center space-x-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 px-5 py-3 rounded text-xs font-mono-meta tracking-wider uppercase transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>EXPLORE ARCHIVE INDEX</span>
          </button>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-3">
        <div className="flex items-center space-x-3 text-[11px] font-mono-meta text-slate-500">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>GEMINI NATURAL-HISTORY PROSE & SPEECH ENGINE</span>
        </div>

        <button
          onClick={onStartDocumentary}
          className="flex items-center space-x-1.5 text-xs font-mono-meta text-slate-400 hover:text-white transition-colors"
        >
          <span className="tracking-widest uppercase text-[10px]">ENTER ARCHIVE</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

