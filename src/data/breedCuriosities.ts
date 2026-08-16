export interface BreedCuriosity {
  superpower: {
    title: string;
    description: string;
    anatomicalTrait: string;
  };
  historicalFact: string;
  loreSnippet: string;
  stats: {
    scentIndex: number; // 0-100
    sprintSpeedKmh: number;
    coldTolerance: 'Low' | 'Moderate' | 'High' | 'Extreme';
    heatTolerance: 'Low' | 'Moderate' | 'High' | 'Extreme';
    biteForcePsi: number;
    trainabilityRating: number; // 1-5
    vocalizationType: string;
    sheddingRating: number; // 1-5
  };
  funFacts: string[];
}

export const BREED_CURIOSITIES: Record<string, BreedCuriosity> = {
  'german-shepherd': {
    superpower: {
      title: 'Cognitive Task Switching & Scent Acuity',
      description: 'Possesses over 225 million olfactory receptors, enabling detection of scent particles at 1 part per trillion with an extraordinary ability to differentiate complex layered chemical signatures.',
      anatomicalTrait: 'Long, tapered muzzle optimizing turbinate bone surface area for turbulent olfactory airflow.',
    },
    historicalFact: 'The first registered German Shepherd in history was named Horand von Grafrath (originally Hektor Linksrhein), purchased in 1899 by Max von Stephanitz.',
    loreSnippet: 'During World War I and II, German Shepherds served as messenger runners, red cross rescue searchers, and sentries, leaping across barbed wire and shell craters under fire.',
    stats: {
      scentIndex: 96,
      sprintSpeedKmh: 48,
      coldTolerance: 'High',
      heatTolerance: 'Moderate',
      biteForcePsi: 238,
      trainabilityRating: 5,
      vocalizationType: 'Direct Warning Bark & Alert Chuff',
      sheddingRating: 5,
    },
    funFacts: [
      'Ranked as the #3 smartest dog breed in the world; capable of learning a new command in under 5 repetitions.',
      'Their ears develop cartilage stiffness around 4 to 6 months of age, creating their signature radar-dish posture.',
      'Rin Tin Tin, a rescue German Shepherd from a WWI battlefield in France, became one of Hollywood’s biggest silent film stars.',
      'Known for the "German Shepherd stance," where the hindquarters slope naturally for low-center-of-gravity shock absorption during rapid deceleration.',
    ],
  },
  'siberian-husky': {
    superpower: {
      title: 'Metabolic Fat-Burning Switch',
      description: 'Can run over 160 km (100 miles) a day in -50°C temperatures without depleting their glycogen reserves, switching directly to burning cellular fat without fatigue.',
      anatomicalTrait: 'Dense insulating double coat with heat-trapping underfur and almond-shaped eyes that squint naturally against arctic glare.',
    },
    historicalFact: 'In 1925, Siberian Huskies led the famous "Great Race of Mercy" across 1,085 km of blizzard-swept Alaskan tundra in 5.5 days to deliver life-saving diphtheria antitoxin to Nome.',
    loreSnippet: 'The Chukchi people believed two huskies guarded the gates of heaven, turning away anyone who had ever been cruel to a dog in their mortal lifetime.',
    stats: {
      scentIndex: 82,
      sprintSpeedKmh: 45,
      coldTolerance: 'Extreme',
      heatTolerance: 'Low',
      biteForcePsi: 220,
      trainabilityRating: 3,
      vocalizationType: 'Melodious Harmonic Howl & Pack Chorus',
      sheddingRating: 5,
    },
    funFacts: [
      'Huskies rarely bark; instead, they communicate through complex multi-tonal vocalizations, yodels, and communal pack howls.',
      'Their bushy tails act as a personal air heater—when sleeping curled in snow, they wrap their tail over their nose to warm freezing air before inhalation.',
      'Heterochromia (eyes of two completely different colors) is genetically common and causes no vision degradation.',
      'Their paws feature specialized webbing with thick calloused pads that resist freezing even on blue sea ice.',
    ],
  },
  'akita': {
    superpower: {
      title: 'Snow-Traction Bone Density & Bear Deterrence',
      description: 'Combines massive bone mass, webbed cat-like feet for deep powder snow traction, and an innate hunting stance that isolates 400kg bears in mountain ravines.',
      anatomicalTrait: 'Plush double-curled tail resting flat on the spine to protect kidneys from sub-zero mountain winds.',
    },
    historicalFact: 'Designated an official "Living Natural Monument of Japan" in 1931 by the Ministry of Education.',
    loreSnippet: 'Hachiko, a golden-brown Akita, waited faithfully at Shibuya Station in Tokyo every single evening for 9 years, 9 months, and 15 days after his owner passed away.',
    stats: {
      scentIndex: 84,
      sprintSpeedKmh: 42,
      coldTolerance: 'Extreme',
      heatTolerance: 'Moderate',
      biteForcePsi: 350,
      trainabilityRating: 4,
      vocalizationType: 'Subtle Throat Rumbles & Silent Vigilance',
      sheddingRating: 4,
    },
    funFacts: [
      'In traditional Japanese culture, statues of Akitas are given to new parents to symbolize health, longevity, and fierce spiritual protection.',
      'Helen Keller was credited with introducing the very first Akita to the United States in 1937 after receiving one as a gift from the Japanese government.',
      'Akitas groom themselves with cat-like cleanliness, frequently licking their paws and coat after outdoor walks.',
      'Their thick triangular ears tilt forward slightly over the eyes, protecting inner ear canals from horizontal snowfall.',
    ],
  },
  'border-collie': {
    superpower: {
      title: 'Predatory Eye Stare & Microsecond Calculating Speed',
      description: 'Commands entire flocks of hundreds of livestock without touching them, using a hypnotic low-crouched gaze called "The Eye" derived from ancient wolf hunting sequences.',
      anatomicalTrait: 'Low-slung center of gravity with loose shoulder joints allowing 90-degree instantaneous turns at 45 km/h.',
    },
    historicalFact: 'All modern working Border Collies trace their pedigree to a single foundation sire born in 1893 named "Old Hemp" in Northumberland, England.',
    loreSnippet: 'Shepherds on the Scottish moors communicate with Border Collies at distances of up to 2 miles using coded whistle modulations that the dogs interpret instantaneously.',
    stats: {
      scentIndex: 88,
      sprintSpeedKmh: 48,
      coldTolerance: 'High',
      heatTolerance: 'Moderate',
      biteForcePsi: 210,
      trainabilityRating: 5,
      vocalizationType: 'High-Pitch Whistle Alert & Staccato Bark',
      sheddingRating: 3,
    },
    funFacts: [
      'Consistently ranked as the #1 most intelligent canine breed on Earth by neuropsychologists and animal behaviorists.',
      'A famous Border Collie named Chaser demonstrated the comprehension of 1,022 individual nouns and grammatical sentence structures.',
      'They possess an instinctual "crouch-stalk" gait where the head drops level with the spine, minimizing their visible silhouette on the horizon.',
      'Can work 14 hours continuously across steep hill heather without showing signs of mental distraction.',
    ],
  },
  'saluki': {
    superpower: {
      title: 'Aerodynamic Gazelle-Coursing Sighthound Speed',
      description: 'One of the fastest land animals in existence, sustaining speeds of 65–68 km/h over distances of up to 5 kilometers across shifting desert sand dunes.',
      anatomicalTrait: 'Hyper-flexible double-suspension spine, deep thoracic chest cavity for massive heart-stroke volume, and silky ear feathering that dissipates desert heat.',
    },
    historicalFact: 'Salukis have been found carved into Sumerian pottery from 7,000 BCE and mummified alongside royal pharaohs in ancient Egyptian pyramids.',
    loreSnippet: 'Bedouin tribes considered the Saluki not a dog (which was considered unclean), but "El Hor"—the divine gift from Allah—allowed to sleep on silk rugs inside family tents.',
    stats: {
      scentIndex: 65,
      sprintSpeedKmh: 68,
      coldTolerance: 'Low',
      heatTolerance: 'Extreme',
      biteForcePsi: 195,
      trainabilityRating: 3,
      vocalizationType: 'Silent Coursing & Soft Melodious Whimper',
      sheddingRating: 1,
    },
    funFacts: [
      'Their vision spans a 270-degree horizontal field, allowing them to spot movement of small prey over 1.5 kilometers away in flat desert scrub.',
      'Their footpads are deeply cushioned with extra keratin layers to run over baking sand without blistering.',
      'Recorded in the Guinness Book of World Records as the oldest known domesticated purebred dog breed.',
      'Unlike scenthounds that follow ground trails with heads down, Salukis run with heads held high to track prey visually at high velocity.',
    ],
  },
  'great-pyrenees': {
    superpower: {
      title: 'Autonomous Nocturnal Guardian Instinct',
      description: 'Bred to live year-round with livestock on mountain peaks without human direction, capable of calculating threats and repelling apex predators like Eurasian wolves and brown bears.',
      anatomicalTrait: 'Double dewclaws on both rear legs providing critical traction on sheer glacier ice, paired with a snow-white camouflage fleece.',
    },
    historicalFact: 'In 1675, King Louis XIV and the French court named the Great Pyrenees the official "Royal Dog of France" to guard the châteaux of Versailles and the Pyrenean border castles.',
    loreSnippet: 'Shepherds in the Pyrenees fitted their Patous with iron spiked collars called "carlancas" to protect their throats in deadly duels with mountain wolves.',
    stats: {
      scentIndex: 85,
      sprintSpeedKmh: 38,
      coldTolerance: 'Extreme',
      heatTolerance: 'Low',
      biteForcePsi: 400,
      trainabilityRating: 3,
      vocalizationType: 'Deep Resonant Foghorn Bark & Territorial Warning',
      sheddingRating: 5,
    },
    funFacts: [
      'They are naturally nocturnal; their internal clock makes them most alert from twilight until dawn, actively patrolling the perimeter of their territory.',
      'They possess an extraordinarily gentle touch with baby lambs and kittens despite possessing a crushing 400 PSI bite force.',
      'Their white coat is self-cleaning; when dried, mountain mud and grit fall off naturally due to specialized lanolin oils.',
      'Their rear double dewclaws are connected to bone, functioning as snowshoes on unstable mountain scree.',
    ],
  },
  'newfoundland': {
    superpower: {
      title: 'Cold-Water Lifesaving Propulsion',
      description: 'Born with fully webbed feet, huge lung capacity, and a natural breaststroke swimming motion that can tow lifeboats filled with 20 shipwreck survivors through breaking surf.',
      anatomicalTrait: 'Water-resistant oily double coat that stays completely dry at skin level even after hours in freezing North Atlantic brine.',
    },
    historicalFact: 'A Newfoundland named Seaman accompanied the Lewis and Clark expedition across North America from 1804 to 1806, guarding the camp from grizzly bears and hunting game.',
    loreSnippet: 'Lord Byron wrote his most famous epitaph ("Inscription on the Monument of a Newfoundland Dog") for his beloved Boatswain, praising him for possessing "all the Virtues of Man without his Vices."',
    stats: {
      scentIndex: 82,
      sprintSpeedKmh: 35,
      coldTolerance: 'Extreme',
      heatTolerance: 'Low',
      biteForcePsi: 380,
      trainabilityRating: 5,
      vocalizationType: 'Deep Chest Resonant Booming Bark',
      sheddingRating: 5,
    },
    funFacts: [
      'Their lips and jowls are designed to allow them to breathe normally while carrying a drowning human or heavy towrope in their mouth through rough waves.',
      'They have an innate rescue reflex: if they see someone swimming, they will instinctively swim out and offer their body as a flotation platform.',
      'Napoleon Bonaparte was reportedly saved by a fisherman’s Newfoundland dog after falling overboard during his escape from the island of Elba in 1815.',
      'Male Newfoundlands can weigh up to 75 kg (165 lbs), with some record giants exceeding 90 kg (200 lbs).',
    ],
  },
  'basenji': {
    superpower: {
      title: 'Silent Canopy Scent Tracking & Jumping Spring',
      description: 'One of the few dogs that does not bark due to a uniquely structured flat larynx, moving like a feline through dense jungle canopy while scenting game in tropical humidity.',
      anatomicalTrait: 'Wrinkled forehead lending a perpetual thoughtful expression, paired with tight spiral curl tail and almond gazelle eyes.',
    },
    historicalFact: 'Basenji representations appear in 4,000-year-old carvings in the tombs of the Fourth Dynasty Egyptian pharaohs.',
    loreSnippet: 'Central African hunters named the Basenji "M’bwa Shenzi" (the wild jumping dog) for its ability to leap vertically 2 meters into the air out of tall elephant grass to spot game.',
    stats: {
      scentIndex: 91,
      sprintSpeedKmh: 50,
      coldTolerance: 'Low',
      heatTolerance: 'Extreme',
      biteForcePsi: 215,
      trainabilityRating: 3,
      vocalizationType: 'Musical "Barroo" Yodel & Low Chortle',
      sheddingRating: 1,
    },
    funFacts: [
      'Grooms its own fur obsessively like a domestic cat, having virtually zero characteristic dog odor.',
      'Does not have a estrus cycle twice a year like modern breeds; females come into heat only once a year in the autumn, matching wild canids like wolves and dingoes.',
      'They have an aversion to water and rain, often stepping meticulously around puddles.',
      'Their paws are unusually long and flexible, allowing them to grasp bones or climb inclined tree trunks.',
    ],
  },
};

// Generic curiosity fallback generator for any breed without specific static data
export function getBreedCuriosity(slug: string, breed: any): BreedCuriosity {
  if (BREED_CURIOSITIES[slug]) {
    return BREED_CURIOSITIES[slug];
  }

  // Generate dynamic, hyper-detailed fallback based on breed data
  const isHerding = breed.group === 'Herding';
  const isHound = breed.group === 'Hound';
  const isWorking = breed.group === 'Working';
  const isToy = breed.group === 'Toy';
  const isTerrier = breed.group === 'Terrier';

  return {
    superpower: {
      title: `${breed.purpose.split(',')[0]} Lineage Acuity`,
      description: `Evolved over centuries in ${breed.country} for specialized ${breed.purpose.toLowerCase()}, demonstrating immense environmental resilience and instinctive task mastery.`,
      anatomicalTrait: `Structural balance adapted to ${breed.region} climate with ${breed.energy.toLowerCase()} metabolic drive and ${breed.size.toLowerCase()} frame.`,
    },
    historicalFact: `Documented as originating in ${breed.originEra}, preserved through dedicated regional breeders in ${breed.country}.`,
    loreSnippet: `Revered across ${breed.region} folklore as an indispensable partner to shepherds, hunters, and guardians of historical heritage.`,
    stats: {
      scentIndex: isHound ? 94 : isHerding ? 86 : 80,
      sprintSpeedKmh: isHound ? 60 : isHerding ? 46 : isWorking ? 40 : 32,
      coldTolerance: breed.region.includes('North') || breed.region.includes('East') ? 'High' : 'Moderate',
      heatTolerance: breed.region.includes('Africa') || breed.region.includes('Middle East') ? 'High' : 'Moderate',
      biteForcePsi: breed.size.includes('Giant') ? 380 : breed.size.includes('Large') ? 260 : 180,
      trainabilityRating: isHerding ? 5 : isWorking ? 4 : 3,
      vocalizationType: isHound ? 'Baying & Trail Howl' : isHerding ? 'Alert & Staccato Bark' : 'Resonant Warning Bark',
      sheddingRating: breed.size.includes('Large') ? 4 : 3,
    },
    funFacts: [
      `Historically bred in ${breed.country} specifically for ${breed.purpose.toLowerCase()}.`,
      `Possesses a typical lifespan of ${breed.lifespan} with characteristic ${breed.temperament.slice(0, 3).join(', ')} disposition.`,
      `Features distinct ${breed.height} height and ${breed.weight} weight proportional to historical working requirements.`,
      `Categorized under the ${breed.group} group with ${breed.energy} energy demands.`,
    ],
  };
}
