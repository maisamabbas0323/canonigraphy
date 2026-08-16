import { ChapterInfo } from '../types';

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 'the-beginning',
    numberRoman: 'I',
    title: 'THE BEGINNING',
    subtitle: 'Primitive, Basal & Ancient Lineages',
    description: 'Breeds whose lineages diverge closest to the wolf ancestor, shaped by millennia of desert winds, ancient trade routes, and primal companionship.',
    ambienceCategory: 'OPEN_PLAINS',
    breedSlugs: ['saluki', 'basenji', 'afghan-hound', 'shiba-inu', 'pharaoh-hound', 'chow-chow', 'akita', 'tibetan-mastiff']
  },
  {
    id: 'the-guardians',
    numberRoman: 'II',
    title: 'THE GUARDIANS',
    subtitle: 'Mountain Fortresses & Estate Protectors',
    description: 'Vast, heavy-boned sentinels born in the snowbound Pyrenees, Anatolian plateaus, and Alpine passes to shield herds and villages from predators.',
    ambienceCategory: 'MOUNTAIN',
    breedSlugs: ['great-pyrenees', 'anatolian-shepherd', 'saint-bernard', 'bernese-mountain-dog', 'cane-corso', 'mastiff', 'rottweiler', 'doberman-pinscher']
  },
  {
    id: 'the-herders',
    numberRoman: 'III',
    title: 'THE HERDERS',
    subtitle: 'Pastoral Intelligence & Boundless Fields',
    description: 'Masters of kinetic focus and pastoral stamina, managing unruly flocks across Welsh valleys, German highlands, and Scottish moors.',
    ambienceCategory: 'FARMLAND',
    breedSlugs: ['border-collie', 'german-shepherd', 'belgian-malinois', 'australian-shepherd', 'pembroke-welsh-corgi', 'shetland-sheepdog', 'old-english-sheepdog', 'cardigan-welsh-corgi']
  },
  {
    id: 'the-north',
    numberRoman: 'IV',
    title: 'THE NORTH',
    subtitle: 'Arctic Ice, Tundra & Sled Expeditions',
    description: 'Dogs shaped by extreme sub-zero endurance, howling beneath the aurora and pulling sledges across thousands of leagues of sea ice.',
    ambienceCategory: 'SNOW',
    breedSlugs: ['siberian-husky', 'alaskan-malamute', 'samoyed', 'norwegian-elkhound', 'greenland-dog', 'finnish-lapphund']
  },
  {
    id: 'the-hunters',
    numberRoman: 'V',
    title: 'THE HUNTERS',
    subtitle: 'Sighthounds, Scents & Woodland Trackers',
    description: 'Aerodynamic speed across open savanna or relentless scent tracking through dense briar and ancient royal game reserves.',
    ambienceCategory: 'FOREST',
    breedSlugs: ['greyhound', 'bloodhound', 'beagle', 'rhodesian-ridgeback', 'weimaraner', 'irish-wolfhound', 'whippet', 'basset-hound', 'pointer']
  },
  {
    id: 'the-workers',
    numberRoman: 'VI',
    title: 'THE WORKERS',
    subtitle: 'Cold Atlantic Seas & Wetland Retrievers',
    description: 'Webbed paws, water-repellent coats, and unflagging loyalty haul fishing nets from icy surf and retrieve across misty marshes.',
    ambienceCategory: 'COAST',
    breedSlugs: ['newfoundland', 'golden-retriever', 'labrador-retriever', 'portuguese-water-dog', 'standard-poodle', 'chesapeake-bay-retriever']
  },
  {
    id: 'the-companions',
    numberRoman: 'VII',
    title: 'THE COMPANIONS',
    subtitle: 'Imperial Courts, Monasteries & Hearthside Sentinels',
    description: 'Revered inside the Forbidden City, French salons, and Himalayan temples as spiritual talismans, warming lapdogs, and devoted family partners.',
    ambienceCategory: 'HOME',
    breedSlugs: ['cavalier-king-charles-spaniel', 'pug', 'shih-tzu', 'french-bulldog', 'bichon-frise', 'maltese', 'boston-terrier', 'papillon']
  }
];

export function getChapterForBreed(slug: string): ChapterInfo | undefined {
  return CHAPTERS.find((ch) => ch.breedSlugs.includes(slug));
}
