/**
 * schema.org structured data (JSON-LD) for search engines and AI answer engines.
 * Every value below is taken from content that is published on the site itself
 * (or from the original Wix site data). Do not add facts that are not on the site.
 */
import music from '../data/music.json';
import { SITE_URL, MAIL, LINKS } from './site';

export const BAND_ID = `${SITE_URL}/#band`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (src: string) => new URL(src, SITE_URL).href;

/** "mm:ss" -> ISO 8601 duration */
export const isoDuration = (mmss: string) => {
  const [m, s] = mmss.split(':').map(Number);
  return `PT${m}M${s}S`;
};

/** Band members as named on the event pages ("… entstehen bei Christian Sieglhuber, …") */
export const MEMBERS = ['Christian Sieglhuber', 'Johannes Pann', 'Lukas Brunner', 'Steffen Bodis', 'Sarah May Karger'];

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'The Vintage Cinema Club',
    url: `${SITE_URL}/`,
    inLanguage: 'de',
    publisher: { '@id': BAND_ID },
  };
}

export function bandSchema(opts: { image: string; fashionCover: string; nttbCover: string }) {
  const fashion = music.fashion;
  const nttb = music.nttb;
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': BAND_ID,
    name: 'The Vintage Cinema Club',
    alternateName: 'TVCC',
    url: `${SITE_URL}/`,
    description:
      'The Vintage Cinema Club ist eine Indie-Rock-Band aus Salzburg/Wien, Österreich. Der Sound verbindet britpop-inspirierte Gitarren mit Retro-Ästhetik & elektronischen Elementen.',
    genre: ['Indie-Rock', 'Britpop', 'Alternative'],
    image: abs(opts.image),
    email: MAIL,
    location: [
      { '@type': 'Place', name: 'Salzburg', address: { '@type': 'PostalAddress', addressLocality: 'Salzburg', addressCountry: 'AT' } },
      { '@type': 'Place', name: 'Wien', address: { '@type': 'PostalAddress', addressLocality: 'Wien', addressCountry: 'AT' } },
    ],
    member: MEMBERS.map((name) => ({ '@type': 'Person', name })),
    sameAs: [LINKS.spotify, LINKS.appleMusic, LINKS.youtubeChannel, LINKS.facebook, LINKS.instagram],
    album: [
      {
        '@type': 'MusicAlbum',
        '@id': `${SITE_URL}/#album-fashion`,
        name: fashion.title,
        description: 'Debütalbum von The Vintage Cinema Club – als Vinyl erhältlich für 25 € (Bestellung per E-Mail).',
        byArtist: { '@id': BAND_ID },
        image: abs(opts.fashionCover),
        numTracks: fashion.tracks.length,
        track: {
          '@type': 'ItemList',
          numberOfItems: fashion.tracks.length,
          itemListElement: fashion.tracks.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: { '@type': 'MusicRecording', name: t.title, duration: isoDuration(t.duration), byArtist: { '@id': BAND_ID } },
          })),
        },
        offers: { '@type': 'Offer', price: '25', priceCurrency: 'EUR', description: `Vinyl – Bestellung per E-Mail an ${MAIL}` },
      },
      {
        '@type': 'MusicAlbum',
        '@id': `${SITE_URL}/#single-next-to-the-body`,
        name: nttb.title,
        albumReleaseType: 'https://schema.org/SingleRelease',
        datePublished: '2026-07-10',
        description: 'Live aufgenommen im Rockhouse Salzburg am 12.12.2025.',
        byArtist: { '@id': BAND_ID },
        image: abs(opts.nttbCover),
        numTracks: 1,
        track: {
          '@type': 'MusicRecording',
          name: nttb.tracks[0].title,
          duration: isoDuration(nttb.tracks[0].duration),
          byArtist: { '@id': BAND_ID },
        },
      },
    ],
  };
}

export function videoListSchema(videos: { title: string; name: string; src: string; thumb: string; uploadDate: string; duration: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Videos von The Vintage Cinema Club',
    itemListElement: videos.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: v.name,
        description: `${v.name} – Video von The Vintage Cinema Club`,
        thumbnailUrl: abs(v.thumb),
        uploadDate: v.uploadDate,
        duration: v.duration,
        contentUrl: abs(v.src),
        inLanguage: 'de',
        creator: { '@id': BAND_ID },
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.path ? `${SITE_URL}${it.path}/` : `${SITE_URL}/`,
    })),
  };
}
