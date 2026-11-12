import { approach } from '../data/siteContent'

export function Approach() {
  return (
    <section id="approach" data-nav="approach" aria-labelledby="approach-heading" className="section-pad">
      <div className="container-site">
        <header data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{approach.eyebrow}</p>
            <h2 id="approach-heading" className="text-h2 mt-6">
              {approach.heading}
            </h2>
          </div>
          <p className="text-lead text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">{approach.text}</p>
        </header>

        <ol data-reveal className="relative mt-14 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {/* Track + animated accent line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <span
            aria-hidden
            className="timeline-line absolute top-2 bottom-2 left-[5px] w-px bg-brick lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />

          {approach.steps.map((step) => (
            <li key={step.number} className="relative pl-10 lg:pt-12 lg:pl-0 lg:pr-8">
              <span aria-hidden className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-brick bg-cream lg:top-0" />
              <span className="block font-display text-[2.75rem] leading-none font-light tracking-[-0.04em] text-brick tabular-nums lg:text-[3.5rem]">
                {step.number}
              </span>
              <h3 className="text-h3 mt-5">{step.title}</h3>
              <p className="mt-3 max-w-[22rem] text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
