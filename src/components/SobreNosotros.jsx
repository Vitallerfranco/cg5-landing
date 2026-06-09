import { IconShirt, IconStar, IconTruck, IconWhatsApp } from './Icons'

const stats = [
  { value: '+500', label: 'Camisetas vendidas',      icon: <IconShirt  size={26} color="#E040FB" /> },
  { value: 'G5',   label: 'Calidad garantizada',     icon: <IconStar   size={26} color="#E040FB" /> },
  { value: '24-48hs', label: 'Envíos a todo el país',icon: <IconTruck  size={26} color="#E040FB" /> },
  { value: '100%', label: 'Atención personalizada',  icon: <IconWhatsApp size={26} /> },
]

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(123,47,190,0.1) 0%,transparent 70%)' }} />
      <div className="absolute -right-40 top-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(224,64,251,0.07) 0%,transparent 70%)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,#E040FB,#7B2FBE,transparent)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-magenta-cg text-xs font-semibold uppercase tracking-[5px] mb-3">Quiénes somos</p>
            <h2 className="font-heading text-6xl sm:text-7xl text-white tracking-wide mb-6">
              Sobre<br />Nosotros
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              <strong className="text-white">CG5</strong> nació en Buenos Aires con una misión clara: traerte las mejores camisetas de fútbol del mundo a precio justo.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Somos <strong className="text-white">importadores directos</strong> de calidad G5 — el estándar más alto del mercado —, garantizando materiales premium, terminaciones impecables y detalles bordados idénticos a los originales.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Desde el pedido hasta la entrega, te acompañamos por WhatsApp. Envíos a todo el país en <strong className="text-white">24 a 48 horas</strong>.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['Importación directa','Calidad G5','Envíos nacionales','Pago flexible'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-sm text-white/60 font-medium"
                  style={{ background: 'rgba(123,47,190,0.1)', border: '1px solid rgba(123,47,190,0.25)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 cursor-default"
                style={{ background: 'linear-gradient(160deg,#16162a 0%,#111 100%)', border: '1px solid rgba(123,47,190,0.18)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(224,64,251,0.38)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(224,64,251,0.12)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(123,47,190,0.18)'; e.currentTarget.style.boxShadow = 'none' }}>
                {s.icon}
                <span className="font-heading text-4xl"
                  style={{ background: 'linear-gradient(135deg,#7B2FBE,#E040FB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </span>
                <span className="text-white/40 text-xs leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
