// Derives web-ready brand files from the ORIGINAL logo (public/assets/davim-logo-source.jpg):
//   public/assets/davim-logo.png        transparent-background version of the original logo
//   public/favicon/*.png, favicon.ico   icons cropped from the roof + hammer mark
//   public/og-image.jpg                 1200x630 social sharing image
//
// The source logo is only 100x89 px. When Davim supplies a high-resolution PNG/SVG,
// replace davim-logo-source.jpg (or point SRC at the new file) and re-run:
//   node scripts/build-brand-assets.mjs
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'fs'

const SRC = 'public/assets/davim-logo-source.jpg'
const HERO = 'assets-original/hero-modern-residence.jpg'
mkdirSync('public/favicon', { recursive: true })

// 1. Remove the white JPEG background → transparent PNG (colour un-mixing keeps edges clean).
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const rgba = Buffer.alloc(info.width * info.height * 4)
const WHITE = 228, SOLID = 70
for (let p = 0; p < info.width * info.height; p++) {
  const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2]
  const a = Math.max(0, Math.min(1, (WHITE - Math.min(r, g, b)) / (WHITE - SOLID)))
  const unmix = (c) => (a > 0 ? Math.max(0, Math.min(255, Math.round((c - (1 - a) * 255) / a))) : 0)
  rgba[p * 4] = unmix(r)
  rgba[p * 4 + 1] = unmix(g)
  rgba[p * 4 + 2] = unmix(b)
  rgba[p * 4 + 3] = Math.round(a * 255)
}
const raw = { raw: { width: info.width, height: info.height, channels: 4 } }
const logo = await sharp(rgba, raw).trim({ threshold: 1 }).png().toBuffer()
await sharp(logo).png({ compressionLevel: 9 }).toFile('public/assets/davim-logo.png')
const logoMeta = await sharp(logo).metadata()
console.log('logo', logoMeta.width + 'x' + logoMeta.height)

// 2. Favicons from the mark only (roof + hammer, above the DAVIM lettering, rows 0–58).
const mark = await sharp(rgba, raw)
  .extract({ left: 0, top: 0, width: info.width, height: 59 })
  .png()
  .toBuffer()
const markTrimmed = await sharp(mark).trim({ threshold: 1 }).png().toBuffer()
async function icon(size, pad, file) {
  const inner = Math.round(size * (1 - pad * 2))
  const m = await sharp(markTrimmed)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
    .toBuffer()
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#F5F3EE"/></svg>`,
  )
  return sharp(bg).composite([{ input: m, gravity: 'centre' }]).png({ compressionLevel: 9 }).toFile(file)
}
await icon(32, 0.08, 'public/favicon/favicon-32.png')
await icon(48, 0.1, 'public/favicon/favicon-48.png')
await icon(192, 0.14, 'public/favicon/favicon-192.png')
await icon(512, 0.16, 'public/favicon/favicon-512.png')
await icon(180, 0.14, 'public/favicon/apple-touch-icon.png')

// favicon.ico (single 32px PNG-compressed entry — valid in all modern browsers)
const png32 = await sharp('public/favicon/favicon-32.png').toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(1, 4) // count
header.writeUInt8(32, 6) // width
header.writeUInt8(32, 7) // height
header.writeUInt8(0, 8) // palette
header.writeUInt8(0, 9) // reserved
header.writeUInt16LE(1, 10) // colour planes
header.writeUInt16LE(32, 12) // bits per pixel
header.writeUInt32LE(png32.length, 14) // size
header.writeUInt32LE(22, 18) // offset
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]))

// 3. Open Graph image: cream panel with the original logo + photo (illustrative).
const W = 1200, H = 630, PANEL = 520
const photo = await sharp(HERO).resize(W - PANEL, H, { fit: 'cover', position: 'left' }).toBuffer()
const ogLogo = await sharp(logo).resize({ height: 120, kernel: 'lanczos3' }).toBuffer()
const text = Buffer.from(`<svg width="${PANEL}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="64" y="236" width="40" height="3" fill="#B74736"/>
  <text x="64" y="292" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#252D32" letter-spacing="-1">From the First Plan</text>
  <text x="64" y="342" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#252D32" letter-spacing="-1">to the Final Finish.</text>
  <text x="64" y="410" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="21" fill="#4A5257">Davim Building &amp; Construction</text>
  <text x="64" y="540" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="17" font-weight="600" fill="#B74736" letter-spacing="2">NAKURU, KENYA</text>
  <text x="64" y="568" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="17" fill="#4A5257">+254 703 517536</text>
</svg>`)
await sharp({ create: { width: W, height: H, channels: 3, background: '#F5F3EE' } })
  .composite([
    { input: photo, left: PANEL, top: 0 },
    { input: ogLogo, left: 60, top: 64 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og-image.jpg')
console.log('brand assets written')
