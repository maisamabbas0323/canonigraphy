import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, Zap } from 'lucide-react';
import { Breed } from '../types';
import { getBreedCuriosity } from '../data/breedCuriosities';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  breeds: Breed[];
  onSelectBreed: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  breeds,
  onSelectBreed,
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? breeds.filter((b) => {
        const q = query.toLowerCase();
        return (
          b.name.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q) ||
          b.purpose.toLowerCase().includes(q) ||
          b.group.toLowerCase().includes(q) ||
          (b.aliases && b.aliases.some((a) => a.toLowerCase().includes(q)))
        )
      })
    : breeds.slice(0, 6);

  return (
    <div
      id="search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 md:pt-28 animate-fade-in"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity"
      />

      {/* Dialog Frame */}
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-[#F5F5F2]">
        {/* Search Field */}
        <div className="flex items-center space-x-3 bg-black border border-white/5 focus-within:border-white/20 rounded-2xl px-5 py-4 transition-all">
          <Search className="w-5 h-5 text-[#8C8C87] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archive by breed name, country, or biome..."
            className="w-full bg-transparent text-sm font-sans text-white placeholder:text-[#8C8C87]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8C8C87] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[380px] overflow-y-auto space-y-2.5 scrollbar-thin pr-1">
          <span className="text-[10px] font-mono text-[#8C8C87] uppercase tracking-wider block px-1 mb-2">
            {query.trim() ? `SEARCH RESULTS (${results.length})` : 'AUTHORITATIVE ENTRIES'}
          </span>

          {results.map((breed) => {
            const curiosity = getBreedCuriosity(breed.slug, breed);
            return (
              <div
                key={breed.id}
                onClick={() => {
                  onSelectBreed(breed.slug);
                  onClose();
                }}
                className="group p-4 rounded-2xl bg-[#050505] hover:bg-[#121212] border border-white/[0.03] hover:border-white/10 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={breed.images[0]?.url}
                    alt={breed.name}
                    className="w-12 h-12 rounded-xl object-cover bg-black flex-shrink-0 filter contrast-[1.03]"
                  />
                  <div>
                    <span className="text-[9px] font-mono text-[#8C8C87] uppercase tracking-widest block">{breed.group}</span>
                    <h4 className="text-sm font-serif text-white uppercase group-hover:text-white leading-tight">
                      {breed.name}
                    </h4>
                    <div className="text-[10px] font-mono text-amber-300/80 flex items-center space-x-1 mt-0.5">
                      <Zap className="w-2.5 h-2.5 fill-current" />
                      <span>{curiosity.superpower.title}</span>
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-[#8C8C87] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              </div>
            );
          })}

          {results.length === 0 && (
            <div className="text-center py-12 text-xs font-mono text-[#8C8C87]">
              NO ARCHIVED ENTRIES FOUND MATCHING "{query.toUpperCase()}"
            </div>
          )}
        </div>

        {/* Footer info & shortcuts */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8C87] border-t border-white/5 pt-4">
          <span>CANINOGRAPHY DIGITAL REGISTER</span>
          <div className="flex items-center space-x-1.5">
            <span>PRESS</span>
            <kbd className="bg-white/10 text-white px-2 py-0.5 rounded text-[9px] font-mono">ESC</kbd>
            <span>TO EXIT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
