/**
 * /llms.txt – concise, factual site summary for AI assistants / answer engines
 * (proposed convention, see https://llmstxt.org). Generated at build time from
 * the same data the pages use. Only facts that are published on the site.
 * Pages marked noindex (nttb, presskit, heimo-erbse-2027) are intentionally not listed.
 */
import type { APIRoute } from 'astro';
import music from '../data/music.json';
import { SITE_URL, MAIL, BOOKING_MAIL, LINKS } from '../lib/site';
import { MEMBERS } from '../lib/schema';

export const GET: APIRoute = () => {
  const fashion = music.fashion.tracks.map((t, i) => `${i + 1}. ${t.title} (${t.duration})`).join('\n');
  const body = `# The Vintage Cinema Club

> The Vintage Cinema Club ist eine Indie-Rock-Band aus Salzburg/Wien, Österreich. Der Sound verbindet britpop-inspirierte Gitarren mit Retro-Ästhetik & elektronischen Elementen.

Sprache der Website: Deutsch.

## Band

- Genre: Indie-Rock, Britpop, Alternative
- Herkunft: Salzburg/Wien, Österreich
- Mitglieder (laut Website): ${MEMBERS.join(', ')}
- Booking & Infos: ${MAIL} (Booking auch: ${BOOKING_MAIL})

## Veröffentlichungen

- „Fashion“ – Debütalbum, als Vinyl erhältlich für 25 € (Bestellung per E-Mail an ${MAIL}). Titel:
${fashion}
- „Next to the Body“ (Live) – Single, Veröffentlichung am 10.07.2026; live aufgenommen im Rockhouse Salzburg am 12.12.2025.

## Seiten

- [Startseite](${SITE_URL}/): Bandinfo, Gigs, Musik-Player, Videos, Live-Fotos, Kontakt
- [Saturday Overdrive @ Café Carina](${SITE_URL}/saturdayoverdrive/): Konzert am 24.10.2026 im Café Carina, Josefstädter Straße 84 / U-Bahnbogen 42, 1080 Wien, Beginn 20:30 – mit The Vintage Cinema Club, Candid und Anjoana K.
- [G5 Indie Night](${SITE_URL}/g5-indie-night/): Konzertabend in der G5 Live Music Bar, Heiligenstädter Straße 31, 1190 Wien (Doors 20:00, Beginn 20:30) – mit Marbelite, Roses and Tulips und The Vintage Cinema Club

## Profile

- [Spotify](${LINKS.spotify})
- [Apple Music](${LINKS.appleMusic})
- [YouTube](${LINKS.youtubeChannel})
- [Instagram](${LINKS.instagram})
- [Facebook](${LINKS.facebook})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
