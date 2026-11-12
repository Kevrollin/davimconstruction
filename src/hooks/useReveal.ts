import { useEffect } from 'react'

/**
 * Lightweight scroll reveal. Elements marked with `data-reveal` fade/slide in once.
 * - Content is fully visible in the prerendered HTML; hiding only starts once JS runs
 *   (the `reveal-on` class), so nothing is lost if JavaScript fails.
 * - Elements already on screen when JS starts are shown immediately (no flicker).
 * - Reduced-motion users get no animation at all.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const show = (el: HTMLElement) => el.setAttribute('data-visible', '')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(show)
      return
    }

    const vh = window.innerHeight
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.95 && r.bottom > 0) show(el)
    })
    document.documentElement.classList.add('reveal-on')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target as HTMLElement)
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    els.filter((el) => !el.hasAttribute('data-visible')).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
