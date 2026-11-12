/**
 * DAVIM — CENTRAL SITE CONTENT
 * ---------------------------------------------------------------------------
 * Almost every piece of text on the website lives here, in services.ts or in
 * projects.ts. Edit these files to update the site; components only render them.
 *
 * Markers used below:
 *   VERIFIED     – supplied by Davim / found on a public business listing.
 *   PROVISIONAL  – sensible marketing copy written for launch; confirm with the owner.
 * Open questions for the owner are listed in OWNER_CONTENT_CHECKLIST.md.
 */

// ── Business facts (VERIFIED) ─────────────────────────────────────────────────
export const business = {
  name: 'Davim Building & Construction',
  shortName: 'Davim',
  category: 'Building and Construction',
  phoneDisplay: '0703 517536',
  phoneInternational: '+254 703 517536',
  phoneE164: '+254703517536',
  whatsappNumber: '254703517536',
  address: {
    building: 'Highway Towers, 2nd Floor',
    town: 'Nakuru',
    country: 'Kenya',
    countryCode: 'KE',
    oneLine: 'Highway Towers, 2nd Floor, Nakuru, Kenya',
  },
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Davim+Building+%26+Construction%2C+Highway+Towers%2C+Nakuru',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Davim+Building+%26+Construction%2C+Highway+Towers%2C+Nakuru',
  /** Keyless Google Maps embed. Searches the building rather than a guessed street address. */
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Highway+Towers%2C+Nakuru%2C+Kenya&z=16&output=embed',

  // Not yet confirmed — leave as null until the owner confirms (see checklist).
  email: null as string | null,
  openingHours: null as string | null,
  // Only add genuine, owner-confirmed profiles. Empty = no social icons shown.
  socialProfiles: [] as { label: string; url: string }[],
} as const

export const links = {
  tel: `tel:${business.phoneE164}`,
  whatsapp: `https://wa.me/${business.whatsappNumber}`,
  whatsappWithText: (text: string) =>
    `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`,
}

// ── Navigation ────────────────────────────────────────────────────────────────
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const primaryCta = { label: 'Discuss Your Project', href: '#contact' }

// ── Hero (PROVISIONAL copy, from the brief) ───────────────────────────────────
export const hero = {
  eyebrow: ['Davim Building & Construction', 'Nakuru, Kenya'],
  headingLines: ['From the First Plan', 'to the Final Finish.'],
  text: 'Building and construction support, bringing your project from initial planning through construction and finishing.',
  primaryCta: { label: 'Discuss Your Project', href: '#contact' },
  secondaryCta: { label: 'Explore Our Services', href: '#services' },
  // Illustrative stock photography — never captioned as a Davim project.
  image: { name: 'hero-modern-residence', alt: 'Contemporary two-storey house with timber cladding and a landscaped front garden' },
  insetImage: { name: 'construction-frame', alt: 'Construction workers fixing steel reinforcement for concrete columns' },
  imageCaptions: { inset: 'Structure', main: 'Finish' },
}

// ── Introduction (PROVISIONAL) ────────────────────────────────────────────────
export const introduction = {
  eyebrow: 'Our Philosophy',
  heading: ['Building with purpose.', 'Finishing with care.'],
  lead: 'Every building project deserves careful planning, dependable execution and attention to the details that make the difference.',
  text: 'Davim works with clients from the early planning stage, through construction, to the finishing touches. One partner, one conversation, from start to finish.',
  stages: ['Planning', 'Construction', 'Finishing'],
  image: { name: 'architectural-detail', alt: 'Close-up of a curved terracotta-coloured building facade against a blue sky' },
}

// ── Services section heading (service entries live in services.ts) ────────────
export const servicesSection = {
  eyebrow: 'Services',
  heading: 'What We Do',
  text: 'Construction support tailored to your project.',
  cardCta: 'Enquire',
}

// ── Our Approach (PROVISIONAL — a proposed customer journey, not a timeline) ──
export const approach = {
  eyebrow: 'Our Approach',
  heading: 'A Clearer Way to Build.',
  text: 'A simple journey from first conversation to final finish. Every project is scoped around its own needs.',
  steps: [
    { number: '01', title: 'Understand', text: 'Start with a conversation about your project, goals and requirements.' },
    { number: '02', title: 'Plan', text: 'Align on the project scope, drawings and the next steps.' },
    { number: '03', title: 'Build & Finish', text: 'Move from planning into construction and the finishing details.' },
  ],
}

// ── Projects section (entries live in projects.ts) ────────────────────────────
export const projectsSection = {
  eyebrow: 'Projects',
  heading: 'Selected Work',
  text: 'A selection of Davim projects.',
  /** Shown instead of the gallery while projects.ts has no verified entries. */
  emptyState: {
    eyebrow: 'Our Work',
    heading: 'Every project starts with a conversation.',
    text: 'Tell us what you are planning, and ask us about our recent work.',
    cta: { label: 'Ask About Our Work', message: 'Hello Davim, I would like to learn more about your recent construction work.' },
    image: { name: 'rebar-groundwork', alt: 'Aerial view of construction workers placing steel reinforcement on a concrete slab' },
  },
}

// ── Why Davim / About (PROVISIONAL) ───────────────────────────────────────────
export const whyDavim = {
  eyebrow: 'About Davim',
  heading: ['One Vision.', 'A Considered Approach.'],
  text: 'Working with one construction partner from the first plan to the final finish keeps decisions connected and the project moving in one direction.',
  values: [
    { icon: 'compass', title: 'Thoughtful planning', text: 'Clear thinking at the start, so the build begins on firm ground.' },
    { icon: 'ruler', title: 'Attention to detail', text: 'Care for the construction details that shape quality and durability.' },
    { icon: 'route', title: 'Coordinated from start to finish', text: 'One partner connecting planning, construction and finishing.' },
    { icon: 'message', title: 'Clear communication', text: 'Straightforward updates and a direct line to the team.' },
  ],
  image: { name: 'facade-detail', alt: 'Modern building facade with timber slats and warm interior lighting at dusk' },
}

// ── Contact (VERIFIED details, PROVISIONAL copy) ──────────────────────────────
export const contact = {
  eyebrow: 'Contact',
  heading: "Let's Talk About Your Project.",
  text: 'Have a construction project in mind? Get in touch with Davim and start the conversation.',
  form: {
    heading: 'Project enquiry',
    intro: 'Share a few details and we will prepare a WhatsApp message for you to send to Davim.',
    submitLabel: 'Continue on WhatsApp',
    otherProjectType: 'Other / not sure yet',
    locationPlaceholder: 'e.g. Nakuru, Naivasha, Njoro',
    descriptionPlaceholder: 'What are you planning to build or improve? Any timing or budget notes are helpful.',
    privacyNote: 'Your details are not stored on this website. They are only shared when you press Send in WhatsApp.',
  },
}

export const location = {
  eyebrow: 'Visit',
  heading: 'Find our office',
  // Hours are not confirmed, so visitors are asked to call ahead rather than shown invented hours.
  note: 'Please call ahead to arrange a visit.',
}

// ── Footer ────────────────────────────────────────────────────────────────────
export const footer = {
  statement: 'Building and construction support in Nakuru, Kenya, from the first plan to the final finish.',
  imageNotice: 'Photography on this website is illustrative and does not depict specific Davim projects.',
}

// ── SEO (used in index.html and by scripts/prerender.mjs) ─────────────────────
export const seo = {
  title: 'Davim Building & Construction | Nakuru, Kenya',
  description:
    'Davim Building & Construction, Highway Towers, Nakuru. Building and construction support from initial planning through construction and finishing. Call +254 703 517536.',
}
