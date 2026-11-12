import { ArrowRight, ArrowUp } from 'lucide-react'
import { business, footer, links, navItems, primaryCta } from '../data/siteContent'
import { Logo } from './ui/Logo'

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-site grid gap-12 pt-20 pb-12 lg:grid-cols-12 lg:gap-12 lg:pt-24">
        <div className="lg:col-span-5">
          <div className="inline-flex bg-cream p-3">
            <Logo className="h-14 w-auto" alt="Davim logo" />
          </div>
          <p className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-cream">{business.name}</p>
          <p className="mt-3 max-w-sm text-cream/70">{footer.statement}</p>
          <a href={primaryCta.href} className="group mt-8 inline-flex items-center gap-2 font-semibold text-cream">
            <span className="link-rule">{primaryCta.label}</span>
            <ArrowRight className="size-4 text-brick transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-cream/60 uppercase">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="link-rule text-cream/85 transition-colors hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-cream/60 uppercase">Contact</h2>
          <ul className="mt-5 space-y-3 text-cream/85">
            <li>
              <a href={links.tel} className="link-rule hover:text-cream">
                {business.phoneInternational}
              </a>
            </li>
            <li>
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="link-rule hover:text-cream">
                WhatsApp Davim
              </a>
            </li>
            <li>
              <a href={business.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {business.address.building}
                <br />
                {business.address.town}, {business.address.country}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col gap-4 py-7 pb-28 text-sm text-cream/60 md:flex-row md:items-center md:justify-between md:pb-7">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {business.name}. All rights reserved.
          </p>
          <p className="md:max-w-md md:text-center">{footer.imageNotice}</p>
          <a href="#home" className="inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream">
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
