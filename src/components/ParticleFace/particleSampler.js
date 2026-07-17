const BRIGHTNESS_THRESHOLD = 0.05;
const SAMPLE_STEP = 2;
const PLANE_HEIGHT = 2.6;

function loadImageData(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      resolve({
        data: ctx.getImageData(0, 0, canvas.width, canvas.height).data,
        width: canvas.width,
        height: canvas.height,
      });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function luminanceAt(data, width, x, y) {
  const i = (y * width + x) * 4;
  return (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
}

/**
 * Samples two same-dimension images (a "dense" and a "resolved" dust state of
 * the same composition) into a shared particle field: one XY position per
 * bright pixel, with per-image brightness kept separately so the render loop
 * can crossfade between the two states.
 */
export async function buildParticleData(
  urlA,
  urlB,
  { maxParticles = 60000, threshold = BRIGHTNESS_THRESHOLD } = {},
) {
  const [imgA, imgB] = await Promise.all([
    loadImageData(urlA),
    loadImageData(urlB),
  ]);

  const width = Math.min(imgA.width, imgB.width);
  const height = Math.min(imgA.height, imgB.height);
  const aspect = width / height;
  const planeHeight = PLANE_HEIGHT;
  const planeWidth = planeHeight * aspect;

  const candidates = [];
  for (let y = 0; y < height; y += SAMPLE_STEP) {
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      const bA = luminanceAt(imgA.data, imgA.width, x, y);
      const bB = luminanceAt(imgB.data, imgB.width, x, y);
      if (bA < threshold && bB < threshold) continue;
      candidates.push(x, y, bA, bB);
    }
  }

  const candidateCount = candidates.length / 4;
  const keepProb = Math.min(1, maxParticles / candidateCount);

  const positions = [];
  const brightA = [];
  const brightB = [];
  const seeds = [];

  for (let c = 0; c < candidateCount; c++) {
    if (keepProb < 1 && Math.random() > keepProb) continue;
    const base = c * 4;
    const x = candidates[base];
    const y = candidates[base + 1];
    const bA = candidates[base + 2];
    const bB = candidates[base + 3];

    const nx = (x / width - 0.5) * planeWidth;
    const ny = -(y / height - 0.5) * planeHeight;
    const nz = (bA + bB - 1) * 0.09 + (Math.random() - 0.5) * 0.04;

    positions.push(nx, ny, nz);
    brightA.push(bA);
    brightB.push(bB);
    seeds.push(Math.random());
  }

  return {
    count: seeds.length,
    positions: new Float32Array(positions),
    brightA: new Float32Array(brightA),
    brightB: new Float32Array(brightB),
    seeds: new Float32Array(seeds),
    planeWidth,
    planeHeight,
  };
}
