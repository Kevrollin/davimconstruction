/**
 * DAVIM SERVICES
 * ---------------------------------------------------------------------------
 * Edit this list to change the Services section AND the "Project type" options
 * in the enquiry form (both are generated from enabled services).
 *
 *   enabled: false  → hidden everywhere on the site.
 *   status          → 'provisional' until the owner confirms the wording/scope.
 *
 * Do not overstate professional or statutory responsibilities (architectural
 * drawings, approvals) until the owner confirms exactly what Davim provides
 * directly and what is provided through partners.
 */

export type Service = {
  id: string
  title: string
  description: string
  /** Label used in the enquiry form's "Project type" dropdown. */
  enquiryLabel: string
  image: { name: string; alt: string }
  enabled: boolean
  status: 'confirmed' | 'provisional' | 'unverified'
}

export const services: Service[] = [
  {
    id: 'building-construction',
    title: 'Building & Construction',
    description: 'Construction services for projects from the groundwork through to completion.',
    enquiryLabel: 'Building & construction',
    image: { name: 'construction-frame', alt: 'Workers fixing steel reinforcement for concrete columns on a building site' },
    enabled: true,
    status: 'provisional',
  },
  {
    id: 'planning-coordination',
    title: 'Planning & Project Coordination',
    description: 'Support with project planning, drawings and the coordination of requirements ahead of construction.',
    enquiryLabel: 'Planning & project coordination',
    image: { name: 'site-coordination', alt: 'Project team walking across a reinforced concrete slab during construction' },
    enabled: true,
    status: 'provisional',
  },
  {
    id: 'finishing-works',
    title: 'Finishing Works',
    description: 'Attention to the finishing details that bring a building project together.',
    enquiryLabel: 'Finishing works',
    image: { name: 'interior-finishing', alt: 'Finished open-plan living room with timber wall panelling and large glazing' },
    enabled: true,
    status: 'provisional',
  },

  // ── Mentioned in public listings but NOT yet verified with the owner ──────
  // Set enabled: true once Davim confirms these are current services.
  {
    id: 'fabrication',
    title: 'Fabrication',
    description: 'Metal fabrication to support building and construction projects.',
    enquiryLabel: 'Fabrication',
    image: { name: 'fabrication-welding', alt: 'Sparks flying as a worker cuts metal with an angle grinder' },
    enabled: false,
    status: 'unverified',
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    description: 'Outdoor spaces that complete the setting of a finished building.',
    enquiryLabel: 'Landscaping',
    image: { name: 'landscaped-residence', alt: 'Modern home with a landscaped lawn and mature tree at dusk' },
    enabled: false,
    status: 'unverified',
  },
]

export const enabledServices = services.filter((s) => s.enabled)
