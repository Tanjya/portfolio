import { useState, useEffect } from 'react'

// Drop this file into src/App.jsx (or replace your existing App component)
// Tailwind required. Works with Vite + React.

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteNav />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

function SiteNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10"
      onClick={() => setOpen(false)}
    >
      {children}
    </a>
  )

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-sm font-semibold tracking-wide">TANJYA • PORTFOLIO</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <a href="#contact" className="ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-white text-neutral-900 hover:bg-white/90">
              <span>Hire me</span>
              <ArrowRightIcon className="size-4" />
            </a>
          </nav>
          <button
            className="md:hidden rounded-xl p-2 hover:bg-white/10"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
            <a className="py-2" href="#about" onClick={() => setOpen(false)}>About</a>
            <a className="py-2" href="#projects" onClick={() => setOpen(false)}>Projects</a>
            <a className="py-2" href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <a className="mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-white text-neutral-900 w-max" href="#contact" onClick={() => setOpen(false)}>
              Hire me <ArrowRightIcon className="size-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.20),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <SparkleIcon className="size-4" /> Available for junior frontend roles
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Building fast, clean UIs with React & Tailwind
          </h1>
          <p className="mt-5 text-white/70 md:text-lg">
            I’m Tanjya Akther — a front‑end developer focused on performant, accessible interfaces.
            Have a look at my latest work and the NASA Daily Explorer project.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-neutral-900 hover:bg-white/90">
              View projects <ArrowRightIcon className="size-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 font-semibold hover:bg-white/10">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">About me</h2>
          <p className="text-white/80">
            Front‑end developer with a product mindset. I craft responsive, accessible interfaces and
            ship quickly using a modern stack: React, Vite, Tailwind, and TypeScript. Comfortable with React Router,
            state management, and integrating REST APIs.
          </p>
          <ul className="grid gap-2 text-white/70 sm:grid-cols-2">
            <li className="flex items-center gap-2"><CheckIcon className="size-5" /> React / TypeScript / Vite</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-5" /> Tailwind CSS / UI Systems</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-5" /> REST APIs / Axios / Fetch</li>
            <li className="flex items-center gap-2"><CheckIcon className="size-5" /> Git / GitHub / CI basics</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold">Quick facts</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>📍 London, UK</li>
            <li>🛰️ Building: NASA Daily Explorer</li>
            <li>🎯 Goal: Junior Frontend role by year‑end</li>
            <li>💬 Open to freelance/part‑time</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const cards = [
    {
      title: 'NASA Daily Explorer',
      blurb: 'Interactive space data dashboard with imagery, APOD and rover feeds.',
      tags: ['React', 'Tailwind', 'APIs'],
      link: '#',
    },
    {
      title: 'Portfolio v3',
      blurb: 'Fast, accessible, content‑driven portfolio with routing & MDX sections.',
      tags: ['React', 'Vite', 'Tailwind'],
      link: '#',
    },
    {
      title: 'UI Component Kit',
      blurb: 'Reusable components (navbars, cards, modals) tuned for Tailwind.',
      tags: ['Components', 'Tailwind'],
      link: '#',
    },
  ]

  return (
    <section id="projects" className="border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Projects</h2>
          <a href="#contact" className="text-sm text-white/70 hover:text-white">Need something built?</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <a
              key={i}
              href={c.link}
              className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-5 transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <ArrowUpRightIcon className="size-5 text-white/40 group-hover:text-white" />
              </div>
              <p className="mt-2 text-sm text-white/70">{c.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Let’s work together</h2>
          <p className="mt-3 text-white/70">
            I’m available for junior frontend roles, internships and freelance projects.
            Send a message and I’ll get back to you promptly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5"><MailIcon className="size-4" /> tanjya.akther@example.com</span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5"><GitHubIcon className="size-4" /> github.com/tanjya</span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5"><LinkedInIcon className="size-4" /> linkedin.com/in/tanjya</span>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3"
        >
          <Input label="Your name" placeholder="Tanjya Akther" />
          <Input type="email" label="Email" placeholder="you@example.com" />
          <div>
            <label className="mb-1 block text-sm">Message</label>
            <textarea className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 outline-none focus:ring-2 focus:ring-white/20" rows={5} placeholder="Tell me about your project..." />
          </div>
          <button className="w-full rounded-xl bg-white px-4 py-2 font-semibold text-neutral-900 hover:bg-white/90">Send</button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-white/60">© {new Date().getFullYear()} Tanjya Akther. All rights reserved.</p>
        <div className="flex items-center gap-2 text-white/70">
          <a className="rounded-xl border border-white/10 px-3 py-1.5 text-sm hover:bg-white/10" href="#about">About</a>
          <a className="rounded-xl border border-white/10 px-3 py-1.5 text-sm hover:bg-white/10" href="#projects">Projects</a>
          <a className="rounded-xl border border-white/10 px-3 py-1.5 text-sm hover:bg-white/10" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

/* ----- UI bits ---------------------------------------------------------- */
function Input({ label, type = 'text', placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  )
}

function Logo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-6 ${props.className || ''}`}>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path fill="url(#g)" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 3.5 6 5.5-6 5.5-6-5.5 6-5.5Z" />
    </svg>
  )
}

function ArrowRightIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function ArrowUpRightIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

function CheckIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

function SparkleIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M5.6 5.6 8 8M16 16l2.4 2.4M5.6 18.4 8 16M16 8l2.4-2.4" />
    </svg>
  )
}

function MenuIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function MailIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16v12H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

function GitHubIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.11-1.49-1.11-1.49-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.54 2.36 1.1 2.94.84.09-.66.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.84c.85 0 1.71.11 2.51.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.11 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 8.5h4V24h-4V8.5ZM8.5 8.5h3.8v2.1h.1c.53-1 1.83-2.1 3.76-2.1 4.02 0 4.77 2.65 4.77 6.1V24h-4v-6.8c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.61 1.76-2.61 3.57V24h-3.87V8.5Z" transform="translate(2 0)" />
    </svg>
  )
}

