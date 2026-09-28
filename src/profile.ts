// ============================================================
//  PROFILE — satu-satunya sumber data website portfolio (Bahasa Indonesia).
//  Semua teks, data pribadi, proyek, dan pengalaman ada di sini.
//  Ubah nilai di bawah, halaman akan otomatis ikut berubah.
//  Terjemahan bahasa Inggris ada di profile.en.ts.
// ============================================================

export type Section = {
  id: string // dipakai di URL, misalnya /#tentang
  nav: string // label di menu navigasi
  title: string // judul section
}

export type Project = {
  title: string
  role: string
  description: string
  highlights?: string[]
  tags: string[]
  demo?: string
  repo?: string
}

export type Experience = {
  period: string
  role: string
  company: string
  description: string
}

export type ProfileConfig = {
  seo: { title: string; description: string; lang: string }
  personal: {
    name: string
    nickname: string
    initials: string
    role: string
    location: string
    tagline: string
    available: boolean
    availableText: string
  }
  sections: {
    about: Section
    skills: Section
    projects: Section
    experience: Section
    contact: Section
  }
  hero: { greeting: string; ctaProjects: string; ctaContact: string; ctaCv: string }
  about: { paragraphs: string[]; focusTitle: string; focus: string[] }
  skills: { group: string; items: string[] }[]
  projects: { items: Project[]; demoLabel: string; repoLabel: string }
  experience: Experience[]
  contact: {
    text: string
    email: string
    cvUrl: string // taruh file di public/, misalnya public/cv.pdf → '/cv.pdf'. Kosongkan jika tidak ada.
    socials: { label: string; url: string }[]
  }
  footer: { builtWith: string; backToTop: string; skipLink: string }
  // Teks untuk pembaca layar (tidak terlihat langsung di halaman)
  ui: {
    navLabel: string
    openMenu: string
    themeToLight: string
    themeToDark: string
    switchLanguage: string
    photoAlt: string
  }
}

export const PROFILE: Readonly<ProfileConfig> = Object.freeze({
  // ---------- SEO (judul tab & deskripsi di mesin pencari) ----------
  seo: {
    title: 'Habib — Business Development & AI Solutions',
    description:
      'Mhd Abdul Habib Ali — Business Development Associate di Cekat.AI. Fokus pada AI Solutions, Business Development & Technology.',
    lang: 'id',
  },

  // ---------- Data pribadi ----------
  personal: {
    name: 'Mhd Abdul Habib Ali',
    nickname: 'Habib',
    initials: 'HA',
    role: 'Business Development Associate · Cekat.AI',
    location: 'Medang, Kec. Pagedangan, Kabupaten Tangerang, Banten',
    tagline:
      'Helping businesses adopt AI and digital solutions to improve customer engagement and business processes.',
    available: false,
    availableText: 'Terbuka untuk peluang baru',
  },

  // ---------- Section & menu navigasi (urutan = urutan di halaman) ----------
  sections: {
    about: { id: 'tentang', nav: 'Tentang', title: 'Tentang Saya' },
    skills: { id: 'keahlian', nav: 'Keahlian', title: 'Keahlian' },
    projects: { id: 'project', nav: 'Project', title: 'Project' },
    experience: { id: 'pengalaman', nav: 'Pengalaman', title: 'Pengalaman' },
    contact: { id: 'kontak', nav: 'Kontak', title: 'Mari bekerja sama' },
  },

  // ---------- Beranda ----------
  hero: {
    greeting: 'Halo, saya',
    ctaProjects: 'Lihat Proyek',
    ctaContact: 'Hubungi Saya',
    ctaCv: 'Unduh CV',
  },

  // ---------- Tentang Saya ----------
  about: {
    paragraphs: [
      'Saya adalah Business Development Associate dengan fokus pada solusi berbasis AI dan teknologi digital. Saat ini saya membantu bisnis memahami dan mengimplementasikan solusi seperti AI Agent, omnichannel, WhatsApp API, CRM, dan automation untuk meningkatkan efisiensi operasional serta customer experience.',
      'Dengan latar belakang Manajemen dari Universitas Andalas, saya memiliki ketertarikan pada perpaduan antara bisnis dan teknologi. Selain business development, saya juga terus mengembangkan kemampuan teknis dalam Python, Django, dan automation untuk memahami bagaimana solusi teknologi dapat dibangun dan diterapkan secara langsung.',
    ],
    focusTitle: 'Fokus utama',
    focus: [
      'Business Development',
      'AI & Automation Solutions',
      'AI Agent & Omnichannel',
      'Customer Experience',
      'CRM & WhatsApp Solutions',
      'Python & Django Development',
    ],
  },

  // ---------- Keahlian ----------
  skills: [
    {
      group: 'Business Development',
      items: [
        'B2B Sales',
        'Business Development',
        'Lead Generation',
        'Client Prospecting',
        'Client Discovery',
        'Solution Selling',
        'Product Presentation & Demo',
        'Account Management',
        'Customer Relationship Management',
      ],
    },
    {
      group: 'AI & Technology',
      items: [
        'AI Agent',
        'AI Omnichannel',
        'AI Customer Service',
        'WhatsApp API',
        'CRM',
        'Business Automation',
        'Workflow Automation',
        'n8n',
        'API & JSON',
        'Meta Business Platform',
      ],
    },
    {
      group: 'Programming',
      items: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'SQLite', 'Git & GitHub'],
    },
    {
      group: 'Tools',
      items: [
        'VS Code',
        'GitHub',
        'PythonAnywhere',
        'n8n',
        'Fathom',
        'Google Workspace',
        'Google Meet',
        'Meta Business Suite / Business Manager',
        'WhatsApp Business',
      ],
    },
  ],

  // ---------- Proyek (proyek pertama tampil lebar sebagai sorotan) ----------
  projects: {
    demoLabel: 'Demo',
    repoLabel: 'Kode',
    items: [
      {
        title: 'Cekat.AI — AI Omnichannel & AI Agent',
        role: 'Business Development / AI Solutions',
        description:
          'Solusi berbasis AI untuk membantu bisnis menangani customer melalui berbagai channel seperti WhatsApp, Instagram, dan Messenger.',
        highlights: [
          'Memahami kebutuhan dan pain point bisnis',
          'Melakukan discovery dengan calon client',
          'Menjelaskan solusi AI Agent dan omnichannel',
          'Menyiapkan dan melakukan product demo',
          'Membantu menentukan use case AI sesuai kebutuhan bisnis',
          'Membahas integrasi CRM, database customer, WhatsApp API, dan automation',
        ],
        tags: ['AI Agent', 'WhatsApp API', 'Instagram', 'Messenger', 'CRM', 'n8n', 'API'],
      },
      {
        title: 'AI WhatsApp Customer Service',
        role: 'AI / Automation',
        description:
          'Eksplorasi solusi AI Agent untuk customer service melalui WhatsApp, termasuk penyimpanan context percakapan dan mekanisme perpindahan percakapan dari AI ke human agent.',
        tags: ['WhatsApp API', 'AI Agent', 'n8n', 'JSON', 'CRM'],
      },
      {
        title: 'Telegram → Google Sheets Bookkeeping Automation',
        role: 'Automation Developer',
        description:
          'Workflow automation untuk mencatat transaksi melalui Telegram dan menyimpannya ke Google Sheets secara otomatis.',
        tags: ['n8n', 'Telegram', 'Google Sheets', 'API'],
      },
      {
        title: 'Personal Portfolio Website',
        role: 'Developer',
        description:
          'Website portfolio pribadi yang dibuat untuk menampilkan profil, pengalaman, pendidikan, keahlian, dan project.',
        tags: ['React', 'TypeScript', 'Vercel'],
        // repo: 'https://github.com/username/portfolio',
      },
    ],
  },

  // ---------- Pengalaman & Pendidikan ----------
  experience: [
    {
      period: 'Agu 2025 — Sekarang',
      role: 'Business Development Associate',
      company: 'Cekat.AI',
      description:
        'Berfokus pada business development dan penerapan solusi AI untuk kebutuhan bisnis. Membantu calon client memahami solusi AI Agent, omnichannel, WhatsApp API, CRM, dan automation melalui prospecting, discovery, presentation, serta product demo.',
    },
    {
      period: 'Apr 2025 — Jun 2025',
      role: 'Crew Store',
      company: 'AA Plus Mart',
      description:
        'Menangani operasional toko, termasuk kasir, pengecekan dan input stok, pemesanan barang, pengecekan expiry, penataan produk, pencatatan keuangan harian, dan cash count.',
    },
    {
      period: 'Jan 2019 — Jan 2020',
      role: 'Dropshipper',
      company: 'Dehai Store',
      description:
        'Menjalankan bisnis dropshipping melalui marketplace dengan fokus pada produk pakaian untuk kebutuhan fishing dan hunting. Bertanggung jawab dalam riset produk, mengikuti tren pasar, mengelola produk, dan menangani customer.',
    },
    {
      period: 'Pendidikan', // ganti dengan tahun kuliah, misalnya '2020 — 2024'
      role: 'S1 Manajemen',
      company: 'Universitas Andalas',
      description:
        'Mempelajari manajemen bisnis dengan pengalaman tambahan dalam kegiatan organisasi dan kepanitiaan kampus, termasuk aktivitas yang berkaitan dengan komunikasi, sponsorship, UMKM, dan event management.',
    },
  ],

  // ---------- Kontak ----------
  contact: {
    text: 'Punya proyek, tawaran kerja, atau sekadar ingin menyapa? Kotak masuk saya selalu terbuka. Saya akan membalas secepatnya.',
    email: 'habib@cekat.ai',
    cvUrl: '',
    socials: [
      // { label: 'GitHub', url: 'https://github.com/username' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mhd-abdul-habib-ali-94a7a2326/' },
      { label: 'Instagram', url: 'https://www.instagram.com/habib_ali_02/' },
    ],
  },

  // ---------- Footer & lain-lain ----------
  footer: {
    builtWith: 'Dibuat dengan React.',
    backToTop: 'Kembali ke atas ↑',
    skipLink: 'Lewati ke konten',
  },

  // ---------- Teks aksesibilitas ----------
  ui: {
    navLabel: 'Navigasi utama',
    openMenu: 'Buka menu',
    themeToLight: 'Ganti ke mode terang',
    themeToDark: 'Ganti ke mode gelap',
    switchLanguage: 'Switch to English',
    photoAlt: 'Foto', // diikuti nama, misalnya "Foto Mhd Abdul Habib Ali"
  },
})
