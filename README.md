# The Vintage Cinema Club – Astro rebuild

Rebuild of https://www.thevintagecinemaclub.com, formerly a Wix site, using
[Astro](https://astro.build). The build output is plain static HTML/CSS/JS plus media, so it
runs on any web host with no Wix, Node or database dependency. The full report on the rebuild
and the SEO/GEO optimisation is in `docs/report/TVCC-Website-Report.pdf`.

## Commands

```bash
npm install        # once
npm run dev        # local dev server on http://localhost:4321
npm run build      # static site -> ./dist
npm run preview    # serve ./dist locally
```

## Deploy

Step-by-step instructions for any host, domain switch from Wix and troubleshooting: **[docs/HOSTING.md](docs/HOSTING.md)**.

Upload the **contents of `dist/`** to the web root of any host (Apache, nginx, IIS, Netlify,
Vercel, GitHub Pages, S3/CloudFront, shared hosting via FTP). Clean URLs work everywhere
because every page is emitted as `/<page>/index.html`. `404.html` is the error page;
`.htaccess` wires it up on Apache (other hosts usually pick up `404.html` automatically).

## Pages

| URL | Content |
| --- | --- |
| `/` | Home: band photo, intro + gigs, "Next to the Body" promo, YouTube live video, bio, two album players, vinyl offer, video gallery, "Live & Loud" photo slider, footer |
| `/nttb` | "Next to the Body" release page (cover, live video, player) – `noindex` like the original |
| `/presskit` | Presskit download (`/files/TVCC_Presskit_2026.zip`) – `noindex` |
| `/heimo-erbse-2027` | Heimo Erbse Preis 2027 submission – `noindex` |
| `/saturdayoverdrive` | Event page: Saturday Overdrive @ Café Carina |
| `/g5-indie-night` | Event page: G5 Indie Night incl. ntry.at ticket widget |
| `/blank`, `/fullscreen-page` | Legacy URLs of the former site → redirect to `/` |
| `/llms.txt` | Factual site summary for AI assistants, generated from `src/data` |
| `/sitemap-index.xml` | Generated sitemap, indexable pages only |

## Structure

```
src/
  pages/            one .astro file per page
  layouts/Base.astro  <head>/SEO meta, background modes, mobile back-to-top button
  components/
    MusicPlayer.astro   Wix Music player replacement (4 layouts, full playback logic)
    VideoGallery.astro  Wix Video "All Videos" channel replacement
    LiveGallery.astro   Pro Gallery slider (autoplay 4s, arrows, swipe, fullscreen lightbox)
    VideoBox.astro      single video with poster + play button
    ShareButtons.astro  WhatsApp / copy link / Facebook buttons
    SocialIcon.astro    build-time SVG social icons
    Band.astro, IconRow.astro, Img.astro
  lib/schema.ts       structured data / JSON-LD builders
  pages/llms.txt.ts   generates /llms.txt
  data/music.json     albums, track titles, durations and audio files (scraped from Wix)
  lib/site.ts         links, e-mail addresses, social icon sets
  assets/media/       all original images (optimised to responsive WebP at build time)
  styles/global.css   fonts, colour tokens, base styles
public/
  audio/   24 MP3 tracks (the same 128 kbit/s files Wix streamed)
  video/   4 MP4 videos (H.264 720p, re-encoded from Wix's 1080p streams for web size)
  fonts/   self-hosted fonts: band display face, Montserrat, Anton, Playfair Display, Unbounded, Bangers
  files/   TVCC_Presskit_2026.zip
```

Typical edits:
- **Gigs** → `gigs` array at the top of `src/pages/index.astro`
- **Tracks / playlists** → `src/data/music.json` (+ MP3 in `public/audio/`)
- **Social links / e-mail** → `src/lib/site.ts`
- **Gallery photos** → drop the file into `src/assets/media/` and add it to `live` in `index.astro`
- **Make a hidden page indexable** (`/nttb`, `/presskit`, `/heimo-erbse-2027`) → remove the `noindex`
  prop from the page's `<Base>` call AND remove its path from `NOINDEX_PATHS` in `astro.config.mjs`;
  it then appears in the sitemap automatically. Add it to `src/pages/llms.txt.ts` if AI assistants should see it.

## Differences from the former Wix site

- Wix clip-art social icons → SVG icons generated at build time from `simple-icons`, CC0.
- Wix-library fonts → Benzin replaced by Unbounded, Midnight Terror by Bangers, both SIL OFL;
  Helvetica Light by the system Helvetica/Arial stack. Licences in `docs/font-licenses/`.
- Footer credit "Erstellt mit Wix.com" removed; favicon is a TVCC monogram instead of the Wix logo.
- Gallery "like" hearts relied on Wix servers and are not reproduced.
- YouTube is embedded via `youtube-nocookie.com`; the ntry.at ticket widget loads from ntry.at.
- Audio autoplay: players marked autoplay try to start; browsers allow it only after interaction.
