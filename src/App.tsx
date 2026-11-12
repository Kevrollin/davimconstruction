import { useCallback, useState } from 'react'
import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Introduction } from './components/Introduction'
import { Location } from './components/Location'
import { MobileActionBar } from './components/MobileActionBar'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { WhyDavim } from './components/WhyDavim'
import { useReveal } from './hooks/useReveal'
import { useScrollSpy } from './hooks/useScrollSpy'

export default function App() {
  const active = useScrollSpy()
  useReveal()

  // Clicking a service card pre-selects that project type in the enquiry form.
  const [preset, setPreset] = useState<{ label: string; n: number } | null>(null)
  const selectService = useCallback((label: string) => setPreset((p) => ({ label, n: (p?.n ?? 0) + 1 })), [])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-60 bg-ink px-4 py-3 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Introduction />
        <Services onSelect={selectService} />
        <Approach />
        <Projects />
        <WhyDavim />
        <Contact preset={preset} />
        <Location />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
