import { useEffect, useState } from 'react'
import type { SectionId } from '../data/siteContent'

/**
 * Tracks which navigation item the reader is currently in.
 * Sections declare which nav item they belong to with `data-nav="services"` etc.,
 * so supporting sections (introduction, projects, map) keep the right link active.
 */
export function useScrollSpy(initial: SectionId = 'home') {
  const [active, setActive] = useState<SectionId>(initial)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.nav as SectionId)
        }
      },
      // A thin band just above the middle of the viewport decides the active section.
      { rootMargin: '-38% 0px -58% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}
