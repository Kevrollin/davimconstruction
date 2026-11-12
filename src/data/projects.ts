/**
 * DAVIM PROJECTS
 * ---------------------------------------------------------------------------
 * ONLY add genuine Davim projects with photographs supplied or approved by Davim.
 * Never add stock photography here, and never invent names, locations or results.
 *
 * While this list is empty, the website shows a short "Our Work" call-to-action
 * instead of a gallery. As soon as one entry is added, the gallery appears.
 *
 * To add a project:
 *   1. Put the original photo in assets-original/ (e.g. assets-original/project-milimani-home.jpg).
 *   2. Run `npm run images` — this creates the optimised WebP files and registers the image.
 *   3. Add an entry below using the file name (without extension) as `image.name`.
 *
 * Example (do not uncomment unless it is a real project):
 * {
 *   id: 'example-residence',
 *   title: 'Four-Bedroom Residence',
 *   location: 'Nakuru',
 *   category: 'Residential',
 *   description: 'Construction and finishing of a two-storey family home.',
 *   status: 'Completed',
 *   image: { name: 'project-example-residence', alt: 'Front elevation of the completed residence' },
 * },
 */

export type Project = {
  id: string
  title: string
  location: string
  category: string
  description: string
  status?: 'Completed' | 'Ongoing'
  image: { name: string; alt: string }
}

export const projects: Project[] = []
