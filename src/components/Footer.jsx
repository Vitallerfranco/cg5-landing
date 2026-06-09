import { IconWhatsApp, IconInstagram, IconPin } from './Icons'

const WA_NUMBER = '5491153894880'

export default function Footer() {
  const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20CG5%2C%20quiero%20consultar%20por%20camisetas`

  return (
    <footer className="relative pt-16 pb-8 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,#7B2FBE 30%,#E040FB 50%,#7B2FBE 70%,transparent)' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(123,47,190,0.08) 0%,transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img src={`${import.meta.env.BASE_URL}logocg5sinfondo.png`} alt="CG5" className="h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(224,64,251,0.45))' }} />
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              Camisetas de fútbol importadas.<br />Calidad G5. Buenos Aires, Argentina.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/25 text-xs uppercase tracking-widest mb-4">Navegación</p>
            <ul className="space-y-2">
              {[['Inicio','#hero'],['Catálogo','#catalogo'],['Sobre Nosotros','#nosotros'],['Mundial del Prode','#prode']].map(([label,href]) => (
                <li key={href}>
                  <a href={href} className="text-white/45 text-sm hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/25 text-xs uppercase tracking-widest mb-4">Contacto</p>
            <div className="space-y-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
                  <IconWhatsApp size={16} />
                </div>
                <span className="text-white/45 text-sm group-hover:text-white transition-colors">+54 9 11 5389-4880</span>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)' }}>
                  <IconInstagram size={15} />
                </div>
                <span className="text-white/45 text-sm group-hover:text-white transition-colors">@cg5.camisetas</span>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(123,47,190,0.15)', border: '1px solid rgba(123,47,190,0.25)' }}>
                  <IconPin size={15} color="#9B4FDE" />
                </div>
                <span className="text-white/45 text-sm">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-white/20 text-xs">© 2026 CG5. Todos los derechos reservados.</p>
          <p className="text-white/20 text-xs">
            Desarrollado por{' '}
            <span className="font-semibold"
              style={{ background: 'linear-gradient(90deg,#7B2FBE,#E040FB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              VitaDev
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
