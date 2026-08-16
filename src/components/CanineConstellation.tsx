import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Sparkles, FileText, Zap, HelpCircle } from 'lucide-react';
import { Breed } from '../types';
import { getBreedCuriosity } from '../data/breedCuriosities';

interface CanineConstellationProps {
  breeds: Breed[];
  visitedSlugs: Set<string>;
  currentBreed: Breed;
  onSelectBreed: (slug: string) => void;
  onContinueDocumentary: () => void;
  onOpenDossier?: (slug: string) => void;
}

export const CanineConstellation: React.FC<CanineConstellationProps> = ({
  breeds,
  visitedSlugs,
  currentBreed,
  onSelectBreed,
  onContinueDocumentary,
  onOpenDossier,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBreed, setHoveredBreed] = useState<Breed | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(currentBreed);
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 560 });

  const groups = useMemo(() => {
    const set = new Set(breeds.map((b) => b.group));
    return ['ALL', ...Array.from(set).sort()];
  }, [breeds]);

  // Handle container resize cleanly
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setCanvasDimensions({
            width: Math.floor(entry.contentRect.width),
            height: Math.floor(entry.contentRect.height),
          });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute organic circular cluster layouts
  const getNodePosition = (index: number, total: number, width: number, height: number) => {
    const angle = (index / total) * Math.PI * 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  // Canvas constellation drawing loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.005;
      const { width, height } = canvasDimensions;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      // Subtle background star dust
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 40; i++) {
        const starX = (i * 123.45 + Math.sin(time + i) * 15) % width;
        const starY = (i * 987.65 + Math.cos(time + i) * 15) % height;
        ctx.fillRect(starX, starY, 1, 1);
      }

      const activeBreed = hoveredBreed || selectedBreed || currentBreed;

      // Draw constellation paths
      for (let i = 0; i < breeds.length; i++) {
        const p1 = getNodePosition(i, breeds.length, width, height);
        const b1 = breeds[i];

        for (let j = i + 1; j < breeds.length; j++) {
          const p2 = getNodePosition(j, breeds.length, width, height);
          const b2 = breeds[j];

          // Determine connection types
          const sameGroup = b1.group === b2.group;
          const sameCountry = b1.countryCode === b2.countryCode;
          const related = b1.relatedBreeds?.includes(b2.slug) || b2.relatedBreeds?.includes(b1.slug);

          if (sameGroup || sameCountry || related) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const isPrimaryConnection = b1.slug === activeBreed?.slug || b2.slug === activeBreed?.slug;
            if (isPrimaryConnection) {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
              ctx.lineWidth = 0.5;
            }
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < breeds.length; i++) {
        const p = getNodePosition(i, breeds.length, width, height);
        const b = breeds[i];
        const isActive = b.slug === activeBreed?.slug;
        const isGroupMatched = selectedGroup === 'ALL' || b.group === selectedGroup;

        ctx.beginPath();
        const r = isActive ? 7 : 4.5;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        if (isActive) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = isGroupMatched ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [breeds, currentBreed, selectedBreed, hoveredBreed, selectedGroup, canvasDimensions]);

  const activeDisplayBreed = hoveredBreed || selectedBreed || currentBreed;
  const curiosity = getBreedCuriosity(activeDisplayBreed.slug, activeDisplayBreed);

  return (
    <div
      id="constellation-page"
      className="min-h-screen bg-[#050505] text-[#F5F5F2] pt-28 pb-24 px-6 md:pl-28 md:pr-16 selection:bg-white selection:text-black"
    >
      {/* 1. EDITORIAL HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/5 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C8C87] uppercase block mb-1">
              VOL. I // GENETIC MATRIX
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-none uppercase">
              CONSTELLATION
            </h1>
            <p className="mt-3 text-sm font-sans text-[#8C8C87] max-w-2xl font-light leading-relaxed">
              Interactive lineage visualization tracing connections across shared ancestry, geography, working purposes, and morphological similarities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8C8C87]">
            <div className="px-3 py-1 bg-[#0D0D0D] border border-white/5 uppercase tracking-wider text-[10px]">
              <span className="text-white font-semibold">{visitedSlugs.size}</span> EXPLORED
            </div>
            <button
              onClick={onContinueDocumentary}
              className="px-4 py-1.5 bg-[#F5F5F2] text-black font-semibold tracking-wider text-[10px] uppercase hover:bg-white transition-colors"
            >
              SHOWCASE VIEW
            </button>
          </div>
        </div>
      </div>

      {/* 2. AFFINITY FILTERS */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] font-mono text-[#8C8C87] uppercase tracking-wider mr-2 flex-shrink-0 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AFFINITY MATRIX:</span>
        </span>
        {groups.map((grp) => (
          <button
            key={grp}
            onClick={() => setSelectedGroup(grp)}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all duration-300 ${
              selectedGroup === grp
                ? 'bg-[#F5F5F2] text-black font-semibold'
                : 'bg-white/[0.03] text-[#8C8C87] hover:text-[#F5F5F2] hover:bg-white/[0.08]'
            }`}
          >
            {grp}
          </button>
        ))}
      </div>

      {/* 3. INTERACTIVE CONSTELLATION MAP */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Constellation Canvas Frame */}
        <div
          ref={containerRef}
          className="lg:col-span-8 bg-[#0D0D0D] border border-white/5 rounded-3xl relative h-[400px] sm:h-[480px] md:h-[540px] overflow-hidden shadow-2xl flex items-center justify-center p-4"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive Button overlay mapping node positions perfectly */}
          <div className="absolute inset-0 pointer-events-auto">
            {breeds.map((breed, idx) => {
              const pos = getNodePosition(
                idx,
                breeds.length,
                canvasDimensions.width,
                canvasDimensions.height
              );

              return (
                <button
                  key={breed.slug}
                  id={`constellation-node-${breed.slug}`}
                  onClick={() => setSelectedBreed(breed)}
                  onMouseEnter={() => setHoveredBreed(breed)}
                  onMouseLeave={() => setHoveredBreed(null)}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none z-10 group"
                  aria-label={breed.name}
                >
                  <span className="w-2 h-2 rounded-full pointer-events-none" />
                </button>
              );
            })}
          </div>

          {/* Subtle instruction label */}
          <div className="absolute bottom-4 left-6 flex items-center space-x-1.5 text-[9px] font-mono text-[#8C8C87]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CLICK AND HOVER NODES TO REVEAL PHYLOGENETIC CONNECTIONS</span>
          </div>
        </div>

        {/* DETAILS PANEL - Sits on the right side */}
        <div className="lg:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8C87] tracking-widest uppercase">
            <span>PHYLOGENETIC PROFILE</span>
            <span className="text-white font-mono">NODE {activeDisplayBreed.slug.toUpperCase()}</span>
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

          {/* Superpower information */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{curiosity.superpower.title}</span>
            </div>
            <p className="text-xs text-[#D8D8D2] font-light leading-relaxed">
              {curiosity.superpower.description}
            </p>
          </div>

          {/* Connected metric profiles */}
          <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-[#8C8C87] font-mono uppercase tracking-wider">
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>PHYLOGENY CLASS</span>
              <span className="text-white font-medium">{activeDisplayBreed.group}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>HISTORICAL ERA</span>
              <span className="text-white font-medium">{activeDisplayBreed.originEra}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span>TEMPERAMENT KEY</span>
              <span className="text-white font-medium truncate max-w-[150px]">
                {Array.isArray(activeDisplayBreed.temperament)
                  ? activeDisplayBreed.temperament[0]
                  : 'LOYAL'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectBreed(activeDisplayBreed.slug);
              const showcaseBtn = document.getElementById('nav-item-documentary');
              showcaseBtn?.click();
            }}
            className="w-full py-4 bg-white text-black hover:bg-[#F5F5F2] font-sans font-bold tracking-wider text-xs uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>EXPLORE SHOWCASE</span>
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
