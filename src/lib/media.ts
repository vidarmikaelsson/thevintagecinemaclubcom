import type { ImageMetadata } from 'astro';

// All site images live in src/assets/media and are referenced by file name,
// e.g. media('tvcc-bandfoto-2026.jpg'). They are optimised at build time.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/media/*.{jpg,jpeg,png,webp,gif}',
  { eager: true },
);

export function media(name: string): ImageMetadata {
  const entry = files[`../assets/media/${name}`];
  if (!entry) throw new Error(`Missing media file: ${name}`);
  return entry.default;
}
