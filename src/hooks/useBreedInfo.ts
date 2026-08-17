import { useState, useEffect, useRef } from 'react';
import { Breed, BreedAIInfo, BreedStats } from '../types';
import { fetchBreedInfo } from '../services/geminiService';

function generateStaticFallback(breed: Breed): BreedAIInfo {
  return {
    history: breed.history,
    superpower: {
      title: `${breed.purpose.split(',')[0]} Heritage`,
      description: `Evolved over centuries in ${breed.country} for specialized ${breed.purpose.toLowerCase()}, demonstrating immense environmental resilience and instinctive task mastery.`,
      anatomicalTrait: `Structural balance adapted to ${breed.region} climate with ${breed.energy.toLowerCase()} metabolic drive and ${breed.size.toLowerCase()} frame.`,
    },
    historicalFact: `Documented as originating in ${breed.originEra}, preserved through dedicated regional breeders in ${breed.country}.`,
    loreSnippet: `Revered across ${breed.region} folklore as an indispensable partner to shepherds, hunters, and guardians of historical heritage.`,
    funFacts: [
      `Historically bred in ${breed.country} specifically for ${breed.purpose.toLowerCase()}.`,
      `Possesses a typical lifespan of ${breed.lifespan} with characteristic ${breed.temperament.slice(0, 3).join(', ')} disposition.`,
      `Features distinct ${breed.height} height and ${breed.weight} weight proportional to historical working requirements.`,
      `Categorized under the ${breed.group} group with ${breed.energy} energy demands.`,
    ],
  };
}

function generateBreedStats(breed: Breed): BreedStats {
  const isHerding = breed.group === 'Herding';
  const isHound = breed.group === 'Hound';
  const isWorking = breed.group === 'Working';
  const isToy = breed.group === 'Toy';
  const isSporting = breed.group === 'Sporting';
  const isPrimitive = breed.group === 'Primitive/Ancient';

  return {
    scentIndex: isHound ? 94 : isHerding ? 88 : isSporting ? 85 : isPrimitive ? 82 : 80,
    sprintSpeedKmh: isHound ? 60 : isHerding ? 48 : isWorking ? 40 : isPrimitive ? 50 : 35,
    coldTolerance: (breed.region.includes('North') || breed.region.includes('Eurasia')) ? 'High' as const
      : breed.size === 'Giant' ? 'High' as const
      : 'Moderate' as const,
    heatTolerance: (breed.region.includes('Africa') || breed.region.includes('Middle East')) ? 'High' as const
      : breed.region.includes('North') ? 'Low' as const
      : 'Moderate' as const,
    biteForcePsi: breed.size === 'Giant' ? 380 : breed.size === 'Large' ? 260 : 180,
    trainabilityRating: isHerding ? 5 : isSporting ? 5 : isWorking ? 4 : isToy ? 4 : 3,
    vocalizationType: isHound ? 'Baying & Trail Howl' : isHerding ? 'Alert & Staccato Bark' : isToy ? 'Soft Attention Bark' : 'Resonant Warning Bark',
    sheddingRating: breed.size === 'Giant' ? 5 : breed.size === 'Large' ? 4 : 3,
  };
}

export function useBreedInfo(breed: Breed) {
  const [info, setInfo] = useState<BreedAIInfo>(() => generateStaticFallback(breed));
  const [stats, setStats] = useState<BreedStats>(() => generateBreedStats(breed));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [generatedByApi, setGeneratedByApi] = useState<boolean>(false);
  const currentSlugRef = useRef(breed.slug);

  useEffect(() => {
    let cancelled = false;
    currentSlugRef.current = breed.slug;

    setIsLoading(true);
    setInfo(generateStaticFallback(breed));
    setStats(generateBreedStats(breed));

    fetchBreedInfo(breed.slug, { forceRefresh: true })
      .then((response) => {
        if (!cancelled && currentSlugRef.current === breed.slug && response?.info) {
          setInfo({
            history: response.info.history || breed.history,
            superpower: response.info.superpower || generateStaticFallback(breed).superpower,
            historicalFact: response.info.historicalFact || generateStaticFallback(breed).historicalFact,
            loreSnippet: response.info.loreSnippet || generateStaticFallback(breed).loreSnippet,
            funFacts: response.info.funFacts?.length ? response.info.funFacts : generateStaticFallback(breed).funFacts,
          });
          setGeneratedByApi(Boolean(response.info.generatedByApi));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInfo(generateStaticFallback(breed));
          setGeneratedByApi(false);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [breed.slug]);

  return { info, stats, isLoading, generatedByApi };
}
