export const SITE_URL = 'https://www.thevintagecinemaclub.com';
export const MAIL = 'info@thevintagecinemaclub.com';
export const BOOKING_MAIL = 'thevintagecinemaclub@gmx.at';

export const LINKS = {
  spotify: 'https://open.spotify.com/intl-de/artist/0OjzsnJLcRhDj3YnZfU2Iz',
  appleMusic: 'https://music.apple.com/at/artist/the-vintage-cinema-club/1443749632',
  youtubeVideo: 'https://youtu.be/kEww5TwWB5c',
  youtubeChannel: 'https://www.youtube.com/user/thevintagecinemaclub',
  facebook: 'https://www.facebook.com/Thevintagecinemaclub/?locale=de_DE',
  instagram: 'https://www.instagram.com/the_vintage_cinema_club',
};

type Icon = 'spotify' | 'applemusic' | 'youtube' | 'facebook' | 'instagram';

/** Coloured icon row ("Jetzt anhören") used on home, /nttb and /presskit */
export const LISTEN_ICONS: { href: string; icon: Icon; label: string }[] = [
  { href: LINKS.spotify, icon: 'spotify', label: 'The Vintage Cinema Club auf Spotify' },
  { href: LINKS.appleMusic, icon: 'applemusic', label: 'The Vintage Cinema Club auf Apple Music' },
  { href: LINKS.youtubeVideo, icon: 'youtube', label: 'The Vintage Cinema Club auf YouTube' },
  { href: LINKS.facebook, icon: 'facebook', label: 'The Vintage Cinema Club auf Facebook' },
  { href: LINKS.instagram, icon: 'instagram', label: 'The Vintage Cinema Club auf Instagram' },
];

/** White icon row in the home page footer */
export const FOOTER_ICONS: { href: string; icon: Icon; label: string }[] = [
  { href: LINKS.facebook, icon: 'facebook', label: 'The Vintage Cinema Club auf Facebook' },
  { href: LINKS.instagram, icon: 'instagram', label: 'The Vintage Cinema Club auf Instagram' },
  { href: LINKS.youtubeChannel, icon: 'youtube', label: 'YouTube-Kanal von The Vintage Cinema Club' },
  { href: LINKS.spotify, icon: 'spotify', label: 'The Vintage Cinema Club auf Spotify' },
  { href: LINKS.appleMusic, icon: 'applemusic', label: 'The Vintage Cinema Club auf Apple Music' },
];

export const PAGE_BG = '149dd1_30bd1a8d7fe34eecb3cfd3977943da0b.png';
