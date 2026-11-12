import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { links } from '../data/siteContent'
import { useScrolled } from '../hooks/useScrolled'

const pastHero = (vh: number) => vh * 0.85

/** Sticky Call / WhatsApp bar for phones. Appears after the hero, hides over the contact section. */
export function MobileActionBar() {
  const scrolled = useScrolled(pastHero)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const visible = scrolled && !contactVisible
  return (
    <div
      data-action-bar
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-(--gutter) pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-(--ease-out-soft) md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <a href={links.tel} className="btn btn-secondary min-h-12! bg-white!">
          <Phone className="size-4" strokeWidth={1.8} /> Call
        </a>
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-12!">
          <MessageCircle className="size-4" strokeWidth={1.8} /> WhatsApp
        </a>
      </div>
    </div>
  )
}
