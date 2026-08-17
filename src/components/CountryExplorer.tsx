import React, { useState } from 'react';
import { ArrowUpRight, Compass, Layers, Zap } from 'lucide-react';
import { Breed } from '../types';
import { COUNTRIES } from '../data/countries';
import { getBreedCuriosity } from '../data/breedCuriosities';
import { useCountryInfo } from '../hooks/useCountryInfo';

interface CountryExplorerProps {
  breeds: Breed[];
  onSelectBreed: (slug: string) => void;
  onPlayCountryDocumentary: (countryCode: string) => void;
}

export const CountryExplorer: React.FC<CountryExplorerProps> = ({
  breeds,
  onSelectBreed,
}) => {
  const countries = Object.values(COUNTRIES);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    countries[0]?.code || 'DE'
  );

  const activeCountry = countries.find((c) => c.code === selectedCountryCode) || countries[0];
  const countryBreeds = breeds.filter(
    (b) => b.countryCode === activeCountry.code || activeCountry.breedSlugs.includes(b.slug)
  );

  const extractCoords = (coords: any): { lat: number; lng: number } => {
    if (!coords) return { lat: 0, lng: 0 };
    if (Array.isArray(coords)) return { lat: coords[0] ?? 0, lng: coords[1] ?? 0 };
    return { lat: coords.lat ?? 0, lng: coords.lng ?? 0 };
  };

  const activeCoords = extractCoords(activeCountry?.coordinates);
  const { info: countryInfo, isLoading: countryInfoLoading } = useCountryInfo(
    activeCountry.code,
    activeCountry.historicalContext || ''
  );

  return (
    <div
      id="origins-page"
      className="min-h-screen bg-[#050505] text-[#F5F5F2] pt-28 pb-24 px-6 md:pl-28 md:pr-16 selection:bg-white selection:text-black"
    >
      {/* 1. EDITORIAL HEADER */}
      <div className="max-w-7xl mx-auto mb-10 pb-6 border-b border-white/5">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C8C87] uppercase block mb-1">
          VOL. I // TERRITORY & BIOME
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-none uppercase">
          ORIGINS
        </h1>
        <p className="mt-3 text-sm font-sans text-[#8C8C87] max-w-2xl font-light leading-relaxed">
          Geographic evolution of breeds traced across unique environmental biomes, microclimates, and ancient pastoral pathways.
        </p>
      </div>

      {/* 2. SPLIT LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Scrollable Region/Country List */}
        <div className="lg:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-3xl p-5 max-h-[650px] overflow-y-auto space-y-2 scrollbar-thin shadow-xl">
          <div className="text-[10px] font-mono text-[#8C8C87] uppercase tracking-wider px-3 py-2 border-b border-white/5 flex items-center justify-between mb-2">
            <span>REGIONAL ARCHIVES</span>
            <span>{countries.length} BIOMES</span>
          </div>

          {countries.map((country) => {
            const isSelected = country.code === activeCountry.code;
            return (
              <button
                key={country.code}
                id={`country-list-${country.code.toLowerCase()}`}
                onClick={() => setSelectedCountryCode(country.code)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#F5F5F2] text-black font-semibold shadow-lg scale-[1.01]'
                    : 'text-[#8C8C87] hover:text-[#F5F5F2] hover:bg-white/[0.03]'
                }`}
              >
                <div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider block mb-0.5 ${
                      isSelected ? 'text-black/60 font-semibold' : 'text-[#8C8C87]'
                    }`}
                  >
                    {country.region}
                  </span>
                  <span className="text-sm font-serif uppercase tracking-wide">{country.name}</span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold ${
                    isSelected ? 'bg-black/10 text-black' : 'bg-white/5 text-white/60'
                  }`}
                >
                  {country.breedCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Selected Region Information */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed visual geographic context */}
          <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="pb-5 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#8C8C87] tracking-widest uppercase block">
                  {activeCountry.region} ORIGIN REGISTER
                </span>
                <h2 className="text-3xl font-serif text-white font-light mt-1 uppercase">
                  {activeCountry.name}
                </h2>
              </div>

              <div className="text-[10px] font-mono px-3.5 py-1.5 bg-[#141414] border border-white/5 text-white/80 tracking-wider">
                {countryBreeds.length} DOCUMENTED BREEDS
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest">
                GEOGRAPHIC & HISTORICAL CONTEXT
              </h4>
              <p className="text-sm text-[#D8D8D2] leading-relaxed font-light font-sans">
                {countryInfo.historicalContext}
              </p>
              {countryInfoLoading && (
                <div className="flex items-center space-x-2 text-[10px] text-white/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 animate-pulse" />
                  <span>Generating from gemini-3.1-flash-lite...</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-[11px] font-mono text-[#8C8C87] uppercase tracking-wider">
              <div>
                NATIVE TERRITORY: <span className="text-white font-semibold">{activeCountry.name}</span>
              </div>
              <div>
                GPS COORDS: <span className="text-white font-semibold font-mono">{activeCoords.lat.toFixed(2)}°N, {activeCoords.lng.toFixed(2)}°W</span>
              </div>
            </div>
          </div>

          {/* Connected Breed Cards */}
          <div>
            <h3 className="text-[10px] font-mono text-[#8C8C87] tracking-wider uppercase mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-white/50" />
              <span>NATIVE CANINE SPECIES INDEX ({countryBreeds.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {countryBreeds.map((breed) => {
                const img = breed.images && breed.images.length > 0 ? breed.images[0].url : '';
                const curiosity = getBreedCuriosity(breed.slug, breed);
                return (
                  <div
                    key={breed.slug}
                    onClick={() => {
                      onSelectBreed(breed.slug);
                      const showcaseBtn = document.getElementById('nav-item-documentary');
                      showcaseBtn?.click();
                    }}
                    className="group bg-[#0D0D0D] border border-white/5 hover:border-white/15 rounded-2xl p-4 flex items-center space-x-4 cursor-pointer transition-all hover:bg-white/[0.02] shadow-md"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#050505] flex-shrink-0">
                      <img
                        src={img}
                        alt={breed.name}
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block">{breed.group}</span>
                      <h4 className="text-sm font-serif font-medium text-white group-hover:text-white truncate uppercase">
                        {breed.name}
                      </h4>
                      <p className="text-[11px] text-[#8C8C87] truncate font-light mt-0.5">
                        {breed.purpose}
                      </p>
                      <div className="mt-1 flex items-center space-x-1 text-[9px] text-amber-300/80 font-mono truncate">
                        <Zap className="w-2.5 h-2.5 fill-current flex-shrink-0" />
                        <span className="truncate">{curiosity.superpower.title}</span>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-[#8C8C87] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
