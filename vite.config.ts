import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { PROFILE } from './src/profile.ts'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Mengisi %SEO_TITLE%, %SEO_DESCRIPTION%, %SEO_LANG% di index.html dari PROFILE.seo.
function profileSeo(): Plugin {
  return {
    name: 'profile-seo',
    transformIndexHtml: (html) =>
      html
        .replaceAll('%SEO_TITLE%', escapeHtml(PROFILE.seo.title))
        .replaceAll('%SEO_DESCRIPTION%', escapeHtml(PROFILE.seo.description))
        .replaceAll('%SEO_LANG%', escapeHtml(PROFILE.seo.lang)),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), profileSeo()],
})
