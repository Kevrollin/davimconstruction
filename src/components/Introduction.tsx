import { introduction } from '../data/siteContent'
import { revealDelay } from '../lib/reveal'
import { Img } from './ui/Img'

export function Introduction() {
  return (
    <section data-nav="home" aria-labelledby="intro-heading" className="section-pad">
      <div className="container-site grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <div data-reveal className="lg:col-span-9">
          <p className="eyebrow">{introduction.eyebrow}</p>
          <h2 id="intro-heading" className="text-h2 mt-6">
            {introduction.heading.map((line, i) => (
              <span key={line} className={`block ${i === 1 ? 'text-muted' : ''}`}>
                {line}{' '}
              </span>
            ))}
          </h2>
        </div>

        <div data-reveal className="order-2 lg:order-1 lg:col-span-5" style={revealDelay(80)}>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone sm:aspect-[16/10] lg:aspect-[4/5]">
            <Img
              name={introduction.image.name}
              alt={introduction.image.alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>

        <div
          data-reveal
          className="order-1 flex flex-col justify-end lg:order-2 lg:col-span-6 lg:col-start-7"
          style={revealDelay(160)}
        >
          <p className="text-lead font-medium text-ink">{introduction.lead}</p>
          <p className="mt-6 max-w-[36rem] text-ink-soft">{introduction.text}</p>

          <ol aria-label="How a project comes together" className="mt-10 flex items-center gap-x-2.5 border-t border-line pt-6 sm:gap-x-4 lg:mt-14">
            {introduction.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2.5 sm:gap-4">
                {i > 0 && <span aria-hidden className="h-px w-4 bg-brick/60 sm:w-12" />}
                <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink sm:text-[1.05rem]">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
