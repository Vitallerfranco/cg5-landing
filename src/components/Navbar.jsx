import { useState, useEffect } from 'react'
import { IconWhatsApp } from './Icons'

const WA = '5491153894880'

export default function Navbar({ onNavigate, currentPage }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const goHome = () => { onNavigate('home'); setMenuOpen(false) }

  const links = [
    { label: 'Catálogo',  action: () => { goHome(); setTimeout(() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }), 100) } },
    { label: 'Nosotros',  action: () => { goHome(); setTimeout(() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' }), 100) } },
    { label: 'Prode',     action: () => { goHome(); setTimeout(() => document.getElementById('prode')?.scrollIntoView({ behavior: 'smooth' }), 100) } },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/96 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={goHome} className="flex items-center group shrink-0">
          <img src="/logocg5sinfondo.png" alt="CG5" className="w-auto object-contain transition-all group-hover:scale-105" style={{ height: 42, filter:'drop-shadow(0 0 12px rgba(224,64,251,0.65))' }} />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button key={l.label} onClick={l.action}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a href={`https://wa.me/${WA}?text=Hola%20CG5!%20Quiero%20consultar`}
          target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85 shrink-0"
          style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow:'0 0 14px rgba(37,211,102,0.3)' }}>
          <IconWhatsApp size={15} />
          WhatsApp
        </a>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <span className={`w-5 h-0.5 bg-white/70 transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-white/70 transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-white/70 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}
        style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <button key={l.label} onClick={() => { l.action(); setMenuOpen(false) }}
              className="text-left text-base font-medium text-white/70 hover:text-white py-1 transition-colors">
              {l.label}
            </button>
          ))}
          <a href={`https://wa.me/${WA}?text=Hola%20CG5!%20Quiero%20consultar`}
            target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white mt-2"
            style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
            <IconWhatsApp size={16} />
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
