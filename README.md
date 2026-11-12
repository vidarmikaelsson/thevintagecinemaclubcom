# The Vintage Cinema Club – Astro rebuild

A 1:1 rebuild of https://www.thevintagecinemaclub.com (originally a Wix site) using
[Astro](https://astro.build). The build output is plain static HTML/CSS/JS plus media, so it
runs on any web host with no Wix, Node or database dependency.

## Commands

```bash
npm install        # once
npm run dev        # local dev server on http://localhost:4321
npm run build      # static site -> ./dist
npm run preview    # serve ./dist locally
```

## Deploy

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
| `/fullscreen-page` | Empty Wix system page (kept so the URL exists) |
| `/blank` | Wix's internal alias of the home page → redirects to `/` |

## Structure

```
src/
  pages/            one .astro file per page
  layouts/Base.astro  <head>/SEO, background modes, mobile back-to-top button
  components/
    MusicPlayer.astro   Wix Music player replacement (4 layouts, full playback logic)
    VideoGallery.astro  Wix Video "All Videos" channel replacement
    LiveGallery.astro   Pro Gallery slider (autoplay 4s, arrows, swipe, fullscreen lightbox)
    VideoBox.astro      single video with poster + play button
    ShareButtons.astro  WhatsApp / copy link / Facebook buttons
    Band.astro, IconRow.astro, Img.astro
  data/music.json     albums, track titles, durations and audio files (scraped from Wix)
  lib/site.ts         links, e-mail addresses, social icon sets
  assets/media/       all original images (optimised to responsive WebP at build time)
  styles/global.css   fonts, colour tokens, base styles
public/
  audio/   24 MP3 tracks (the same 128 kbit/s files Wix streamed)
  video/   4 MP4 videos (H.264 720p, re-encoded from Wix's 1080p streams for web size)
  fonts/   self-hosted fonts (band display face, Montserrat, Anton, Playfair, Benzin, …)
  files/   TVCC_Presskit_2026.zip
```

Typical edits:
- **Gigs** → `gigs` array at the top of `src/pages/index.astro`
- **Tracks / playlists** → `src/data/music.json` (+ MP3 in `public/audio/`)
- **Social links / e-mail** → `src/lib/site.ts`
- **Gallery photos** → drop the file into `src/assets/media/` and add it to `live` in `index.astro`

## Differences from the Wix original

- **Favicon**: Wix served its own logo as favicon; replaced with a TVCC monogram (`public/favicon.svg`).
- **Footer text** still reads "©2026 von The Vintage Cinema Club. Erstellt mit Wix.com" (kept 1:1) –
  edit in `src/pages/index.astro` if you want to drop the Wix mention.
- **Gallery "like" hearts** (Wix reaction counters) need Wix's server and are not reproduced.
- **YouTube** is embedded via `youtube-nocookie.com` (privacy-friendly, same video/settings).
- **ntry.at ticket widget** (G5 page) and YouTube are the only third-party embeds and load from those services.
- **Audio autoplay**: like on Wix, players marked autoplay try to start, but browsers only allow it after user interaction.
- "zur Hauptseite" links point to `/` instead of the absolute Wix URL.
