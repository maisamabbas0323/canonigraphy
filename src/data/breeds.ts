import { Breed } from '../types';

export const BREEDS: Breed[] = [
  {
    id: 'b-001',
    slug: 'german-shepherd',
    number: 27,
    name: 'German Shepherd',
    aliases: ['Deutscher Schäferhund', 'Alsatian', 'GSD'],
    country: 'Germany',
    countryCode: 'DE',
    region: 'Western Europe',
    coordinates: { lat: 51.1657, lng: 10.4515 },
    chapterId: 'the-herders',
    chapterTitle: 'THE HERDERS',
    chapterSubtitle: 'Pastoral Intelligence & Boundless Fields',
    group: 'Herding',
    purpose: 'Pastoral sheep herding, police tracking, service, and estate protection',
    originEra: '1899 (Late 19th Century)',
    originDetailed: 'Bred in Karlsruhe, Germany by Max von Stephanitz from local working sheepdogs',
    size: 'Large',
    height: '55 - 65 cm (22 - 26 in)',
    weight: '30 - 40 kg (66 - 88 lbs)',
    lifespan: '9 - 13 years',
    energy: 'High',
    temperament: ['Intelligent', 'Courageous', 'Alert', 'Confident', 'Loyal', 'Trainable'],
    history: 'In 1899, former cavalry captain Max von Stephanitz attended a dog exhibition in Karlsruhe and purchased Hektor Linksrhein, whom he renamed Horand von Grafrath—the very first registered German Shepherd. Von Stephanitz envisioned a standardized working dog combining physical endurance, mental acuity, and unwavering devotion. Across the 20th century, the breed transitioned from pastoral duties in the Bavarian hills into global search, rescue, and guide roles.',
    cinematicNarration: 'In the late nineteenth century, across the undulating pastures of southern Germany, Max von Stephanitz sought not an ornament, but a standard of working perfection. From local sheep-tending lineages, he selected for structural balance, unwavering nerve, and an instinctive desire to partner with humans. The German Shepherd was not born in luxury; it was forged in wind, rain, and relentless pastoral labor.',
    captions: [
      { start: 0, end: 4.5, text: 'In the late nineteenth century, across the undulating pastures of southern Germany,' },
      { start: 4.5, end: 9.2, text: 'Max von Stephanitz sought not an ornament, but a standard of working perfection.' },
      { start: 9.2, end: 14.8, text: 'From local sheep-tending lineages, he selected for structural balance and unwavering nerve.' },
      { start: 14.8, end: 20.0, text: 'The German Shepherd was not born in luxury; it was forged in wind, rain, and relentless pastoral labor.' }
    ],
    images: [
      {
        id: 'gsd-1',
        url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Michael Dziedzic',
        alt: 'German Shepherd dog standing alert in natural lighting'
      },
      {
        id: 'gsd-2',
        url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Daniel Lincoln',
        alt: 'German Shepherd profile in high-contrast monochrome'
      }
    ],
    ambienceCategory: 'FARMLAND',
    relatedBreeds: ['belgian-malinois', 'border-collie', 'rottweiler'],
    sources: [
      { title: 'Der Deutsche Schäferhund in Wort und Bild', organization: 'Verein für Deutsche Schäferhunde (SV)' },
      { title: 'FCI Standard No. 166', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-002',
    slug: 'siberian-husky',
    number: 14,
    name: 'Siberian Husky',
    aliases: ['Chukchi Sled Dog', 'Arctic Husky', 'Sibe'],
    country: 'Russia / Siberia',
    countryCode: 'RU',
    region: 'Northern Eurasia',
    coordinates: { lat: 66.2587, lng: 172.4820 },
    chapterId: 'the-north',
    chapterTitle: 'THE NORTH',
    chapterSubtitle: 'Arctic Ice, Tundra & Sled Expeditions',
    group: 'Working',
    purpose: 'Long-distance sub-zero sled traction, expedition transport, nomadic survival',
    originEra: 'Ancient (Preserved across 3,000+ years)',
    originDetailed: 'Bred by the Chukchi nomadic people of the Chukchi Peninsula, Far East Siberia',
    size: 'Medium',
    height: '51 - 60 cm (20 - 24 in)',
    weight: '16 - 27 kg (35 - 60 lbs)',
    lifespan: '12 - 14 years',
    energy: 'Very High',
    temperament: ['Gentle', 'Enduring', 'Outgoing', 'Alert', 'Pack-Oriented', 'Resilient'],
    history: 'Developed by the semi-nomadic Chukchi people of eastern Siberia, the Siberian Husky was an indispensable lifeline in one of Earth\'s most hostile climates. In conditions dropping below minus sixty degrees Celsius, teams of Huskies pulled lightweight hunting sledges across vast expanses of frozen sea ice. Their double coat, almond-shaped frost-resistant eyes, and unprecedented metabolic efficiency enabled them to travel immense distances on minimal rations.',
    cinematicNarration: 'Across the barren expanse of the Siberian tundra, where winter temperatures plunge past minus sixty degrees, survival was never guaranteed. The Chukchi nomads did not simply own these dogs—they shared their hearths, their shelters, and their journeys across frozen sea ice. The Siberian Husky was shaped by distance, endurance, and the silent rhythm of the Arctic winds.',
    captions: [
      { start: 0, end: 5.0, text: 'Across the barren expanse of the Siberian tundra, where winter temperatures plunge,' },
      { start: 5.0, end: 10.0, text: 'survival was never guaranteed without absolute mutual trust.' },
      { start: 10.0, end: 15.2, text: 'The Chukchi nomads shared their hearths and their journeys across endless frozen sea ice.' },
      { start: 15.2, end: 20.5, text: 'The Siberian Husky was shaped by distance, endurance, and the silent rhythm of the Arctic winds.' }
    ],
    images: [
      {
        id: 'husky-1',
        url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Marek Szturc',
        alt: 'Siberian Husky in snowbound winter environment'
      },
      {
        id: 'husky-2',
        url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Baim Hanif',
        alt: 'Siberian Husky close portrait with striking gaze'
      }
    ],
    ambienceCategory: 'SNOW',
    relatedBreeds: ['alaskan-malamute', 'samoyed', 'greenland-dog'],
    sources: [
      { title: 'The Siberian Husky: Northern Heritage and Sled Lineages', organization: 'American Kennel Club' },
      { title: 'FCI Standard No. 270', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-003',
    slug: 'akita',
    number: 3,
    name: 'Akita',
    aliases: ['Akita Inu', 'Japanese Akita', 'Matagi Dog'],
    country: 'Japan',
    countryCode: 'JP',
    region: 'East Asia',
    coordinates: { lat: 39.7186, lng: 140.1024 },
    chapterId: 'the-beginning',
    chapterTitle: 'THE BEGINNING',
    chapterSubtitle: 'Primitive, Basal & Ancient Lineages',
    group: 'Working',
    purpose: 'Mountain big-game hunting (bear, boar, deer), estate defense, spiritual symbol',
    originEra: '17th Century (Edo Period)',
    originDetailed: 'Akita Prefecture, Tohoku region of northern Honshu, Japan',
    size: 'Large',
    height: '61 - 71 cm (24 - 28 in)',
    weight: '32 - 59 kg (70 - 130 lbs)',
    lifespan: '10 - 14 years',
    energy: 'Moderate',
    temperament: ['Dignified', 'Courageous', 'Composed', 'Fiercely Loyal', 'Reserved'],
    history: 'Originating in the rugged mountains of Akita Prefecture in northern Japan, these powerful spitz dogs were bred as Matagi (traditional winter hunters) to track Yezo bears, wild boars, and sika deer through deep mountain snow. Later revered by samurai clans as guardians of honor and household defense, the Akita was officially designated a Living Natural Monument of Japan in 1931. The legendary story of Hachiko cemented the breed as a universal symbol of loyalty.',
    cinematicNarration: 'High in the mist-veiled peaks of northern Honshu, the Matagi hunters needed a companion that knew no hesitation in the presence of the mountain bear. The Akita was forged with heavy bone, dense double fur, and a stillness of spirit known in Japanese philosophy as Kan-i—courageous dignity. To stand beside an Akita is to encounter an ancient stillness.',
    captions: [
      { start: 0, end: 4.8, text: 'High in the mist-veiled peaks of northern Honshu,' },
      { start: 4.8, end: 9.8, text: 'the Matagi hunters needed a companion that knew no hesitation before the mountain bear.' },
      { start: 9.8, end: 15.0, text: 'The Akita was forged with heavy bone, dense fur, and a stillness of spirit known as Kan-i.' },
      { start: 15.0, end: 20.0, text: 'To stand beside an Akita is to encounter an ancient, unwavering stillness.' }
    ],
    images: [
      {
        id: 'akita-1',
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Victor Grabarczyk',
        alt: 'Japanese Akita in dignified mountain setting'
      },
      {
        id: 'akita-2',
        url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Karsten Winegeart',
        alt: 'Akita portrait against dark background'
      }
    ],
    ambienceCategory: 'MOUNTAIN',
    relatedBreeds: ['shiba-inu', 'tibetan-mastiff', 'chow-chow'],
    sources: [
      { title: 'Nihon Ken Hozonkai Historical Annals', organization: 'Society for the Preservation of Japanese Dogs' },
      { title: 'FCI Standard No. 255', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-004',
    slug: 'border-collie',
    number: 8,
    name: 'Border Collie',
    aliases: ['Working Collie', 'Border Sheepdog'],
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Northern Europe',
    coordinates: { lat: 55.5000, lng: -2.5000 },
    chapterId: 'the-herders',
    chapterTitle: 'THE HERDERS',
    chapterSubtitle: 'Pastoral Intelligence & Boundless Fields',
    group: 'Herding',
    purpose: 'Pastoral hill sheep herding, trial competition, kinetic obstacle work',
    originEra: 'Late 19th Century (1893: Old Hemp)',
    originDetailed: 'The Anglo-Scottish border country (Northumberland and Scottish Lowlands)',
    size: 'Medium',
    height: '46 - 56 cm (18 - 22 in)',
    weight: '14 - 20 kg (30 - 45 lbs)',
    lifespan: '12 - 15 years',
    energy: 'Very High',
    temperament: ['Tenacious', 'Keen', 'Energetic', 'Hyper-Intelligent', 'Responsive', 'Alert'],
    history: 'In the windswept Border hills between Scotland and England, shepherds required a dog capable of gathering scattered sheep across miles of treacherous heather without barking or panicking the flock. In 1893, a tricolor dog named Old Hemp was born in Northumberland; his quiet, predatory gaze (known simply as "the eye") and effortless movement revolutionized pastoral work. Nearly every modern Border Collie traces directly back to Old Hemp.',
    cinematicNarration: 'Upon the rain-lashed moors of the Anglo-Scottish frontier, human voice was easily swallowed by the wind. Shepherds looked to a dog that could think at a distance of a mile. Through an intense, crouched gaze and predatory precision softened into guidance, the Border Collie mastered the art of non-verbal control—the undisputed pinnacle of pastoral intellect.',
    captions: [
      { start: 0, end: 4.8, text: 'Upon the rain-lashed moors of the Anglo-Scottish frontier,' },
      { start: 4.8, end: 9.5, text: 'human voice was easily swallowed by the rising wind.' },
      { start: 9.5, end: 14.8, text: 'Shepherds looked to a dog that could calculate and think at a distance of a mile.' },
      { start: 14.8, end: 20.0, text: 'Through quiet gaze and kinetic precision, the Border Collie mastered the art of pastoral control.' }
    ],
    images: [
      {
        id: 'bc-1',
        url: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Pauline Loroy',
        alt: 'Border Collie focused on open field horizon'
      },
      {
        id: 'bc-2',
        url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Alvan Nee',
        alt: 'Border Collie running across grassy hill'
      }
    ],
    ambienceCategory: 'FARMLAND',
    relatedBreeds: ['german-shepherd', 'australian-shepherd', 'pembroke-welsh-corgi'],
    sources: [
      { title: 'International Sheep Dog Society Herd Book', organization: 'ISDS Heritage Foundation' },
      { title: 'FCI Standard No. 297', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-005',
    slug: 'saluki',
    number: 1,
    name: 'Saluki',
    aliases: ['Gazelle Hound', 'Royal Dog of Egypt', 'Persian Sighthound'],
    country: 'Egypt / Fertile Crescent',
    countryCode: 'EG',
    region: 'Middle East & Africa',
    coordinates: { lat: 26.8206, lng: 30.8025 },
    chapterId: 'the-beginning',
    chapterTitle: 'THE BEGINNING',
    chapterSubtitle: 'Primitive, Basal & Ancient Lineages',
    group: 'Hound',
    purpose: 'Desert sighthound coursing (gazelle, hare), aristocratic companionship',
    originEra: '7,000 BCE (One of the oldest recorded breeds)',
    originDetailed: 'Fertile Crescent, Mesopotamian river basins and Arabian Peninsula deserts',
    size: 'Large',
    height: '58 - 71 cm (23 - 28 in)',
    weight: '18 - 27 kg (40 - 60 lbs)',
    lifespan: '12 - 14 years',
    energy: 'Moderate to High',
    temperament: ['Aloof', 'Quiet', 'Graceful', 'Gentle', 'Aristocratic', 'Independent'],
    history: 'Carved into Sumerian seals dating to 7000 BCE and mummified alongside pharaohs in ancient Egypt, the Saluki is among the earliest identifiable dog breeds known to archaeology. Bedouin nomads considered the Saluki not an unclean animal, but a divine gift—El Hor ("The Noble One")—allowing them to sleep inside family tents. Their flexible spine, enormous lung capacity, and feathering allowed them to run down gazelles across shifting sand dunes at speeds exceeding 65 km/h.',
    cinematicNarration: 'Before empires wrote their laws on stone tablets, the Saluki was running across desert sands. For thousands of years, Bedouin tribes treated this hound not as property, but as El Hor—the noble gift of the desert. With a deep chest, aerodynamic elegance, and eyes that see across miles of open dunes, the Saluki carries the antiquity of human civilization in its stride.',
    captions: [
      { start: 0, end: 5.0, text: 'Before empires wrote their laws on stone tablets, the Saluki was running across desert sands.' },
      { start: 5.0, end: 10.0, text: 'For thousands of years, Bedouin tribes treated this hound as El Hor—the noble gift.' },
      { start: 10.0, end: 15.0, text: 'With an aerodynamic frame and eyes that see across vast miles of dunes,' },
      { start: 15.0, end: 20.0, text: 'the Saluki carries the living antiquity of human civilization in its stride.' }
    ],
    images: [
      {
        id: 'saluki-1',
        url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Jamie Street',
        alt: 'Graceful Saluki standing in wind-swept environment'
      }
    ],
    ambienceCategory: 'OPEN_PLAINS',
    relatedBreeds: ['afghan-hound', 'greyhound', 'pharaoh-hound'],
    sources: [
      { title: 'Archaeological Evidence of Canids in the Ancient Near East', organization: 'Oriental Institute of Chicago' },
      { title: 'FCI Standard No. 269', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-006',
    slug: 'great-pyrenees',
    number: 31,
    name: 'Great Pyrenees',
    aliases: ['Chien de Montagne des Pyrénées', 'Pyrenean Mountain Dog', 'Patou'],
    country: 'France',
    countryCode: 'FR',
    region: 'Western Europe',
    coordinates: { lat: 42.7000, lng: 0.1000 },
    chapterId: 'the-guardians',
    chapterTitle: 'THE GUARDIANS',
    chapterSubtitle: 'Mountain Fortresses & Estate Protectors',
    group: 'Working',
    purpose: 'Livestock guardian against wolves and bears, royal châteaux sentry',
    originEra: '3,000 BCE (Ancient Mountain Lineage)',
    originDetailed: 'The Pyrenees Mountain Range between southwestern France and northern Spain',
    size: 'Giant',
    height: '65 - 81 cm (26 - 32 in)',
    weight: '40 - 55 kg (85 - 120+ lbs)',
    lifespan: '10 - 12 years',
    energy: 'Low to Moderate',
    temperament: ['Patient', 'Fearless', 'Affectionate', 'Gentle Giant', 'Confident', 'Independent'],
    history: 'Fossilized remains of Pyrenean livestock guardians in bronze-age strata indicate their presence in the high mountain pastures for over five millennia. Working independently from human commands, the Patou lived among the flock year-round, blending into the sheep with its stark white coat while deterring Iberian wolves and Pyrenean brown bears. In 1675, King Louis XIV\'s court officially adopted the breed as the Royal Dog of France.',
    cinematicNarration: 'High in the cloud-wrapped passes of the Pyrenees, where sheepherders slept miles below, one sentinel remained vigilant through the mountain night. The Great Pyrenees was bred not to obey commands, but to make independent decisions of life and death. Beneath a coat as white as glacier snow lies a calm, unyielding guardian that has watched over mountain flocks for three thousand years.',
    captions: [
      { start: 0, end: 5.0, text: 'High in the cloud-wrapped passes of the Pyrenees, where herders slept miles below,' },
      { start: 5.0, end: 10.0, text: 'one sentinel remained vigilant through the freezing mountain night.' },
      { start: 10.0, end: 15.0, text: 'The Great Pyrenees was bred to make independent decisions of life and death.' },
      { start: 15.0, end: 20.0, text: 'Beneath a coat as white as snow lies a calm guardian watching over three millennia of flocks.' }
    ],
    images: [
      {
        id: 'gp-1',
        url: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Berkay Gumustekin',
        alt: 'Majestic Great Pyrenees dog resting in alpine meadow'
      }
    ],
    ambienceCategory: 'MOUNTAIN',
    relatedBreeds: ['saint-bernard', 'bernese-mountain-dog', 'anatolian-shepherd', 'tibetan-mastiff'],
    sources: [
      { title: 'The Pyrenean Mountain Dog: Ancient Sentinels of the High Valleys', organization: 'Société Centrale Canine' },
      { title: 'FCI Standard No. 137', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-007',
    slug: 'newfoundland',
    number: 44,
    name: 'Newfoundland',
    aliases: ['Terre-Neuve', 'Gentle Giant of the Atlantic', 'Newfie'],
    country: 'Canada',
    countryCode: 'CA',
    region: 'North America',
    coordinates: { lat: 48.5670, lng: -55.8058 },
    chapterId: 'the-workers',
    chapterTitle: 'THE WORKERS',
    chapterSubtitle: 'Cold Atlantic Seas & Wetland Retrievers',
    group: 'Working',
    purpose: 'Maritime water rescue, fishing net hauling, heavy coastal draft work',
    originEra: '18th Century',
    originDetailed: 'Island of Newfoundland, Canadian Atlantic coast',
    size: 'Giant',
    height: '66 - 71 cm (26 - 28 in)',
    weight: '54 - 68 kg (120 - 150 lbs)',
    lifespan: '8 - 10 years',
    energy: 'Moderate',
    temperament: ['Gentle', 'Patient', 'Sweet-Tempered', 'Courageous', 'Devoted', 'Strong Swimmer'],
    history: 'On the gale-swept coast of Newfoundland, English and Irish settlers and indigenous working dogs evolved a colossal canine adapted to freezing North Atlantic waters. Possessing fully webbed paws, a water-resistant oily double coat, and a unique modified breaststroke swimming action, Newfoundlands hauled heavy timber, retrieved fishing nets from breaking surf, and instinctively pulled drowning sailors to shore.',
    cinematicNarration: 'In the frigid Atlantic waters off Newfoundland, where ships shattered against jagged rocks, fishermen had one ally that never hesitated to leap into breaking seas. With immense bone, webbed paws, and an instinctive drive to save human life from cold waters, the Newfoundland earned its place as the gentle lifesaver of the open maritime coast.',
    captions: [
      { start: 0, end: 5.0, text: 'In the frigid Atlantic waters off Newfoundland, where ships shattered against jagged rocks,' },
      { start: 5.0, end: 10.0, text: 'fishermen had one ally that never hesitated to leap into the breaking surf.' },
      { start: 10.0, end: 15.0, text: 'With webbed paws and an instinctive drive to save human life from cold currents,' },
      { start: 15.0, end: 20.0, text: 'the Newfoundland earned its place as the gentle lifesaver of the maritime coast.' }
    ],
    images: [
      {
        id: 'newf-1',
        url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Charles Deluvio',
        alt: 'Newfoundland dog by the water shore'
      }
    ],
    ambienceCategory: 'COAST',
    relatedBreeds: ['labrador-retriever', 'portuguese-water-dog', 'saint-bernard'],
    sources: [
      { title: 'The Maritime Newfoundland Dog in History', organization: 'Canadian Kennel Club Heritage Series' },
      { title: 'FCI Standard No. 50', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-008',
    slug: 'basenji',
    number: 2,
    name: 'Basenji',
    aliases: ['African Barkless Dog', 'Congo Terrier', 'Zande Dog'],
    country: 'Democratic Republic of the Congo',
    countryCode: 'CD',
    region: 'Central Africa',
    coordinates: { lat: -4.0383, lng: 21.7587 },
    chapterId: 'the-beginning',
    chapterTitle: 'THE BEGINNING',
    chapterSubtitle: 'Primitive, Basal & Ancient Lineages',
    group: 'Hound',
    purpose: 'Equatorial rainforest hunting, driving game into nets, silent tracking',
    originEra: 'Ancient (Basal African Lineage)',
    originDetailed: 'Congo Basin and Ituri Rainforest, Central Africa',
    size: 'Small to Medium',
    height: '40 - 43 cm (16 - 17 in)',
    weight: '9 - 11 kg (22 - 24 lbs)',
    lifespan: '13 - 16 years',
    energy: 'High',
    temperament: ['Curious', 'Intelligent', 'Quiet', 'Cat-like', 'Energetic', 'Clean'],
    history: 'Found in the dense tropical canopies of the Congo basin, the Basenji is one of the few truly basal dog lineages whose genetics predate modern breed isolation. Because normal barking would alert prey in thick rainforest vegetation, the Basenji evolved a uniquely shaped larynx that produces only a soft melodious yodel or chortle (known as a barroo). Pygmy and Azande hunters equipped them with carved wooden gourds or iron bells to track their position in dense jungle brush.',
    cinematicNarration: 'Deep inside the equatorial rainforests of the Congo, silence is the difference between survival and hunger. The Basenji does not bark; it watches with furrowed brow and emits only a low, echoing yodel known as a barroo. Untouched by centuries of selective European breeding, it remains the purest living echo of Africa\'s ancient hunting hounds.',
    captions: [
      { start: 0, end: 5.0, text: 'Deep inside the equatorial rainforests of the Congo, silence is the difference between life and hunger.' },
      { start: 5.0, end: 10.0, text: 'The Basenji does not bark; it watches with furrowed brow and keen cat-like stillness.' },
      { start: 10.0, end: 15.0, text: 'Untouched by centuries of modern hybridization,' },
      { start: 15.0, end: 20.0, text: 'it remains the purest living echo of Africa\'s ancient hunting companions.' }
    ],
    images: [
      {
        id: 'basenji-1',
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Karsten Winegeart',
        alt: 'Alert Basenji dog in warm natural sunlight'
      }
    ],
    ambienceCategory: 'WILDERNESS',
    relatedBreeds: ['saluki', 'pharaoh-hound', 'rhodesian-ridgeback'],
    sources: [
      { title: 'Genomic Signatures of Primitive Canids in Africa', organization: 'African Cynology Studies' },
      { title: 'FCI Standard No. 43', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-009',
    slug: 'cane-corso',
    number: 35,
    name: 'Cane Corso',
    aliases: ['Italian Cane Corso', 'Cane Corso Italiano', 'Italian Mastiff'],
    country: 'Italy',
    countryCode: 'IT',
    region: 'Southern Europe',
    coordinates: { lat: 40.8518, lng: 14.2681 },
    chapterId: 'the-guardians',
    chapterTitle: 'THE GUARDIANS',
    chapterSubtitle: 'Mountain Fortresses & Estate Protectors',
    group: 'Working',
    purpose: 'Farmstead guardian, wild boar hunting, estate defense, historic Roman sentry',
    originEra: 'Ancient Rome / Revived 20th Century',
    originDetailed: 'Southern Italy (Puglia, Lucania, and Calabria)',
    size: 'Large',
    height: '60 - 70 cm (24 - 28 in)',
    weight: '40 - 50 kg (88 - 110 lbs)',
    lifespan: '9 - 12 years',
    energy: 'Moderate to High',
    temperament: ['Composed', 'Assertive', 'Protective', 'Loyal', 'Intelligent', 'Watchful'],
    history: 'The name derives from the Latin "cohors," meaning guardian or protector of the courtyard. Descended directly from the ancient Roman war molosser (Canis Pugnax), the Cane Corso was a versatile working partner across the masserie (fortified estates) of southern Italy. They protected olive groves, subdued semi-wild cattle, and hunted wild boar in the rugged Apennine hills before nearly disappearing during mid-20th century industrialization.',
    cinematicNarration: 'Echoing the ancient Roman villas and sun-baked stone courtyards of southern Italy, the Cane Corso stood as the sentinel of the masseria. Its Latin name speaks to its singular duty—cohors, the protector. Athletic yet powerful, disciplined yet fiercely loyal, it represents centuries of Mediterranean estate guardianship.',
    captions: [
      { start: 0, end: 5.0, text: 'Echoing the ancient Roman villas and sun-baked courtyards of southern Italy,' },
      { start: 5.0, end: 10.0, text: 'the Cane Corso stood as the silent sentinel of the masseria.' },
      { start: 10.0, end: 15.0, text: 'Its Latin name speaks to its eternal duty: cohors—the steadfast protector.' },
      { start: 15.0, end: 20.0, text: 'Athletic yet imposing, it represents centuries of Mediterranean defense.' }
    ],
    images: [
      {
        id: 'corso-1',
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Chewy',
        alt: 'Powerful Cane Corso in athletic stance'
      }
    ],
    ambienceCategory: 'COUNTRYSIDE',
    relatedBreeds: ['rottweiler', 'doberman-pinscher', 'great-pyrenees'],
    sources: [
      { title: 'Il Cane Corso: Storia e Caratteristiche del Molosso Italico', organization: 'Ente Nazionale della Cinofilia Italiana' },
      { title: 'FCI Standard No. 343', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-010',
    slug: 'rhodesian-ridgeback',
    number: 52,
    name: 'Rhodesian Ridgeback',
    aliases: ['African Lion Dog', 'Van Rooyen\'s Lion Dog'],
    country: 'Zimbabwe / Southern Africa',
    countryCode: 'ZW',
    region: 'Southern Africa',
    coordinates: { lat: -19.0154, lng: 29.1549 },
    chapterId: 'the-hunters',
    chapterTitle: 'THE HUNTERS',
    chapterSubtitle: 'Sighthounds, Scents & Woodland Trackers',
    group: 'Hound',
    purpose: 'Tracking big game (lions), farmstead protection, endurance hunting in extreme heat',
    originEra: 'Late 19th Century',
    originDetailed: 'Matabeleland and Mashonaland, Southern Africa (Bred with Khoikhoi native dogs)',
    size: 'Large',
    height: '61 - 69 cm (24 - 27 in)',
    weight: '32 - 39 kg (70 - 85 lbs)',
    lifespan: '10 - 12 years',
    energy: 'High',
    temperament: ['Dignified', 'Courageous', 'Athletic', 'Quietly Strong', 'Faithful'],
    history: 'In the late 1800s in southern Africa, big game hunters like Cornelius van Rooyen required a hound capable of tracking lions across thornbush and holding them at bay without suicidally attacking. They crossed European Great Danes, Mastiffs, and Greyhounds with the native semi-domesticated hunting dogs of the Khoikhoi people. These indigenous dogs bequeathed the famous distinctive ridge of hair growing backwards along the spine and extraordinary heat endurance.',
    cinematicNarration: 'Under the blistering sun of the southern African savannah, a dog had to withstand heat, thorns, predators, and thirst. The Rhodesian Ridgeback inherited its famous spinal crest from the ancient dogs of the Khoikhoi. Fearless yet prudent, it could track a lion across miles of bushveldt, holding the predator at bay until the hunter arrived.',
    captions: [
      { start: 0, end: 5.0, text: 'Under the blistering sun of the southern African savannah, survival required extraordinary nerve.' },
      { start: 5.0, end: 10.0, text: 'The Rhodesian Ridgeback inherited its spinal ridge from the ancient Khoikhoi hunting dogs.' },
      { start: 10.0, end: 15.0, text: 'Fearless yet calculated, it traversed miles of thornbush to hold lions at bay,' },
      { start: 15.0, end: 20.0, text: 'a monument to canine athletic endurance on the open plains.' }
    ],
    images: [
      {
        id: 'ridge-1',
        url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Flouffy',
        alt: 'Rhodesian Ridgeback standing proudly in golden landscape'
      }
    ],
    ambienceCategory: 'OPEN_PLAINS',
    relatedBreeds: ['basenji', 'greyhound', 'bloodhound'],
    sources: [
      { title: 'The Rhodesian Ridgeback: Origin and Standard', organization: 'Rhodesian Ridgeback Club of Southern Africa' },
      { title: 'FCI Standard No. 146', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-011',
    slug: 'saint-bernard',
    number: 32,
    name: 'Saint Bernard',
    aliases: ['St. Bernhardshund', 'Alpine Rescue Dog', 'Barry Dog'],
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Western Europe',
    coordinates: { lat: 45.8687, lng: 7.1706 },
    chapterId: 'the-guardians',
    chapterTitle: 'THE GUARDIANS',
    chapterSubtitle: 'Mountain Fortresses & Estate Protectors',
    group: 'Working',
    purpose: 'High Alpine avalanche search and rescue, hospice companionship, drafting',
    originEra: '17th Century (c. 1660)',
    originDetailed: 'Great St Bernard Hospice at 2,469 m altitude in the Swiss Alps',
    size: 'Giant',
    height: '70 - 90 cm (28 - 35 in)',
    weight: '64 - 120 kg (140 - 260 lbs)',
    lifespan: '8 - 10 years',
    energy: 'Low to Moderate',
    temperament: ['Gentle', 'Friendly', 'Calm', 'Watchful', 'Devoted', 'Steady'],
    history: 'Perched over 8,000 feet high in the treacherous pass between Switzerland and Italy, the Augustinian monks of the Great Saint Bernard Hospice began keeping large mountain dogs around 1660. Endowed with an uncanny sense of direction in whiteout blizzards and the ability to detect travelers buried beneath meters of avalanche snow, these dogs saved over 2,000 human lives. The most famous, Barry (1800–1814), saved more than 40 travelers.',
    cinematicNarration: 'Over eight thousand feet above the tree line, through the Great Saint Bernard Pass, blizzards swallowed trails without warning. The hospice monks did not venture alone into the drifts—they followed the broad chests and keen scent of their mountain dogs. The Saint Bernard became a legend of selflessness, carving paths of hope through Alpine snow.',
    captions: [
      { start: 0, end: 5.0, text: 'Over eight thousand feet above the tree line in the Great Saint Bernard Pass,' },
      { start: 5.0, end: 10.0, text: 'blizzards swallowed trails and freezing travelers without warning.' },
      { start: 10.0, end: 15.0, text: 'The hospice monks followed the keen scent and broad chests of these Alpine dogs.' },
      { start: 15.0, end: 20.0, text: 'The Saint Bernard stands as a living legend of search, rescue, and devotion.' }
    ],
    images: [
      {
        id: 'stb-1',
        url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Roberto Nickson',
        alt: 'Noble Saint Bernard dog in mountain setting'
      }
    ],
    ambienceCategory: 'SNOW',
    relatedBreeds: ['bernese-mountain-dog', 'great-pyrenees', 'newfoundland'],
    sources: [
      { title: 'Annals of the Great Saint Bernard Hospice', organization: 'Congregation of the Canons of the Great Saint Bernard' },
      { title: 'FCI Standard No. 61', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-012',
    slug: 'shiba-inu',
    number: 4,
    name: 'Shiba Inu',
    aliases: ['Little Brushwood Dog', 'Japanese Shiba', 'Shiba'],
    country: 'Japan',
    countryCode: 'JP',
    region: 'East Asia',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    chapterId: 'the-beginning',
    chapterTitle: 'THE BEGINNING',
    chapterSubtitle: 'Primitive, Basal & Ancient Lineages',
    group: 'Primitive/Ancient',
    purpose: 'Brushwood small game hunting (birds, rabbit), companion, national monument',
    originEra: '300 BCE (Jomon Period)',
    originDetailed: 'Mountainous Chubu and San\'in regions of central Japan',
    size: 'Small',
    height: '35 - 43 cm (14 - 17 in)',
    weight: '8 - 10 kg (17 - 23 lbs)',
    lifespan: '13 - 16 years',
    energy: 'Moderate to High',
    temperament: ['Alert', 'Spirited', 'Confident', 'Independent', 'Loyal', 'Fastidious'],
    history: 'The oldest and smallest of Japan\'s six indigenous spitz breeds, the Shiba Inu was bred to flush birds and small game through the dense brushwood ("shiba") of Japan\'s mountain forests. Archaeological excavations of the ancient Jomon period revealed small spitz skeletons with curved tails and pointed ears remarkably identical to modern Shibas. In 1936, the Japanese government officially declared the Shiba Inu a National Living Monument.',
    cinematicNarration: 'In the dense brushwood of central Japan\'s ancient mountains, hunters moved quietly with a small, spirited dog. The Shiba Inu possesses a spirit far larger than its compact frame—marked by the traditional ideal of Soboku: unpretentious, natural grace. It remains an enduring emblem of Japan\'s forested wilderness.',
    captions: [
      { start: 0, end: 5.0, text: 'In the dense brushwood of central Japan\'s ancient mountains,' },
      { start: 5.0, end: 10.0, text: 'hunters moved quietly with a small, keenly spirited companion.' },
      { start: 10.0, end: 15.0, text: 'The Shiba Inu embodies the traditional aesthetic of Soboku—natural, honest grace.' },
      { start: 15.0, end: 20.0, text: 'An ancient survivor declared a Living National Monument of Japan.' }
    ],
    images: [
      {
        id: 'shiba-1',
        url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Victor Grabarczyk',
        alt: 'Classic Shiba Inu looking directly into lens'
      }
    ],
    ambienceCategory: 'FOREST',
    relatedBreeds: ['akita', 'basenji', 'chow-chow'],
    sources: [
      { title: 'Nippo Standard and History of the Japanese Native Dogs', organization: 'Nihon Ken Hozonkai' },
      { title: 'FCI Standard No. 257', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-013',
    slug: 'tibetan-mastiff',
    number: 7,
    name: 'Tibetan Mastiff',
    aliases: ['Do-Khyi', 'Nomad Mastiff', 'Himalayan Guardian'],
    country: 'China / Tibet',
    countryCode: 'CN',
    region: 'East Asia',
    coordinates: { lat: 31.6927, lng: 88.0924 },
    chapterId: 'the-beginning',
    chapterTitle: 'THE BEGINNING',
    chapterSubtitle: 'Primitive, Basal & Ancient Lineages',
    group: 'Primitive/Ancient',
    purpose: 'Himalayan monastery & nomadic campsite defense against snow leopards and wolves',
    originEra: '1100 BCE (Recorded in Chinese records)',
    originDetailed: 'Tibetan Plateau and high Himalayan altitudes (over 4,000 m)',
    size: 'Giant',
    height: '66 - 76 cm (26 - 30 in)',
    weight: '45 - 73 kg (100 - 160 lbs)',
    lifespan: '10 - 14 years',
    energy: 'Low to Moderate',
    temperament: ['Tenacious', 'Aloof', 'Solemn', 'Territorial', 'Fiercely Protective', 'Independent'],
    history: 'Referred to in Tibetan as Do-Khyi ("tied dog"), these massive, lion-maned sentinels were chained by day outside nomadic tents and remote Buddhist monasteries in the high Himalayas, then released at night to patrol high-altitude valleys against snow leopards and Tibetan wolves. Marco Polo described encountering dogs "as tall as donkeys and as fierce as lions" when traversing the Silk Road in the 13th century.',
    cinematicNarration: 'At four thousand meters above sea level, on the windswept Tibetan plateau, the air is thin and the winters are merciless. Here, beside prayer flags and stone monasteries, the Do-Khyi has kept watch for three thousand years. With a deep, resonant bark likened to brass bells, the Tibetan Mastiff is the primordial guardian of the roof of the world.',
    captions: [
      { start: 0, end: 5.0, text: 'At four thousand meters above sea level on the windswept Tibetan plateau,' },
      { start: 5.0, end: 10.0, text: 'the air is thin and the mountain nights are merciless.' },
      { start: 10.0, end: 15.0, text: 'Beside Buddhist monasteries and nomadic encampments, the Do-Khyi has kept eternal watch.' },
      { start: 15.0, end: 20.0, text: 'With a roar like bronze bells, the Tibetan Mastiff guards the roof of the world.' }
    ],
    images: [
      {
        id: 'tm-1',
        url: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Jamie Street',
        alt: 'Colossal Tibetan Mastiff with heavy lion mane coat'
      }
    ],
    ambienceCategory: 'MOUNTAIN',
    relatedBreeds: ['great-pyrenees', 'anatolian-shepherd', 'chow-chow'],
    sources: [
      { title: 'Travels of Marco Polo (Book II, Chapter 45)', organization: 'Silk Road Historical Archive' },
      { title: 'FCI Standard No. 230', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-014',
    slug: 'golden-retriever',
    number: 45,
    name: 'Golden Retriever',
    aliases: ['Yellow Retriever', 'Guisachan Retriever'],
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Northern Europe',
    coordinates: { lat: 57.3400, lng: -4.8500 },
    chapterId: 'the-workers',
    chapterTitle: 'THE WORKERS',
    chapterSubtitle: 'Cold Atlantic Seas & Wetland Retrievers',
    group: 'Sporting',
    purpose: 'Waterfowl and game retrieval from wetlands and lochs, guide & therapy work',
    originEra: '1868 (Mid-Victorian Era)',
    originDetailed: 'Guisachan Estate in Glen Affric, Scottish Highlands (Bred by Lord Tweedmouth)',
    size: 'Large',
    height: '51 - 61 cm (20 - 24 in)',
    weight: '25 - 34 kg (55 - 75 lbs)',
    lifespan: '10 - 12 years',
    energy: 'High',
    temperament: ['Friendly', 'Reliable', 'Trustworthy', 'Kind', 'Devoted', 'Intelligent'],
    history: 'In 1868 at his Guisachan estate in the Scottish Highlands, Dudley Marjoribanks (the 1st Baron Tweedmouth) mated a yellow Wavy-Coated Retriever named Nous with a Tweed Water Spaniel named Belle. Lord Tweedmouth kept meticulous breeding studbooks to develop a retriever uniquely equipped for rugged Scottish terrain, combining gentle "soft-mouth" waterfowl retrieval with water-resistant golden double coats.',
    cinematicNarration: 'In the heather-covered hills of the Scottish Highlands, Lord Tweedmouth sought a companion that could navigate cold lochs and misty bogs with gentle precision. Through meticulous breeding at Guisachan, the Golden Retriever was born—a blend of athletic stamina, water resistance, and an affectionate, sunlit temperament that has endeared it to humanity.',
    captions: [
      { start: 0, end: 5.0, text: 'In the heather-covered hills of the Scottish Highlands, Lord Tweedmouth sought a gentle retriever.' },
      { start: 5.0, end: 10.0, text: 'At the Guisachan estate, he combined stamina for icy lochs with absolute trustworthiness.' },
      { start: 10.0, end: 15.0, text: 'The Golden Retriever emerged with a water-resistant coat and an instinctive soft mouth,' },
      { start: 15.0, end: 20.0, text: 'becoming one of the world\'s most beloved companions.' }
    ],
    images: [
      {
        id: 'gr-1',
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Chewy',
        alt: 'Golden Retriever in scenic outdoor field'
      }
    ],
    ambienceCategory: 'COUNTRYSIDE',
    relatedBreeds: ['labrador-retriever', 'border-collie', 'newfoundland'],
    sources: [
      { title: 'The Guisachan Stud Book of Lord Tweedmouth', organization: 'Kennel Club of Great Britain' },
      { title: 'FCI Standard No. 111', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-015',
    slug: 'beagle',
    number: 53,
    name: 'Beagle',
    aliases: ['English Beagle', 'Pocket Beagle (Historic)'],
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Northern Europe',
    coordinates: { lat: 52.3555, lng: -1.1743 },
    chapterId: 'the-hunters',
    chapterTitle: 'THE HUNTERS',
    chapterSubtitle: 'Sighthounds, Scents & Woodland Trackers',
    group: 'Hound',
    purpose: 'Pack hunting of hare by scent on foot (beagling), detection work',
    originEra: '1830s (Modern standard established)',
    originDetailed: 'Essex and Northamptonshire, England (Reverend Phillip Honeywood packs)',
    size: 'Small to Medium',
    height: '33 - 41 cm (13 - 16 in)',
    weight: '9 - 11 kg (20 - 25 lbs)',
    lifespan: '12 - 15 years',
    energy: 'High',
    temperament: ['Amiable', 'Curious', 'Merry', 'Determined', 'Gentle', 'Vocal'],
    history: 'Descended from ancient Celtic and medieval Talbot hounds, the Beagle was refined in mid-19th century Britain as a compact scenthound that hunters could follow on foot without horses. With over 220 million scent receptors in its nasal cavity and long drop ears that sweep ground scents directly toward its nose, the Beagle became the world\'s most ubiquitous detection and trail-tracking dog.',
    cinematicNarration: 'Across English hedgerows and rolling meadows, hunting on foot required a hound that was indefatigable and vocal. The Beagle carried a nose capable of mapping invisible scent rivers across miles of countryside. Known for its merry disposition and melodic pack voice, it remains one of history\'s greatest tracking masters.',
    captions: [
      { start: 0, end: 5.0, text: 'Across English hedgerows and rolling meadows, hunting on foot required an indefatigable tracker.' },
      { start: 5.0, end: 10.0, text: 'The Beagle carried a scent capability rivaling almost any living creature on Earth.' },
      { start: 10.0, end: 15.0, text: 'With drop ears that sweep ground scents upward and a melodic pack voice,' },
      { start: 15.0, end: 20.0, text: 'it transformed the art of scent tracking into an enduring science.' }
    ],
    images: [
      {
        id: 'beagle-1',
        url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Marliese Streefland',
        alt: 'Beagle exploring grass with keen nose'
      }
    ],
    ambienceCategory: 'FOREST',
    relatedBreeds: ['bloodhound', 'greyhound', 'basset-hound'],
    sources: [
      { title: 'The Beagle Club Field Annals (1890)', organization: 'British Beagle Club' },
      { title: 'FCI Standard No. 163', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-016',
    slug: 'cavalier-king-charles-spaniel',
    number: 62,
    name: 'Cavalier King Charles Spaniel',
    aliases: ['Cavalier', 'English Toy Spaniel', 'Comforter Spaniel'],
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Northern Europe',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    chapterId: 'the-companions',
    chapterTitle: 'THE COMPANIONS',
    chapterSubtitle: 'Imperial Courts, Monasteries & Hearthside Sentinels',
    group: 'Toy',
    purpose: 'Aristocratic lap companion, hearthside comforter, gentle sporting spaniel',
    originEra: '17th Century (Restoration Period) / 1920s Revival',
    originDetailed: 'Royal courts of England, Scotland, and Victorian estates',
    size: 'Small',
    height: '30 - 33 cm (12 - 13 in)',
    weight: '6 - 8 kg (13 - 18 lbs)',
    lifespan: '12 - 15 years',
    energy: 'Moderate',
    temperament: ['Affectionate', 'Gentle', 'Graceful', 'Playful', 'Adaptable', 'Patient'],
    history: 'Immortalized in Renaissance canvases by Titian, Gainsborough, and Landseer, these toy spaniels warmed the laps of monarchs in drafty stone castles and accompanied King Charles II wherever he walked. In the 1920s, an American named Roswell Eldridge offered a cash prize at Crufts dog show to find dogs matching the original long-nosed spaniels seen in historic royal portraits, reviving the beloved "Cavalier" strain.',
    cinematicNarration: 'In the drafty corridors of seventeenth-century royal palaces, these gentle spaniels served a quiet, intimate purpose: warming lap and heart alike. King Charles II famously issued a decree that his dogs could never be barred from any public building or parliament chamber. The Cavalier remains a testament to the quiet power of canine companionship.',
    captions: [
      { start: 0, end: 5.0, text: 'In the drafty corridors of seventeenth-century royal palaces,' },
      { start: 5.0, end: 10.0, text: 'these gentle spaniels were cherished as comforters of monarchs.' },
      { start: 10.0, end: 15.0, text: 'Immortalized in classical portraiture for their expressive eyes and silky coats,' },
      { start: 15.0, end: 20.0, text: 'the Cavalier remains a living symbol of devotion and quiet companionship.' }
    ],
    images: [
      {
        id: 'ckc-1',
        url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Chewy',
        alt: 'Expressive Cavalier King Charles Spaniel portrait'
      }
    ],
    ambienceCategory: 'HOME',
    relatedBreeds: ['french-bulldog', 'bichon-frise', 'papillon'],
    sources: [
      { title: 'The Royal Toy Spaniels in British History', organization: 'The Cavalier King Charles Spaniel Club UK' },
      { title: 'FCI Standard No. 136', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-017',
    slug: 'anatolian-shepherd',
    number: 34,
    name: 'Anatolian Shepherd',
    aliases: ['Kangal Shepherd Dog', 'Çoban Köpeği', 'Turkish Mountain Guardian'],
    country: 'Turkey',
    countryCode: 'TR',
    region: 'Middle East',
    coordinates: { lat: 39.7500, lng: 37.0167 },
    chapterId: 'the-guardians',
    chapterTitle: 'THE GUARDIANS',
    chapterSubtitle: 'Mountain Fortresses & Estate Protectors',
    group: 'Working',
    purpose: 'Livestock protection against Eurasian wolves, brown bears, and jackals',
    originEra: 'Ancient (Over 4,000 years)',
    originDetailed: 'Sivas Province and the Central Anatolian Plateau, Turkey',
    size: 'Giant',
    height: '71 - 81 cm (28 - 32 in)',
    weight: '45 - 65 kg (100 - 145 lbs)',
    lifespan: '11 - 13 years',
    energy: 'Moderate',
    temperament: ['Bold', 'Independent', 'Calm', 'Protective', 'Proud', 'Observant'],
    history: 'On the high, semi-arid plateaus of central Anatolia, where summers are scorching and winters drop far below freezing, Turkish shepherds relied on this massive, ancient livestock guardian. With a crushing bite force, a thick double coat that shields against wolf bites, and extraordinary endurance across rocky terrain, the Anatolian Shepherd lives alongside the flock, deterring apex predators with presence and defensive power.',
    cinematicNarration: 'Across the wind-scoured Anatolian plateau, where wolves still roam the mountain passes, shepherds have placed their trust in one ancient defender. The Anatolian Shepherd does not herd; it stands among the sheep as one of them, vigilant under the sun and stars, an impenetrable wall against the wild.',
    captions: [
      { start: 0, end: 5.0, text: 'Across the wind-scoured Anatolian plateau, where wolves still roam the mountain passes,' },
      { start: 5.0, end: 10.0, text: 'shepherds have placed their trust in one ancient, unyielding defender.' },
      { start: 10.0, end: 15.0, text: 'The Anatolian Shepherd does not drive the flock; it lives as part of it,' },
      { start: 15.0, end: 20.0, text: 'an ancient fortress against the predators of the high steppe.' }
    ],
    images: [
      {
        id: 'anat-1',
        url: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Berkay Gumustekin',
        alt: 'Imposing Anatolian Shepherd standing guard on steppe'
      }
    ],
    ambienceCategory: 'OPEN_PLAINS',
    relatedBreeds: ['great-pyrenees', 'tibetan-mastiff', 'cane-corso'],
    sources: [
      { title: 'The Kangal Dog of Turkey: Historical and Behavioral Ethology', organization: 'Turkish Cynology Federation' },
      { title: 'FCI Standard No. 331', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-018',
    slug: 'bernese-mountain-dog',
    number: 33,
    name: 'Bernese Mountain Dog',
    aliases: ['Berner Sennenhund', 'Dürrbächler', 'Swiss Farm Dog'],
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Western Europe',
    coordinates: { lat: 46.9480, lng: 7.4474 },
    chapterId: 'the-guardians',
    chapterTitle: 'THE GUARDIANS',
    chapterSubtitle: 'Mountain Fortresses & Estate Protectors',
    group: 'Working',
    purpose: 'Drafting milk carts, farmstead livestock driving, mountain companionship',
    originEra: '19th Century (Ancient Roman Roots)',
    originDetailed: 'Canton of Bern and Dürrbach hamlet, Swiss Pre-Alps',
    size: 'Large to Giant',
    height: '58 - 70 cm (23 - 28 in)',
    weight: '36 - 52 kg (80 - 115 lbs)',
    lifespan: '7 - 10 years',
    energy: 'Moderate',
    temperament: ['Affectionate', 'Loyal', 'Good-Natured', 'Patient', 'Docile', 'Confident'],
    history: 'In the alpine dairy farming valleys of the Bernese Oberland, farmers required a versatile partner capable of pulling heavy wooden carts laden with cheese and milk down steep mountain roads, driving cattle, and guarding alpine chalets. Known for its striking tricolor coat, rust markings, and gentle demeanor, the "Berner" transitioned from a humble rustic draft animal to one of the most admired mountain dogs on Earth.',
    cinematicNarration: 'In the green pre-Alpine valleys of Bern, where bell-ringing cattle grazed beneath jagged peaks, Swiss dairy farmers found their most faithful worker. The Bernese Mountain Dog hauled heavy milk carts down steep stone roads and guarded the homestead with gentle dignity, cloaked in a tricolor coat as rich as the alpine landscape.',
    captions: [
      { start: 0, end: 5.0, text: 'In the green pre-Alpine valleys of Bern, where cattle grazed beneath jagged peaks,' },
      { start: 5.0, end: 10.0, text: 'Swiss dairy farmers found their most steadfast working companion.' },
      { start: 10.0, end: 15.0, text: 'The Bernese Mountain Dog hauled heavy milk carts down mountain roads,' },
      { start: 15.0, end: 20.0, text: 'cloaked in a tricolor coat as rich as the alpine valleys it called home.' }
    ],
    images: [
      {
        id: 'bmd-1',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Chewy',
        alt: 'Bernese Mountain Dog smiling in green valley'
      }
    ],
    ambienceCategory: 'MOUNTAIN',
    relatedBreeds: ['saint-bernard', 'great-pyrenees', 'rottweiler'],
    sources: [
      { title: 'Schweizer Sennenhund-Verein Historical Registry', organization: 'Swiss Cynological Society' },
      { title: 'FCI Standard No. 45', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-019',
    slug: 'afghan-hound',
    number: 5,
    name: 'Afghan Hound',
    aliases: ['Tāzī', 'Sage Baluchi', 'Kabul Hound'],
    country: 'Afghanistan',
    countryCode: 'AF',
    region: 'Central Asia',
    coordinates: { lat: 34.5553, lng: 69.2075 },
    chapterId: 'the-beginning',
    chapterTitle: 'THE BEGINNING',
    chapterSubtitle: 'Primitive, Basal & Ancient Lineages',
    group: 'Hound',
    purpose: 'Mountain coursing of snow leopards, wolves, and gazelles across rocky terrain',
    originEra: 'Ancient (Pre-Christian Era)',
    originDetailed: 'High mountain ranges and desert valleys of ancient Afghanistan',
    size: 'Large',
    height: '61 - 74 cm (24 - 29 in)',
    weight: '23 - 27 kg (50 - 60 lbs)',
    lifespan: '12 - 14 years',
    energy: 'Moderate to High',
    temperament: ['Aloof', 'Dignified', 'Independent', 'Noble', 'Clownish in Private', 'Fast'],
    history: 'Revered in ancient Persian myths and preserved in the secluded mountain valleys of the Hindu Kush, the Tāzī was developed to course game over treacherous rock scree and rocky ravines. Its silky, long-flowing mantle was not bred for vanity, but to protect its organs from sub-zero mountain winds. With unique high hipbones and broad paw pads that act like snowshoes on rock, it can pivot at full speed mid-stride.',
    cinematicNarration: 'In the windswept passes of the Hindu Kush, the Afghan Hound hunted across jagged rock where horses could not tread. Its flowing coat was nature\'s shield against icy mountain winds; its high hipbones gave it the agility to turn mid-air on narrow ledges. Ancient, aloof, and fiercely independent, it embodies the untamed spirit of Central Asia.',
    captions: [
      { start: 0, end: 5.0, text: 'In the windswept passes of the Hindu Kush, the Afghan Hound hunted across jagged mountain rock.' },
      { start: 5.0, end: 10.0, text: 'Its long, flowing coat was an essential shield against sub-zero mountain gales.' },
      { start: 10.0, end: 15.0, text: 'With high-set hip joints and broad paws, it pivoted at full gallop over sheer ravines.' },
      { start: 15.0, end: 20.0, text: 'An ancient, noble hunter carrying the majesty of Central Asia.' }
    ],
    images: [
      {
        id: 'afghan-1',
        url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Jamie Street',
        alt: 'Silky-coated Afghan Hound in wind'
      }
    ],
    ambienceCategory: 'OPEN_PLAINS',
    relatedBreeds: ['saluki', 'greyhound', 'pharaoh-hound'],
    sources: [
      { title: 'The Ancient Tāzī: Sighthounds of the Silk Road', organization: 'Central Asian Heritage Archive' },
      { title: 'FCI Standard No. 228', organization: 'Fédération Cynologique Internationale' }
    ]
  },
  {
    id: 'b-020',
    slug: 'labrador-retriever',
    number: 46,
    name: 'Labrador Retriever',
    aliases: ['St. John\'s Water Dog (Ancestor)', 'Lab'],
    country: 'Canada',
    countryCode: 'CA',
    region: 'North America',
    coordinates: { lat: 47.5615, lng: -52.7126 },
    chapterId: 'the-workers',
    chapterTitle: 'THE WORKERS',
    chapterSubtitle: 'Cold Atlantic Seas & Wetland Retrievers',
    group: 'Sporting',
    purpose: 'Waterfowl retrieval from coastal surf, fishing net recovery, service & guide work',
    originEra: 'Early 19th Century (c. 1830)',
    originDetailed: 'Newfoundland, Canada (Bred from the St. John\'s Water Dog by English nobility)',
    size: 'Large',
    height: '55 - 62 cm (22 - 24.5 in)',
    weight: '25 - 36 kg (55 - 80 lbs)',
    lifespan: '10 - 12 years',
    energy: 'High',
    temperament: ['Outgoing', 'Even-Tempered', 'Gentle', 'Agile', 'Kind', 'Intelligent'],
    history: 'Originating as the St. John\'s Water Dog in Newfoundland, these hardy, webbed-toed dogs dove into freezing Atlantic breakers alongside dory fishermen to haul cod-filled nets and retrieve lost fishing gear. English aristocrats visiting the Canadian colonies in the 1830s recognized their extraordinary retrieving instinct and water stamina, importing them to Poole, England to establish the world\'s most popular and versatile working gundog.',
    cinematicNarration: 'Bred in the salty Atlantic spray of Newfoundland, the Labrador Retriever was built for cold water. Its thick "otter tail" acts as a powerful rudder in churning surf, while its short, water-repellent coat sheds ice and moisture in seconds. From working fishing dories to modern search teams, its dedication remains unmatched.',
    captions: [
      { start: 0, end: 5.0, text: 'Bred in the salty Atlantic spray of Newfoundland, the Labrador Retriever was built for cold seas.' },
      { start: 5.0, end: 10.0, text: 'Its dense otter tail acts as a powerful rudder in churning breakers.' },
      { start: 10.0, end: 15.0, text: 'From working fishing dories in icy surf to guiding the visually impaired,' },
      { start: 15.0, end: 20.0, text: 'its unshakeable devotion has made it a global pillar of canine partnership.' }
    ],
    images: [
      {
        id: 'lab-1',
        url: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1600&q=80',
        source: 'Unsplash Public Archive',
        license: 'Unsplash Editorial License',
        credit: 'Photo by Mitchell Orr',
        alt: 'Black Labrador retriever standing attentive outdoors'
      }
    ],
    ambienceCategory: 'COAST',
    relatedBreeds: ['newfoundland', 'golden-retriever', 'portuguese-water-dog'],
    sources: [
      { title: 'The St. John\'s Water Dog and the Origins of the Modern Labrador', organization: 'Canadian Kennel Club' },
      { title: 'FCI Standard No. 122', organization: 'Fédération Cynologique Internationale' }
    ]
  }
];
