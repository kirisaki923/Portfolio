import { createContext, useContext, useEffect, useState } from 'react'
import avatar from './assets/profile.jpg'
import { PROFILE, type ProfileConfig, type Section } from './profile'
import { PROFILE_EN } from './profile.en'
import './App.css'

// Daftar bahasa yang tersedia. Bahasa pertama menjadi default.
const LANGUAGES = { en: PROFILE_EN, id: PROFILE } as const
type Lang = keyof typeof LANGUAGES

const ProfileContext = createContext<ProfileConfig>(PROFILE)
const useProfile = () => useContext(ProfileContext)

// Menu navigasi mengikuti urutan PROFILE.sections.
const navLinks = (p: ProfileConfig): Section[] => Object.values(p.sections)

function readStorage(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    // localStorage bisa tidak tersedia (mode private dsb.)
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // abaikan
  }
}

function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = readStorage('lang')
    return saved && Object.hasOwn(LANGUAGES, saved) ? (saved as Lang) : 'en'
  })
  const profile = LANGUAGES[lang]

  useEffect(() => {
    writeStorage('lang', lang)
    document.documentElement.lang = profile.seo.lang
    document.title = profile.seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.seo.description)
  }, [lang, profile])

  const toggle = () => setLang((l) => (l === 'en' ? 'id' : 'en'))
  return { lang, profile, toggle }
}

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = readStorage('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage('theme', theme)
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))] as const
}

// Menandai section yang sedang terlihat agar link navigasinya aktif.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  const key = ids.join()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    key.split(',').forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [key])

  return active
}

// Animasi muncul saat elemen .reveal masuk layar. Dijalankan ulang saat bahasa berganti.
function useReveal(lang: Lang) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [lang])
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function Header({ lang, onToggleLang }: { lang: Lang; onToggleLang: () => void }) {
  const p = useProfile()
  const links = navLinks(p)
  const [theme, toggleTheme] = useTheme()
  const active = useActiveSection(links.map((l) => l.id))
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#beranda" className="logo" onClick={() => setMenuOpen(false)}>
          {p.personal.initials}
          <span className="logo-dot">.</span>
        </a>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label={p.ui.navLabel}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.nav}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-btn lang-btn" onClick={onToggleLang} aria-label={p.ui.switchLanguage}>
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? p.ui.themeToLight : p.ui.themeToDark}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className={`icon-btn menu-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={p.ui.openMenu}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const { personal, hero, contact, sections, ui } = useProfile()

  return (
    <section id="beranda" className="hero container">
      <div className="hero-text">
        {personal.available && (
          <p className="status">
            <span className="status-dot" /> {personal.availableText}
          </p>
        )}
        <h1>
          {hero.greeting} <span className="accent">{personal.nickname}</span>
        </h1>
        <p className="hero-role">
          {personal.role}
          <br />
          {personal.location}
        </p>
        <p className="hero-tagline">{personal.tagline}</p>
        <div className="hero-cta">
          <a href={`#${sections.projects.id}`} className="btn btn-primary">
            {hero.ctaProjects}
          </a>
          <a href={`#${sections.contact.id}`} className="btn btn-ghost">
            {hero.ctaContact}
          </a>
          {contact.cvUrl && (
            <a href={contact.cvUrl} className="btn btn-ghost" download>
              {hero.ctaCv}
            </a>
          )}
        </div>
      </div>
      <div className="hero-avatar">
        <div className="avatar-ring">
          <img src={avatar} className="avatar" alt={`${ui.photoAlt} ${personal.name}`} width="280" height="280" />
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ section }: { section: Section }) {
  return (
    <div className="section-title reveal">
      <h2>{section.title}</h2>
    </div>
  )
}

// Catatan: daftar yang isinya diterjemahkan memakai index sebagai key,
// supaya elemen tidak dibuat ulang (dan animasinya tidak hilang) saat ganti bahasa.

function About() {
  const { about, sections } = useProfile()

  return (
    <section id={sections.about.id} className="section container">
      <SectionTitle section={sections.about} />
      <div className="about-grid">
        <div className="about-text reveal">
          {about.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
        <div className="focus reveal">
          <h3>{about.focusTitle}</h3>
          <ul>
            {about.focus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { skills, sections } = useProfile()

  return (
    <section id={sections.skills.id} className="section container">
      <SectionTitle section={sections.skills} />
      <div className="skills-grid">
        {skills.map((group, i) => (
          <div key={i} className="card reveal">
            <h3>{group.group}</h3>
            <ul className="chips">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const { projects, sections } = useProfile()

  return (
    <section id={sections.projects.id} className="section container">
      <SectionTitle section={sections.projects} />
      <div className="projects-grid">
        {projects.items.map((project, i) => (
          <article key={i} className="card project reveal">
            <h3>{project.title}</h3>
            <p className="project-role">{project.role}</p>
            <p>{project.description}</p>
            {project.highlights && (
              <ul className="highlights">
                {project.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            )}
            <ul className="tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {(project.demo || project.repo) && (
              <div className="project-links">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    {projects.demoLabel} <ArrowIcon />
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    {projects.repoLabel} <ArrowIcon />
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const { experience, sections } = useProfile()

  return (
    <section id={sections.experience.id} className="section container">
      <SectionTitle section={sections.experience} />
      <ol className="timeline">
        {experience.map((item, i) => (
          <li key={i} className="timeline-item reveal">
            <span className="timeline-period">{item.period}</span>
            <div>
              <h3>{item.role}</h3>
              <p className="timeline-company">{item.company}</p>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Contact() {
  const { contact, sections } = useProfile()

  return (
    <section id={sections.contact.id} className="section container">
      <div className="contact card reveal">
        <h2>{sections.contact.title}</h2>
        <p>{contact.text}</p>
        <a href={`mailto:${contact.email}`} className="btn btn-primary btn-lg">
          {contact.email}
        </a>
        <ul className="socials">
          {contact.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label} <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function App() {
  const { lang, profile, toggle } = useLanguage()
  const { footer, personal } = profile
  useReveal(lang)

  return (
    <ProfileContext.Provider value={profile}>
      <a href={`#${navLinks(profile)[0].id}`} className="skip-link">
        {footer.skipLink}
      </a>
      <Header lang={lang} onToggleLang={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="footer container">
        <p>
          © {new Date().getFullYear()} {personal.name}. {footer.builtWith}
        </p>
        <a href="#beranda">{footer.backToTop}</a>
      </footer>
    </ProfileContext.Provider>
  )
}

export default App
