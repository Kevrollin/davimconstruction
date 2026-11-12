/**
 * The original DAVIM logo (sourced from Davim's public KEOnline business profile),
 * with its white JPEG background removed by scripts/build-brand-assets.mjs.
 * Source file: public/assets/davim-logo-source.jpg — replace with a high-resolution
 * PNG/SVG from Davim when available (see OWNER_CONTENT_CHECKLIST.md).
 */
export function Logo({ className = '', alt = 'Davim' }: { className?: string; alt?: string }) {
  return <img src="/assets/davim-logo.png" alt={alt} width={67} height={80} className={className} decoding="async" />
}
