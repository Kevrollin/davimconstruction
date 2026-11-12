import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, CircleAlert, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { enabledServices } from '../data/services'
import { business, contact, links } from '../data/siteContent'
import {
  DESCRIPTION_MAX,
  emptyEnquiry,
  enquiryWhatsAppUrl,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from '../lib/enquiry'
import { revealDelay } from '../lib/reveal'

type Props = {
  /** Set when a visitor clicks a service card; `n` changes on every click. */
  preset: { label: string; n: number } | null
}

const projectTypes = [...enabledServices.map((s) => s.enquiryLabel), contact.form.otherProjectType]

export function Contact({ preset }: Props) {
  return (
    <section id="contact" data-nav="contact" aria-labelledby="contact-heading" className="section-pad bg-stone">
      <div className="container-site grid gap-y-14 lg:grid-cols-12 lg:gap-x-12">
        <div data-reveal className="lg:col-span-5">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 id="contact-heading" className="text-h2 mt-6">
            {contact.heading}
          </h2>
          <p className="text-lead mt-6 max-w-[30rem] text-ink-soft">{contact.text}</p>

          <ul className="mt-12 border-t border-line-strong">
            <ContactRow href={links.tel} icon={<Phone className="size-5" strokeWidth={1.6} />} label="Call Davim" value={business.phoneInternational} />
            <ContactRow
              href={links.whatsapp}
              external
              icon={<MessageCircle className="size-5" strokeWidth={1.6} />}
              label="WhatsApp Davim"
              value={business.phoneInternational}
            />
            <ContactRow
              href={business.mapsSearchUrl}
              external
              icon={<MapPin className="size-5" strokeWidth={1.6} />}
              label="Find Us on Google Maps"
              value={business.address.oneLine}
            />
          </ul>
        </div>

        <div data-reveal style={revealDelay(120)} className="lg:col-span-7">
          <EnquiryForm preset={preset} />
        </div>
      </div>
    </section>
  )
}

function ContactRow({ href, icon, label, value, external }: { href: string; icon: ReactNode; label: string; value: string; external?: boolean }) {
  return (
    <li className="border-b border-line-strong">
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex items-center gap-5 py-5 sm:py-6"
      >
        <span className="flex size-12 shrink-0 items-center justify-center bg-cream text-brick transition-colors duration-300 group-hover:bg-brick group-hover:text-white">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1.05rem] font-semibold text-ink">{label}</span>
          <span className="block text-sm text-muted-strong">{value}</span>
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-ink-soft transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brick"
          strokeWidth={1.6}
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  )
}

type Handoff = { url: string; opened: boolean }

function EnquiryForm({ preset }: Props) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [handoff, setHandoff] = useState<Handoff | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const fid = (k: keyof EnquiryValues) => `${uid}-${k}`

  // The form is prerendered, so on slow connections a visitor can start typing before
  // React hydrates. Pick up anything already entered so it is not silently ignored.
  useEffect(() => {
    const form = formRef.current
    if (!form) return
    const data = new FormData(form)
    const typed = Object.fromEntries(
      (Object.keys(emptyEnquiry) as (keyof EnquiryValues)[]).map((k) => [k, String(data.get(k) ?? '')]),
    ) as EnquiryValues
    if (Object.values(typed).some(Boolean)) setValues((v) => ({ ...v, ...typed }))
  }, [])

  // A service card was clicked: pre-select its project type.
  useEffect(() => {
    if (preset && projectTypes.includes(preset.label)) {
      setValues((v) => ({ ...v, projectType: preset.label }))
      setErrors((e) => ({ ...e, projectType: undefined }))
    }
  }, [preset])

  const update = (k: keyof EnquiryValues) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    setHandoff(null)
    // After the first submit attempt, re-validate as the visitor corrects fields.
    if (submitted) setErrors(validateEnquiry(next))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateEnquiry(values)
    setErrors(found)
    const firstInvalid = (Object.keys(emptyEnquiry) as (keyof EnquiryValues)[]).find((k) => found[k])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fid(firstInvalid))}`)?.focus()
      setHandoff(null)
      return
    }
    const url = enquiryWhatsAppUrl(values)
    // Open WhatsApp in a new tab/app (allowed: this runs directly from the submit gesture).
    const win = window.open(url, '_blank')
    if (win) win.opener = null
    setHandoff({ url, opened: Boolean(win) })
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const describedBy = (k: keyof EnquiryValues, extra?: string) =>
    [errors[k] ? `${fid(k)}-error` : null, extra].filter(Boolean).join(' ') || undefined

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-line bg-white p-6 sm:p-10 lg:p-12" aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`} className="text-h3">
        {contact.form.heading}
      </h3>
      <p className="mt-2 text-[0.95rem] text-ink-soft">{contact.form.intro}</p>

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field id={fid('name')} label="Full name" error={errors.name}>
          <input
            id={fid('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            aria-required
            className={inputClass(errors.name)}
          />
        </Field>

        <Field id={fid('phone')} label="Phone number" error={errors.phone}>
          <input
            id={fid('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07XX XXX XXX"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            aria-required
            className={inputClass(errors.phone)}
          />
        </Field>

        <Field id={fid('projectType')} label="Project type" error={errors.projectType}>
          <div className="relative">
            <select
              id={fid('projectType')}
              name="projectType"
              value={values.projectType}
              onChange={update('projectType')}
              aria-invalid={Boolean(errors.projectType)}
              aria-describedby={describedBy('projectType')}
              aria-required
              className={`${inputClass(errors.projectType)} appearance-none pr-10 ${values.projectType ? '' : 'text-muted-strong'}`}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t} className="text-ink">
                  {t}
                </option>
              ))}
            </select>
            <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-soft">
              <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>

        <Field id={fid('location')} label="Project location" error={errors.location}>
          <input
            id={fid('location')}
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder={contact.form.locationPlaceholder}
            value={values.location}
            onChange={update('location')}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={describedBy('location')}
            aria-required
            className={inputClass(errors.location)}
          />
        </Field>

        <Field id={fid('description')} label="Brief project description" optional error={errors.description} className="sm:col-span-2">
          <textarea
            id={fid('description')}
            name="description"
            rows={5}
            maxLength={DESCRIPTION_MAX}
            placeholder={contact.form.descriptionPlaceholder}
            value={values.description}
            onChange={update('description')}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={describedBy('description', `${fid('description')}-count`)}
            className={`${inputClass(errors.description)} resize-y leading-relaxed`}
          />
          <p id={`${fid('description')}-count`} className="mt-1.5 text-right text-xs text-muted-strong tabular-nums">
            {values.description.length}/{DESCRIPTION_MAX}
          </p>
        </Field>
      </div>

      {handoff && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="mt-8 border-l-2 border-brick bg-cream px-5 py-4 text-[0.95rem] text-ink outline-none"
        >
          {handoff.opened ? (
            <p>
              <strong className="font-semibold">WhatsApp is opening with your enquiry.</strong> It has not been sent yet. Please press
              <strong className="font-semibold"> Send</strong> in WhatsApp to deliver it to Davim.
            </p>
          ) : (
            <p>
              <strong className="font-semibold">Your enquiry is ready.</strong> Your browser did not open WhatsApp automatically. Tap the
              link below, then press <strong className="font-semibold">Send</strong> in WhatsApp to deliver it to Davim.
            </p>
          )}
          <a href={handoff.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brick hover:text-brick-deep">
            {handoff.opened ? 'Open WhatsApp again' : 'Open WhatsApp'}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          <Send className="size-4" strokeWidth={1.8} />
          {contact.form.submitLabel}
        </button>
        <p className="text-xs leading-relaxed text-muted-strong sm:max-w-[17rem] sm:text-right">{contact.form.privacyNote}</p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  optional,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
        <span>
          {label}
          {!optional && (
            <span aria-hidden className="text-brick">
              {' '}
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-normal text-muted-strong">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-brick">
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (error?: string) =>
  `block w-full rounded-[2px] border bg-cream/40 px-4 py-3.5 text-base text-ink placeholder:text-muted transition-[border-color,box-shadow,background-color] duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
    error ? 'border-brick focus:border-brick focus:ring-brick/20' : 'border-line-strong hover:border-ink/40 focus:border-ink focus:ring-ink/10'
  }`
