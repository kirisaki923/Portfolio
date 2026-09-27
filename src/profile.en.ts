// ============================================================
//  PROFILE_EN — terjemahan bahasa Inggris dari profile.ts.
//  Strukturnya wajib sama dengan PROFILE (TypeScript akan error
//  jika ada bagian yang terlewat).
//
//  Data yang tidak perlu diterjemahkan (nama, email, link, tag
//  teknologi, dll.) diambil langsung dari profile.ts lewat `...ID`,
//  jadi cukup diubah di satu tempat saja.
// ============================================================

import { PROFILE as ID, type ProfileConfig } from './profile'

const [cekat, waCs, telegram, portfolio] = ID.projects.items
const [expCekat, expMart, expDropship, expUni] = ID.experience

export const PROFILE_EN: Readonly<ProfileConfig> = Object.freeze({
  // ---------- SEO ----------
  seo: {
    title: 'Habib — Business Development & AI Solutions',
    description:
      'Mhd Abdul Habib Ali — Business Development Associate at Cekat.AI, focused on AI Solutions, Business Development & Technology.',
    lang: 'en',
  },

  // ---------- Personal ----------
  personal: {
    ...ID.personal,
    location: 'Medang, Pagedangan, Tangerang Regency, Banten',
    availableText: 'Open to new opportunities',
  },

  // ---------- Sections & navigation (id tetap sama agar link tidak rusak) ----------
  sections: {
    about: { ...ID.sections.about, nav: 'About', title: 'About Me' },
    skills: { ...ID.sections.skills, nav: 'Skills', title: 'Skills' },
    projects: { ...ID.sections.projects, nav: 'Projects', title: 'Featured Projects' },
    experience: { ...ID.sections.experience, nav: 'Experience', title: 'Experience' },
    contact: { ...ID.sections.contact, nav: 'Contact', title: "Let's work together" },
  },

  // ---------- Hero ----------
  hero: {
    greeting: "Hi, I'm",
    ctaProjects: 'View Projects',
    ctaContact: 'Contact Me',
    ctaCv: 'Download CV',
  },

  // ---------- About ----------
  about: {
    paragraphs: [
      "I'm a Business Development Associate focused on AI-powered solutions and digital technology. I help businesses understand and implement solutions such as AI Agents, omnichannel, WhatsApp API, CRM, and automation to improve operational efficiency and customer experience.",
      "With a background in Management from Universitas Andalas, I'm drawn to where business meets technology. Alongside business development, I keep building my technical skills in Python, Django, and automation to understand how technology solutions are built and put into practice.",
    ],
    focusTitle: 'Main focus',
    focus: ID.about.focus,
  },

  // ---------- Skills (istilahnya sudah bahasa Inggris) ----------
  skills: ID.skills,

  // ---------- Projects ----------
  projects: {
    demoLabel: 'Demo',
    repoLabel: 'Code',
    items: [
      {
        ...cekat,
        description:
          'An AI-powered solution that helps businesses handle customers across multiple channels such as WhatsApp, Instagram, and Messenger.',
        highlights: [
          'Understanding business needs and pain points',
          'Running discovery sessions with prospective clients',
          'Explaining AI Agent and omnichannel solutions',
          'Preparing and delivering product demos',
          'Helping define AI use cases that fit each business',
          'Discussing CRM, customer database, WhatsApp API, and automation integrations',
        ],
      },
      {
        ...waCs,
        description:
          'An exploration of AI Agent solutions for customer service over WhatsApp, including conversation context storage and handover from AI to a human agent.',
      },
      {
        ...telegram,
        description:
          'An automation workflow that records transactions sent via Telegram and saves them to Google Sheets automatically.',
      },
      {
        ...portfolio,
        description:
          'A personal portfolio website showcasing my profile, experience, education, skills, and projects.',
      },
    ],
  },

  // ---------- Experience & Education ----------
  experience: [
    {
      ...expCekat,
      period: 'Aug 2025 — Present',
      description:
        'Focused on business development and applying AI solutions to business needs. I help prospective clients understand AI Agent, omnichannel, WhatsApp API, CRM, and automation solutions through prospecting, discovery, presentations, and product demos.',
    },
    {
      ...expMart,
      period: 'Apr 2025 — Jun 2025',
      role: 'Store Crew',
      description:
        'Handled store operations, including cashiering, stock checks and data entry, ordering, expiry checks, product display, daily bookkeeping, and cash counts.',
    },
    {
      ...expDropship,
      period: 'Jan 2019 — Jan 2020',
      description:
        'Ran a marketplace dropshipping business focused on fishing and hunting apparel. Responsible for product research, following market trends, managing listings, and handling customers.',
    },
    {
      ...expUni,
      period: 'Education', // ganti dengan tahun kuliah, misalnya '2020 — 2024'
      role: 'Bachelor of Management',
      description:
        'Studied business management, with additional experience in student organizations and campus committees, including work related to communications, sponsorship, MSMEs, and event management.',
    },
  ],

  // ---------- Contact ----------
  contact: {
    ...ID.contact,
    text: "Have a project, a job offer, or just want to say hi? My inbox is always open, and I'll get back to you as soon as I can.",
  },

  // ---------- Footer ----------
  footer: {
    builtWith: 'Built with React.',
    backToTop: 'Back to top ↑',
    skipLink: 'Skip to content',
  },

  // ---------- Accessibility ----------
  ui: {
    navLabel: 'Main navigation',
    openMenu: 'Open menu',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    switchLanguage: 'Ganti ke Bahasa Indonesia',
    photoAlt: 'Photo of',
  },
})
