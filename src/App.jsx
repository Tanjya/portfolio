import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/* ---------- Motion helpers (small + reusable) ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
})

export default function App() {
  // global scroll progress bar
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressX }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-cyan-300 to-blue-400"
      />
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
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <motion.div whileHover={{ rotate: 8 }} whileTap={{ rotate: -8 }}>
              <Logo />
            </motion.div>
            <span className="text-sm font-semibold tracking-wide">TANJYA • PORTFOLIO</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <a
              href="/Tanjya-Akther-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-white text-neutral-900 hover:bg-white/90"
            >
              <span>View CV</span>
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
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-white/10"
        >
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
            <a className="py-2" href="#about" onClick={() => setOpen(false)}>About</a>
            <a className="py-2" href="#projects" onClick={() => setOpen(false)}>Projects</a>
            <a className="py-2" href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <a
              className="mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-white text-neutral-900 w-max"
              href="/Tanjya-Akther-CV.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            >
              View CV <ArrowRightIcon className="size-4" />
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function Hero() {
  // parallax-ish subtle float for the badge + buttons
  const float = {
    animate: { y: [0, -6, 0] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  }

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* animated soft glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.20), transparent 70%)',
        }}
      />
      {/* tighter mobile spacing for better first paint */}
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 md:py-32">
        <motion.div
          className="max-w-3xl"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
            {...float}
          >
            <SparkleIcon className="size-4" /> Available for junior frontend roles
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Building fast, clean UIs with React & Tailwind
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-white/70 md:text-lg">
            I’m Tanjya Akther — a front-end developer focused on performant, accessible interfaces.
            Have a look at my latest work and the NASA Daily Explorer project.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-neutral-900 hover:bg-white/90"
            >
              View projects <ArrowRightIcon className="size-4" />
            </a>
            <a
              href="/Tanjya-Akther-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 font-semibold hover:bg-white/10"
            >
              View CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <motion.section
      id="about"
      className="mx-auto max-w-6xl px-4 py-20"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        <div className="md:col-span-2 space-y-4">
          <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight md:text-3xl">
            About me
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/80">
            Front-end developer with a product mindset. I craft responsive, accessible interfaces and
            ship quickly using a modern stack: React, Vite, Tailwind, and TypeScript. Comfortable with React Router,
            state management, and integrating REST APIs.
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/70">
            I love turning ideas into smooth, interactive experiences and bringing designs to life through code. I care about
            performance, accessibility, and clean component architectures.
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/70">
            I collaborate closely with designers and backend engineers, iterate fast, and focus on shipping user value.
          </motion.p>
          <ul className="grid gap-2 text-white/70 sm:grid-cols-2">
            {[
              'React / TypeScript / Vite',
              'Tailwind CSS / UI Systems',
              'REST APIs / Axios / Fetch',
              'Git / GitHub / CI basics',
            ].map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-center gap-2"
                whileHover={{ x: 4 }}
              >
                <CheckIcon className="size-5" /> {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <h3 className="font-semibold">Quick facts</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>📍 London, UK</li>
            <li>🛰️ Building: TikTok Data Explorer (in progress)</li>
            <li>🎯 Goal: Junior Frontend role by year-end</li>
            <li>💬 Open to freelance/part-time</li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Projects() {
  const cards = [
    {
      title: 'NASA Daily Explorer',
      blurb: 'Interactive space data dashboard with imagery, APOD and rover feeds.',
      tags: ['React', 'JavaScript', 'Tailwind', 'APIs'],
      link: 'https://tanjya.github.io/nasa-portfolio/',
      img: '/images/nasa-thumb.png',
    },
    {
      title: 'Netflix Clone',
      blurb: 'Streaming platform using authentication, media browsing, and responsive design.',
      tags: ['React', 'Node.js', 'Tailwind', 'TypeScript'],
      link: 'https://netflix-project-clone1.netlify.app/',
      img: '/images/netflix-thumb.png',
    },
    {
      title: 'PwC Digital Audit Dashboard',
      blurb: 'Internal web dashboard designed to streamline digital audit workflows and visualize key compliance metrics. Built collaboratively using React and Tailwind.',
      tags: ['React', 'Tailwind', 'JavaScript', 'Team Project', 'Data Visualization'],
      link: 'https://pwc-clone.netlify.app/', 
      img: '/images/pwc-thumb.png',
    },
    {
      title: 'Restaurant Application',
      blurb: 'Responsive restaurant web application designed to reflect branding while delivering a smooth and engaging user experience.',
      tags: ['React', 'JavaScript', 'Tailwind', 'RESTful API'],
      link: 'https://restaurant-tanjya.netlify.app/',
      img: '/images/restaurant-thumb.png',
    },
    {
      title: 'TikTok Data Explorer (WIP)',
      blurb: 'Explore public TikTok trends, sounds, and posting analytics with charts and CSV export. Planned: trend search · author stats · shareable insights.',
      tags: ['React', 'TypeScript', 'Charts', 'APIs'],
      link: '#',
      img: '/images/tiktok-thumb.png',
      wip: true,
    },
  ]

  return (
    <section id="projects" className="border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Selected Projects</h2>
          <a href="#contact" className="text-sm text-white/70 hover:text-white">Need something built?</a>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((c, i) => (
            <motion.a
              key={i}
              href={c.link}
              target={c.link && c.link !== '#' ? '_blank' : undefined}
              rel={c.link && c.link !== '#' ? 'noopener noreferrer' : undefined}
              variants={fadeUp}
              className="group relative rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden transition"
              whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(59,130,246,0.12)' }}
              whileTap={{ scale: 0.99 }}
            >
              {/* WIP badge */}
              {c.wip && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-900">WIP</span>
              )}

              {/* preview image */}
              {c.img && (
                <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={c.img}
                    alt={`${c.title} preview`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                  <motion.span
                    initial={{ opacity: 0.4, x: 0 }}
                    whileHover={{ opacity: 1, x: 2 }}
                    className="text-white/40 group-hover:text-white"
                  >
                    <ArrowUpRightIcon className="size-5" />
                  </motion.span>
                </div>
                <p className="mt-2 text-sm text-white/70">{c.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  // Converted to clear, working contact options (no broken form)
  return (
    <motion.section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-20"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight md:text-3xl">
            Let’s work together
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-white/70">
            I’m available for junior frontend roles, internships and freelance projects.
            Choose any option below to reach me instantly.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 text-sm text-white/80">
            <a
              href="mailto:tanjya26@gmail.com?subject=Project%20inquiry%20from%20portfolio&body=Hi%20Tanjya%2C%20I%27d%20like%20to%20chat%20about..."
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10"
            >
              <MailIcon className="size-4" /> Email: tanjya26@gmail.com
            </a>
            <a
              href="https://github.com/tanjya"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10"
            >
              <GitHubIcon className="size-4" /> github.com/tanjya
            </a>
            <a
              href="https://www.linkedin.com/in/tanjya"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10"
            >
              <LinkedInIcon className="size-4" /> linkedin.com/in/tanjya
            </a>
            <a
              href="/Tanjya-Akther-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10"
            >
              <ArrowRightIcon className="size-4" /> View / Download CV
            </a>
          </motion.div>
        </div>

       
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3"
        >
          <p className="text-sm text-white/70">
            Prefer email pre-filled? Click below and your email client will open with a template.
          </p>
          <a
            href={`mailto:tanjya26@gmail.com?subject=Let%27s%20work%20together&body=Hi%20Tanjya%2C%0A%0AProject%2FRole%20Title%3A%20%0ABrief%3A%20%0ATimeline%3A%20%0ABudget%20(or%20salary)%3A%20%0A%0ABest%2C%0A%5Byour%20name%5D`}
            className="w-full inline-flex justify-center rounded-xl bg-white px-4 py-2 font-semibold text-neutral-900 hover:bg-white/90"
          >
            Compose email to Tanjya
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-white/60">© {new Date().getFullYear()} Tanjya Akther. All rights reserved.</p>
        <div className="flex items-center gap-2 text-white/70">
          {[
            { href: '#about', label: 'About' },
            { href: '#projects', label: 'Projects' },
            { href: '#contact', label: 'Contact' },
            { href: '/Tanjya-Akther-CV.pdf', label: 'CV', external: true },
          ].map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-sm hover:bg-white/10"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {l.label}
            </motion.a>
          ))}
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