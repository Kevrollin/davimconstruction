# Asset Sources & Licensing

Every third-party asset used on the Davim website, where it came from, and the terms it is used under.
Downloaded on **12 November 2026**.

> **Important:** all photographs below are **illustrative stock photography**. None of them shows a Davim project,
> and none may be captioned or described as Davim's work. The site footer states this, and the "Our Work" band
> carries an "Illustrative photograph" label. Replace them with genuine Davim photographs as they become available.

---

## 1. Davim logo (owned by Davim Building & Construction)

| | |
|---|---|
| Source file | `public/assets/davim-logo-source.jpg` (kept unmodified) |
| Original URL | https://keonline.eu-central-1.linodeobjects.com/uploads/logo/NnvLmXSqEefwGANvpQj9hBdIcrtAAjGUV5nY6idZ.jpg |
| Found on | Davim's public business profile on KEOnline |
| Format / size | JPEG, 100 × 89 px, white background |
| Rights | Belongs to Davim. Used to represent the business on its own website. **Owner confirmation pending.** |

Files derived from it by `scripts/build-brand-assets.mjs`:

- `public/assets/davim-logo.png`: the same logo with its white background removed (67 × 80 px, trimmed)
- `public/favicon.ico`, `public/favicon/*.png`: icons cropped from the roof and hammer mark
- `public/og-image.jpg`: 1200 × 630 social sharing image (logo plus the illustrative hero photo)

The source is very small. **Ask Davim for a high-resolution transparent PNG or SVG**, then replace the
source file and run `npm run brand` to regenerate everything above.

---

## 2. Photography (Unsplash, illustrative only)

**Licence:** [Unsplash License](https://unsplash.com/license): free to use for commercial and non-commercial
purposes, no permission or attribution required. It does not allow compiling the photos into a competing stock
service or selling unaltered copies, neither of which applies here. All photos come from the standard
`images.unsplash.com/photo-…` library, **not** the paid Unsplash+ collection (whose IDs start with `premium_photo-`).

**Photographer credits:** these could not be collected automatically, because Unsplash's photo pages block
automated access. Credit is optional under the licence. To add credits, find each photo's page (for example
with a reverse image search on the URL below) and fill in the *Photographer* column.

| Local name (`public/assets/…`) | Unsplash image URL | Used for | Photographer |
|---|---|---|---|
| `hero-modern-residence-*.webp` | https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde | Hero (main), OG image | _not recorded_ |
| `construction-frame-*.webp` | https://images.unsplash.com/photo-1531834685032-c34bf0d84c77 | Hero inset, *Building & Construction* service | _not recorded_ |
| `architectural-detail-*.webp` | https://images.unsplash.com/photo-1486718448742-163732cd1544 | Introduction | _not recorded_ |
| `site-coordination-*.webp` | https://images.unsplash.com/photo-1541888946425-d81bb19240f5 | *Planning & Project Coordination* service | _not recorded_ |
| `interior-finishing-*.webp` | https://images.unsplash.com/photo-1600607687939-ce8a6c25118c | *Finishing Works* service | _not recorded_ |
| `rebar-groundwork-*.webp` | https://images.unsplash.com/photo-1504307651254-35680f356dfd | "Our Work" band (shown while there are no verified projects) | _not recorded_ |
| `facade-detail-*.webp` | https://images.unsplash.com/photo-1600585154526-990dced4db0d | About / Why Davim | _not recorded_ |
| `fabrication-welding-*.webp` | https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122 | *Fabrication* service (**disabled** until verified) | _not recorded_ |
| `landscaped-residence-*.webp` | https://images.unsplash.com/photo-1600585154340-be6161a56a0c | *Landscaping* service (**disabled** until verified) | _not recorded_ |

Selection notes: photos with visible company branding, logos or national flags were rejected, as were
staff-style portraits that could be mistaken for Davim's own team.

Reproduce or update: `node scripts/fetch-photos.mjs` downloads the 2400 px originals to `assets-original/`
(git-ignored), and `npm run images` generates the 640 / 960 / 1280 / 1920 px WebP files and
`src/data/images.generated.json`.

---

## 3. Fonts (self-hosted)

| Font | Designer | Licence | Files |
|---|---|---|---|
| Manrope (variable, 300–800) | Mikhail Sharanda | SIL Open Font License 1.1 | `public/fonts/manrope-latin-variable.woff2` |
| Inter (variable, 400–600) | Rasmus Andersson | SIL Open Font License 1.1 | `public/fonts/inter-latin-variable.woff2` |

Downloaded from Google Fonts (Latin subset) by `scripts/fetch-fonts.mjs` and served from the site itself.
No requests go to Google Fonts.

## 4. Icons

[Lucide](https://lucide.dev) via `lucide-react`, ISC licence. Only the icons the site uses are bundled.

## 5. Map

The office map is a Google Maps embed (`maps.google.com/maps?q=Highway+Towers,+Nakuru,+Kenya&output=embed`),
used under the [Google Maps / Google Earth Additional Terms of Service](https://maps.google.com/help/terms_maps/).
It only loads when the visitor scrolls near it. No API key is used.
