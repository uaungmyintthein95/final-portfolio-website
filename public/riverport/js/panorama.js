import * as THREE from "three";

export function createPanoramaViewer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // view from inside

  const material = new THREE.MeshBasicMaterial();
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const loader = new THREE.TextureLoader();
  let currentTexture = null;

  // yaw/pitch drag controls (no external dependency)
  let yaw = 0, pitch = 0;
  let dragging = false;
  let lastX = 0, lastY = 0;

  function onDown(e) {
    dragging = true;
    const p = e.touches ? e.touches[0] : e;
    lastX = p.clientX; lastY = p.clientY;
  }
  function onMove(e) {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - lastX;
    const dy = p.clientY - lastY;
    lastX = p.clientX; lastY = p.clientY;
    yaw -= dx * 0.12;
    pitch = Math.max(-85, Math.min(85, pitch - dy * 0.12));
    updateCameraLook();
  }
  function onUp() { dragging = false; }

  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  canvas.addEventListener(
    "wheel",
    (e) => {
      camera.fov = Math.max(35, Math.min(95, camera.fov + e.deltaY * 0.03));
      camera.updateProjectionMatrix();
      e.preventDefault();
    },
    { passive: false }
  );

  function updateCameraLook() {
    const yawRad = THREE.MathUtils.degToRad(yaw);
    const pitchRad = THREE.MathUtils.degToRad(pitch);
    const target = new THREE.Vector3(
      Math.cos(pitchRad) * Math.sin(yawRad),
      Math.sin(pitchRad),
      Math.cos(pitchRad) * Math.cos(yawRad)
    );
    camera.lookAt(target);
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement === canvas.closest("#pano-view")) {
      resize();
    }
  });

  function load(place) {
    return new Promise((resolve) => {
      loader.load(place.panorama.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        if (currentTexture) currentTexture.dispose();
        currentTexture = tex;
        material.map = tex;
        material.needsUpdate = true;
        yaw = place.panorama.angle || 0;
        pitch = 0;
        camera.fov = place.panorama.fov || 75;
        camera.updateProjectionMatrix();
        updateCameraLook();
        resolve();
      });
    });
  }

  let raf = null;
  function renderLoop() {
    renderer.render(scene, camera);
    raf = requestAnimationFrame(renderLoop);
  }
  function start() {
    resize();
    if (!raf) renderLoop();
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  return { load, start, stop, resize };
}


