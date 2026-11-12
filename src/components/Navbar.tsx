import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { business, links, navItems, primaryCta, type SectionId } from '../data/siteContent'
import { useScrolled } from '../hooks/useScrolled'
import { Logo } from './ui/Logo'

export function Navbar({ active }: { active: SectionId }) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(12)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Lock page scroll, close on Escape, and manage focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)
  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Background + blur live on their own layer: a backdrop-filter on <header> itself would
          become the containing block for the fixed mobile menu and collapse it. */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-(--nav-h) transition-[background-color,box-shadow,opacity] duration-300 ${
          solid ? 'bg-cream/92 opacity-100 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'opacity-0'
        }`}
      />
      <div className="container-site relative flex h-(--nav-h) items-center justify-between gap-6">
        <a href="#home" onClick={close} className="flex shrink-0 items-center gap-3.5" aria-label={`${business.name}, back to top`}>
          <Logo className="h-10 w-auto lg:h-12" alt="" />
          <span className="hidden border-l border-line-strong pl-3.5 text-[0.66rem] leading-[1.45] font-semibold tracking-[0.17em] text-ink-soft uppercase sm:block">
            Building &amp;
            <br />
            Construction
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9 xl:gap-11">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative py-2 text-[0.92rem] font-medium transition-colors ${
                      isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px bg-brick transition-all duration-500 ease-(--ease-out-soft) ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={primaryCta.href} className="btn btn-primary hidden min-h-11! px-5! py-2.5! text-[0.88rem]! md:inline-flex">
            {primaryCta.label}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {open ? <X className="size-6" strokeWidth={1.6} /> : <Menu className="size-6" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-x-0 top-(--nav-h) bottom-0 overflow-y-auto overscroll-contain bg-cream lg:hidden ${
          // visibility flips instantly on open (so focus can move in) and only after the fade on close
          open
            ? 'visible translate-y-0 opacity-100 [transition:opacity_.4s_var(--ease-out-soft),transform_.4s_var(--ease-out-soft),visibility_0s]'
            : 'invisible -translate-y-3 opacity-0 [transition:opacity_.3s_ease,transform_.3s_ease,visibility_0s_.3s]'
        }`}
      >
        <div className="container-site flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <nav aria-label="Mobile">
            <ol className="border-t border-line">
              {navItems.map((item, i) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={close}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="group flex items-baseline gap-5 py-4.5"
                  >
                    <span className="w-6 font-display text-xs font-semibold text-muted-strong tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] transition-colors ${
                        active === item.id ? 'text-brick' : 'text-ink group-hover:text-brick'
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-auto pt-10">
            <a href={primaryCta.href} onClick={close} className="btn btn-primary w-full">
              {primaryCta.label}
              <ArrowRight className="arrow size-4" />
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a href={links.tel} className="btn btn-secondary">
                <Phone className="size-4" strokeWidth={1.8} /> Call
              </a>
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <MessageCircle className="size-4" strokeWidth={1.8} /> WhatsApp
              </a>
            </div>
            <p className="mt-6 flex items-start gap-2.5 text-sm text-muted-strong">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brick" strokeWidth={1.8} />
              {business.address.oneLine}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
