// Post-build: delete files in dist/_astro that no generated file references.
// Astro copies every imported source image (often multi-MB PNGs) into the
// output even when only the optimised WebP variants are used.
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const textExt = new Set(['.html', '.css', '.js', '.mjs', '.xml', '.txt', '.json', '.webmanifest']);
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const files = walk(dist);
const corpus = files.filter((f) => textExt.has(extname(f))).map((f) => readFileSync(f, 'utf8')).join('\n');
let removed = 0, bytes = 0;
for (const f of walk(join(dist, '_astro'))) {
  if (textExt.has(extname(f))) continue;
  const name = f.slice(f.lastIndexOf('/') + 1);
  if (!corpus.includes(name)) { bytes += statSync(f).size; unlinkSync(f); removed++; }
}
console.log(`prune-unused-assets: removed ${removed} unreferenced files, ${(bytes / 1048576).toFixed(1)} MB`);
