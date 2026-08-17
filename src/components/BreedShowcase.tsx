import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Bookmark,
  Share2,
  Maximize2,
  Minimize2,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Breed } from '../types';
import { BREEDS } from '../data/breeds';
import { useBreedInfo } from '../hooks/useBreedInfo';

interface BreedShowcaseProps {
  currentBreed: Breed;
  breedIndex: number;
  totalBreeds: number;
  onPrevBreed: () => void;
  onNextBreed: () => void;
  onOpenDossier: () => void;
  onSelectCountry: (countryName: string) => void;
}

export const BreedShowcase: React.FC<BreedShowcaseProps> = ({
  currentBreed,
  breedIndex,
  totalBreeds,
  onPrevBreed,
  onNextBreed,
  onOpenDossier,
  onSelectCountry,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isFullscreenImage, setIsFullscreenImage] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('caninography_bookmarks');
      if (saved) {
        const arr = JSON.parse(saved);
        return arr.includes(currentBreed.slug);
      }
    } catch {}
    return false;
  });

  const dossierRef = useRef<HTMLDivElement>(null);

  const { info: curiosity, stats, isLoading: curiosityLoading } = useBreedInfo(currentBreed);

  const images =
    currentBreed.images && currentBreed.images.length > 0
      ? currentBreed.images
      : [
          {
            id: 'fallback-img',
            url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=1600&q=80',
            source: 'Public Archive',
            license: 'Editorial',
            credit: 'Archival Collection',
            alt: currentBreed.name,
          },
        ];

  const currentImage = images[selectedImageIndex] || images[0];

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [currentBreed.slug]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('caninography_bookmarks');
      if (saved) {
        const arr = JSON.parse(saved);
        setIsBookmarked(arr.includes(currentBreed.slug));
      } else {
        setIsBookmarked(false);
      }
    } catch {}
  }, [currentBreed.slug]);

  const handleToggleBookmark = () => {
    try {
      const saved = localStorage.getItem('caninography_bookmarks');
      let arr: string[] = saved ? JSON.parse(saved) : [];
      if (arr.includes(currentBreed.slug)) {
        arr = arr.filter((s) => s !== currentBreed.slug);
        setIsBookmarked(false);
      } else {
        arr.push(currentBreed.slug);
        setIsBookmarked(true);
      }
      localStorage.setItem('caninography_bookmarks', JSON.stringify(arr));
    } catch {}
  };

  const handleCopySummary = () => {
    const summaryText = `${currentBreed.name} (${currentBreed.country}, ${currentBreed.originEra})\n${currentBreed.purpose}\n\nSuperpower: ${curiosity.superpower.title}\n"${curiosity.superpower.description}"\n\n— Caninography: The Living Archive of Earth's Dogs`;
    navigator.clipboard.writeText(summaryText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    });
  };

  const scrollToDossier = () => {
    dossierRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split name for high-end cinematic title
  const renderCinematicTitle = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (
        <span className="block font-serif tracking-tight leading-none text-white text-[12vw] md:text-[6.5vw] uppercase font-light">
          {parts[0]}
          <span className="block font-serif font-extrabold text-[#F5F5F2]">
            {parts.slice(1).join(' ')}
          </span>
        </span>
      );
    }
    return (
      <span className="block font-serif font-extrabold tracking-tight leading-none text-white text-[12vw] md:text-[6.5vw] uppercase">
        {name}
      </span>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F2] md:pl-20 selection:bg-white selection:text-black">
      {/* 1. CINEMATIC HERO LANDING PANEL */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        {/* Full-bleed slow movement background */}
        <div className="absolute inset-0 z-0 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBreed.slug}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.55, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentImage.url}
                alt={currentBreed.name}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-75 select-none pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050505]/45 to-[#050505] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/60 to-transparent pointer-events-none hidden md:block" />
        </div>

        {/* Hero Top Brand Header */}
        <div className="relative z-10 px-6 md:px-12 pt-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
              The Living Visual Archive
            </span>
            <span className="font-serif text-lg tracking-[0.1em] text-white font-medium uppercase mt-0.5">
              CANINOGRAPHY
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono tracking-widest text-white/40">
              RECORDS DEPT // VOL. I
            </span>
          </div>
        </div>

        {/* Hero Central Editorial Context */}
        <div className="relative z-10 px-6 md:px-16 flex flex-col items-start max-w-4xl self-end mb-24 w-full md:pb-6">
          <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.2em] text-[#8C8C87] uppercase mb-4">
            <span>RECORD {String(breedIndex + 1).padStart(2, '0')} OF {totalBreeds}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>{currentBreed.country}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>{currentBreed.group}</span>
          </div>

          <div className="mb-6">
            {renderCinematicTitle(currentBreed.name)}
          </div>

          <p className="text-base md:text-lg font-light text-[#D8D8D2] leading-relaxed max-w-2xl mb-8 font-sans drop-shadow-sm">
            {currentBreed.purpose}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={scrollToDossier}
              className="px-8 py-4 bg-white text-black hover:bg-[#F5F5F2] font-sans font-semibold tracking-wider text-xs uppercase transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <span>EXPLORE DOSSIER</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onSelectCountry(currentBreed.country)}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans font-medium tracking-wider text-xs uppercase transition-all duration-300"
            >
              EXPLORE ORIGIN
            </button>
          </div>
        </div>

        {/* Hero Bottom Navigation Micro-bar */}
        <div className="relative z-10 w-full px-6 md:px-12 py-6 border-t border-white/5 flex items-center justify-between">
          <div className="text-[10px] font-mono text-[#8C8C87] tracking-widest">
            GEOGRAPHIC MAP: {currentBreed.coordinates.lat.toFixed(4)}°N, {currentBreed.coordinates.lng.toFixed(4)}°W
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onPrevBreed}
              aria-label="Previous breed"
              className="p-2.5 rounded-full bg-white/5 border border-white/5 text-[#8C8C87] hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNextBreed}
              aria-label="Next breed"
              className="p-2.5 rounded-full bg-white text-black hover:bg-[#F5F5F2] transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL DOSSIER WORKSPACE */}
      <div
        id="editorial-dossier"
        ref={dossierRef}
        className="relative z-10 px-6 md:px-16 py-20 bg-[#050505] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Quick Header actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase">
                Canine Monograph
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-white font-light tracking-wide mt-1">
                {currentBreed.name} Dossier
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleToggleBookmark}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  isBookmarked
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-[#0D0D0D] border-white/5 text-[#8C8C87] hover:text-white hover:bg-white/5'
                }`}
                title="Bookmark Breed Record"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleCopySummary}
                className="p-3 rounded-full bg-[#0D0D0D] border border-white/5 text-[#8C8C87] hover:text-white transition-all relative group"
                title="Share Document Snapshot"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {isCopied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-emerald-950 border border-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded whitespace-nowrap shadow-xl">
                    Snapshot Copied!
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsFullscreenImage(true)}
                className="p-3 rounded-full bg-[#0D0D0D] border border-white/5 text-[#8C8C87] hover:text-white transition-all"
                title="View Fullscreen Portrait"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECTION 01 - OVERVIEW & HISTORY (Split editorial layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/5 space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase block">
                  01 // SPECIFICATIONS
                </span>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline pb-2 border-b border-white/5 text-xs">
                    <span className="text-[#8C8C87]">OFFICIAL NAME</span>
                    <span className="text-white font-medium text-right">{currentBreed.name}</span>
                  </div>
                  <div className="flex justify-between items-baseline pb-2 border-b border-white/5 text-xs">
                    <span className="text-[#8C8C87]">COUNTRY OF ORIGIN</span>
                    <span className="text-white font-medium text-right">{currentBreed.country}</span>
                  </div>
                  <div className="flex justify-between items-baseline pb-2 border-b border-white/5 text-xs">
                    <span className="text-[#8C8C87]">HISTORICAL PERIOD</span>
                    <span className="text-white font-medium text-right">{currentBreed.originEra}</span>
                  </div>
                  <div className="flex justify-between items-baseline pb-2 border-b border-white/5 text-xs">
                    <span className="text-[#8C8C87]">WORKING GROUP</span>
                    <span className="text-white font-medium text-right">{currentBreed.group}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-[#8C8C87]">PRIMARY PURPOSE</span>
                    <span className="text-white font-medium text-right max-w-[180px] leading-tight">{currentBreed.size} Working Dog</span>
                  </div>
                </div>
              </div>

              {/* Adaptative trait highlighting */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Zap className="w-4 h-4 fill-current" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                    Anatomical Adaptation
                  </span>
                </div>
                <h4 className="text-sm font-serif text-white font-semibold">
                  {curiosity.superpower.title}
                </h4>
                <p className="text-xs text-[#8C8C87] leading-relaxed">
                  {curiosity.superpower.description}
                </p>
                <div className="pt-2 text-[10px] text-white/50 font-mono">
                  TRAIT: {curiosity.superpower.anatomicalTrait}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase block">
                  02 // HISTORY & NATURAL ORIGIN
                </span>
                <p className="text-xl md:text-2xl font-serif text-[#F5F5F2] font-light leading-relaxed">
                  {currentBreed.cinematicNarration || curiosity.history}
                </p>
                <div className="h-[1px] bg-white/5 my-6" />
                <p className="text-sm text-[#8C8C87] leading-relaxed">
                  {curiosity.history}
                </p>
                {curiosityLoading && (
                  <div className="flex items-center space-x-2 text-[10px] text-white/30 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 animate-pulse" />
                    <span>Generating from gemini-3.1-flash-lite...</span>
                  </div>
                )}
              </div>

              {/* Image panels (editorial secondary photographic collection) */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0D0D0D] border border-white/5 group">
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover filter contrast-[1.02] brightness-90 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-[9px] text-white/60">
                        {img.credit}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 02 - PHYSICAL CHARACTERISTICS & PERFORMANCE (Visual Timelines & Statistics) */}
          <div className="space-y-8">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase block text-center">
              03 // MORPHOMETRICS & METRIC ANALYSIS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat block 1 */}
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/5 space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-[#8C8C87] uppercase">Scent Acuity</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-serif font-bold text-white">{stats.scentIndex}</span>
                  <span className="text-xs font-mono text-white/50">/ 100</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${stats.scentIndex}%` }} />
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Olfactory receptors density indexing compared to native wild canines.
                </p>
              </div>

              {/* Stat block 2 */}
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/5 space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-[#8C8C87] uppercase">Top Sprint Velocity</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-serif font-bold text-white">{stats.sprintSpeedKmh}</span>
                  <span className="text-xs font-mono text-white/50">km/h</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(100, (stats.sprintSpeedKmh / 70) * 100)}%` }} />
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Peak burst sprint capability under optimal pastoral testing environments.
                </p>
              </div>

              {/* Stat block 3 */}
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/5 space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-[#8C8C87] uppercase">Bite Force</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-serif font-bold text-white">~{stats.biteForcePsi}</span>
                  <span className="text-xs font-mono text-white/50">PSI</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(100, (stats.biteForcePsi / 500) * 100)}%` }} />
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Calculated cranial leverage pressure during protective trials.
                </p>
              </div>

              {/* Stat block 4 */}
              <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/5 space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-[#8C8C87] uppercase">Trainability Index</span>
                <div className="flex items-baseline space-x-1.5 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">{i < stats.trainabilityRating ? '★' : '☆'}</span>
                  ))}
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed pt-2">
                  Adaptability index based on learning latency for multi-tier working sequences.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 03 - ANATOMICAL PROFILE */}
          <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase block mb-6">
              04 // DETAILED ANATOMICAL METRICS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-white/60 tracking-wider uppercase">FRAMEWORK</h4>
                <div className="space-y-2.5 text-xs text-[#8C8C87]">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span>HEIGHT range</span>
                    <span className="text-white font-mono">{currentBreed.height}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span>WEIGHT range</span>
                    <span className="text-white font-mono">{currentBreed.weight}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>SIZE CLASS</span>
                    <span className="text-white">{currentBreed.size} Size</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono text-white/60 tracking-wider uppercase">CLIMATIC CAPABILITIES</h4>
                <div className="space-y-2.5 text-xs text-[#8C8C87]">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Cold Tolerance</span>
                    <span className="text-white">{stats.coldTolerance}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span>Heat Tolerance</span>
                    <span className="text-white">{stats.heatTolerance}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Seasonal Shedding</span>
                    <span className="text-white font-mono">{stats.sheddingRating} / 5</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono text-white/60 tracking-wider uppercase">INSTINCTS & CHARACTERISTICS</h4>
                <div className="space-y-2 text-[#8C8C87]">
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentBreed.temperament.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/5 text-[10px] text-white/95 uppercase tracking-wide"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 04 - HISTORICAL TIMELINE */}
          <div className="space-y-8">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase block text-center">
              05 // ARCHIVAL TIMELINE & LANDMARKS
            </span>

            <div className="relative border-l border-white/10 ml-4 pl-8 py-4 space-y-8">
              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-black shadow" />
                <div className="text-xs font-mono text-white/40">ERA FOUNDATION</div>
                <h4 className="text-base font-serif text-white font-medium mt-0.5">{currentBreed.originEra}</h4>
                <p className="text-xs text-[#8C8C87] mt-1 leading-relaxed max-w-xl">
                  Refined genetic stabilization across {currentBreed.originDetailed || currentBreed.country}. Formulated primarily for {currentBreed.purpose}.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-white/20 border-4 border-black shadow" />
                <div className="text-xs font-mono text-white/40">REGISTER LANDMARK</div>
                <h4 className="text-base font-serif text-white font-medium mt-0.5">Formal Registry Entry</h4>
                <p className="text-xs text-[#8C8C87] mt-1 leading-relaxed max-w-xl">
                  Assigned formal registration cataloging. Catalogued in modern registries with reference to its native pedigree origins.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-white/20 border-4 border-black shadow" />
                <div className="text-xs font-mono text-white/40">CULTURAL PHENOMENON</div>
                <h4 className="text-base font-serif text-white font-medium mt-0.5">Contemporary Status</h4>
                <p className="text-xs text-[#8C8C87] mt-1 leading-relaxed max-w-xl">
                  {curiosity.loreSnippet}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 05 - CULTURAL IMPACT & LORE */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0D0D0D] to-transparent border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase block">
                06 // CULTURAL IMPACT & LORE
              </span>
              <h4 className="text-lg font-serif text-white font-light">
                "{curiosity.historicalFact}"
              </h4>
              <p className="text-xs text-[#8C8C87] leading-relaxed max-w-2xl">
                {curiosity.loreSnippet}
              </p>
            </div>
            <div className="md:col-span-4 p-5 rounded-2xl bg-[#0D0D0D] border border-white/5 space-y-2 text-center text-xs">
              <span className="text-[#8C8C87] font-mono tracking-widest uppercase block">ESTIMATED LIFESPAN</span>
              <span className="text-2xl font-serif text-white block">{currentBreed.lifespan}</span>
              <span className="text-[10px] text-white/30 leading-relaxed block">Generations of heritage dating back to {currentBreed.originEra}.</span>
            </div>
          </div>

          {/* SECTION 06 - RELATED DOCUMENTARY WORK & DEEP CONNECTIONS */}
          <div className="space-y-6 pt-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8C8C87] uppercase">
                  07 // RELATED SISTER ARCHIVES
                </span>
                <h4 className="text-sm font-serif text-white font-light mt-1">
                  Connected Lineages by Purpose & Geography
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentBreed.relatedBreeds && currentBreed.relatedBreeds.slice(0, 3).map((relSlug) => {
                const relBreed = BREEDS.find((b) => b.slug === relSlug);
                if (!relBreed) return null;
                const relImg = relBreed.images && relBreed.images.length > 0 ? relBreed.images[0].url : '';
                return (
                  <div
                    key={relSlug}
                    onClick={() => {
                      const idx = BREEDS.findIndex((b) => b.slug === relSlug);
                      if (idx !== -1) {
                        // Smoothly scroll back to top of the hero
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        // Trigger select
                        const btn = document.getElementById(`nav-item-documentary`);
                        btn?.click();
                        // Select breed by index
                        setTimeout(() => {
                          const jumpBtn = document.getElementById(`jump-btn-${relSlug}`);
                          jumpBtn?.click();
                        }, 300);
                      }
                    }}
                    className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02] cursor-pointer flex items-center space-x-4 group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-black flex-shrink-0">
                      <img src={relImg} alt={relBreed.name} className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">{relBreed.group}</span>
                      <span className="text-xs font-serif font-medium text-white group-hover:text-white block truncate">{relBreed.name}</span>
                      <span className="text-[10px] text-[#8C8C87] block truncate">{relBreed.country}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK SELECT JUMP RIBBON */}
      <div className="bg-[#080808] border-t border-white/5 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8C8C87] tracking-widest uppercase">
            <span>RIBBON SELECTION // DIRECT ARCHIVE EXPLORATION</span>
            <span>{BREEDS.length} ENTRIES</span>
          </div>
          <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-thin">
            {BREEDS.map((b) => {
              const isCurrent = b.slug === currentBreed.slug;
              const thumbImg = b.images && b.images.length > 0 ? b.images[0].url : '';
              return (
                <button
                  key={b.slug}
                  id={`jump-btn-${b.slug}`}
                  onClick={() => {
                    if (!isCurrent) {
                      const idx = BREEDS.findIndex((x) => x.slug === b.slug);
                      if (idx !== -1) {
                        const prevBtn = document.getElementById(`nav-item-documentary`);
                        prevBtn?.click();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        // Set state by simulating next/prev triggers or dispatching
                        // Let's use direct parent index update
                        const sliderButton = document.getElementById(`ribbon-ref-${b.slug}`);
                        sliderButton?.click();
                      }
                    }
                  }}
                  className={`flex-shrink-0 w-36 text-left rounded-2xl p-2.5 border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white border-white text-black scale-105'
                      : 'bg-[#0D0D0D] border-white/5 text-[#8C8C87] hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black mb-2 select-none pointer-events-none">
                    <img src={thumbImg} alt={b.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-serif font-medium truncate tracking-wide uppercase">
                    {b.name}
                  </div>
                  <div className={`text-[9px] truncate mt-0.5 ${isCurrent ? 'text-black/70' : 'text-white/40'}`}>
                    {b.country}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hidden virtual elements for programmatic click linking */}
      <div className="hidden">
        {BREEDS.map((b, idx) => (
          <button
            key={b.slug}
            id={`ribbon-ref-${b.slug}`}
            onClick={() => {
              // Click to jump via standard state handler
              const diff = idx - breedIndex;
              if (diff > 0) {
                for (let i = 0; i < diff; i++) onNextBreed();
              } else if (diff < 0) {
                for (let i = 0; i < Math.abs(diff); i++) onPrevBreed();
              }
            }}
          />
        ))}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {isFullscreenImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-8"
          onClick={() => setIsFullscreenImage(false)}
        >
          <div className="flex items-center justify-between text-white">
            <span className="text-xs font-mono tracking-widest text-white/50">CANINOGRAPHY ARCHIVAL PORTRAIT</span>
            <button
              onClick={() => setIsFullscreenImage(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img
              src={currentImage.url}
              alt={currentBreed.name}
              className="max-h-[80vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </div>

          <div className="text-center text-xs text-[#8C8C87] space-y-1">
            <p className="font-serif text-white text-base font-light">{currentBreed.name}</p>
            <p className="font-mono text-[10px]">{currentImage.credit} • {currentImage.license}</p>
          </div>
        </div>
      )}
    </div>
  );
};
