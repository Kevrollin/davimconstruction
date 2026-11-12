// Downloads the illustrative stock photographs used on the site into assets-original/.
// All photos are from Unsplash (images.unsplash.com, free Unsplash License — not Unsplash+).
// They are ILLUSTRATIVE ONLY and must never be presented as Davim projects.
// Full source list and licence notes: ASSET_SOURCES.md
//
// Usage: node scripts/fetch-photos.mjs   (then: npm run images)
import { mkdirSync, existsSync, writeFileSync } from 'fs'

export const photos = {
  'hero-modern-residence': '1600047509807-ba8f99d2cdde',
  'construction-frame': '1531834685032-c34bf0d84c77',
  'site-coordination': '1541888946425-d81bb19240f5',
  'interior-finishing': '1600607687939-ce8a6c25118c',
  'architectural-detail': '1486718448742-163732cd1544',
  'facade-detail': '1600585154526-990dced4db0d',
  'rebar-groundwork': '1504307651254-35680f356dfd',
  'fabrication-welding': '1504917595217-d4dc5ebe6122',
  'landscaped-residence': '1600585154340-be6161a56a0c',
}

mkdirSync('assets-original', { recursive: true })
for (const [name, id] of Object.entries(photos)) {
  const out = `assets-original/${name}.jpg`
  if (existsSync(out)) { console.log('skip', name); continue }
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`)
  if (!res.ok) { console.warn('FAILED', name, res.status); continue }
  writeFileSync(out, Buffer.from(await res.arrayBuffer()))
  console.log('downloaded', name)
}
