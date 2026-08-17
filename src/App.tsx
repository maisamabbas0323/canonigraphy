import React, { useState, useEffect, useCallback } from 'react';
import { BREEDS } from './data/breeds';
import { COUNTRIES } from './data/countries';
import { Breed } from './types';
import { checkGeminiStatus } from './services/geminiService';

import { Navigation } from './components/Navigation';
import { TopHeader } from './components/TopHeader';
import { BreedShowcase } from './components/BreedShowcase';
import { ArchiveIndex } from './components/ArchiveIndex';
import { WorldMap } from './components/WorldMap';
import { CountryExplorer } from './components/CountryExplorer';
import { CanineConstellation } from './components/CanineConstellation';
import { BreedDetailPanel } from './components/BreedDetailPanel';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';
import { ApiSetupModal } from './components/ApiSetupModal';

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<
    'documentary' | 'archive' | 'map' | 'countries' | 'constellation'
  >('documentary');

  // Active Breed State
  const [currentBreedIndex, setCurrentBreedIndex] = useState<number>(0);
  const [visitedSlugs, setVisitedSlugs] = useState<Set<string>>(
    new Set([BREEDS[0].slug])
  );

  // Modals & Panels State
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  // Force API settings modal open on first load; require user to provide Gemini 3.1 Flash-Lite key
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState<boolean>(true);
  const [isApiConfigured, setIsApiConfigured] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Current Breed
  const currentBreed = BREEDS[currentBreedIndex] || BREEDS[0];

  // Initial API Key check
  useEffect(() => {
    (async () => {
      try {
        const result = await checkGeminiStatus();
        let configured = false;
        if (result && typeof result === 'object') {
          configured = Boolean((result as any).configured);
        } else {
          configured = Boolean(result);
        }
        setIsApiConfigured(configured);
        // If already configured on server, close the modal, otherwise keep it open
        if (configured) setIsApiSettingsOpen(false);
      } catch {
        setIsApiConfigured(false);
      }
    })();
  }, []);

  // Track visited breeds for constellation journey
  useEffect(() => {
    if (currentBreed?.slug) {
      setVisitedSlugs((prev) => new Set([...Array.from(prev), currentBreed.slug]));
    }
  }, [currentBreed]);

  // Handlers for switching breeds
  const handlePrevBreed = useCallback(() => {
    setCurrentBreedIndex((prev) => (prev > 0 ? prev - 1 : BREEDS.length - 1));
  }, []);

  const handleNextBreed = useCallback(() => {
    setCurrentBreedIndex((prev) => (prev < BREEDS.length - 1 ? prev + 1 : 0));
  }, []);

  const handleSelectBreedBySlug = useCallback((slug: string) => {
    const index = BREEDS.findIndex((b) => b.slug === slug);
    if (index !== -1) {
      setCurrentBreedIndex(index);
      setCurrentView('documentary');
    }
  }, []);

  const handlePlayCountryDocumentary = useCallback((countryCode: string) => {
    const country = Object.values(COUNTRIES).find((c) => c.code === countryCode);
    if (country && country.breedSlugs.length > 0) {
      const firstSlug = country.breedSlugs[0];
      handleSelectBreedBySlug(firstSlug);
    }
  }, [handleSelectBreedBySlug]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (e.target as HTMLElement)?.tagName
        )
      ) {
        return;
      }

      if (e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setIsDossierOpen((prev) => !prev);
      } else if (e.key === 'ArrowLeft' && currentView === 'documentary') {
        e.preventDefault();
        handlePrevBreed();
      } else if (e.key === 'ArrowRight' && currentView === 'documentary') {
        e.preventDefault();
        handleNextBreed();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, handlePrevBreed, handleNextBreed]);

  return (
    <div
      id="app-root"
      className="relative min-h-screen bg-[#070707] text-[#F5F5F0] font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black"
    >
      {/* Editorial Navigation Rail (Fixed left on desktop, bottom on mobile) */}
      <Navigation
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Top Header Bar */}
      <TopHeader
        onNavigateHome={() => setCurrentView('documentary')}
        onOpenAbout={() => setIsAboutOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        visitedCount={visitedSlugs.size}
        totalBreeds={BREEDS.length}
      />

      {/* Main Views */}
      <main className="w-full">
        {/* 1. Hyper-Fascinating Breed Showcase (Primary Informational View) */}
        {currentView === 'documentary' && (
          <BreedShowcase
            currentBreed={currentBreed}
            breedIndex={currentBreedIndex}
            totalBreeds={BREEDS.length}
            onPrevBreed={handlePrevBreed}
            onNextBreed={handleNextBreed}
            onOpenDossier={() => setIsDossierOpen(true)}
            onSelectCountry={() => {
              setCurrentView('countries');
            }}
          />
        )}

        {/* 2. Editorial Archive Index */}
        {currentView === 'archive' && (
          <ArchiveIndex
            breeds={BREEDS}
            onSelectBreed={handleSelectBreedBySlug}
            onOpenDossier={(slug) => {
              const idx = BREEDS.findIndex((b) => b.slug === slug);
              if (idx !== -1) {
                setCurrentBreedIndex(idx);
                setIsDossierOpen(true);
              }
            }}
          />
        )}

        {/* 3. Cartographic World Atlas */}
        {currentView === 'map' && (
          <WorldMap
            breeds={BREEDS}
            currentBreed={currentBreed}
            onSelectBreed={handleSelectBreedBySlug}
            onPlayCountryDocumentary={handlePlayCountryDocumentary}
            onOpenDossier={(slug) => {
              const idx = BREEDS.findIndex((b) => b.slug === slug);
              if (idx !== -1) {
                setCurrentBreedIndex(idx);
                setIsDossierOpen(true);
              }
            }}
          />
        )}

        {/* 4. Country Origin Explorer */}
        {currentView === 'countries' && (
          <CountryExplorer
            breeds={BREEDS}
            onSelectBreed={handleSelectBreedBySlug}
            onPlayCountryDocumentary={handlePlayCountryDocumentary}
          />
        )}

        {/* 5. Celestial Canine Constellation */}
        {currentView === 'constellation' && (
          <CanineConstellation
            breeds={BREEDS}
            visitedSlugs={visitedSlugs}
            currentBreed={currentBreed}
            onSelectBreed={handleSelectBreedBySlug}
            onContinueDocumentary={() => {
              setCurrentView('documentary');
            }}
            onOpenDossier={(slug) => {
              const idx = BREEDS.findIndex((b) => b.slug === slug);
              if (idx !== -1) {
                setCurrentBreedIndex(idx);
                setIsDossierOpen(true);
              }
            }}
          />
        )}
      </main>

      {/* Slide-over Breed Dossier Drawer */}
      <BreedDetailPanel
        breed={currentBreed}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onSelectRelatedBreed={handleSelectBreedBySlug}
        onOpenCountry={() => {
          setIsDossierOpen(false);
          setCurrentView('countries');
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        breeds={BREEDS}
        onSelectBreed={handleSelectBreedBySlug}
      />

      {/* About & Colophon Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* API Setup / Status Modal */}
      <ApiSetupModal
        isOpen={isApiSettingsOpen}
        onClose={() => setIsApiSettingsOpen(false)}
        isConfigured={isApiConfigured}
        onConfiguredChange={setIsApiConfigured}
      />
    </div>
  );
};
