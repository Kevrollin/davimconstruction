// Converts originals in assets-original/ into responsive WebP files in public/assets/
// and writes src/data/images.generated.json (widths + intrinsic size per image).
//
// Landscape photos: 640 / 960 / 1280 / 1920 px wide. Portrait photos: 640 / 960 / 1200 px wide
// (they are never displayed wide enough to need more).
//
// Usage: npm run images
import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'

const src = 'assets-original'
const out = 'public/assets'
mkdirSync(out, { recursive: true })

// Bigger files tolerate lower quality settings without visible loss.
const QUALITY = { 640: 68, 960: 64, 1200: 62, 1280: 62, 1920: 60 }

const manifest = {}
for (const f of readdirSync(src).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort()) {
  const name = path.parse(f).name.toLowerCase()
  const meta = await sharp(path.join(src, f)).rotate().metadata()
  const portrait = meta.height > meta.width
  const widths = (portrait ? [640, 960, 1200] : [640, 960, 1280, 1920]).filter((w) => w <= meta.width)
  for (const w of widths) {
    await sharp(path.join(src, f))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY[w] ?? 62, effort: 6 })
      .toFile(`${out}/${name}-${w}.webp`)
  }
  manifest[name] = { widths, width: meta.width, height: meta.height }
  console.log('optimised', name, widths.join('/'))
}

writeFileSync('src/data/images.generated.json', JSON.stringify(manifest, null, 2) + '\n')
console.log('wrote src/data/images.generated.json')
