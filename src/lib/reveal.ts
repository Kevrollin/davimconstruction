import type { CSSProperties } from 'react'

/** Inline style that staggers a `data-reveal` element's entrance. */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
