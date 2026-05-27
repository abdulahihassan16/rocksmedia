/**
 * Removes the background from the Rocks Media logo.
 * Handles both solid-white and gradient gray backgrounds.
 *
 * Usage:
 *   1. Save your logo as:  public/images/logo-source.png
 *   2. Run:  node scripts/remove-bg.mjs
 *   3. Output: public/images/logo.png  (transparent background)
 */

import sharp from "sharp";

const INPUT  = "public/images/logo-source.png";
const OUTPUT = "public/images/logo.png";

// --- load image as raw RGBA ---
const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = new Uint8Array(data);

// --- sample the four corners to get average background colour ---
function samplePixel(x, y) {
  const idx = (y * width + x) * 4;
  return { r: pixels[idx], g: pixels[idx + 1], b: pixels[idx + 2] };
}

const corners = [
  samplePixel(0,         0),
  samplePixel(width - 1, 0),
  samplePixel(0,         height - 1),
  samplePixel(width - 1, height - 1),
];

const avgBg = {
  r: Math.round(corners.reduce((s, c) => s + c.r, 0) / 4),
  g: Math.round(corners.reduce((s, c) => s + c.g, 0) / 4),
  b: Math.round(corners.reduce((s, c) => s + c.b, 0) / 4),
};

console.log(`Detected background colour: rgb(${avgBg.r}, ${avgBg.g}, ${avgBg.b})`);

// --- flood-fill from all four edges to mark background pixels ---
const TOLERANCE = 40;   // colour distance threshold
const visited   = new Uint8Array(width * height);  // 0 = unvisited
const isBg      = new Uint8Array(width * height);  // 1 = background

function colourDist(r, g, b) {
  return Math.sqrt(
    (r - avgBg.r) ** 2 +
    (g - avgBg.g) ** 2 +
    (b - avgBg.b) ** 2
  );
}

function floodFill(startX, startY) {
  const stack = [[startX, startY]];
  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const pos = y * width + x;
    if (visited[pos]) continue;
    visited[pos] = 1;

    const idx = pos * 4;
    const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];
    if (colourDist(r, g, b) <= TOLERANCE) {
      isBg[pos] = 1;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  }
}

// seed from all four edges
for (let x = 0; x < width;  x++) { floodFill(x, 0);          floodFill(x, height - 1); }
for (let y = 0; y < height; y++) { floodFill(0, y);          floodFill(width - 1, y);  }

// --- apply transparency to background pixels ---
for (let i = 0; i < width * height; i++) {
  if (isBg[i]) pixels[i * 4 + 3] = 0;
}

// --- save ---
await sharp(Buffer.from(pixels), {
  raw: { width, height, channels: 4 },
})
  .png()
  .toFile(OUTPUT);

console.log(`Done — saved to ${OUTPUT}`);
