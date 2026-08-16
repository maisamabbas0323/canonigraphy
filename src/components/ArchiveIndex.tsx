import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, X, Sparkles, BookOpen, ArrowUpRight } from 'lucide-react';
import { Breed } from '../types';
import { getBreedCuriosity } from '../data/breedCuriosities';

interface ArchiveIndexProps {
  breeds: Breed[];
  onSelectBreed: (slug: string) => void;
  onOpenDossier?: (slug: string) => void;
}

type SortOption = 'name-asc' | 'name-desc' | 'era' | 'country' | 'group';

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({
  breeds,
  onSelectBreed,
  onOpenDossier,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Authoritative categories
  const categories = ['ALL', 'HERDING', 'HOUND', 'SPORTING', 'WORKING', 'TOY', 'TERRIER', 'NON-SPORTING'];

  const letters = useMemo(() => {
    const set = new Set(breeds.map((b) => b.name[0].toUpperCase()));
    return ['ALL', ...Array.from(set).sort()];
  }, [breeds]);

  const filteredBreeds = useMemo(() => {
    let result = breeds.filter((b) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          b.name.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q) ||
          b.purpose.toLowerCase().includes(q) ||
          b.group.toLowerCase().includes(q) ||
          b.originEra.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedGroup !== 'ALL') {
        if (selectedGroup === 'HERDING' && b.group.toUpperCase() !== 'HERDING') return false;
        if (selectedGroup === 'HOUND' && b.group.toUpperCase() !== 'HOUND') return false;
        if (selectedGroup === 'SPORTING' && b.group.toUpperCase() !== 'SPORTING') return false;
        if (selectedGroup === 'WORKING' && b.group.toUpperCase() !== 'WORKING') return false;
        if (selectedGroup === 'TOY' && b.group.toUpperCase() !== 'TOY') return false;
        if (selectedGroup === 'TERRIER' && b.group.toUpperCase() !== 'TERRIER') return false;
        if (selectedGroup === 'NON-SPORTING' && b.group.toUpperCase() !== 'NON-SPORTING') return false;
      }

      if (selectedLetter !== 'ALL' && b.name[0].toUpperCase() !== selectedLetter) {
        return false;
      }

      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'country':
          return a.country.localeCompare(b.country);
        case 'group':
          return a.group.localeCompare(b.group);
        case 'era':
          return a.originEra.localeCompare(b.originEra);
        default:
          return 0;
      }
    });

    return result;
  }, [breeds, searchQuery, selectedGroup, selectedLetter, sortBy]);

  return (
    <div
      id="archive-index-page"
      className="min-h-screen bg-[#050505] text-[#F5F5F2] pt-28 pb-24 px-6 md:pl-28 md:pr-16 selection:bg-white selection:text-black"
    >
      {/* 1. EDITORIAL PAGE HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/5 gap-8">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C8C87] uppercase block mb-1">
              VOL. I // CENTRAL REGISTRY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-none uppercase">
              THE ARCHIVE
            </h1>
            <p className="mt-3 text-sm font-sans text-[#8C8C87] max-w-2xl font-light leading-relaxed">
              An authoritative visual index documenting breed lineage, morphology, geography, purpose, and cultural history.
            </p>
          </div>

          {/* Filtering Tools Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C87]/80 stroke-[1.5]" />
              <input
                id="archive-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lineage, era, country..."
                className="w-full bg-[#0D0D0D] border border-white/5 rounded-full pl-11 pr-10 py-3 text-xs font-sans text-white placeholder:text-[#8C8C87]/50 focus:outline-none focus:border-white/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C87] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 bg-[#0D0D0D] border border-white/5 rounded-full px-4 py-3 text-xs text-[#8C8C87]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8C8C87]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
              >
                <option value="name-asc" className="bg-[#0D0D0D] text-white">NAME (A–Z)</option>
                <option value="name-desc" className="bg-[#0D0D0D] text-white">NAME (Z–A)</option>
                <option value="country" className="bg-[#0D0D0D] text-white">COUNTRY</option>
                <option value="group" className="bg-[#0D0D0D] text-white">GROUP</option>
                <option value="era" className="bg-[#0D0D0D] text-white">ERA</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTERS */}
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-none border-b border-white/5">
          <span className="text-[10px] font-mono text-[#8C8C87] uppercase tracking-wider mr-2 flex-shrink-0">
            GROUP FILTER:
          </span>
          {categories.map((group) => {
            const isSelected = selectedGroup === group;
            return (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-sans tracking-wide uppercase transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#F5F5F2] text-black font-semibold'
                    : 'bg-white/[0.03] text-[#8C8C87] hover:text-[#F5F5F2] hover:bg-white/[0.08]'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Alphabetical jump filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-white/5 text-xs">
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono text-[#8C8C87] uppercase tracking-wider mr-2 flex-shrink-0">
              ALPHABET:
            </span>
            {letters.map((letter) => {
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono transition-colors ${
                    isSelected
                      ? 'bg-white text-black font-semibold'
                      : 'text-[#8C8C87] hover:text-[#F5F5F2] hover:bg-white/5'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-[#8C8C87] tracking-wider uppercase">
            REGISTRY SIZE: <span className="text-white font-semibold">{filteredBreeds.length}</span> / {breeds.length} ENTRIES
          </div>
        </div>
      </div>

      {/* 3. COLLECTIBLE GRID */}
      <div className="max-w-7xl mx-auto">
        {filteredBreeds.length === 0 ? (
          <div className="py-24 text-center border border-white/5 rounded-3xl bg-[#0D0D0D] px-6">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-2">
              RECORDS DEPT
            </span>
            <p className="font-serif text-2xl text-white font-light">NO RECORDS FOUND</p>
            <p className="mt-2 text-xs text-[#8C8C87] max-w-sm mx-auto leading-relaxed">
              Try adjusting your filters, searching for alternate periods, or reset the catalog.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGroup('ALL');
                setSelectedLetter('ALL');
              }}
              className="mt-6 px-6 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#F5F5F2] transition-colors"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBreeds.map((breed) => {
              const mainImg = breed.images && breed.images.length > 0 ? breed.images[0].url : '';
              const curiosity = getBreedCuriosity(breed.slug, breed);
              return (
                <div
                  key={breed.slug}
                  id={`archive-card-${breed.slug}`}
                  style={{
                    transitionProperty: 'transform, border-color, box-shadow',
                    transitionDuration: '350ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="group relative bg-[#0D0D0D] border border-white/5 hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Image container with sophisticated shift and slow zoom */}
                  <div
                    onClick={() => onSelectBreed(breed.slug)}
                    className="relative aspect-[16/11] overflow-hidden bg-[#050505] cursor-pointer"
                  >
                    <img
                      src={mainImg}
                      alt={breed.name}
                      loading="lazy"
                      style={{
                        transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="w-full h-full object-cover filter contrast-[1.04] brightness-90 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30 pointer-events-none" />

                    {/* Meta overlay label */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#050505]/80 backdrop-blur-md border border-white/5 text-[9px] font-mono text-white/70 uppercase tracking-widest">
                      {breed.group}
                    </div>

                    {/* Coordinates bottom right */}
                    <div className="absolute bottom-3 right-4 text-[9px] font-mono text-white/40 tracking-wider">
                      {breed.coordinates.lat.toFixed(1)}°N, {breed.coordinates.lng.toFixed(1)}°W
                    </div>
                  </div>

                  {/* Editorial Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8C87] tracking-wider uppercase">
                        <span>{breed.country}</span>
                        <span>{breed.originEra}</span>
                      </div>

                      <h3
                        onClick={() => onSelectBreed(breed.slug)}
                        className="text-2xl font-serif text-white group-hover:text-[#F5F5F2] cursor-pointer transition-colors leading-tight uppercase font-light"
                      >
                        {breed.name}
                      </h3>

                      <p className="text-xs text-[#8C8C87] leading-relaxed font-light line-clamp-2">
                        {breed.purpose}
                      </p>
                    </div>

                    {/* Key characteristics list */}
                    <div className="pt-4 border-t border-white/5 text-[10px] text-[#8C8C87] space-y-1.5 font-mono uppercase tracking-wider">
                      <div className="flex justify-between">
                        <span>Framework Class</span>
                        <span className="text-white font-medium">{breed.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Primary Specialty</span>
                        <span className="text-white font-medium truncate max-w-[150px]">{curiosity.superpower.title}</span>
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectBreed(breed.slug)}
                        className="flex-1 py-3 bg-white text-black hover:bg-[#F5F5F2] text-[10px] font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <span>EXPLORE DOSSIER</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {onOpenDossier && (
                        <button
                          onClick={() => onOpenDossier(breed.slug)}
                          className="py-3 px-4 bg-[#141414] hover:bg-[#181818] border border-white/5 text-[10px] font-mono text-[#F5F5F2] hover:text-white transition-all uppercase tracking-widest"
                          title="Open Detailed Record"
                        >
                          INFO
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
