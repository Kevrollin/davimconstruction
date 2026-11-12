import { ArrowRight, MessageCircle } from 'lucide-react'
import { projects } from '../data/projects'
import { links, projectsSection } from '../data/siteContent'
import { revealDelay } from '../lib/reveal'
import { Img } from './ui/Img'

/**
 * Shows the verified project gallery from projects.ts. While there are no verified
 * projects it renders a single call-to-action band instead — never empty cards,
 * and never stock photography presented as Davim's work.
 */
export function Projects() {
  return projects.length > 0 ? <ProjectGallery /> : <ProjectsEmptyState />
}

function ProjectGallery() {
  return (
    <section id="projects" data-nav="approach" aria-labelledby="projects-heading" className="section-pad border-t border-line">
      <div className="container-site">
        <header data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{projectsSection.eyebrow}</p>
            <h2 id="projects-heading" className="text-h2 mt-6">
              {projectsSection.heading}
            </h2>
          </div>
          <p className="text-lead text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">{projectsSection.text}</p>
        </header>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {projects.map((project, i) => {
            const featured = i === 0 && projects.length > 2
            return (
              <li key={project.id} data-reveal style={revealDelay((i % 3) * 100)} className={featured ? 'md:col-span-2' : ''}>
                <figure className="group">
                  <div className={`img-zoom relative overflow-hidden bg-stone ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <Img
                      name={project.image.name}
                      alt={project.image.alt}
                      sizes={featured ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
                      className="absolute inset-0 size-full object-cover"
                    />
                    {project.status && (
                      <span className="absolute top-4 left-4 bg-cream/92 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-ink uppercase">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-5 border-t border-line-strong pt-4">
                    <p className="text-xs font-semibold tracking-[0.14em] text-muted-strong uppercase">
                      {project.category} <span aria-hidden>·</span> {project.location}
                    </p>
                    <h3 className="text-h3 mt-2">{project.title}</h3>
                    <p className="mt-2 text-ink-soft">{project.description}</p>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function ProjectsEmptyState() {
  const { emptyState } = projectsSection
  return (
    <section id="projects" data-nav="approach" aria-labelledby="projects-heading" className="relative isolate overflow-hidden bg-ink">
      <Img
        name={emptyState.image.name}
        alt={emptyState.image.alt}
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover opacity-70"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-ink/90 via-ink/65 to-ink/20" />

      <div className="container-site py-28 sm:py-32 lg:py-44">
        <div data-reveal className="max-w-[36rem]">
          <p className="eyebrow text-cream/80!">{emptyState.eyebrow}</p>
          <h2 id="projects-heading" className="text-h2 mt-6 text-cream!">
            {emptyState.heading}
          </h2>
          <p className="text-lead mt-6 text-cream/80">{emptyState.text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={links.whatsappWithText(emptyState.cta.message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle className="size-4" strokeWidth={1.8} />
              {emptyState.cta.label}
            </a>
            <a href="#contact" className="btn btn-light">
              Discuss Your Project
              <ArrowRight className="arrow size-4" />
            </a>
          </div>
        </div>
      </div>
      <p className="absolute right-(--gutter) bottom-4 text-[0.7rem] tracking-wide text-cream/60">Illustrative photograph</p>
    </section>
  )
}
