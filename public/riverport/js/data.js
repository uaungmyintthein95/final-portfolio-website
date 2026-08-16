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
    id: "Harakado",
    slug: "Harakado",
    title: "Harakado",
    shortTitle: "Harakado",
    hoverTitle: "Harakado / Palaza /",
    theme: "PICTURESQUE",
    ambiance: "outdoor",
    address: "Tokyo, Harakado",
    link: "https://example.com",
    position: { x: -120, z: 40 }, // local meters from CITY.center
    panorama: { image: "assets/panos/Harakado.jpg", angle: 210, fov: 80 },
    cover: "assets/covers/Harakado.jpg",
    description: [
      "The plaza is the beating heart of the city.",
      ,
    ],
  },
  {
    id: "Tokyo-Station",
    slug: "Tokyo-Station",
    title: "Tokyo Station",
    shortTitle: "Tokyo Station",
    hoverTitle: "Tokyo Station / Transportation /",
    theme: "MOBILISED",
    ambiance: "culture",
    address: "Place de la Mairie, Riverport",
    link: "https://example.com",
    position: { x: 10, z: -10 },
    panorama: { image: "assets/panos/Tokyo-Station.jpg", angle: 335, fov: 80 },
    
  
    cover: "assets/covers/Tokyo-Station.jpg",
    description: [
      "Tokyo Station (Japanese: 東京駅, Hepburn: Tōkyō-eki; pronounced [to̞ːkʲo̞ːe̞kʲi]) is a major railway station and a central rail hub in Chiyoda, Tokyo, Japan. The original station is located in Chiyoda's Marunouchi business district near the Imperial Palace grounds. The newer Eastern extension is not far from the Ginza commercial district. Due to the large area covered by the station, it is divided into the Marunouchi (west) and Yaesu (east) sides in its directional signage.",
      ,
    ],
  },
  {
    id: "botanic-garden",
    slug: "botanic-garden",
    title: "Botanic // Garden",
    shortTitle: "Botanic Garden",
    hoverTitle: "Botanic Garden / Shinjuku /",
    theme: "EXOTIC",
    ambiance: "outdoor",
    address: "Shinjuku",
    link: "https://example.com",
    position: { x: 180, z: 120 },
    panorama: { image: "assets/panos/botanic-garden.jpg", angle: 250, fov: 80 },
    cover: "assets/covers/botanic-garden.png",
    description: [
      "--",
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
      "--.",
    ],
  },
  {
    id: "observatory",
    slug: "observatory",
    title: "City // Observatory",
    shortTitle: "Observatory",
    hoverTitle: "Observatory / Shibuya /",
    theme: "LUNAR",
    ambiance: "culture",
    address: "2 Place de l'Astronome, Tokyo",
    link: "https://example.com",
    position: { x: 250, z: -80 },
    panorama: { image: "assets/panos/observatory.jpg", angle: 325, fov: 80 },
    cover: "assets/covers/observatory.jpg",
    description: [
      "Built for research, kept open for everyone.",
      "Free public viewings run  every month.",
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

if (location.panorama?.type === "google-streetview") {
  panoramaContainer.innerHTML = `
    <iframe
      src="${location.panorama.url}"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin">
    </iframe>
  `;
} 


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

// ---------------------------------------------------------------------------
// PLACE DATA
// ---------------------------------------------------------------------------
// Each place has:
// - map position
// - panorama configuration
// - cover image
// - description

// Panorama types:
//   type: "image"            → local 360° JPG/PNG panorama
//   type: "google-streetview" → Google Street View iframe URL

// The actual panorama rendering should be handled by your main JavaScript.
// ---------------------------------------------------------------------------
