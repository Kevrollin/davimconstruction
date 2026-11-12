import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Navigation } from 'lucide-react'
import { business, links, location } from '../data/siteContent'

export function Location() {
  // Only mount the Google Maps iframe when the section approaches the viewport,
  // so it never competes with the hero on slow mobile connections.
  const ref = useRef<HTMLDivElement>(null)
  const [showMap, setShowMap] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setShowMap(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section data-nav="contact" aria-labelledby="location-heading" className="relative bg-cream">
      <div ref={ref} className="map-frame relative h-[22rem] bg-stone sm:h-[26rem] lg:h-[34rem]">
        {showMap && (
          <iframe
            title={`Map showing ${business.address.oneLine}`}
            src={business.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        )}
      </div>

      {/* Card sits right on desktop so Google's own place card (top-left of the embed) stays visible */}
      <div className="container-site relative lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:justify-end">
        <div
          data-reveal
          className="relative -mt-16 border border-line bg-cream p-7 shadow-[0_30px_60px_-30px_rgb(37_45_50/0.35)] sm:p-9 lg:pointer-events-auto lg:mt-0 lg:max-w-[26rem]"
        >
          <p className="eyebrow">{location.eyebrow}</p>
          <h2 id="location-heading" className="text-h3 mt-4 text-[1.6rem]!">
            {location.heading}
          </h2>
          <address className="mt-4 text-ink-soft not-italic">
            <span className="block font-medium text-ink">{business.name}</span>
            {business.address.building}
            <br />
            {business.address.town}, {business.address.country}
          </address>
          <p className="mt-4 text-sm text-muted-strong">
            {location.note}{' '}
            <a href={links.tel} className="font-medium whitespace-nowrap text-ink underline decoration-line-strong underline-offset-4 hover:decoration-brick">
              {business.phoneDisplay}
            </a>
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={business.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-12! px-5!">
              <Navigation className="size-4" strokeWidth={1.8} />
              Get Directions
            </a>
            <a href={business.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary min-h-12! px-5!">
              Open in Maps
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="h-16 lg:hidden" aria-hidden />
    </section>
  )
}
