// Build-time entry used by scripts/prerender.mjs to render the page to static HTML.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { business, seo } from './data/siteContent'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
