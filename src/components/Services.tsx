import { ArrowUpRight } from 'lucide-react'
import { enabledServices } from '../data/services'
import { servicesSection } from '../data/siteContent'
import { revealDelay } from '../lib/reveal'
import { Img } from './ui/Img'

type Props = {
  /** Pre-selects the project type in the enquiry form when a service is chosen. */
  onSelect: (enquiryLabel: string) => void
}

export function Services({ onSelect }: Props) {
  const cols = enabledServices.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  return (
    <section id="services" data-nav="services" aria-labelledby="services-heading" className="section-pad bg-stone">
      <div className="container-site">
        <header data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{servicesSection.eyebrow}</p>
            <h2 id="services-heading" className="text-h2 mt-6">
              {servicesSection.heading}
            </h2>
          </div>
          <p className="text-lead text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">{servicesSection.text}</p>
        </header>

        <ul className={`mt-14 grid gap-x-6 gap-y-14 lg:mt-20 lg:gap-x-10 ${cols}`}>
          {enabledServices.map((service, i) => (
            <li key={service.id} data-reveal style={revealDelay(i * 110)}>
              <a
                href="#contact"
                onClick={() => onSelect(service.enquiryLabel)}
                className="group block focus-visible:outline-offset-8"
                aria-label={`${service.title}: ${service.description} Enquire about this service.`}
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-cream md:aspect-[4/5]">
                  <Img
                    name={service.image.name}
                    alt={service.image.alt}
                    sizes="(min-width: 1440px) 420px, (min-width: 768px) 31vw, calc(100vw - 2.5rem)"
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                </div>

                <div className="relative mt-6 border-t border-line-strong pt-5">
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-0 bg-brick transition-all duration-700 ease-(--ease-out-soft) group-hover:w-full group-focus-visible:w-full"
                  />
                  <span className="font-display text-sm font-semibold text-brick tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-h3 mt-2">{service.title}</h3>
                  <p className="mt-3 max-w-[26rem] text-ink-soft">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-brick">
                    {servicesSection.cardCta}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
