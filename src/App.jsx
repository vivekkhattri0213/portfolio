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

function App() {
  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <a href="#top" className="brand">
            {profile.name}
          </a>
          <nav className="site-nav">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <p className="eyebrow">{profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="headline">{profile.headline}</p>
          <p className="summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
              View LinkedIn
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </section>

        <section id="about" className="section container">
          <h2>About</h2>
          <div className="about-grid">
            <div className="card">
              <h3>Education</h3>
              <p>{education.school}</p>
            </div>
            <div className="card">
              <h3>Languages</h3>
              <p>{languages.join(' · ')}</p>
            </div>
            <div className="card">
              <h3>Company</h3>
              <p>Founder, {profile.company}</p>
            </div>
          </div>
        </section>

        <section id="courses" className="section container">
          <h2>Courses</h2>
          <div className="grid">
            {courses.map((course) => (
              <article key={course.title} className="card">
                <p className="tag">{course.platform}</p>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section container">
          <h2>Certifications & Licenses</h2>
          <ul className="list">
            {certifications.map((cert) => (
              <li key={cert.name} className="list-row">
                <div>
                  <p className="list-title">{cert.name}</p>
                  <p className="list-sub">{cert.org}</p>
                </div>
                <p className="list-date">{cert.date}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="articles" className="section container">
          <h2>Articles</h2>
          <div className="grid">
            {articles.map((article) => (
              <article key={article.title} className="card">
                <p className="tag">{article.date}</p>
                <h3>{article.title}</h3>
                <p>{article.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <h2>Volunteer & Teaching</h2>
          <div className="grid">
            {volunteer.map((item) => (
              <article key={item.role} className="card">
                <h3>{item.role}</h3>
                <p className="tag">{item.org}</p>
                {item.description && <p>{item.description}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <h2>What people say</h2>
          <div className="grid">
            {recommendations.map((rec) => (
              <figure key={rec.author} className="card quote">
                <blockquote>&ldquo;{rec.quote}&rdquo;</blockquote>
                <figcaption>— {rec.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="section container contact">
          <h2>Let's connect</h2>
          <p>{profile.followers}</p>
          <a className="btn btn-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
            Message on LinkedIn
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
