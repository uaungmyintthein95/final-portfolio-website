// ---------------------------------------------------------------------------
// PLACE DATA
// ---------------------------------------------------------------------------
// Same shape as a typical CMS export (Prismic/Contentful/Sanity all fit this):
// each place has a map position, a 360 panorama, a cover image, and copy.
// Swap this array for a fetch() to your CMS/API — nothing else needs to change.
// ---------------------------------------------------------------------------

export const CITY = {
  name: "Riverport",
  center: { lat: 43.2965, lng: 5.3698 }, // swap for your city's real center
  metersPerUnit: 1, // 1 world unit = 1 meter, used by the scale readout
};

export const PLACES = [
  {
    id: "old-harbor",
    slug: "old-harbor",
    title: "Old // Harbor",
    shortTitle: "Old Harbor",
    hoverTitle: "Old Harbor / Waterfront /",
    theme: "PICTURESQUE",
    ambiance: "outdoor",
    address: "Quai Nord, Riverport",
    link: "https://example.com",
    position: { x: -120, z: 40 }, // local meters from CITY.center
    panorama: { image: "assets/panos/old-harbor.png", angle: 210, fov: 80 },
    cover: "assets/covers/old-harbor.png",
    description: [
      "The old harbor is the beating heart of the city, lined with fishing boats and cafés that spill onto the quay at sunset.",
      "Walk the breakwater at dawn and you'll have the whole waterfront to yourself before the market stalls open.",
    ],
  },
  {
    id: "city-hall",
    slug: "city-hall",
    title: "City // Hall",
    shortTitle: "City Hall",
    hoverTitle: "City Hall / Old Town /",
    theme: "MOBILISED",
    ambiance: "culture",
    address: "Place de la Mairie, Riverport",
    link: "https://example.com",
    position: { x: 10, z: -10 },
    panorama: { image: "assets/panos/city-hall.jpg", angle: 335, fov: 80 },
    cover: "assets/covers/city-hall.jpg",
    description: [
      "An imposing 19th-century facade hides a modern council chamber where the city's 61 elected representatives meet twice a month.",
      "The steps out front are the unofficial start line for every parade the city throws.",
    ],
  },
  {
    id: "botanic-garden",
    slug: "botanic-garden",
    title: "Botanic // Garden",
    shortTitle: "Botanic Garden",
    hoverTitle: "Botanic Garden / Riverside /",
    theme: "EXOTIC",
    ambiance: "outdoor",
    address: "Avenue du Parc, Riverport",
    link: "https://example.com",
    position: { x: 180, z: 120 },
    panorama: { image: "assets/panos/botanic-garden.jpg", angle: 250, fov: 80 },
    cover: "assets/covers/botanic-garden.png",
    description: [
      "Ninety species of Mediterranean flora share the grounds with a small pond that freezes exactly once a decade.",
      "Locals come for the shade; visitors come for the view back over the rooftops.",
    ],
  },
  {
    id: "craft-brewery",
    slug: "craft-brewery",
    title: "Craft // Brewery",
    shortTitle: "Craft Brewery",
    hoverTitle: "Craft Brewery / Riverside East /",
    theme: "TASTY",
    ambiance: "outdoor",
    address: "7 Rue des Artisans, Riverport",
    link: "https://example.com",
    position: { x: -60, z: -160 },
    panorama: { image: "assets/panos/craft-brewery.jpg", angle: 185, fov: 80 },
    cover: "assets/covers/craft-brewery.jpg",
    description: [
      "An independent brewery that names every batch after a local landmark — you can taste the harbor, the garden, and the old bridge, one glass at a time.",
      "The tasting room keeps an industrial, unpolished feel on purpose.",
    ],
  },
  {
    id: "observatory",
    slug: "observatory",
    title: "City // Observatory",
    shortTitle: "Observatory",
    hoverTitle: "Observatory / Hilltop /",
    theme: "LUNAR",
    ambiance: "culture",
    address: "2 Place de l'Astronome, Riverport",
    link: "https://example.com",
    position: { x: 250, z: -80 },
    panorama: { image: "assets/panos/observatory.jpg", angle: 325, fov: 80 },
    cover: "assets/covers/observatory.jpg",
    description: [
      "Built for research, kept open for everyone. The dome's original 19th-century telescope still points at the sky on clear nights.",
      "Free public viewings run the first Friday of every month.",
    ],
  },
  {
    id: "skate-bowl",
    slug: "skate-bowl",
    title: "The // Skate Bowl",
    shortTitle: "Skate Bowl",
    hoverTitle: "Skate Bowl / South Beach /",
    theme: "FREESTYLE",
    ambiance: "outdoor",
    address: "199 Beachfront Ave, Riverport",
    link: "https://example.com",
    position: { x: -220, z: 200 },
    panorama: { image: "assets/panos/skate-bowl.png", angle: 260, fov: 80 },
    cover: "assets/covers/skate-bowl.png",
    description: [
      "A world-renowned bowl built in 1991, famous for a curve so distinctive it's been copied by parks on three continents.",
      "Riders show up before sunrise to get a clean run before the crowds.",
    ],
  },
];

export const INTRO = {
  lines: [
    ["Full of", "Surprise"],
    ["Rich in", "Culture"],
    ["Built on", "Water"],
    ["Always", "Restless"],
    ["Welcome to", "Riverport"],
  ],
  // camera waypoints the intro flies through, in local meters + altitude
  path: [
    { x: -600, z: 500, alt: 420 },
    { x: -200, z: 200, alt: 260 },
    { x: 0, z: 0, alt: 160 },
    { x: 10, z: -10, alt: 90 },
  ],
  duration: 9000, // ms
};
