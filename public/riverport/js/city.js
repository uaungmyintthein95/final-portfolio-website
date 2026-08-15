import * as THREE from "three";
import { GLTFLoader } from "../vendor/examples/GLTFLoader.js";
import { DRACOLoader } from "../vendor/examples/DRACOLoader.js";

const CITY_MODEL_CANDIDATES = [
  "./assets/models/tokyo_map_web.glb",
  "./assets/models/tokyo_map.glb",
];

let gltfLoaderPromise = null;
const animatedCityMaterials = [];

async function getGltfLoader() {
  if (gltfLoaderPromise) return gltfLoaderPromise;

  gltfLoaderPromise = (async () => {
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./vendor/examples/libs/draco/gltf/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      return loader;
    } catch (error) {
      console.warn("GLTFLoader could not be initialized, using fallback city.", error);
      return null;
    }
  })();

  return gltfLoaderPromise;
}

export async function loadCityModel(scene, { fallback = true, targetSize = 720 } = {}) {
  const loader = await getGltfLoader();
  if (!loader) {
    if (!fallback) return null;
    const footprints = buildFootprints({ blocks: 9, blockSize: 90 });
    return buildCityMesh(scene, footprints);
  }

  let lastError;
  for (const modelPath of CITY_MODEL_CANDIDATES) {
    try {
      console.log("Attempting to load city model from:", modelPath);
      const gltf = await loader.loadAsync(modelPath);
      const root = gltf.scene;
      root.name = "city-model";
      root.rotation.set(0, Math.PI / 2, 0);
      const cityMaterial = new THREE.MeshStandardMaterial({
        color: 0x4de8ff,
        emissive: 0x22b5ff,
        emissiveIntensity: 1.4,
        roughness: 0.12,
        metalness: 0.9,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      root.traverse((child) => {
        if (!child.isMesh) return;
        child.material = cityMaterial;
        child.material.needsUpdate = true;
        child.castShadow = false;
        child.receiveShadow = false;
      });

      root.updateMatrixWorld(true);
      const initialBox = new THREE.Box3().setFromObject(root);
      const initialSize = initialBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(initialSize.x, initialSize.y, initialSize.z) || 1;
      root.scale.setScalar(targetSize / maxDim);

      root.updateMatrixWorld(true);
      const fittedBox = new THREE.Box3().setFromObject(root);
      const center = fittedBox.getCenter(new THREE.Vector3());
      root.position.x -= center.x;
      root.position.y -= fittedBox.min.y;
      root.position.z -= center.z;

      scene.add(root);
      console.log("City GLB loaded successfully:", modelPath);
      return root;
    } catch (error) {
      lastError = error;
      console.warn(`Unable to load city model from ${modelPath}.`, error);
    }
  }

  if (fallback) {
    const footprints = buildFootprints({ blocks: 9, blockSize: 90 });
    return buildCityMesh(scene, footprints);
  }
  throw lastError;
}

// ---------------------------------------------------------------------------
// Procedural city block generator.
//
// This stands in for real building-footprint data. In production, replace
// buildFootprints() with footprints pulled from your own source, e.g.:
//   - OpenStreetMap building polygons (Overpass API) -> extrude per polygon
//   - A BIM/Revit export flattened to 2D footprints (fits your existing
//     Revit -> GLB pipeline: export footprints as a GeoJSON layer)
//   - A city open-data GIS parcel layer
//
// Each footprint is just { x, z, width, depth, rotation, height }, so any
// of the above sources can be mapped into this shape without touching the
// rendering code below.
// ---------------------------------------------------------------------------

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function updateCityMaterial(timeSeconds) {
  if (!animatedCityMaterials.length) return;
  const pulse = Math.sin(timeSeconds * 1.8) * 0.16;
  const glow = 0.9 + Math.sin(timeSeconds * 2.2) * 0.08;
  const hue = 0.53 + Math.sin(timeSeconds * 0.35) * 0.015;

  animatedCityMaterials.forEach((material) => {
    material.emissiveIntensity = glow;
    material.opacity = 0.26 + pulse * 0.2;
    material.color.setHSL(hue, 0.75, 0.56);
  });
}

export function buildFootprints({ blocks = 9, blockSize = 90, streetWidth = 14, seed = 7 } = {}) {
  const rand = mulberry32(seed);
  const footprints = [];
  const half = (blocks * blockSize) / 2;

  for (let bx = 0; bx < blocks; bx++) {
    for (let bz = 0; bz < blocks; bz++) {
      const cx = bx * blockSize - half + blockSize / 2;
      const cz = bz * blockSize - half + blockSize / 2;

      // distance from center biases height (taller near the "downtown" core)
      const distFromCenter = Math.hypot(cx, cz) / half;
      // leave a river corridor through the middle, like a waterfront city
      const nearRiver = Math.abs(cx) < blockSize * 0.6 && bz === Math.floor(blocks / 2);
      if (nearRiver) continue;

      const lots = 2 + Math.floor(rand() * 2);
      const usable = blockSize - streetWidth;
      const lotSize = usable / lots;

      for (let lx = 0; lx < lots; lx++) {
        for (let lz = 0; lz < lots; lz++) {
          if (rand() < 0.12) continue; // occasional gap / plaza
          const w = lotSize * (0.72 + rand() * 0.24);
          const d = lotSize * (0.72 + rand() * 0.24);
          const px = cx - usable / 2 + lotSize * lx + lotSize / 2 + (rand() - 0.5) * 2;
          const pz = cz - usable / 2 + lotSize * lz + lotSize / 2 + (rand() - 0.5) * 2;

          const base = 6 + rand() * 10;
          const tallBoost = Math.max(0, 1 - distFromCenter) * 34 * rand();
          const height = base + tallBoost;

          footprints.push({ x: px, z: pz, width: w, depth: d, height, seed: rand() });
        }
      }
    }
  }
  return footprints;
}

export function buildCityMesh(scene, footprints) {
  const claySand = [0xe2793d, 0xefb27a, 0xf4d9b0, 0xd9702f, 0xc9642a];
  const geometries = [];

  const group = new THREE.Group();
  group.name = "city-buildings";

  // Instance-free but still cheap: merge is skipped for editability/clarity.
  // For very large cities, swap this loop for THREE.BatchedMesh or
  // BufferGeometryUtils.mergeGeometries to keep draw calls low.
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.02,
  });

  footprints.forEach((f) => {
    const geo = new THREE.BoxGeometry(f.width, f.height, f.depth);
    geo.translate(f.x, f.height / 2, f.z);
    const color = new THREE.Color(claySand[Math.floor(f.seed * claySand.length) % claySand.length]);
    const colors = [];
    for (let i = 0; i < geo.attributes.position.count; i++) colors.push(color.r, color.g, color.b);
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometries.push(geo);
  });

  geometries.forEach((geo) => {
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  scene.add(group);
  return group;
}

export function buildGround(scene, size) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(size * 1.6, size * 1.6),
    new THREE.MeshStandardMaterial({ color: 0x0e2138, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.2;
  ground.receiveShadow = true;
  scene.add(ground);

  // river corridor
  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(size * 1.6, 60),
    new THREE.MeshStandardMaterial({ color: 0x14314f, roughness: 0.35, metalness: 0.1 })
  );
  river.rotation.x = -Math.PI / 2;
  river.position.y = -0.1;
  scene.add(river);

  return ground;
}
