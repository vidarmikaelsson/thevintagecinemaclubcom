// @ts-check
import { defineConfig } from 'astro/config';

// Static build: `npm run build` writes plain HTML/CSS/JS + assets to ./dist,
// which can be uploaded to any web host (Apache, nginx, Netlify, S3, …).
export default defineConfig({
  site: 'https://www.thevintagecinemaclub.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // /nttb -> /nttb/index.html so clean URLs work on every host
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Wix served the home page under the internal URI /blank as well
  redirects: {
    '/blank': '/',
  },
  image: {
    // all images are local (src/assets/media) and optimised at build time
    responsiveStyles: false,
  },
  compressHTML: true,
});
