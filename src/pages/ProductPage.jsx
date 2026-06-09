import { useState } from 'react'
import { products } from '../data/products'
import ImageGallery from '../components/ImageGallery'
import LeadForm from '../components/LeadForm'
import { IconCheck, IconTruck, IconStar, IconChevronLeft, IconChevronRight, IconTag, IconCreditCard, IconBank, IconShirt } from '../components/Icons'

const fmt = (n) => new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(n)

const sectionColors = {
  selecciones: { color:'#00c9a7', gradient:'linear-gradient(90deg,#00b09b,#96c93d)' },
  clubes:      { color:'#4facfe', gradient:'linear-gradient(90deg,#4facfe,#00f2fe)' },
  retro:       { color:'#FFD700', gradient:'linear-gradient(90deg,#f7971e,#ffd200)' },
  shorts:      { color:'#E040FB', gradient:'linear-gradient(90deg,#7B2FBE,#E040FB)' },
}

export default function ProductPage({ productId, onBack, onProductSelect }) {
  const product = products.find(p => p.id === productId)
  const [size,     setSize]     = useState('L')
  const [showLead, setShowLead] = useState(false)
  const [faqOpen,  setFaqOpen]  = useState(null)

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={onBack} className="text-white/50 hover:text-white transition-colors">← Volver</button>
    </div>
  )

  const discount   = Math.round((1 - product.price / product.originalPrice) * 100)
  const efectivo   = Math.round(product.price * 0.9)
  const cuota      = Math.round(product.price / 3)
  const combo      = Math.round(product.price * 0.85)
  const meta       = sectionColors[product.section] || sectionColors.clubes
  const related    = products.filter(p => p.section === product.section && p.id !== product.id).slice(0, 4)

  const faqs = [
    { q: '¿Las tallas son estándar?', a: 'Sí. Nuestra guía de talles coincide con la talla standard argentina/europea. L es el talle más pedido. Si tenés dudas, consultanos por WhatsApp y te ayudamos.' },
    { q: '¿Cuánto tarda el envío?', a: 'Enviamos por correo o moto dentro de las 24-48hs de confirmado el pago. CABA y GBA pueden ser el mismo día según disponibilidad.' },
    { q: '¿La calidad G5 es buena?', a: 'G5 es el estándar más alto de replica disponible. Materiales idénticos a la versión oficial: tela técnica Dri-FIT, bordados en relieve, costuras reforzadas. La diferencia es imperceptible.' },
    { q: '¿Cómo pago?', a: 'Transferencia bancaria / Mercado Pago / efectivo. Si pagás por transferencia tenés un 10% de descuento. Aceptamos 3 cuotas sin interés.' },
    { q: '¿Puedo personalizar con mi nombre?', a: 'Sí, podemos personalizar con tu nombre y número por un costo adicional. Consultanos antes de hacer el pedido.' },
  ]

  return (
    <div className="min-h-screen bg-bg pt-16">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-white/30">
          <button onClick={onBack} className="hover:text-white/60 transition-colors flex items-center gap-1">
            <IconChevronLeft size={12} color="currentColor" /> Catálogo
          </button>
          <span>/</span>
          <span className="capitalize" style={{ color: meta.color }}>{product.section}</span>
          <span>/</span>
          <span className="text-white/50 truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

        {/* ── Main product grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-14 mb-16">

          {/* Left: Gallery */}
          <div className="w-full">
            <ImageGallery images={product.images} name={product.name} />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold capitalize"
                style={{ background: `${meta.color}18`, border:`1px solid ${meta.color}40`, color: meta.color }}>
                {product.section}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white/60"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                {product.version}
              </span>
              {product.badge && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background:`${product.badgeColor||'#E040FB'}18`, border:`1px solid ${product.badgeColor||'#E040FB'}45`, color:product.badgeColor||'#E040FB' }}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1"
                  style={{ background:'linear-gradient(135deg,#7B2FBE,#E040FB)' }}>
                  <IconTag size={10} color="white" /> -{discount}% OFF
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="font-heading text-5xl sm:text-6xl text-white tracking-wide leading-none mb-1">
              {product.name}
            </h1>
            <p className="text-white/40 text-base mb-4">{product.subtitle}</p>

            {/* Quality + Stars */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <IconStar key={i} size={14} color={i <= 5 ? '#FFD700' : '#444'} />
                ))}
              </div>
              <span className="text-white/30 text-xs">(96 ventas)</span>
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background:'rgba(123,47,190,0.12)', border:'1px solid rgba(123,47,190,0.3)', color:'#C07AFF' }}>
                <IconStar size={10} color="#C07AFF" /> Calidad G5
              </span>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: product.stock <= 3 ? '#f59e0b' : '#22c55e', boxShadow: `0 0 6px ${product.stock <= 3 ? '#f59e0b' : '#22c55e'}` }} />
              <span className="text-sm" style={{ color: product.stock <= 3 ? '#f59e0b' : '#22c55e' }}>
                {product.stock <= 3 ? `Solo quedan ${product.stock} — ¡pedí antes que se agote!` : 'En stock — disponible para envío inmediato'}
              </span>
            </div>

            {/* Price */}
            <div className="rounded-2xl p-5 mb-5"
              style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Precio de lista</p>
                  <span className="text-white/25 line-through text-sm">{fmt(product.originalPrice)}</span>
                </div>
                <div className="text-right">
                  <span className="font-heading leading-none"
                    style={{ fontSize:'clamp(2.2rem,5vw,3rem)', background:'linear-gradient(90deg,#E040FB,#7B2FBE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    {fmt(product.price)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex flex-col gap-0.5 p-3 rounded-xl"
                  style={{ background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.15)' }}>
                  <div className="flex items-center gap-1.5">
                    <IconBank size={12} color="#34d399" />
                    <span className="text-[10px] text-white/40">Transferencia</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background:'rgba(52,211,153,0.2)', color:'#34d399' }}>-10%</span>
                  </div>
                  <span className="font-heading text-lg text-green-400">{fmt(efectivo)}</span>
                </div>
                <div className="flex flex-col gap-0.5 p-3 rounded-xl"
                  style={{ background:'rgba(96,165,250,0.06)', border:'1px solid rgba(96,165,250,0.15)' }}>
                  <div className="flex items-center gap-1.5">
                    <IconCreditCard size={12} color="#60a5fa" />
                    <span className="text-[10px] text-white/40">3 cuotas s/i</span>
                  </div>
                  <span className="font-heading text-lg text-blue-300">3x {fmt(cuota)}</span>
                </div>
                <div className="flex flex-col gap-0.5 p-3 rounded-xl"
                  style={{ background:'rgba(192,132,252,0.06)', border:'1px solid rgba(192,132,252,0.15)' }}>
                  <div className="flex items-center gap-1.5">
                    <IconTag size={12} color="#c084fc" />
                    <span className="text-[10px] text-white/40">Comprando 2+</span>
                  </div>
                  <span className="font-heading text-lg text-purple-300">{fmt(combo)} c/u</span>
                </div>
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/35 text-xs uppercase tracking-widest">Elegí tu talle</p>
                <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
                  Guía de talles
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className="w-12 h-12 rounded-xl text-sm font-bold transition-all duration-150 hover:scale-105"
                    style={size === s
                      ? { background:'linear-gradient(135deg,#7B2FBE,#E040FB)', color:'white', boxShadow:'0 0 16px rgba(224,64,251,0.45)' }
                      : { background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.08)' }
                    }>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-5">
              <button onClick={() => setShowLead(true)}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background:'linear-gradient(135deg,#25D366,#128C7E)', boxShadow:'0 4px 24px rgba(37,211,102,0.35)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.528 5.855L.057 23.5l5.797-1.505A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.358-.213-3.717.965.99-3.616-.234-.373A9.818 9.818 0 012.182 12C2.182 6.56 6.56 2.182 12 2.182c5.44 0 9.818 4.378 9.818 9.818 0 5.44-4.378 9.818-9.818 9.818z"/>
                </svg>
                Comprar por WhatsApp — Talle {size}
              </button>
              <button onClick={onBack}
                className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-xl font-semibold text-sm text-white/50 hover:text-white transition-colors"
                style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
                <IconChevronLeft size={14} color="currentColor" />
                Ver más camisetas
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <IconTruck size={14} color="#34d399" />, text: 'Envío 24-48hs', sub: 'Todo el país' },
                { icon: <IconStar  size={14} color="#FFD700" />, text: 'Calidad G5',    sub: 'Garantizada' },
                { icon: <IconCheck size={14} color="#60a5fa" />, text: 'Pago seguro',   sub: 'Múltiples métodos' },
              ].map((b) => (
                <div key={b.text} className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-center"
                  style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.05)' }}>
                  {b.icon}
                  <span className="text-white/60 text-[11px] font-semibold leading-tight">{b.text}</span>
                  <span className="text-white/25 text-[10px] leading-tight">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Details section ── */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* Description */}
          <div className="rounded-2xl p-6" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)' }}>
            <h2 className="font-heading text-3xl text-white tracking-wide mb-4">Descripción</h2>
            <p className="text-white/55 text-sm leading-relaxed mb-5">{product.description}</p>
            {product.whyBuy && (
              <div className="p-4 rounded-xl"
                style={{ background:`${meta.color}0f`, border:`1px solid ${meta.color}25` }}>
                <p className="text-xs font-semibold mb-1.5 uppercase tracking-widest" style={{ color: meta.color }}>
                  Por qué elegirla
                </p>
                <p className="text-white/55 text-sm leading-relaxed">{product.whyBuy}</p>
              </div>
            )}
          </div>

          {/* Specs table */}
          <div className="rounded-2xl p-6" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)' }}>
            <h2 className="font-heading text-3xl text-white tracking-wide mb-4">Especificaciones</h2>
            <div className="divide-y divide-white/5">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between py-2.5 text-sm">
                  <span className="text-white/35 font-medium">{s.label}</span>
                  <span className="text-white/70 text-right ml-4">{s.value}</span>
                </div>
              ))}
            </div>
            {/* Features */}
            <div className="mt-5 pt-5 border-t border-white/5">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Características</p>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/55">
                    <IconCheck size={13} color="#E040FB" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-wide text-center mb-8">Preguntas frecuentes</h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden"
                style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/3"
                >
                  <span className="text-white/75 text-sm font-medium pr-4">{faq.q}</span>
                  <span className="text-white/30 shrink-0 text-lg leading-none">
                    {faqOpen === i ? '−' : '+'}
                  </span>
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-4">
                    <p className="text-white/45 text-sm leading-relaxed border-t border-white/5 pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-wide text-center mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => {
                const disc = Math.round((1 - p.price / p.originalPrice) * 100)
                return (
                  <button key={p.id} onClick={() => onProductSelect(p.id)}
                    className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300"
                    style={{ background:'linear-gradient(165deg,#13132a 0%,#0c0c18 100%)', border:'1px solid rgba(123,47,190,0.15)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(224,64,251,0.5)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(123,47,190,0.3)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(123,47,190,0.15)'; e.currentTarget.style.boxShadow='none' }}
                  >
                    {disc > 0 && (
                      <div className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background:'linear-gradient(135deg,#7B2FBE,#E040FB)' }}>
                        -{disc}%
                      </div>
                    )}
                    <div className="relative overflow-hidden" style={{ paddingBottom:'110%' }}>
                      <img src={p.images[0]?.src} alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-heading text-lg text-white leading-tight">{p.name}</h3>
                      <p className="text-white/30 text-[11px] mb-2">{p.subtitle}</p>
                      <span className="font-heading text-xl" style={{ background:'linear-gradient(90deg,#E040FB,#7B2FBE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                        {fmt(p.price)}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lead form */}
      {showLead && (
        <LeadForm product={product} selectedSize={size} onClose={() => setShowLead(false)} />
      )}
    </div>
  )
}
