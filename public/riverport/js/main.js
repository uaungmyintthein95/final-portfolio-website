import * as THREE from "three";
import { OrbitControls } from "../vendor/OrbitControls.js";
import { buildGround, loadCityModel, updateCityMaterial } from "./city.js";
import { createPanoramaViewer } from "./panorama.js";
import { PLACES, INTRO, CITY } from "./data.js";

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------
const canvas = document.getElementById("scene-canvas");
const pinLayer = document.getElementById("pin-layer");
const loader = document.getElementById("loader");
const introEl = document.getElementById("intro");
const introLines = document.getElementById("intro-lines");
const introSkip = document.getElementById("intro-skip");
const panel = document.getElementById("place-panel");
const panelClose = document.getElementById("panel-close");
const panelExplore = document.getElementById("panel-explore");
const allPlacesBtn = document.getElementById("all-places-btn");
const allPlaces = document.getElementById("all-places");
const allPlacesGrid = document.getElementById("all-places-grid");
const allPlacesClose = document.getElementById("all-places-close");
const compass = document.getElementById("compass");
const scaleTicks = document.getElementById("scale-ticks");
const scaleLabel = document.getElementById("scale-label");
const panoView = document.getElementById("pano-view");
const panoCanvas = document.getElementById("pano-canvas");
const panoTitle = document.getElementById("pano-title");
const panoBack = document.getElementById("pano-back");
const panoFullscreen = document.getElementById("pano-fullscreen");
const muteBtn = document.getElementById("mute-btn");
const infoBtn = document.getElementById("info-btn");
const aboutTour = document.getElementById("about-tour");
const aboutTourClose = document.getElementById("about-tour-close");
const embedded = new URLSearchParams(window.location.search).has("embed");

document.body.classList.toggle("embedded", embedded);

let activePlace = null;

// ---------------------------------------------------------------------------
// Three.js scene
// ---------------------------------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1826);
scene.fog = new THREE.Fog(0x0b1826, 500, 1400);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 3000);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);

scene.add(new THREE.AmbientLight(0xbcd4ff, 0.55));
const sun = new THREE.DirectionalLight(0xffe9c9, 1.1);
sun.position.set(-300, 420, 220);
scene.add(sun);

buildGround(scene, 900);

async function initScene() {
  await loadCityModel(scene);

  camera.position.set(0, 120, 260);
  controls.target.set(0, 0, 0);
  controls.update();

  // pin anchors (invisible 3D points we project to screen space each frame)
  const pinAnchors = PLACES.map((p) => new THREE.Vector3(p.position.x, 16, p.position.z));
  return pinAnchors;
}

let pinAnchors = [];
const sceneReady = initScene().then((anchors) => {
  pinAnchors = anchors;
});

// ---------------------------------------------------------------------------
// Camera controls (free exploration, enabled after intro)
// ---------------------------------------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 60;
controls.maxDistance = 620;
controls.minPolarAngle = THREE.MathUtils.degToRad(28);
controls.maxPolarAngle = THREE.MathUtils.degToRad(72);
controls.target.set(0, 0, 0);
controls.enabled = false;

function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
window.addEventListener("resize", resize);

// ---------------------------------------------------------------------------
// Tween helper (dependency-free)
// ---------------------------------------------------------------------------
function tween({ duration, onUpdate, onComplete, easing = (t) => 1 - Math.pow(1 - t, 3) }) {
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    onUpdate(easing(t));
    if (t < 1) requestAnimationFrame(step);
    else onComplete && onComplete();
  }
  requestAnimationFrame(step);
}

function flyCameraTo(pos, target, duration = 1400) {
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  tween({
    duration,
    onUpdate: (t) => {
      camera.position.lerpVectors(startPos, pos, t);
      controls.target.lerpVectors(startTarget, target, t);
    },
  });
}

// ---------------------------------------------------------------------------
// Intro flythrough
// ---------------------------------------------------------------------------
function playIntro() {
  if (embedded || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
    return;
  }

  const path = INTRO.path.map((p) => new THREE.Vector3(p.x, p.alt, p.z));
  camera.position.copy(path[0]);
  controls.target.set(0, 0, 0);

  // reveal title lines in sequence
  INTRO.lines.forEach((line, i) => {
    const el = document.createElement("div");
    el.className = "intro-line";
    el.innerHTML = `<span class="first">${line[0]}</span><span class="second">${line[1]}</span>`;
    introLines.appendChild(el);
    setTimeout(() => el.classList.add("visible"), 250 + i * 480);
  });

  const segDuration = INTRO.duration / (path.length - 1);
  let i = 0;
  function nextLeg() {
    if (i >= path.length - 1) return finishIntro();
    const from = path[i];
    const to = path[i + 1];
    i++;
    tween({
      duration: segDuration,
      easing: (t) => t * (2 - t),
      onUpdate: (t) => {
        camera.position.lerpVectors(from, to, t);
      },
      onComplete: nextLeg,
    });
  }
  nextLeg();

  introSkip.addEventListener("click", finishIntro, { once: true });
}

let introFinished = false;
function finishIntro() {
  if (introFinished) return;
  introFinished = true;
  introEl.classList.add("hidden");
  controls.enabled = true;
  controls.target.set(10, 0, -10);
  camera.position.set(10, 210, 260);
  controls.update();
}

// ---------------------------------------------------------------------------
// Pin DOM layer
// ---------------------------------------------------------------------------
const pinEls = PLACES.map((place, i) => {
  const el = document.createElement("div");
  el.className = "pin";
  el.dataset.id = place.id;
  el.innerHTML = `
    <div class="pin-badge">
      <svg viewBox="0 0 128 128">
        <defs><path id="circle-${place.id}" d="M64,10 a54,54 0 1,1 -0.1,0" /></defs>
        <text><textPath href="#circle-${place.id}">${place.hoverTitle} • ${place.hoverTitle} • </textPath></text>
      </svg>
    </div>
    <div class="pin-drop"></div>
  `;
  el.addEventListener("click", () => openPlace(place));
  pinLayer.appendChild(el);
  return el;
});

function updatePins() {
  if (!pinAnchors.length) return;

  const half = innerWidth / 2, halfH = innerHeight / 2;
  pinAnchors.forEach((anchor, i) => {
    const v = anchor.clone().project(camera);
    const behind = v.z > 1;
    const el = pinEls[i];
    if (behind) {
      el.style.display = "none";
      return;
    }
    el.style.display = "";
    el.style.left = `${half + v.x * half}px`;
    el.style.top = `${halfH - v.y * halfH}px`;
  });
}

// ---------------------------------------------------------------------------
// Compass + scale readout
// ---------------------------------------------------------------------------
function updateHud() {
  const az = controls.getAzimuthalAngle();
  compass.style.transform = `rotate(${az}rad)`;

  // approximate meters-per-100px at screen center for a rough scale bar
  const p1 = new THREE.Vector3(0, 0, 0).project(camera);
  const worldPt = new THREE.Vector3(20, 0, 0);
  const p2 = worldPt.project(camera);
  const dx = ((p2.x - p1.x) * innerWidth) / 2;
  const dy = ((p2.y - p1.y) * innerHeight) / 2;
  const pxPer20m = Math.hypot(dx, dy) || 1;
  const metersFor70px = Math.round((70 / pxPer20m) * 20);
  scaleLabel.textContent = `${Math.max(5, metersFor70px)} m`;
}

// ---------------------------------------------------------------------------
// Place panel
// ---------------------------------------------------------------------------
function openPlace(place) {
  activePlace = place;
  pinEls.forEach((el) => el.classList.toggle("active", el.dataset.id === place.id));

  panel.querySelector(".cover").style.backgroundImage = `url(${place.cover})`;
  panel.querySelector(".theme-tag").textContent = place.theme;
  panel.querySelector(".hover-title").textContent = place.hoverTitle;
  panel.querySelector("h2").textContent = place.title.replace("//", "\n");
  panel.querySelector(".description").innerHTML = place.description.map((p) => `<p>${p}</p>`).join("");
  panel.querySelector(".address").textContent = place.address;
  panel.classList.add("open");

  flyCameraTo(
    new THREE.Vector3(place.position.x + 60, 90, place.position.z + 90),
    new THREE.Vector3(place.position.x, 8, place.position.z)
  );
}

function closePlace() {
  panel.classList.remove("open");
  pinEls.forEach((el) => el.classList.remove("active"));
  activePlace = null;
}
panelClose.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closePlace();
});

panelExplore.addEventListener("click", () => {
  if (activePlace) openPanorama(activePlace);
});

// ---------------------------------------------------------------------------
// All-places overlay
// ---------------------------------------------------------------------------
PLACES.forEach((place) => {
  const card = document.createElement("div");
  card.className = "place-card";
  card.innerHTML = `
    <div class="thumb" style="background-image:url(${place.cover})"></div>
    <div class="info">
      <div class="tag">${place.theme}</div>
      <div class="name">${place.shortTitle}</div>
    </div>
  `;
  card.addEventListener("click", () => {
    allPlaces.classList.remove("open");
    openPlace(place);
  });
  allPlacesGrid.appendChild(card);
});
allPlacesBtn.addEventListener("click", () => allPlaces.classList.add("open"));
allPlacesClose.addEventListener("click", () => allPlaces.classList.remove("open"));

// ---------------------------------------------------------------------------
// Panorama viewer
// ---------------------------------------------------------------------------
const pano = createPanoramaViewer(panoCanvas);

function updateFullscreenButton() {
  const isFullscreen = document.fullscreenElement === panoView;
  panoFullscreen.textContent = isFullscreen ? "Exit fullscreen" : "Fullscreen";
}

function requestFullscreen(element) {
  return element.requestFullscreen?.() || element.webkitRequestFullscreen?.() || element.mozRequestFullScreen?.() || element.msRequestFullscreen?.();
}

function exitFullscreen() {
  return document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.mozCancelFullScreen?.() || document.msExitFullscreen?.();
}

function openPanorama(place) {
  panoTitle.textContent = place.shortTitle;
  panoView.classList.add("open");
  pano.load(place).then(() => {
    pano.start();
    requestFullscreen(panoView).catch(() => {
      /* ignore if fullscreen not available */
    });
  });
}
function closePanorama() {
  panoView.classList.remove("open");
  pano.stop();
  if (document.fullscreenElement === panoView) {
    exitFullscreen();
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement === panoView) {
    exitFullscreen();
  } else {
    requestFullscreen(panoView).catch(() => {
      /* ignore if fullscreen not available */
    });
  }
}

window.addEventListener("fullscreenchange", updateFullscreenButton);
window.addEventListener("webkitfullscreenchange", updateFullscreenButton);
window.addEventListener("mozfullscreenchange", updateFullscreenButton);
window.addEventListener("MSFullscreenChange", updateFullscreenButton);

panoBack.addEventListener("click", closePanorama);
panoFullscreen.addEventListener("click", toggleFullscreen);

// ---------------------------------------------------------------------------
// Mute toggle (placeholder — wire to your own ambient/audio track)
// ---------------------------------------------------------------------------
let muted = true;
muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.classList.toggle("muted", muted);
  muteBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
});

infoBtn.addEventListener("click", () => {
  aboutTour.hidden = false;
  aboutTourClose.focus();
});

aboutTourClose.addEventListener("click", () => {
  aboutTour.hidden = true;
  infoBtn.focus();
});

aboutTour.addEventListener("click", (event) => {
  if (event.target === aboutTour) aboutTourClose.click();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!aboutTour.hidden) {
    aboutTourClose.click();
  } else if (panel.classList.contains("open")) {
    closePlace();
  }
});

// ---------------------------------------------------------------------------
// Render loop
// ---------------------------------------------------------------------------
function animate(time) {
  requestAnimationFrame(animate);
  if (controls.enabled) controls.update();
  updateCityMaterial((time || 0) * 0.001);
  updatePins();
  updateHud();
  renderer.render(scene, camera);
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
window.addEventListener("load", async () => {
  await sceneReady;
  loader.classList.add("hidden");
  playIntro();
  animate();
});
