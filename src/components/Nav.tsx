import { useEffect, useState } from 'react'
import { Sigil } from './Sigil'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#music', label: 'Music' },
  { href: '#lore', label: 'Lore' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#shows', label: 'Shows' },
  { href: '#connect', label: 'Connect' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-[rgba(5,3,8,0.92)] backdrop-blur-md border-b border-purple-500/20'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6"
        aria-label="Primary"
      >
        <a href="#home" className="flex items-center gap-2 text-inherit no-underline">
          <Sigil size={36} className="text-purple-400" />
          <span className="font-display text-sm tracking-[0.2em] text-fog md:text-base">
            THE ALKHEMYST
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-[#b8a9c9] no-underline transition-colors hover:text-purple-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-purple-300 transition ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`block h-0.5 w-6 bg-purple-300 transition ${open ? 'opacity-0' : ''}`} />
          <span
            className={`block h-0.5 w-6 bg-purple-300 transition ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[rgba(5,3,8,0.97)] transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        hidden={!open}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-display text-2xl tracking-[0.2em] text-fog no-underline"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  )
}
