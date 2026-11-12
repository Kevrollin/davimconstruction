import { business, links } from '../data/siteContent'

export type EnquiryValues = {
  name: string
  phone: string
  projectType: string
  location: string
  description: string
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

export const emptyEnquiry: EnquiryValues = { name: '', phone: '', projectType: '', location: '', description: '' }

export const DESCRIPTION_MAX = 800

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your full name.'

  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone.trim()) errors.phone = 'Please enter a phone number we can reach you on.'
  else if (!/^[+\d][\d\s()-]*$/.test(v.phone.trim()) || digits.length < 9 || digits.length > 15)
    errors.phone = 'Please enter a valid phone number, e.g. 0712 345678.'

  if (!v.projectType) errors.projectType = 'Please choose a project type.'
  if (v.location.trim().length < 2) errors.location = 'Please tell us where the project is.'
  if (v.description.length > DESCRIPTION_MAX)
    errors.description = `Please keep the description under ${DESCRIPTION_MAX} characters.`
  return errors
}

/** Builds the professional WhatsApp message that the visitor sends to Davim. */
export function buildEnquiryMessage(v: EnquiryValues): string {
  const lines = [
    `Hello ${business.name},`,
    '',
    'I would like to discuss a construction project.',
    '',
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Project type: ${v.projectType}`,
    `Project location: ${v.location.trim()}`,
  ]
  const description = v.description.trim()
  if (description) lines.push('', 'Project details:', description)
  lines.push('', '(Enquiry prepared on the Davim website)')
  return lines.join('\n')
}

export function enquiryWhatsAppUrl(v: EnquiryValues): string {
  return links.whatsappWithText(buildEnquiryMessage(v))
}
