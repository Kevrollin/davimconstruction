// Post-build step (run by `npm run build`):
//   1. Renders the React app to static HTML inside dist/index.html (fast first paint, SEO).
//   2. Adds LocalBusiness (GeneralContractor) structured data from src/data/siteContent.ts.
//   3. Adds canonical / og:url ONLY when SITE_URL is set (i.e. the domain is confirmed).
//   4. Writes sitemap.xml + robots.txt Sitemap line when a public URL is known
//      (SITE_URL, or Vercel's production domain via VERCEL_PROJECT_PRODUCTION_URL).
import { readFileSync, writeFileSync, rmSync, appendFileSync } from 'fs'
import { pathToFileURL } from 'url'

const ssrEntry = pathToFileURL('dist-ssr/entry-server.js').href
const { render, business } = await import(ssrEntry)

let html = readFileSync('dist/index.html', 'utf8')
const appHtml = render()
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found in dist/index.html')
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

const siteUrl = (process.env.SITE_URL || '').trim().replace(/\/+$/, '')
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const publicUrl = siteUrl || (vercelHost ? `https://${vercelHost}` : '')

// ── Structured data: only confirmed business facts (no hours, ratings or socials) ──
const ld = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: business.name,
  description: 'Building and construction support from initial planning through construction and finishing.',
  telephone: business.phoneE164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.building,
    addressLocality: business.address.town,
    addressCountry: business.address.countryCode,
  },
  hasMap: business.mapsSearchUrl,
  ...(publicUrl && { image: `${publicUrl}/og-image.jpg`, logo: `${publicUrl}/assets/davim-logo.png` }),
  ...(siteUrl && { url: `${siteUrl}/` }),
}
const ldTag = `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`
let head = ldTag

if (publicUrl) {
  // Social scrapers need absolute image URLs.
  html = html.replaceAll('content="/og-image.jpg"', `content="${publicUrl}/og-image.jpg"`)
}
if (siteUrl) {
  head += `\n    <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />`
}
html = html.replace('</head>', `    ${head}\n  </head>`)
writeFileSync('dist/index.html', html)

if (publicUrl) {
  const today = new Date().toISOString().slice(0, 10)
  writeFileSync(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${publicUrl}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>\n`,
  )
  appendFileSync('dist/robots.txt', `\nSitemap: ${publicUrl}/sitemap.xml\n`)
}

rmSync('dist-ssr', { recursive: true, force: true })
console.log(
  `prerender: ${(appHtml.length / 1024).toFixed(1)} KB of HTML` +
    (siteUrl ? `, canonical ${siteUrl}/` : ', no canonical (SITE_URL not set)') +
    (publicUrl ? `, sitemap for ${publicUrl}` : ', no sitemap (no public URL known)'),
)
