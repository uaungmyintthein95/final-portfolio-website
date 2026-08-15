# Riverport — Interactive 3D City Tour

A dependency-light, Three.js–based clone of the "fly over an extruded city,
click a pin, drop into a 360° panorama" experience — built as a starter you
can point at your own city data, photos, and panoramas.

No build step. No framework. Open `index.html` behind any static file
server and it runs, using native ES module `<script type="importmap">`
resolution.

## What's included

```
index.html            Page shell + all UI markup
css/style.css          Full stylesheet (dark map UI, pin badges, panel, panorama HUD)
js/data.js             Place data (edit this to change every location)
js/city.js             Procedural building-footprint generator + mesh builder
js/panorama.js          Standalone 360° equirectangular viewer (drag to look, scroll to zoom)
js/main.js              App entry: scene setup, camera intro flythrough, orbit controls,
                        DOM pin projection, panel, "all places" grid, panorama wiring
vendor/three.module.min.js   Three.js r160 (already installed, no CDN needed)
vendor/OrbitControls.js      Three.js's official orbit control addon
vendor/examples/GLTFLoader.js + DRACOLoader.js
                             Version-matched GLB and Draco loaders
assets/models/tokyo_map_web.glb
                             Optimized, Draco-compressed Tokyo building mesh
assets/covers/*.jpg     Placeholder cover photos (one per sample place)
assets/panos/*.jpg      Placeholder 360° equirectangular panoramas (2:1 ratio)
```

## Running it locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or `npx serve .`, or drop the folder into any static host (Netlify,
Vercel, GitHub Pages, S3 + CloudFront, nginx, etc.) — there's nothing to
build or compile.

## Replacing the placeholder content

### 1. Photos & panoramas
Everything in `assets/covers/` and `assets/panos/` is a generated
placeholder (solid gradient + label) so the repo ships without pulling in
anyone else's copyrighted photography. Swap in your own:

- **Cover photos**: any JPG/PNG, portrait or landscape works — CSS handles
  the crop (`background-size: cover`).
- **Panoramas**: must be **equirectangular, exactly 2:1 aspect ratio**
  (e.g. 6000×3000, 4096×2048). Shot with a 360 camera (Insta360, Ricoh
  Theta, GoPro Max) or stitched from a multi-shot rig. `panorama.angle` in
  `data.js` sets the initial yaw so the viewer opens facing something
  interesting rather than a blank wall.

### 2. Place data — `js/data.js`
Each entry is a plain object:

```js
{
  id: "old-harbor",
  title: "Old // Harbor",        // "//" becomes a line break in the panel
  shortTitle: "Old Harbor",
  hoverTitle: "Old Harbor / Waterfront /",
  theme: "PICTURESQUE",           // short tag shown as a pill
  address: "Quai Nord, Riverport",
  position: { x: -120, z: 40 },   // meters from CITY.center
  panorama: { image: "assets/panos/old-harbor.jpg", angle: 210, fov: 80 },
  cover: "assets/covers/old-harbor.jpg",
  description: ["Paragraph one.", "Paragraph two."],
}
```

`position` is in local meters relative to `CITY.center` (a lat/lng you set
once at the top of the file). If your real locations only have lat/lng,
convert with an equirectangular projection around `CITY.center`, e.g.:

```js
const R = 6371000; // meters
function toLocal(lat, lng, center) {
  const x = (lng - center.lng) * Math.PI / 180 * R * Math.cos(center.lat * Math.PI / 180);
  const z = -(lat - center.lat) * Math.PI / 180 * R;
  return { x, z };
}
```

This file can just as easily be the result of a `fetch()` to your own
CMS/API — replace the static `export const PLACES = [...]` with a fetched
array at boot, before `main.js` builds the pins.

### 3. Real building footprints instead of the procedural city
`js/city.js` currently generates a fake downtown so the demo has something
to fly over out of the box. To use real geometry:

- **From OpenStreetMap**: query the Overpass API for `building=*` ways
  inside your bounding box, project each polygon to local meters the same
  way as above, and extrude with `THREE.ExtrudeGeometry` using each
  building's `building:levels` (× ~3m) or a flat default height.
- **From your existing Revit → GLB pipeline**: export building masses as a
  flattened footprint layer (or just load the GLB directly with
  `GLTFLoader` and skip `buildCityMesh` entirely — the pin-projection and
  panel/panorama logic in `main.js` doesn't care what created the meshes,
  it only needs `scene` to contain geometry and `PLACES[i].position` to
  line up with it).
- **From a GIS parcel layer**: same idea — footprint + height in, extruded
  mesh out.

Swap `buildFootprints()`/`buildCityMesh()` calls in `main.js` for your
loader; everything downstream (pins, camera fly-to, panel, panorama) is
already decoupled from how the city mesh was built.

### 4. Branding
- Logo text: edit `#brand` in `index.html`.
- Colors/type: all in the `:root` token block at the top of `css/style.css`.
- Intro copy: `INTRO.lines` in `data.js` (five two-line phrases, shown in
  sequence during the flythrough) and `INTRO.path` (the camera waypoints
  it flies through, in local meters + altitude).

## How the pieces fit together

- **Scene** (`main.js`): a `PerspectiveCamera` looking down at an oblique
  angle, `OrbitControls` restricted to a top-down-ish range so it can't
  flip under the ground or go fully bird's-eye.
- **Pins are DOM elements, not 3D sprites.** Each frame, `updatePins()`
  projects each place's 3D anchor to normalized device coordinates and
  positions the matching `<div class="pin">` with CSS `left`/`top`. That's
  what lets the hover badge use real CSS/SVG (the rotating circular label)
  instead of a canvas texture.
- **Camera moves** use a small dependency-free `tween()` helper (easing +
  `requestAnimationFrame`) — there's no GSAP/Tween.js dependency to manage.
- **Panorama viewer** (`panorama.js`) is a fully separate mini Three.js
  scene/renderer (its own canvas), so it only initializes/renders while
  open and doesn't compete with the map's render loop.
- **Compass + scale bar** read the live `OrbitControls` azimuth and a
  screen-space projection of a known world distance, so they stay accurate
  as you zoom/rotate.

## Known placeholders to finish before shipping

- [ ] Swap all `assets/covers/*` and `assets/panos/*` for real photography.
- [ ] Replace `js/data.js` sample places with your real locations.
- [x] Replace the procedural city with the optimized Tokyo GLB. The procedural
      generator remains available as an automatic loading fallback.
- [ ] `#mute-btn` is wired as a UI toggle only — attach it to a real
      `<audio>`/Web Audio ambient track if you want background sound like
      the reference site.
- [ ] `#info-btn` has no handler yet — wire it to an "about" modal if you
      want the (i) icon to do something.
- [ ] Add real analytics / a CMS fetch if place data should be editable
      without a redeploy.

## Browser support

Uses `<script type="importmap">`, native ES modules, and WebGL — all
current evergreen browsers (Chrome/Edge/Firefox/Safari, last ~2 years).
No polyfills included; add one for import maps if you need older Safari.










& cmd /c "cd /d %CD%\portfolio-site && npm run build"