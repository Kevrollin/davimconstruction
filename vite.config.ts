import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Hashed JS/CSS bundles go to /_app so they can be cached immutably,
    // separately from the replaceable photos in /assets (see vercel.json).
    assetsDir: '_app',
  },
})
