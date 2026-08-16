import { CountryInfo } from '../types';

export const COUNTRIES: Record<string, CountryInfo> = {
  germany: {
    code: 'DE',
    name: 'Germany',
    region: 'Western Europe',
    coordinates: { lat: 51.1657, lng: 10.4515 },
    breedCount: 5,
    historicalContext: 'Germany established some of the world\'s most rigorous pastoral, working, and tracking breed standards during the late 19th and early 20th centuries, prioritizing structural endurance and cognitive discipline.',
    breedSlugs: ['german-shepherd', 'rottweiler', 'doberman-pinscher', 'weimaraner', 'great-dane']
  },
  'united-kingdom': {
    code: 'GB',
    name: 'United Kingdom',
    region: 'Northern Europe',
    coordinates: { lat: 55.3781, lng: -3.4360 },
    breedCount: 9,
    historicalContext: 'From the heather-covered Scottish Highlands to Victorian estates, the British Isles cultivated specialized sighthounds, gundogs, and pastoral herders whose lineages defined modern kennel clubs.',
    breedSlugs: ['border-collie', 'greyhound', 'bloodhound', 'beagle', 'golden-retriever', 'cavalier-king-charles-spaniel', 'pembroke-welsh-corgi', 'old-english-sheepdog', 'bullmastiff']
  },
  japan: {
    code: 'JP',
    name: 'Japan',
    region: 'East Asia',
    coordinates: { lat: 36.2048, lng: 138.2529 },
    breedCount: 2,
    historicalContext: 'Designated as Living Natural Monuments of Japan, Japanese native spitz breeds like the Akita and Shiba Inu were preserved for their spirited dignity (Kan-i) and ancient mountainous hunting traditions.',
    breedSlugs: ['akita', 'shiba-inu']
  },
  russia: {
    code: 'RU',
    name: 'Russia / Siberia',
    region: 'Northern Eurasia',
    coordinates: { lat: 61.5240, lng: 105.3188 },
    breedCount: 2,
    historicalContext: 'Across the endless tundra and sub-zero taiga of Siberia, nomadic tribes bred resilient spitz dogs capable of surviving -60°C conditions while pulling expedition sledges across sea ice.',
    breedSlugs: ['siberian-husky', 'samoyed']
  },
  canada: {
    code: 'CA',
    name: 'Canada',
    region: 'North America',
    coordinates: { lat: 56.1304, lng: -106.3468 },
    breedCount: 2,
    historicalContext: 'In the frigid North Atlantic waters of Newfoundland and Labrador, fishermen relied on colossal water-working dogs with natural buoyancy, webbed paws, and heavy weather-resistant coats.',
    breedSlugs: ['newfoundland', 'labrador-retriever']
  },
  'united-states': {
    code: 'US',
    name: 'United States',
    region: 'North America',
    coordinates: { lat: 37.0902, lng: -95.7129 },
    breedCount: 3,
    historicalContext: 'Pioneers, indigenous peoples, and western ranchers forged versatile breeds adapted to harsh American frontiers, from Arctic gold rushes to vast western cattle ranges.',
    breedSlugs: ['alaskan-malamute', 'australian-shepherd', 'boston-terrier']
  },
  france: {
    code: 'FR',
    name: 'France',
    region: 'Western Europe',
    coordinates: { lat: 46.2276, lng: 2.2137 },
    breedCount: 4,
    historicalContext: 'French canine history spans both the grand royal châteaux hunting traditions and the rugged Pyrenean mountain pastures where guardians protected flocks from wolves.',
    breedSlugs: ['great-pyrenees', 'french-bulldog', 'bichon-frise', 'papillon']
  },
  italy: {
    code: 'IT',
    name: 'Italy',
    region: 'Southern Europe',
    coordinates: { lat: 41.8719, lng: 12.5674 },
    breedCount: 2,
    historicalContext: 'Descending from ancient Roman war and estate molossers, Italian breeds were engineered for high loyalty, territorial guarding, and Mediterranean court companionship.',
    breedSlugs: ['cane-corso', 'maltese']
  },
  switzerland: {
    code: 'CH',
    name: 'Switzerland',
    region: 'Western Europe',
    coordinates: { lat: 46.8182, lng: 8.2275 },
    breedCount: 2,
    historicalContext: 'High in the Bernese Oberland and Great Saint Bernard Alpine pass, hospice monks and alpine farmers bred noble drafting and search-and-rescue dogs capable of traversing deep snowdrifts.',
    breedSlugs: ['saint-bernard', 'bernese-mountain-dog']
  },
  belgium: {
    code: 'BE',
    name: 'Belgium',
    region: 'Western Europe',
    coordinates: { lat: 50.5039, lng: 4.4699 },
    breedCount: 1,
    historicalContext: 'Belgian pastoralists selected for laser-like focus, explosive athleticism, and intense work ethic around the city of Malines, creating world-renowned working dogs.',
    breedSlugs: ['belgian-malinois']
  },
  china: {
    code: 'CN',
    name: 'China / Tibet',
    region: 'East Asia',
    coordinates: { lat: 35.8617, lng: 104.1954 },
    breedCount: 4,
    historicalContext: 'Preserved behind imperial palace walls and secluded Himalayan monasteries, ancient Chinese lineages served as sacred temple guardians, lion-dog emblems, and noble companions.',
    breedSlugs: ['chow-chow', 'tibetan-mastiff', 'pug', 'shih-tzu']
  },
  turkey: {
    code: 'TR',
    name: 'Turkey',
    region: 'Middle East',
    coordinates: { lat: 38.9637, lng: 35.2433 },
    breedCount: 1,
    historicalContext: 'On the sun-scorched, wind-scoured Anatolian plateau, shepherds developed massive, independent livestock guardians equipped to confront wolves, bears, and jackals without human intervention.',
    breedSlugs: ['anatolian-shepherd']
  },
  afghanistan: {
    code: 'AF',
    name: 'Afghanistan',
    region: 'Central Asia',
    coordinates: { lat: 33.9391, lng: 67.7100 },
    breedCount: 1,
    historicalContext: 'An ancient basal breed dating back thousands of years, navigating rocky crags and mountain wind with an iconic silk mantle and independent coursing vision.',
    breedSlugs: ['afghan-hound']
  },
  egypt: {
    code: 'EG',
    name: 'Egypt / Fertile Crescent',
    region: 'Middle East & Africa',
    coordinates: { lat: 26.8206, lng: 30.8025 },
    breedCount: 2,
    historicalContext: 'Revered in pharaonic frescoes and nomadic desert caravans as the Royal Dog of Egypt, these ancient sighthounds coursed gazelle across vast sun-baked dunes.',
    breedSlugs: ['saluki', 'pharaoh-hound']
  },
  'democratic-republic-of-the-congo': {
    code: 'CD',
    name: 'DR Congo / Central Africa',
    region: 'Central Africa',
    coordinates: { lat: -4.0383, lng: 21.7587 },
    breedCount: 1,
    historicalContext: 'Known as the "Barkless Dog of Africa," the Basenji navigated equatorial rainforests using keen scent, sight, and a melodious yodel (barroo), carrying a genome nearly untouched by modern selective breeding.',
    breedSlugs: ['basenji']
  },
  zimbabwe: {
    code: 'ZW',
    name: 'Zimbabwe / Southern Africa',
    region: 'Southern Africa',
    coordinates: { lat: -19.0154, lng: 29.1549 },
    breedCount: 1,
    historicalContext: 'Bred by crossing European hunting hounds with native Khoikhoi ridged dogs, this fearless hound was trained to track and corner African lions while withstanding extreme heat and tsetse flies.',
    breedSlugs: ['rhodesian-ridgeback']
  },
  ireland: {
    code: 'IE',
    name: 'Ireland',
    region: 'Northern Europe',
    coordinates: { lat: 53.1424, lng: -7.6921 },
    breedCount: 1,
    historicalContext: 'Mentioned in ancient Celtic sagas as majestic war hounds and wolf hunters, the Irish Wolfhound stands as one of the tallest, most gentle giants of the canine world.',
    breedSlugs: ['irish-wolfhound']
  },
  portugal: {
    code: 'PT',
    name: 'Portugal',
    region: 'Southern Europe',
    coordinates: { lat: 39.3999, lng: -8.2245 },
    breedCount: 1,
    historicalContext: 'Along the rugged coast of the Algarve, fishermen employed these webbed-paw swimmers as seafaring crew members to herd fish into nets, retrieve lost gear, and carry couriers between boats.',
    breedSlugs: ['portuguese-water-dog']
  },
  norway: {
    code: 'NO',
    name: 'Norway',
    region: 'Northern Europe',
    coordinates: { lat: 60.4720, lng: 8.4689 },
    breedCount: 1,
    historicalContext: 'Sailing with Viking explorers across North Sea fjords, this hardy spitz dog tracked Eurasian elk and brown bears across mist-shrouded Scandinavian pines.',
    breedSlugs: ['norwegian-elkhound']
  }
};
