import { Compass, MessagesSquare, Route, Ruler, type LucideIcon } from 'lucide-react'
import { whyDavim } from '../data/siteContent'
import { revealDelay } from '../lib/reveal'
import { Img } from './ui/Img'

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  ruler: Ruler,
  route: Route,
  message: MessagesSquare,
}

export function WhyDavim() {
  return (
    <section id="about" data-nav="about" aria-labelledby="about-heading" className="section-pad">
      <div className="container-site grid gap-y-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <div data-reveal>
            <p className="eyebrow">{whyDavim.eyebrow}</p>
            <h2 id="about-heading" className="text-h2 mt-6">
              {whyDavim.heading.map((line) => (
                <span key={line} className="block">
                  {line}{' '}
                </span>
              ))}
            </h2>
            <p className="text-lead mt-6 text-ink-soft">{whyDavim.text}</p>
          </div>
          <div data-reveal style={revealDelay(120)} className="relative mt-12 hidden aspect-[4/5] overflow-hidden bg-stone lg:block">
            <Img
              name={whyDavim.image.name}
              alt={whyDavim.image.alt}
              sizes="(min-width: 1440px) 520px, 38vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>

        <ul className="border-t border-line-strong lg:col-span-6 lg:col-start-7 lg:self-center">
          {whyDavim.values.map((value, i) => {
            const Icon = icons[value.icon] ?? Compass
            return (
              <li
                key={value.title}
                data-reveal
                style={revealDelay(i * 90)}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-line-strong py-8 sm:gap-x-8 lg:py-10"
              >
                <span className="flex size-12 items-center justify-center border border-line-strong text-brick sm:size-14">
                  <Icon className="size-5 sm:size-6" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3">{value.title}</h3>
                  <p className="mt-2 text-ink-soft">{value.text}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div data-reveal className="relative aspect-[4/3] overflow-hidden bg-stone lg:hidden">
          <Img name={whyDavim.image.name} alt={whyDavim.image.alt} sizes="100vw" className="absolute inset-0 size-full object-cover object-[50%_35%]" />
        </div>
      </div>
    </section>
  )
}
