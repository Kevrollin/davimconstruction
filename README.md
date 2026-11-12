# Davim Building & Construction: Website

Single-page marketing website for **Davim Building & Construction**, Highway Towers, 2nd Floor, Nakuru, Kenya.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Lucide icons. The page is **prerendered to static
HTML at build time** for fast first paint and SEO, then hydrated by React. No backend: enquiries are handed to
WhatsApp.

> Before going public, work through [OWNER_CONTENT_CHECKLIST.md](OWNER_CONTENT_CHECKLIST.md).
> Image and font licensing is recorded in [ASSET_SOURCES.md](ASSET_SOURCES.md).

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:5173
npm run build        # typecheck, build, prerender into dist/
npm run preview      # serve the production build at http://localhost:4173
npm run typecheck    # TypeScript only

npm run images       # assets-original/* → responsive WebP in public/assets + images.generated.json
npm run photos       # re-download the stock originals, then run `images`
npm run brand        # rebuild transparent logo, favicons and og-image from the logo source
node scripts/fetch-fonts.mjs   # re-download the self-hosted fonts (rarely needed)
```

## Editing content

Text and business details live in **three data files**. Components only render them.

| File | Contains |
|---|---|
| `src/data/siteContent.ts` | Business facts (phone, address, map links), navigation, all section copy, SEO text |
| `src/data/services.ts` | Services. `enabled: false` hides one everywhere. The enquiry form's *Project type* list is generated from it. |
| `src/data/projects.ts` | Genuine Davim projects only. Empty = the gallery is hidden and an "Our Work" call-to-action shows instead. |

Unconfirmed items are marked `PROVISIONAL` / `unverified` in those files.

**Add a real project:** put the photo in `assets-original/` (e.g. `project-lanet-home.jpg`), run `npm run images`,
then add an entry to `projects.ts` with `image.name: 'project-lanet-home'`.

**Enable fabrication or landscaping:** set `enabled: true` in `services.ts` once Davim confirms them.

**Replace the logo:** overwrite `public/assets/davim-logo-source.jpg` with the high-resolution file (or point
`SRC` in `scripts/build-brand-assets.mjs` at a PNG), then run `npm run brand`. If the new file's proportions
differ, update `width`/`height` in `src/components/ui/Logo.tsx`, and the mark crop (`height: 59`) used for
favicons in the script.

## How things work

- **Enquiry form:** validates name, phone, project type and location, builds a plain-text message and opens
  `wa.me/254703517536?text=…` in a new tab or the WhatsApp app. It never claims the enquiry was sent: it tells the
  visitor to press **Send** in WhatsApp, and shows a manual link if the browser blocks the pop-up. Text typed before
  the page finishes loading is kept.
- **Service cards** link to the form and pre-select the matching project type.
- **Images:** `<Img name="…">` reads `src/data/images.generated.json` to build `srcset` (640/960/1280/1920 w,
  WebP), intrinsic sizes (no layout shift) and lazy loading. The hero is preloaded with `fetchpriority=high`.
- **Animations:** CSS only. Hero entrance on load, scroll reveals via one IntersectionObserver (`useReveal`).
  Content is visible in the prerendered HTML even if JavaScript fails. `prefers-reduced-motion` turns all motion off.
- **Map:** the Google Maps iframe mounts only when the visitor scrolls near it.
- **Fonts:** Manrope (headings) and Inter (body) are self-hosted from `public/fonts/`. No third-party font requests.

## SEO

`index.html` holds the title, description, Open Graph/Twitter tags and favicons. At build time
`scripts/prerender.mjs` also:

- injects `GeneralContractor` (LocalBusiness) **JSON-LD** with confirmed facts only: name, phone, address, map
  link. No hours, ratings, social profiles or registration numbers.
- adds the **canonical URL and `og:url` only when `SITE_URL` is set**, i.e. once the domain is confirmed;
- writes **`sitemap.xml`** and a `Sitemap:` line in `robots.txt` when a public URL is known (`SITE_URL`, or on
  Vercel the project's production domain from `VERCEL_PROJECT_PRODUCTION_URL`), and makes social image URLs
  absolute.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel: **Add New → Project → Import** the repository. The framework preset, build command
   (`npm run build`) and output directory (`dist`) come from `vercel.json`. Accept the defaults.
3. Deploy. The site works immediately on the `*.vercel.app` address.
4. When the domain is confirmed: **Settings → Domains** → add it (e.g. `davim.co.ke`) and follow the DNS
   instructions, then **Settings → Environment Variables** → add `SITE_URL` = `https://davim.co.ke` (Production)
   and **redeploy** so the canonical tag and sitemap use it.

Or from the command line: `npx vercel` (preview) / `npx vercel --prod`.

`vercel.json` also sets security headers and caching: hashed bundles in `/_app` and fonts are cached for a year;
photos in `/assets` for a week with background revalidation, so replaced photos appear without renaming.

## Project structure

```
index.html                 meta tags, favicons, hero image + font preloads
vercel.json                build settings, headers, caching
public/
  assets/                  logo (source + transparent), optimised WebP photos
  favicon/  favicon.ico    icons generated from the logo mark
  fonts/                   self-hosted Manrope + Inter (woff2)
  og-image.jpg  robots.txt  site.webmanifest
scripts/
  fetch-photos.mjs         download stock originals → assets-original/ (git-ignored)
  optimize-images.mjs      originals → responsive WebP + images.generated.json
  build-brand-assets.mjs   logo → transparent PNG, favicons, og-image
  fetch-fonts.mjs          Google Fonts → public/fonts + src/styles/fonts.css
  prerender.mjs            post-build: static HTML, JSON-LD, canonical, sitemap
src/
  App.tsx  main.tsx  entry-server.tsx
  components/              Navbar, Hero, Introduction, Services, Approach, Projects,
                           WhyDavim, Contact, Location, Footer, MobileActionBar, ui/
  data/                    siteContent.ts, services.ts, projects.ts, images.generated.json
  hooks/                   useReveal, useScrollSpy, useScrolled
  lib/                     enquiry.ts (validation + WhatsApp message), reveal.ts
  styles/                  index.css (design tokens, utilities), fonts.css
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| `cream` | `#F5F3EE` | Primary background |
| `stone` | `#E9E6DF` | Secondary background (Services, Contact) |
| `ink` | `#252D32` | Text, footer |
| `brick` | `#B74736` | Accent: CTAs, active nav, small details |
| `muted` | `#77736C` | Large or decorative text only (4.2:1 on cream) |
| `muted-strong` / `ink-soft` | `#625E57` / `#4A5257` | Small secondary text and paragraphs (WCAG AA) |

## Quality checks performed

At 360, 390, 768, 1024, 1280×720, 1366×768 and 1440 px: no horizontal overflow, no console errors and no
failed requests. Mobile menu (focus, Escape, scroll lock), every in-page anchor, service-card pre-selection, form
validation, WhatsApp hand-off (including the blocked-pop-up fallback and typing before load) and scroll-spy were
all tested in Chrome.

Lighthouse on the production build: **Desktop 100 / 100 / 100 / 100**. **Mobile (simulated slow 4G):
Performance 90–94, Accessibility 100, Best Practices 100, SEO 100**, CLS 0, FCP 0.8 s.
