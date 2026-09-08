/**
 * Derives `public/brand/logo-mark.png` from the approved `public/brand/logo.png`.
 *
 * The source file is a JPEG with an opaque black field. On the experience's charcoal canvas
 * that field would render as a visible black square, so this script keys out ONLY the black
 * background pixels. Every pixel of the mark itself keeps its exact colour, position and
 * proportions — the visible logo is unchanged. The original asset is never modified.
 *
 * Run: node scripts/derive-logo-mark.mjs
 */
import sharp from "sharp";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "public/brand/logo.png");
const out = resolve(root, "public/brand/logo-mark.png");

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = new Uint8ClampedArray(data);
for (let i = 0; i < px.length; i += 4) {
  const m = Math.max(px[i], px[i + 1], px[i + 2]);
  // pure black → 0 · anything with colour → fully opaque · soft ramp for JPEG edge noise
  px[i + 3] = Math.round(Math.min(1, Math.max(0, (m - 12) / 36)) * 255);
}
await sharp(Buffer.from(px.buffer), { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`logo-mark.png ${info.width}×${info.height} · ${(statSync(out).size / 1024).toFixed(0)} KB`);
