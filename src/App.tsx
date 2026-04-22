import { useState, useEffect } from 'react'
import './index.css'
import { ParticleCanvas, FadeIn } from './utils'
import {
  Cloud, FileText, ArrowUpRight, GitBranch, BookOpen,
  Sun, Moon, Webhook,
} from 'lucide-react'

// ── Data ───────────────────────────────────────────────────────
const PROJECTS = [
  {
    Icon: Cloud,
    name: 'Tark',
    desc: 'Cloud-agnostic PaaS built with Pulumi to provision isolated Kubernetes clusters across AWS, Azure & OCI. Features automated AI model deployments and usage-based cost tracking.',
    tags: ['Go', 'Kubernetes', 'Pulumi', 'AWS', 'Azure', 'OCI'],
    link: 'https://github.com/Mukul-svg/tark',
  },
  {
    Icon: Webhook,
    name: 'notchd',
    desc: 'Zero-dependency webhook buffer in a single Go binary. Receives webhooks, persists them to embedded SQLite, and delivers to your app with automatic retries, exponential backoff, and a dead-letter queue — no Redis, no Postgres, no queue worker.',
    tags: ['Go', 'SQLite', 'TUI', 'Webhooks', 'Reliability'],
    link: 'https://github.com/Mukul-svg/notchd',
  },
]

const PAPERS = [
  {
    Icon: GitBranch,
    name: 'mapr-go',
    paper: 'MapReduce: Simplified Data Processing on Large Clusters',
    authors: 'Dean & Ghemawat, Google (2004)',
    desc: 'A Go implementation of the MapReduce distributed computing paradigm described in the seminal Google paper. Supports parallel map and reduce phases across worker goroutines, fault-tolerant task coordination via a master process, and intermediate key grouping.',
    tags: ['Go', 'Distributed Systems', 'Concurrency', 'Goroutines'],
    link: 'https://github.com/Mukul-svg/mapr-go',
    paperLink: 'https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf',
  },
]

const SKILLS = [
  { name: 'Go (Golang)', level: 'primary' },
  { name: 'Python', level: 'primary' },
  { name: 'TypeScript', level: 'primary' },
  { name: 'Java', level: '' },
  { name: 'Kubernetes', level: 'primary' },
  { name: 'Docker', level: '' },
  { name: 'Pulumi', level: '' },
  { name: 'vLLM', level: '' },
  { name: 'LangChain', level: '' },
  { name: 'CrewAI', level: '' },
  { name: 'Gemini API', level: '' },
  { name: 'FastAPI', level: '' },
  { name: 'React', level: '' },
  { name: 'PostgreSQL', level: '' },
  { name: 'Redis', level: '' },
  { name: 'Qdrant', level: '' },
  { name: 'GitHub Actions', level: '' },
  { name: 'Jenkins', level: '' },
]

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Papers', href: '#papers' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const RESUME_URL = new URL('./assets/ai_resume.pdf', import.meta.url).href

// ── Nav ────────────────────────────────────────────────────────
function Nav({ theme, toggle }: { theme: string; toggle: () => void }) {
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(l => document.querySelector(l.href))
      const sc = window.scrollY + 120
      let cur = '#home'
      sections.forEach((el, i) => {
        if (el && (el as HTMLElement).offsetTop <= sc) cur = NAV_LINKS[i].href
      })
      setActive(cur)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className="nav-wrapper" aria-label="Main navigation">
      <div className="nav-pill">
        <a href="#home" className="logo-link" style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
          <img src="/icon.jpg" alt="Logo" style={{ height: 32, width: 32, borderRadius: 8, objectFit: 'cover', boxShadow: '0 2px 8px #0004' }} />
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link${active === l.href ? ' active' : ''}`}
              onClick={() => setActive(l.href)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────
function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <section id="home" className="hero">
      <div className="container">
        <p className="hero-label fade-up delay-1">Software Engineer · Bangalore, India</p>
        <h1 className="hero-name fade-up delay-2">
          Mukul<br />Raghav.
        </h1>
        <p className="hero-tagline fade-up delay-3">
          Go/AI engineer building cloud-native infrastructure, intelligent agents,
          and developer tooling.{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--text)' }}>Not overthinking it.</em>
        </p>
        <div className="hero-tags fade-up delay-3">
          {['Go', 'AI Infrastructure', 'Kubernetes', 'Distributed Systems'].map(t => (
            <span key={t} className={`tag${t === 'Go' || t === 'AI Infrastructure' ? ' accent' : ''}`}>{t}</span>
          ))}
        </div>
        <div className="hero-cta fade-up delay-4">
          <a href="#projects" className="btn btn-primary">View Projects →</a>
          <a href="#contact" className="btn btn-outline">Get in Touch</a>
          <button type="button" className="btn btn-outline" onClick={onOpenResume}>Resume</button>
        </div>
      </div>
    </section>
  )
}

function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="resume-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        onClick={event => event.stopPropagation()}
      >
        <div className="resume-modal-head">
          <h3 id="resume-modal-title">Resume</h3>
          <button type="button" className="resume-close" onClick={onClose} aria-label="Close resume preview">
            Close
          </button>
        </div>

        <div className="resume-modal-viewer">
          <iframe src={RESUME_URL} title="AI Resume" className="resume-frame" />
        </div>

        <div className="resume-modal-actions">
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn btn-primary">Open Fullscreen</a>
          <a href={RESUME_URL} download className="btn btn-outline">Download PDF</a>
        </div>
      </div>
    </div>
  )
}

// ── About ──────────────────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="container">
        <hr className="divider" />
        <br /><br />
        <FadeIn>
          <p className="section-label">About</p>
          <h2 className="section-title">Who I am</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm <strong>Mukul Raghav</strong>, a Software Engineer at{' '}
                <strong>Chubb</strong> in Bangalore, focused on AI infrastructure
                and developer productivity. I like building systems that are fast,
                simple, and genuinely useful — not just demos.
              </p>
              <br />
              <p>
                I'm deeply interested in <strong>distributed systems</strong>,
                where correctness matters more than cleverness. On the AI side,
                I build orchestration layers — agent frameworks, LLM pipelines,
                and inference infrastructure using tools like{' '}
                <strong>vLLM, LangChain, and CrewAI</strong>.
              </p>
              <br />
              <p>
                I enjoy the gap between research and production. My projects tend
                to live there — taking an interesting idea and making it actually
                work at scale.
              </p>
            </div>
            <div className="about-meta">
              <div className="meta-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Bangalore, India
              </div>
              <div className="meta-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                Software Engineer · Chubb
              </div>
              <div className="meta-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                Go · Python · TypeScript
              </div>
              <div className="meta-item">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                <a href="https://github.com/Mukul-svg" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>github.com/Mukul-svg</a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Projects ───────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <hr className="divider" />
        <br /><br />
        <FadeIn>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bento">
            {PROJECTS.map(p => (
              <div key={p.name} className="bento-card">
                <div className="card-header">
                  <div className="card-icon-wrap">
                    <p.Icon size={18} strokeWidth={1.5} />
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="card-ext-link" aria-label="View on GitHub">
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <div className="card-title">{p.name}</div>
                <div className="card-desc">{p.desc}</div>
                <div className="card-tags">
                  {p.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Paper Implementations ──────────────────────────────────────
function PaperImplementations() {
  return (
    <section id="papers">
      <div className="container">
        <hr className="divider" />
        <br /><br />
        <FadeIn>
          <p className="section-label">Paper Implementations</p>
          <h2 className="section-title">Research → Code</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', maxWidth: 500 }}>
            Systems and algorithms I've implemented from scratch, following classic CS research papers.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bento">
            {PAPERS.map(p => (
              <div key={p.name} className="bento-card paper-card wide">
                <div className="card-header">
                  <div className="card-icon-wrap">
                    <p.Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={p.paperLink} target="_blank" rel="noreferrer" className="card-ext-link paper-link" aria-label="Read Paper">
                      <BookOpen size={13} />
                      <span>Paper</span>
                    </a>
                    <a href={p.link} target="_blank" rel="noreferrer" className="card-ext-link" aria-label="View Code">
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
                <div className="card-title">{p.name}</div>
                <div className="paper-source">
                  <FileText size={11} style={{ flexShrink: 0 }} />
                  <span>{p.paper}</span>
                  <span className="paper-authors">{p.authors}</span>
                </div>
                <div className="card-desc">{p.desc}</div>
                <div className="card-tags">
                  {p.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Skills ─────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <hr className="divider" />
        <br /><br />
        <FadeIn>
          <p className="section-label">Skills</p>
          <h2 className="section-title">Tech I work with</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="skills-grid">
            {SKILLS.map(s => (
              <span
                key={s.name}
                className="skill-pill"
                style={s.level === 'primary' ? { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-glow)' } : {}}
              >
                {s.name}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Contact ────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <hr className="divider" />
        <br /><br />
        <FadeIn>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get in touch</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem', maxWidth: 440 }}>
            Building something interesting? Want to chat about distributed systems or AI?
            I'm always down for a good engineering conversation.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="contact-strip">
            <div className="contact-links">
              <a href="https://github.com/Mukul-svg" target="_blank" rel="noreferrer" className="contact-link">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
              <a href="https://x.com/__solo69__" target="_blank" rel="noreferrer" className="contact-link">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
                @__solo69__
              </a>
              <a href="https://www.linkedin.com/in/mukul-raghav-8a8313201/" target="_blank" rel="noreferrer" className="contact-link">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
        <br /><br />
        <footer className="footer">
          <span>© 2026 Mukul Raghav.</span>
        </footer>
      </div>
    </section>
  )
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="app">
      <ParticleCanvas />
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Projects />
        <PaperImplementations />
        <Skills />
        <Contact />
      </main>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  )
}
