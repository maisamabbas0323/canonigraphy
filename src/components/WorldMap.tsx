import React, { useState, useMemo } from 'react';
import { Sparkles, FileText, Globe2, Zap, ArrowUpRight } from 'lucide-react';
import { Breed } from '../types';
import { getBreedCuriosity } from '../data/breedCuriosities';

interface WorldMapProps {
  breeds: Breed[];
  currentBreed: Breed;
  onSelectBreed: (slug: string) => void;
  onPlayCountryDocumentary: (countryCode: string) => void;
  onOpenDossier?: (slug: string) => void;
}

type RegionFilter = 'ALL' | 'EUROPE' | 'ASIA' | 'AMERICAS' | 'AFRICA' | 'OCEANIA';

export const WorldMap: React.FC<WorldMapProps> = ({
  breeds,
  currentBreed,
  onSelectBreed,
  onOpenDossier,
}) => {
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(currentBreed);
  const [hoveredBreed, setHoveredBreed] = useState<Breed | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('ALL');

  const extractCoordinates = (coords: any): { lat: number; lng: number } => {
    if (!coords) return { lat: 0, lng: 0 };
    if (Array.isArray(coords)) {
      return { lat: coords[0] ?? 0, lng: coords[1] ?? 0 };
    }
    return { lat: coords.lat ?? 0, lng: coords.lng ?? 0 };
  };

  const getCoordinates = (lat: number, lng: number) => {
    // Equirectangular projection coordinates fitting
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 150) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(7, Math.min(93, y)) };
  };

  const filteredBreeds = useMemo(() => {
    if (selectedRegion === 'ALL') return breeds;
    return breeds.filter((b) => {
      const regionUpper = (b.region || '').toUpperCase();
      switch (selectedRegion) {
        case 'EUROPE':
          return regionUpper.includes('EUROPE') || regionUpper.includes('BRITISH') || regionUpper.includes('MEDITERRANEAN');
        case 'ASIA':
          return regionUpper.includes('ASIA') || regionUpper.includes('EAST') || regionUpper.includes('MIDDLE EAST');
        case 'AMERICAS':
          return regionUpper.includes('AMERICA') || regionUpper.includes('NORTH') || regionUpper.includes('SOUTH');
        case 'AFRICA':
          return regionUpper.includes('AFRICA');
        case 'OCEANIA':
          return regionUpper.includes('OCEANIA') || regionUpper.includes('AUSTRALIA');
        default:
          return true;
      }
    });
  }, [breeds, selectedRegion]);

  const activeDisplayBreed = hoveredBreed || selectedBreed || currentBreed;
  const activeCoords = extractCoordinates(activeDisplayBreed?.coordinates);
  const curiosity = getBreedCuriosity(activeDisplayBreed.slug, activeDisplayBreed);

  return (
    <div
      id="atlas-page"
      className="min-h-screen bg-[#050505] text-[#F5F5F2] pt-28 pb-24 px-6 md:pl-28 md:pr-16 selection:bg-white selection:text-black"
    >
      {/* 1. EDITORIAL HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/5 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C8C87] uppercase block mb-1">
              VOL. I // CARTOGRAPHY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-none uppercase">
              THE ATLAS
            </h1>
            <p className="mt-3 text-sm font-sans text-[#8C8C87] max-w-2xl font-light leading-relaxed">
              Visual exploration of breed origins across continents, trade routes, and evolutionary epicenters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8C8C87]">
            <div className="px-3 py-1 bg-[#0D0D0D] border border-white/5 uppercase tracking-wider text-[10px]">
              <span className="text-white font-semibold">{breeds.length}</span> GEO-POINTS
            </div>
            <div className="px-3 py-1 bg-[#0D0D0D] border border-white/5 uppercase tracking-wider text-[10px]">
              Projection: EQUIRECTANGULAR
            </div>
          </div>
        </div>
      </div>

      {/* 2. REGION FILTER BAR */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] font-mono text-[#8C8C87] uppercase tracking-wider mr-2 flex-shrink-0 flex items-center space-x-1">
          <Globe2 className="w-3.5 h-3.5" />
          <span>TERRITORIES:</span>
        </span>
        {(['ALL', 'EUROPE', 'ASIA', 'AMERICAS', 'AFRICA', 'OCEANIA'] as RegionFilter[]).map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all duration-300 ${
              selectedRegion === reg
                ? 'bg-[#F5F5F2] text-black font-semibold'
                : 'bg-white/[0.03] text-[#8C8C87] hover:text-[#F5F5F2] hover:bg-white/[0.08]'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* 3. CARTOGRAPHIC SCREEN */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map Canvas with subtle grid overlays */}
        <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/5 rounded-3xl relative h-[400px] sm:h-[480px] md:h-[540px] overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full border-b border-r border-white/20 grid grid-cols-6 grid-rows-4" />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10" />
          </div>

          {/* Clean minimal map projection trace */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-[0.12] filter invert brightness-150"
          >
            <path
              d="M 120,70 L 280,60 L 320,130 L 260,190 L 220,250 L 180,210 L 140,160 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="2"
            />
            <path
              d="M 230,270 L 320,290 L 340,370 L 280,460 L 240,370 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="2"
            />
            <path
              d="M 450,100 L 530,90 L 560,140 L 520,180 L 460,170 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="2"
            />
            <path
              d="M 460,190 L 550,190 L 580,270 L 540,380 L 480,310 L 450,230 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="2"
            />
            <path
              d="M 540,80 L 800,90 L 830,190 L 760,250 L 680,270 L 600,200 L 560,140 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="2"
            />
            <path
              d="M 770,330 L 860,330 L 870,400 L 800,420 Z"
              fill="none"
              stroke="#F5F5F0"
              strokeWidth="2"
            />
          </svg>

          {/* Interactive Geographic Marker Nodes */}
          <div className="absolute inset-0 pointer-events-auto">
            {filteredBreeds.map((breed) => {
              const { lat, lng } = extractCoordinates(breed.coordinates);
              const { x, y } = getCoordinates(lat, lng);
              const isSelected = breed.slug === activeDisplayBreed?.slug;

              return (
                <button
                  key={breed.slug}
                  id={`map-node-${breed.slug}`}
                  onClick={() => setSelectedBreed(breed)}
                  onMouseEnter={() => setHoveredBreed(breed)}
                  onMouseLeave={() => setHoveredBreed(null)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-3 group focus:outline-none z-10"
                  aria-label={`${breed.name}, ${breed.country}`}
                >
                  {/* Subtle pulsing concentric ring animation */}
                  <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-white/10 scale-150 animate-ping' : ''
                  }`} />

                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-white ring-4 ring-white/20 scale-150 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                        : 'bg-white/40 group-hover:bg-white group-hover:scale-125'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. DETAILS SIDE-PANEL - Sophisticated, minimal design, NO playback */}
        <div className="lg:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8C87] tracking-widest uppercase">
            <span>TERRITORY SNAPSHOT</span>
            <span className="text-white font-mono">{activeDisplayBreed.countryCode || 'INTL'}</span>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-lg">
            <img
              src={activeDisplayBreed.images[0]?.url}
              alt={activeDisplayBreed.name}
              className="w-full h-full object-cover filter contrast-[1.03] brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest block">
                {activeDisplayBreed.country}
              </span>
              <h3 className="text-2xl font-serif text-[#F5F5F2] font-light leading-tight uppercase">
                {activeDisplayBreed.name}
              </h3>
            </div>
          </div>

          {/* Superpower specification */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{curiosity.superpower.title}</span>
            </div>
            <p className="text-xs text-[#D8D8D2] font-light leading-relaxed">
              {curiosity.superpower.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-[#8C8C87] font-mono uppercase tracking-wider">
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>ORIGIN LOCATION</span>
              <span className="text-white font-medium">{activeDisplayBreed.country}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>HISTORICAL ERA</span>
              <span className="text-white font-medium">{activeDisplayBreed.originEra}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>WORKING GROUP</span>
              <span className="text-white font-medium">{activeDisplayBreed.group}</span>
            </div>
            <div className="flex justify-between">
              <span>GPS COORDS</span>
              <span className="text-white font-mono text-right">
                {activeCoords.lat.toFixed(2)}°N, {activeCoords.lng.toFixed(2)}°W
              </span>
            </div>
          </div>

          {/* Action trigger to dossier */}
          <button
            onClick={() => {
              onSelectBreed(activeDisplayBreed.slug);
              // Switch view to showcase
              const showBtn = document.getElementById('nav-item-documentary');
              showBtn?.click();
              // Scroll to the detailed dossier
              setTimeout(() => {
                const doc = document.getElementById('editorial-dossier');
                doc?.scrollIntoView({ behavior: 'smooth' });
              }, 400);
            }}
            className="w-full py-4 bg-white text-black hover:bg-[#F5F5F2] font-sans font-bold tracking-wider text-xs uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>VIEW DOSSIER</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
