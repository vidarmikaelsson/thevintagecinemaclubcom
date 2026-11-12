// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.thevintagecinemaclub.com';

// Pages that are intentionally hidden from search engines (meta robots "noindex").
// Keep this list in sync with the `noindex` prop on the pages. To make a page
// indexable: remove `noindex` from the page AND remove its path here.
export const NOINDEX_PATHS = ['/nttb/', '/presskit/', '/heimo-erbse-2027/'];

// Static build: `npm run build` writes plain HTML/CSS/JS + assets to ./dist,
// which can be uploaded to any web host (Apache, nginx, Netlify, S3, …).
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // /nttb -> /nttb/index.html so clean URLs work on every host
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Legacy URLs of the former site. Static hosts get an HTML redirect page;
  // public/.htaccess additionally sends real 301s on Apache.
  redirects: {
    '/blank': '/',            // former internal alias of the home page
    '/fullscreen-page': '/',  // former gallery helper page without content
  },
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((p) => page === SITE + p) && !/\/(blank|fullscreen-page)\/?$/.test(page) && !page.endsWith('/404/'),
    }),
  ],
  image: {
    // all images are local (src/assets/media) and optimised at build time
    responsiveStyles: false,
  },
  compressHTML: true,
});
