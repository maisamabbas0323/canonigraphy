import React from 'react';
import { X, ExternalLink, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Breed } from '../types';
import { getBreedCuriosity } from '../data/breedCuriosities';
import { soundEffects } from '../services/soundEffects';

interface BreedDetailPanelProps {
  breed: Breed | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelatedBreed: (slug: string) => void;
  onOpenCountry: (countryName: string) => void;
}

export const BreedDetailPanel: React.FC<BreedDetailPanelProps> = ({
  breed,
  isOpen,
  onClose,
  onSelectRelatedBreed,
  onOpenCountry,
}) => {
  if (!isOpen || !breed) return null;

  const curiosity = getBreedCuriosity(breed.slug, breed);

  return (
    <div
      id="breed-dossier-drawer"
      className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          soundEffects.playDrawerClose();
          onClose();
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Drawer Panel */}
      <aside className="relative w-full max-w-xl h-full bg-[#0c0c0c] border-l border-white/10 p-6 md:p-10 overflow-y-auto z-10 space-y-8 flex flex-col justify-between shadow-2xl text-[#F5F5F0]">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-5">
            <div>
              <div className="text-[11px] font-sans text-[#8C8C87] uppercase tracking-widest mb-1">
                {breed.group} • {breed.country}
              </div>
              <h2 className="text-3xl font-serif-display font-medium text-[#F5F5F0]">
                {breed.name}
              </h2>
              {breed.aliases && breed.aliases.length > 0 && (
                <p className="text-xs font-sans text-[#8C8C87] mt-1 font-light">
                  Known also as: {breed.aliases.join(', ')}
                </p>
              )}
            </div>

            <button
              id="dossier-close-btn"
              onClick={() => {
                soundEffects.playDrawerClose();
                onClose();
              }}
              className="p-2 rounded-full text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Photography Showcase */}
          {breed.images && breed.images.length > 0 && (
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-xl">
              <img
                src={breed.images[0].url}
                alt={breed.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-sans text-white/70">
                {breed.images[0].credit || 'Archival Visual Record'}
              </div>
            </div>
          )}

          {/* Evolutionary Superpower Highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 space-y-2 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                Evolutionary Superpower
              </span>
            </div>
            <h3 className="text-base font-serif-display text-[#F5F5F0] font-medium">
              {curiosity.superpower.title}
            </h3>
            <p className="text-xs font-sans text-[#D8D8D2] leading-relaxed font-light">
              {curiosity.superpower.description}
            </p>
            <div className="pt-2 border-t border-white/10 text-[11px] text-[#8C8C87]">
              <strong className="text-[#D8D8D2] font-medium">Adaptation:</strong> {curiosity.superpower.anatomicalTrait}
            </div>
          </div>

          {/* Editorial Chronicle */}
          {breed.cinematicNarration && (
            <div className="space-y-3">
              <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
                Natural History Narrative
              </h3>
              <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 relative overflow-hidden">
                <div className="text-xs sm:text-sm font-serif-display text-[#F5F5F0] italic leading-relaxed">
                  "{breed.cinematicNarration}"
                </div>
              </div>
            </div>
          )}

          {/* Origin & Historical Geography */}
          <div className="space-y-3">
            <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
              Origin & Heritage
            </h3>
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 space-y-2 text-xs font-sans">
              <div className="flex items-center justify-between">
                <span className="text-[#8C8C87]">Territory:</span>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onClose();
                    onOpenCountry(breed.country);
                  }}
                  className="text-[#F5F5F0] hover:underline font-medium"
                >
                  {breed.country} ({breed.region})
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C8C87]">Historical Era:</span>
                <span className="text-[#F5F5F0] font-medium">{breed.originEra}</span>
              </div>
              {breed.coordinates && (
                <div className="flex items-center justify-between">
                  <span className="text-[#8C8C87]">Geographic Coordinates:</span>
                  <span className="text-[#F5F5F0] font-mono">
                    {breed.coordinates.lat.toFixed(2)}° N, {breed.coordinates.lng.toFixed(2)}° E
                  </span>
                </div>
              )}
              <p className="text-[#D8D8D2] pt-2 border-t border-white/5 leading-relaxed font-light">
                {breed.originDetailed}
              </p>
            </div>
          </div>

          {/* Full Historical Chronicle */}
          <div className="space-y-3">
            <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
              Historical Chronicle & Working Lineage
            </h3>
            <div className="space-y-3 text-xs sm:text-sm font-sans text-[#D8D8D2] leading-relaxed font-light">
              <p>{breed.history}</p>
            </div>
          </div>

          {/* Purpose & Working Heritage */}
          <div className="space-y-3">
            <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
              Historical Purpose
            </h3>
            <div className="p-4 bg-[#141414] rounded-2xl border border-white/5 text-xs sm:text-sm font-sans text-[#D8D8D2] leading-relaxed font-light">
              {breed.purpose}
            </div>
          </div>

          {/* Physical Morphometrics */}
          <div className="space-y-3">
            <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
              Physical Characteristics & Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
              <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                <div className="text-[10px] text-[#8C8C87] uppercase">Height</div>
                <div className="text-[#F5F5F0] font-medium mt-0.5">{breed.height}</div>
              </div>
              <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                <div className="text-[10px] text-[#8C8C87] uppercase">Weight</div>
                <div className="text-[#F5F5F0] font-medium mt-0.5">{breed.weight}</div>
              </div>
              <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                <div className="text-[10px] text-[#8C8C87] uppercase">Lifespan</div>
                <div className="text-[#F5F5F0] font-medium mt-0.5">{breed.lifespan}</div>
              </div>
              <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                <div className="text-[10px] text-[#8C8C87] uppercase">Size Class</div>
                <div className="text-[#F5F5F0] font-medium mt-0.5">{breed.size}</div>
              </div>
            </div>
          </div>

          {/* Curiosities / Fun Facts */}
          {curiosity.funFacts && curiosity.funFacts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Documented Curiosities</span>
              </h3>
              <div className="space-y-2">
                {curiosity.funFacts.map((fact, i) => (
                  <div key={i} className="p-3 bg-[#141414] rounded-xl border border-white/5 text-xs font-sans text-[#D8D8D2] font-light leading-relaxed flex items-start space-x-2">
                    <span className="text-amber-400 font-mono text-[10px] mt-0.5">0{i + 1}.</span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Temperament Tags */}
          {breed.temperament && breed.temperament.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
                Temperament & Traits
              </h3>
              <div className="flex flex-wrap gap-2">
                {breed.temperament.map((trait) => (
                  <span
                    key={trait}
                    className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-[#D8D8D2]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Breeds & Affinities */}
          {breed.relatedBreeds && breed.relatedBreeds.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
                Lineage & Related Breeds
              </h3>
              <div className="flex flex-wrap gap-2">
                {breed.relatedBreeds.map((relSlug) => (
                  <button
                    key={relSlug}
                    onClick={() => {
                      soundEffects.playNext();
                      onSelectRelatedBreed(relSlug);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white text-xs font-sans text-[#D8D8D2] hover:text-black transition-colors flex items-center space-x-1.5 border border-white/10"
                  >
                    <span>{relSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Citations & Authority */}
          {breed.sources && breed.sources.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-xs font-serif-display uppercase tracking-widest text-[#8C8C87]">
                Authority & References
              </h3>
              <div className="space-y-2 text-xs font-sans text-[#8C8C87]">
                {breed.sources.map((src, i) => {
                  const title = typeof src === 'string' ? src : src.title;
                  const org = typeof src !== 'string' ? src.organization : null;
                  const url = typeof src !== 'string' ? src.url : null;

                  return (
                    <div key={i} className="flex items-start space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                      <div className="leading-snug">
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#F5F5F0] hover:underline"
                          >
                            {title}
                          </a>
                        ) : (
                          <span className="text-[#F5F5F0]">{title}</span>
                        )}
                        {org && (
                          <span className="text-[#8C8C87] ml-1.5 text-[11px]">
                            — {org}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
