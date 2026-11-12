# Davim Website: Information Needed Before Launch

The website is built and working. Before it goes public, please confirm or supply the items below.
Each answer is a quick change, and nothing else on the site needs rebuilding.

**How to use this list:** answer what you can. Anything unanswered stays as it is now (cautious and
unclaimed), or hidden.

---

## A. Brand

| # | Question | What the site does now |
|---|---|---|
| 1 | **Is the DAVIM logo (black roof, orange hammer, "DAVIM") still your official logo?** | Uses that logo, taken from your KEOnline profile. |
| 1b | Can you send the logo as a **high-resolution PNG with a transparent background, or an SVG**? | The only copy found is 100 × 89 px, so it is used small. A proper file will make it sharp everywhere, including the browser tab icon. |
| 1c | The logo's orange is brighter than the site's brick-red accent (#B74736). Do you have official brand colours? | Uses brick-red, which complements the logo. |

## B. Services

| # | Question | What the site does now |
|---|---|---|
| 2 | **What exactly are your construction services?** Please list them in your own words. | Shows three: *Building & Construction*, *Planning & Project Coordination*, *Finishing Works*. |
| 3 | **Do you prepare architectural drawings and handle approvals yourselves, or through partner architects/engineers?** | Says only that Davim offers "support with project planning, drawings and the coordination of requirements". It makes no claim to produce drawings or obtain approvals directly. |
| 4 | **Are fabrication and landscaping current services?** | Both are prepared but **hidden** until you confirm. |
| 5 | **Do you work only in Nakuru, or in other counties too?** If so, which? | Mentions Nakuru only. |

## C. Your work

| # | Question | What the site does now |
|---|---|---|
| 6 | **Can you provide 5–10 genuine photographs of your projects?** (original files from a phone or camera are fine) | Uses clearly labelled illustrative stock photos. It never presents them as your work. |
| 7 | **Are there completed or ongoing projects we can feature?** For each: a short name, location (area or town), type, one-line description, and whether it is completed or ongoing. Do you have the client's permission to show it? | The project gallery is hidden. A "Tell us about your project / ask about our work" panel shows instead. |
| 10 | **Do you have genuine customer testimonials** that clients have agreed to have published? | No testimonials shown. |

## D. Contact details

| # | Question | What the site does now |
|---|---|---|
| 8 | **What is the official company email address?** | No email shown. All enquiries go to phone/WhatsApp. |
| 9 | **What are your official working hours?** | No hours shown. Visitors are asked to call ahead before visiting. |
| 9b | Is **0703 517536** active on **WhatsApp**, and is it the right number for new enquiries? | The enquiry form, WhatsApp buttons and Call buttons all use it. |
| 9c | Is the map pin at **Highway Towers, Nakuru** right? Do you have a **Google Business Profile** we should link to? | Map searches "Highway Towers, Nakuru". Directions search "Davim Building & Construction, Highway Towers, Nakuru". |

## E. Credentials & online presence

| # | Question | What the site does now |
|---|---|---|
| 11 | **Are you registered with the NCA?** If yes, please share the category and registration details (a copy of the certificate helps us verify). | Makes no NCA claim. |
| 12 | **Do you have official Facebook, Instagram or LinkedIn pages?** Please send the links. | No social icons shown (no empty or placeholder icons). |
| 13 | **Do you own `davim.co.ke`, or another domain you'd prefer?** | Not yet connected to a domain. Canonical URL and sitemap switch on once the domain is set. |

## F. Wording approval

| # | Question |
|---|---|
| 14 | Please read the website text and confirm you are happy with it, in particular the headline *"From the First Plan to the Final Finish."* and the three-step approach (*Understand → Plan → Build & Finish*). |
| 15 | Is there anything you **do not** want said about the business? |

---

### For the developer: where each answer goes

| Answer | File |
|---|---|
| Logo file (1, 1b) | Replace `public/assets/davim-logo-source.jpg` (or point `SRC` in `scripts/build-brand-assets.mjs` at the new file), then `npm run brand` |
| Services, wording, enable fabrication/landscaping (2–4) | `src/data/services.ts` (`enabled`, `status`, `title`, `description`) |
| Service area (5), email (8), hours (9), social links (12) | `src/data/siteContent.ts` → `business` (`email`, `openingHours`, `socialProfiles`) plus the relevant copy |
| Project photos & entries (6, 7) | Originals into `assets-original/`, `npm run images`, then add entries to `src/data/projects.ts` |
| Testimonials (10) | Not built yet. Add a small component only once genuine, approved testimonials exist. |
| NCA (11) | `src/data/siteContent.ts` (copy) and `scripts/prerender.mjs` (structured data), only with verified details |
| Domain (13) | Set `SITE_URL=https://your-domain` in Vercel → Project → Settings → Environment Variables, then redeploy |
| Map / Google Business Profile (9c) | `business.mapsSearchUrl`, `mapsDirectionsUrl`, `mapsEmbedUrl` in `src/data/siteContent.ts` |
