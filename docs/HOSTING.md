# Hosting the website – step by step

The website is a **static site**: plain HTML, CSS, JavaScript, images, audio and video files.
It needs no PHP, no database and no Node.js on the server. Any web host that can serve files works.

What you upload: the **contents** of the folder `ready-to-upload/` – 282 files, 328 MB.
It is part of the repository and contains the finished website, so no build is needed.
It is an exact copy of the build output `dist/` at the time of the last `npm run build:upload`.

---

## Step 1 – Choose a host

The host must offer:

| Requirement | Why |
| --- | --- |
| At least 500 MB storage | The site is 328 MB; leave room for updates |
| Files up to 65 MB allowed | Largest file: `video/next-to-the-body.mp4`, 62.1 MB. Four videos and the presskit ZIP are over 20 MB |
| HTTPS / SSL certificate | Required by browsers and search engines; most hosts include free Let's Encrypt certificates |
| Your own domain | `www.thevintagecinemaclub.com` |
| Upload via FTP/SFTP or file manager, or deployment from GitHub | To get the files onto the server |

Typical choices:

- **Classic web hosting / shared hosting** with Apache, e.g. any provider offering "Webhosting" with FTP access. Upload by FTP. The included `.htaccess` file configures redirects, the 404 page and caching automatically.
- **Static hosting platforms that build from GitHub**, e.g. Netlify or Vercel. They build the site themselves on every push to GitHub. Check their per-file size limit against the 62.1 MB video before choosing.
- Not suitable without changes: **Cloudflare Pages** limits single files to 25 MiB, so the four videos would have to be hosted elsewhere first.

---

## Step 2 – Get the finished files

**Without building:** use the folder `ready-to-upload/` from the repository and continue with Step 3A or 3C.
It is included in the GitHub download, e.g. *Code → Download ZIP*.

**Building it yourself** is only needed after changing the site. Skip this if you use a platform that builds from GitHub, see Step 3B.

1. Open a terminal in the project folder.
2. Install dependencies, once:
   ```bash
   npm install
   ```
3. Build:
   ```bash
   npm run build
   ```
4. The finished website is now in the folder `dist/`. It contains `index.html`, the folders `_astro`, `audio`, `video`, `fonts`, `files`, one folder per page, and the hidden file `.htaccess`.
5. To also refresh the committed folder `ready-to-upload/`, run `npm run build:upload` instead of `npm run build`, then commit and push.

To check the build locally before uploading:
```bash
npm run preview
```
Then open http://localhost:4321.

---

## Step 3A – Upload to classic web hosting by FTP

1. In your hosting control panel, look up the **FTP/SFTP access data**: server address, username, password, port.
2. Install an FTP program, e.g. **FileZilla**, and connect with these access data.
3. On the server, open the **web root folder**. Its name depends on the host, commonly `public_html`, `htdocs`, `www` or `html`. If the domain already has a folder of its own, use that one.
4. **Enable showing hidden files** in the FTP program. In FileZilla: menu *Server → Force showing hidden files*. Without this, `.htaccess` is not uploaded.
5. On your computer, open the folder `ready-to-upload` – or `dist` if you built it yourself – select **everything inside it**, and upload it into the web root.
   - Correct: `public_html/index.html`, `public_html/_astro/…`, `public_html/.htaccess`
   - Wrong: `public_html/ready-to-upload/index.html` – do not upload the folder itself.
6. Wait until all 282 files are transferred; the videos take the longest.

**Alternative without FTP program:** many control panels have a *File Manager* with ZIP upload. Zip the **contents** of `ready-to-upload`, upload the ZIP into the web root, and use *Extract* there. Then delete the ZIP from the server.

Continue with Step 4.

## Step 3B – Deploy from GitHub with Netlify or Vercel

1. Create an account and choose *Add new site / Import project from Git*.
2. Connect GitHub and select the repository `vidarmikaelsson/thevintagecinemaclubcom`.
3. Settings:
   - Build command: `npm run build`
   - Output / publish directory: `dist`
   - Node.js version: 20 or newer
4. Start the deployment. The platform gives you a temporary address, e.g. `something.netlify.app`. Check the site there.
5. Every later push to the `main` branch on GitHub redeploys the site automatically.

These platforms ignore `.htaccess`. Clean URLs and the 404 page work automatically. The redirects for `/blank` and `/fullscreen-page` work through the HTML redirect pages included in the build.

Continue with Step 4.

## Step 3C – Own server with nginx

Upload the contents of `ready-to-upload` to the web root, e.g. `/var/www/thevintagecinemaclub`, and use this server block as a base:

```nginx
server {
    server_name www.thevintagecinemaclub.com;
    root /var/www/thevintagecinemaclub;
    index index.html;

    location / { try_files $uri $uri/ =404; }
    error_page 404 /404.html;

    rewrite ^/blank/?$ / permanent;
    rewrite ^/fullscreen-page/?$ / permanent;

    location /_astro/ { expires 1y; add_header Cache-Control "public, immutable"; }
    location ~* \.(mp3|mp4|woff2)$ { expires 30d; }
}
```

Add HTTPS with Certbot / Let's Encrypt.

---

## Step 4 – Connect the domain

The domain currently points to Wix. Change it only after the site works on the new host.

1. **Find out where the domain is registered.** If it was bought through Wix, Wix is the registrar; otherwise it is the company where you bought it.
2. **Before changing anything, note the existing e-mail records.** The addresses `info@thevintagecinemaclub.com` use DNS records of type **MX**, and often TXT records for SPF/DKIM. These records must stay unchanged, otherwise e-mail stops working.
3. Get the target values from your new host: usually an **A record** with an IP address for the domain and a **CNAME** or A record for `www`.
4. Choose one of two ways:
   - **Change DNS records** where the domain is managed: replace the A record of `thevintagecinemaclub.com` and the record for `www` with the values from the new host. Leave MX and TXT records as they are.
   - **Transfer the domain** to your new host or another registrar. Copy all DNS records, including MX, to the new provider before the transfer completes.
5. DNS changes take from a few minutes up to 48 hours to reach everyone.
6. In the hosting control panel, **activate the SSL certificate** for `thevintagecinemaclub.com` and `www.thevintagecinemaclub.com`, and enable *redirect HTTP to HTTPS* if offered.
7. Make sure `thevintagecinemaclub.com` without www redirects to `https://www.thevintagecinemaclub.com`. Most hosts offer this as a setting; the site's canonical URLs use the www version.

---

## Step 5 – Check the live site

Open each item in a browser, ideally also on a phone:

- [ ] `https://www.thevintagecinemaclub.com/` loads with the padlock symbol
- [ ] All pages: `/nttb/`, `/presskit/`, `/heimo-erbse-2027/`, `/saturdayoverdrive/`, `/g5-indie-night/`
- [ ] `/nttb` without slash ends up at `/nttb/`
- [ ] `/blank` and `/fullscreen-page` redirect to the home page
- [ ] A non-existing address, e.g. `/test123`, shows the site's own 404 page
- [ ] Music players play, video gallery and live video play
- [ ] Photo slider moves and opens fullscreen
- [ ] YouTube video on the home page and ticket widget on `/g5-indie-night/` load
- [ ] Presskit download on `/presskit/` works
- [ ] `https://www.thevintagecinemaclub.com/sitemap-index.xml` and `/robots.txt` open
- [ ] E-mail to `info@thevintagecinemaclub.com` still arrives

---

## Step 6 – After launch

1. **Google Search Console:** add the property `https://www.thevintagecinemaclub.com`, verify it, and submit `sitemap-index.xml`.
2. **Bing Webmaster Tools:** same procedure; it can import the property from Search Console.
3. **Wix:** keep the Wix plan active until the domain points to the new host everywhere and e-mail works. Then cancel the Wix site plan. If the domain or e-mail is billed through Wix, move them first.
4. **Cloud environment:** the Wix hosts added to the Claude Code cloud environment for scraping can be removed from its network settings.

---

## Updating the site later

1. Change the files, e.g. gigs in `src/pages/index.astro` or tracks in `src/data/music.json`.
2. Check locally with `npm run dev`.
3. Build with `npm run build:upload`. This updates `dist/` and `ready-to-upload/`; commit and push the result so the repository keeps a current copy.
4. Upload:
   - **FTP:** upload the contents of `ready-to-upload` again and overwrite. The folder `_astro` gets new file names on every build; old files there can be deleted. Audio, video and presskit only need re-uploading when they changed.
   - **Netlify / Vercel:** commit and push to GitHub; the site redeploys automatically.

---

## Troubleshooting

| Problem | Cause and fix |
| --- | --- |
| Home page works, subpages show "Not found" | The folder `ready-to-upload` or `dist` itself was uploaded. Move its contents one level up into the web root. |
| Page shows without styles or images | The site is in a subfolder, e.g. `example.com/site/`. The site expects to be at the domain root. Either use the root, or set `base: '/site'` in `astro.config.mjs` and rebuild. |
| `/blank` does not redirect, own 404 page missing | `.htaccess` was not uploaded. Enable hidden files in the FTP program and upload it. On nginx, use the configuration from Step 3C. |
| Videos or audio do not play | Upload was interrupted or the host blocks large files. Compare file sizes on the server with `ready-to-upload/video/` and `ready-to-upload/audio/`. |
| Social previews or search results show a wrong address | The domain differs from `https://www.thevintagecinemaclub.com`. Change `SITE` in `astro.config.mjs` and `SITE_URL` in `src/lib/site.ts`, then rebuild. |
| Browser warns "not secure" | SSL certificate not active yet. Activate it in the hosting control panel. |
