import { ArrowDownRight, ArrowRight, MapPin, Phone } from 'lucide-react'
import { business, hero, links } from '../data/siteContent'
import { Img } from './ui/Img'

export function Hero() {
  const [first, second] = hero.headingLines
  return (
    <section id="home" data-nav="home" aria-labelledby="hero-heading" className="relative pt-(--nav-h)">
      <div className="container-site lg:grid lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-12 lg:gap-x-12">
        {/* ── Imagery: finished building + inset of the structure ─────────────── */}
        <div className="relative lg:order-2 lg:col-span-5 lg:flex lg:flex-col lg:pt-4 lg:pb-10 xl:col-span-6 short:pb-6">
          <div className="relative h-[clamp(17rem,74vw,30rem)] overflow-hidden bg-stone max-lg:bleed-x lg:bleed-right lg:h-auto lg:min-h-[34rem] lg:flex-1">
            <Img
              priority
              name={hero.image.name}
              alt={hero.image.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="hero-settle absolute inset-0 size-full object-cover object-[28%_55%]"
            />
            <span className="absolute right-4 bottom-4 bg-cream/90 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase backdrop-blur-sm sm:right-6 sm:bottom-6 lg:right-[max(1.5rem,var(--gutter))]">
              {hero.imageCaptions.main}
            </span>
          </div>

          <figure className="hero-inset absolute right-0 -bottom-10 w-[42%] max-w-[17rem] border-[6px] border-cream bg-stone shadow-[0_24px_48px_-24px_rgb(37_45_50/0.45)] sm:-bottom-14 lg:right-auto lg:bottom-20 lg:-left-16 lg:w-[48%] xl:w-[44%] short:bottom-12 lg:max-w-[19rem] lg:border-8 xl:-left-20">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Img
                name={hero.insetImage.name}
                alt={hero.insetImage.alt}
                sizes="(min-width: 1024px) 19rem, 42vw"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <figcaption className="absolute -top-px left-0 -translate-y-full bg-cream px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase">
              {hero.imageCaptions.inset}
            </figcaption>
          </figure>
        </div>

        {/* ── Copy ──────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center pt-20 pb-16 sm:pt-24 lg:order-1 lg:col-span-7 lg:py-16 lg:pr-6 xl:col-span-6 short:py-8">
          <p className="hero-rise eyebrow flex-wrap gap-y-1" style={{ animationDelay: '80ms' }}>
            <span>{hero.eyebrow[0]}</span>
            <span aria-hidden className="hidden text-line-strong sm:inline">|</span>
            <span>{hero.eyebrow[1]}</span>
          </p>

          <h1 id="hero-heading" className="hero-rise text-display mt-6 lg:mt-8 short:mt-5 short:text-[clamp(2.6rem,7.4svh,4.75rem)]" style={{ animationDelay: '160ms' }}>
            <span className="block">{first} </span>
            <span className="block">
              {second.replace(/\.$/, '')}
              <span className="text-brick">.</span>
            </span>
          </h1>

          <p className="hero-rise text-lead mt-6 max-w-[33rem] text-ink-soft lg:mt-8 short:mt-5" style={{ animationDelay: '260ms' }}>
            {hero.text}
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap short:mt-7" style={{ animationDelay: '340ms' }}>
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <ArrowRight className="arrow size-4" />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">
              {hero.secondaryCta.label}
              <ArrowDownRight className="size-4" />
            </a>
          </div>

          <dl
            className="hero-rise mt-12 grid gap-5 border-t border-line pt-6 text-sm sm:grid-cols-2 lg:mt-16 lg:max-w-[33rem] short:mt-9 short:pt-5"
            style={{ animationDelay: '420ms' }}
          >
            <div className="flex items-start gap-3">
              <dt className="mt-0.5 shrink-0 text-brick">
                <MapPin className="size-4" strokeWidth={1.8} aria-hidden />
                <span className="sr-only">Location</span>
              </dt>
              <dd>
                <a href={business.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="link-rule font-medium text-ink">
                  {business.address.town}, {business.address.country}
                </a>
                <span className="block text-muted-strong">{business.address.building}</span>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="mt-0.5 shrink-0 text-brick">
                <Phone className="size-4" strokeWidth={1.8} aria-hidden />
                <span className="sr-only">Phone</span>
              </dt>
              <dd>
                <a href={links.tel} className="link-rule font-medium text-ink">
                  {business.phoneDisplay}
                </a>
                <span className="block text-muted-strong">Call or WhatsApp</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
