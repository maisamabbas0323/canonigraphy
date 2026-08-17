export type BreedGroup = 
  | 'Herding'
  | 'Working'
  | 'Hound'
  | 'Terrier'
  | 'Toy'
  | 'Non-Sporting'
  | 'Sporting'
  | 'Primitive/Ancient';

export type BreedSize = 'Toy' | 'Small' | 'Medium' | 'Large' | 'Giant' | 'Small to Medium' | 'Large to Giant';
export type EnergyLevel = 'Low' | 'Moderate' | 'High' | 'Very High' | 'Low to Moderate' | 'Moderate to High';

export type AmbienceCategory = 
  | 'FOREST'
  | 'MOUNTAIN'
  | 'SNOW'
  | 'COAST'
  | 'RAIN'
  | 'RIVER'
  | 'FARMLAND'
  | 'COUNTRYSIDE'
  | 'WILDERNESS'
  | 'HOME'
  | 'WORKING'
  | 'OPEN_PLAINS';

export interface BreedImage {
  id: string;
  url: string;
  source: string;
  license: string;
  credit: string;
  alt: string;
}

export interface BreedSource {
  title: string;
  url?: string;
  organization: string;
}

export interface Breed {
  id: string;
  slug: string;
  number: number; // e.g. 1 to 50+
  name: string;
  aliases: string[];
  country: string;
  countryCode: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  chapterId: string;
  chapterTitle: string;
  chapterSubtitle: string;
  group: BreedGroup;
  purpose: string;
  originEra: string;
  originDetailed: string;
  size: BreedSize;
  height: string;
  weight: string;
  lifespan: string;
  energy: EnergyLevel;
  temperament: string[];
  history: string;
  cinematicNarration: string;
  captions?: Array<{
    start: number; // seconds
    end: number;
    text: string;
  }>;
  images: BreedImage[];
  ambienceCategory: AmbienceCategory;
  relatedBreeds: string[];
  sources: BreedSource[];
}

export interface CountryInfo {
  code: string;
  name: string;
  region: string;
  coordinates: { lat: number; lng: number } | [number, number];
  breedCount: number;
  historicalContext?: string;
  description?: string;
  breedSlugs: string[];
}

export interface ChapterInfo {
  id: string;
  numberRoman: string;
  title: string;
  subtitle: string;
  description: string;
  ambienceCategory: AmbienceCategory;
  breedSlugs: string[];
}

export type GeminiStatus = 'NOT_CONFIGURED' | 'VALIDATING' | 'READY' | 'INVALID' | 'UNAVAILABLE';

export interface DocumentaryNarrationResponse {
  breedSlug: string;
  text: string;
  cached: boolean;
  source?: string;
  error?: string;
  audioBase64?: string;
  audioMimeType?: string;
  captions: Array<{ start: number; end: number; text: string }>;
}

export interface BreedAIInfo {
  history: string;
  superpower: {
    title: string;
    description: string;
    anatomicalTrait: string;
  };
  historicalFact: string;
  loreSnippet: string;
  funFacts: string[];
  generatedByApi?: boolean;
}

export interface BreedStats {
  scentIndex: number;
  sprintSpeedKmh: number;
  coldTolerance: 'Low' | 'Moderate' | 'High' | 'Extreme';
  heatTolerance: 'Low' | 'Moderate' | 'High' | 'Extreme';
  biteForcePsi: number;
  trainabilityRating: number;
  vocalizationType: string;
  sheddingRating: number;
}

export interface BreedAIInfoResponse {
  breedSlug: string;
  info: BreedAIInfo;
  cached: boolean;
}

export interface CountryAIInfo {
  historicalContext: string;
  generatedByApi?: boolean;
}

export interface CountryAIInfoResponse {
  countryCode: string;
  info: CountryAIInfo;
  cached: boolean;
}

export interface AmbientTrack {
  id: string;
  category: AmbienceCategory;
  title: string;
  url: string;
  source: string;
  license: string;
  credit: string;
}
