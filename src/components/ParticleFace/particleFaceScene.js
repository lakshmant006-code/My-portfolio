import * as THREE from "three";
import { buildParticleData } from "./particleSampler";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./particleShaders";

const MORPH_PERIOD = 16;
const INTRO_DURATION = 1.3;
const CAMERA_FOV = 38;

function getPixelRatio() {
  return window.innerWidth < 1200
    ? Math.min(window.devicePixelRatio, 1.5)
    : Math.min(window.devicePixelRatio, 2);
}

function getMaxParticles() {
  if (window.innerWidth < 720) return 24000;
  if (window.innerWidth < 1200) return 42000;
  return 60000;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

export async function initParticleFace(container, { imageUrlA, imageUrlB } = {}) {
  const data = await buildParticleData(imageUrlA, imageUrlB, {
    maxParticles: getMaxParticles(),
  });

  const getSize = () => ({
    width: container.clientWidth || window.innerWidth,
    height: container.clientHeight || window.innerHeight,
  });
  let { width, height } = getSize();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, width / height, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(getPixelRatio());
  renderer.setSize(width, height);

  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
  geometry.setAttribute("aBrightA", new THREE.BufferAttribute(data.brightA, 1));
  geometry.setAttribute("aBrightB", new THREE.BufferAttribute(data.brightB, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uIntro: { value: 0 },
    uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
    uMouseRadius: { value: 0.55 },
    uMouseStrength: { value: 0.42 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uColor: { value: new THREE.Color(0xf2f0ec) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function fitCamera() {
    const { width: w, height: h } = getSize();
    camera.aspect = w / h;
    const vFov = (camera.fov * Math.PI) / 180;
    const containerAspect = w / h;
    const planeAspect = data.planeWidth / data.planeHeight;
    let distance;
    if (containerAspect > planeAspect) {
      distance = data.planeHeight / 2 / Math.tan(vFov / 2);
    } else {
      const hFovTan = Math.tan(vFov / 2) * containerAspect;
      distance = data.planeWidth / 2 / hFovTan;
    }
    camera.position.z = distance * 1.15;
    camera.updateProjectionMatrix();
  }

  fitCamera();

  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const intersection = new THREE.Vector3();
  const mouseTarget = new THREE.Vector3(9999, 9999, 0);
  const pointerNdc = new THREE.Vector2(0, 0);
  let pointerActive = false;

  function updatePointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    pointerActive = true;
    raycaster.setFromCamera(pointerNdc, camera);
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      mouseTarget.copy(intersection);
    }
  }

  function onPointerMove(e) {
    updatePointer(e.clientX, e.clientY);
  }

  function onPointerLeave() {
    pointerActive = false;
    mouseTarget.set(9999, 9999, 0);
  }

  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("pointercancel", onPointerLeave);

  let resizeTimeout;
  function handleResize() {
    const { width: w, height: h } = getSize();
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(w, h);
    uniforms.uPixelRatio.value = renderer.getPixelRatio();
    fitCamera();
  }

  let resizeObserver;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 80);
    });
    resizeObserver.observe(container);
  } else {
    window.addEventListener("resize", handleResize);
  }

  const clock = new THREE.Clock();
  let disposed = false;
  let introStart = null;
  let rotationY = 0;
  let rotationX = 0;

  renderer.setAnimationLoop(() => {
    if (disposed) return;
    const elapsed = clock.getElapsedTime();
    uniforms.uTime.value = elapsed;
    uniforms.uMorph.value = Math.sin((elapsed * Math.PI * 2) / MORPH_PERIOD) * 0.5 + 0.5;

    if (introStart === null) introStart = elapsed;
    const introT = Math.min((elapsed - introStart) / INTRO_DURATION, 1);
    uniforms.uIntro.value = easeOutCubic(introT);

    uniforms.uMouse.value.lerp(mouseTarget, 0.14);

    const targetX = pointerActive ? pointerNdc.x : 0;
    const targetY = pointerActive ? pointerNdc.y : 0;
    rotationY += (targetX * 0.09 - rotationY) * 0.05;
    rotationX += (-targetY * 0.05 - rotationX) * 0.05;
    points.rotation.y = rotationY;
    points.rotation.x = rotationX;

    renderer.render(scene, camera);
  });

  return {
    destroy() {
      disposed = true;
      renderer.setAnimationLoop(null);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointercancel", onPointerLeave);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    },
  };
}
