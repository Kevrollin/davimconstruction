import { useEffect, useState } from 'react'

/** True once the page has scrolled past `offset` px (or a function of the viewport height). */
export function useScrolled(offset: number | ((vh: number) => number) = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const limit = typeof offset === 'function' ? offset(window.innerHeight) : offset
      setScrolled(window.scrollY > limit)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
    // offset is expected to be stable (a literal or module-level function)
  }, [])
  return scrolled
}
