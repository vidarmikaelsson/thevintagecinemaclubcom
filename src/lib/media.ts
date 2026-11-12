import type { ImageMetadata } from 'astro';

// Every image scraped from the original site lives in src/assets/media and is
// referenced by its original Wix media file name (without the "~mv2" suffix).
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/media/*.{jpg,jpeg,png,webp,gif}',
  { eager: true },
);

export function media(name: string): ImageMetadata {
  const entry = files[`../assets/media/${name}`];
  if (!entry) throw new Error(`Missing media file: ${name}`);
  return entry.default;
}
