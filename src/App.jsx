import { useEffect, useState } from 'react'
import headshot from './assets/vivek-headshot.webp'
import {
  profile,
  education,
  certifications,
  courses,
  articles,
  volunteer,
  languages,
  recommendations,
} from './data'
import './App.css'

const nav = [
  { href: '#about', label: 'About' },
  { href: '#courses', label: 'Courses' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#articles', label: 'Articles' },
  { href: '#contact', label: 'Contact' },
]

const stats = [
  { value: '15+', label: 'Years in product & Agile' },
  { value: '15K+', label: 'LinkedIn followers' },
  { value: String(courses.length), label: 'Udemy courses' },
  { value: String(certifications.length), label: 'Certifications' },
]

const year = new Date().getFullYear()

function readTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = readTheme()
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage unavailable; theme just won't persist
    }
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}

function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="currentColor" d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
        </svg>
      )}
    </button>
  )
}

function App() {
  const [theme, toggleTheme] = useTheme()
  useReveal()

  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <a href="#top" className="brand">
            <img className="brand-mark" src={headshot} alt="" aria-hidden="true" />
            {profile.name}
          </a>
          <nav className="site-nav" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="pill">
                <span className="pill-dot" aria-hidden="true" />
                Founder, {profile.company} · {profile.location}
              </p>
              <h1>
                Hi, I'm {profile.name.split(' ')[0]}.
                <span className="hero-sub">{profile.headline}</span>
              </h1>
              <p className="summary">{profile.summary}</p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  View LinkedIn <span aria-hidden="true">→</span>
                </a>
                <a className="btn btn-ghost" href="#courses">
                  Explore courses
                </a>
              </div>
            </div>
            <div className="hero-avatar">
              <img src={headshot} alt={profile.name} />
            </div>
          </div>

          <div className="container">
            <dl className="stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="section container reveal">
          <SectionHeading eyebrow="01 — About" title="Background" />
          <div className="about-grid">
            <div className="card">
              <p className="card-label">Education</p>
              <p className="card-value">{education.school}</p>
            </div>
            <div className="card">
              <p className="card-label">Languages</p>
              <p className="card-value">{languages.join(' · ')}</p>
            </div>
            <div className="card">
              <p className="card-label">Company</p>
              <p className="card-value">Founder, {profile.company}</p>
            </div>
          </div>
        </section>

        <section id="courses" className="section container reveal">
          <SectionHeading eyebrow="02 — Teaching" title="Courses" />
          <div className="grid">
            {courses.map((course, i) => (
              <article key={course.title} className={`card card-hover${i === 0 ? ' card-featured' : ''}`}>
                <p className="tag">{i === 0 ? `New · ${course.platform}` : course.platform}</p>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section container reveal">
          <SectionHeading eyebrow="03 — Credentials" title="Certifications & Licenses" />
          <ol className="timeline">
            {certifications.map((cert) => (
              <li key={cert.name} className="timeline-item">
                <p className="timeline-date">{cert.date}</p>
                <div>
                  <p className="list-title">{cert.name}</p>
                  <p className="list-sub">{cert.org}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="articles" className="section container reveal">
          <SectionHeading eyebrow="04 — Writing" title="Articles" />
          <div className="grid">
            {articles.map((article) => (
              <article key={article.title} className="card card-hover">
                <p className="tag tag-quiet">{article.date}</p>
                <h3>{article.title}</h3>
                <p>{article.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container reveal">
          <SectionHeading eyebrow="05 — Community" title="Volunteer & Teaching" />
          <div className="grid">
            {volunteer.map((item) => (
              <article key={item.role} className="card">
                <h3>{item.role}</h3>
                <p className="tag tag-quiet">{item.org}</p>
                {item.description && <p>{item.description}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="section container reveal">
          <SectionHeading eyebrow="06 — Testimonials" title="What people say" />
          <div className="grid">
            {recommendations.map((rec) => (
              <figure key={rec.author} className="card quote">
                <span className="quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>{rec.quote}</blockquote>
                <figcaption>
                  <span className="quote-avatar" aria-hidden="true">
                    {rec.author[0]}
                  </span>
                  {rec.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="section container reveal">
          <div className="contact-card">
            <h2>Let's connect</h2>
            <p>
              Working on Agile, product, or putting AI to work on your team? Join{' '}
              {profile.followers.replace(' followers on LinkedIn', '')} others following along on LinkedIn.
            </p>
            <a className="btn btn-light" href={profile.linkedin} target="_blank" rel="noreferrer">
              Message on LinkedIn <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © {year} {profile.name} · {profile.company}
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
