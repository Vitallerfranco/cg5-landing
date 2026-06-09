import { useState, useEffect } from 'react'
import JerseyImage from './JerseyImage'
import ImageGallery from './ImageGallery'
import {
  IconStar, IconCheck, IconWhatsApp, IconTruck, IconCreditCard, IconBank, IconTag, IconX
} from './Icons'

const WA_NUMBER = '5491153894880'

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState('L')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  if (!product) return null

  const discount      = Math.round((1 - product.price / product.originalPrice) * 100)
  const cuota         = Math.round(product.price / 3)
  const transferencia = Math.round(product.price * 0.9)
  const combo         = Math.round(product.price * 0.85)
  const hasImages     = product.images && product.images.length > 0

  const waMsg  = encodeURIComponent(`Hola CG5! Quiero: ${product.name} — ${product.subtitle} (Talle ${selectedSize}). Tienen stock?`)
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  const sectionColor = {
    sudamerica: '#00b09b',
    europa: '#4facfe',
    retro: '#FFD700',
    shorts: '#E040FB',
  }[product.section] || '#7B2FBE'

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-content relative w-full sm:max-w-3xl rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col sm:flex-row"
        style={{
          background: '#0c0c18',
          border: '1px solid rgba(123,47,190,0.25)',
          boxShadow: '0 0 80px rgba(123,47,190,0.2)',
          maxHeight: '94vh',
        }}
      >
        {/* Gradient top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-10"
          style={{ background: `linear-gradient(90deg, ${sectionColor}, #E040FB, ${sectionColor})` }} />

        {/* ── Left: image panel ── */}
        <div
          className="sm:w-[340px] sm:min-w-[340px] flex flex-col items-center justify-center py-8 px-5 relative"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${product.kit.glow}12 0%, #080810 70%)`,
            borderRight: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {hasImages ? (
            <ImageGallery images={product.images} name={product.name} />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <JerseyImage kit={product.kit} size={180} />
              <p className="text-white/20 text-xs">Foto ilustrativa</p>
            </div>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <div
              className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ background: 'rgba(224,64,251,0.12)', border: '1px solid rgba(224,64,251,0.35)', color: '#E040FB' }}
            >
              <IconTag size={13} color="#E040FB" />
              {discount}% OFF
            </div>
          )}
        </div>

        {/* ── Right: detail panel ── */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: '94vh' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            <IconX size={14} />
          </button>

          <div className="p-6 pt-5 pb-8">
            {/* Section + version tags */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white"
                style={{ background: `${sectionColor}22`, border: `1px solid ${sectionColor}44`, color: sectionColor }}
              >
                {product.section === 'sudamerica' ? 'Sudamérica'
                 : product.section === 'europa' ? 'Europa'
                 : product.section === 'retro' ? 'Retro'
                 : 'Short'}
              </span>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white"
                style={{ background: 'rgba(123,47,190,0.2)', border: '1px solid rgba(123,47,190,0.35)', color: '#9B4FDE' }}
              >
                {product.version}
              </span>
              {product.badge && (
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                  style={{ background: `${product.badgeColor || '#E040FB'}22`, border: `1px solid ${product.badgeColor || '#E040FB'}55`, color: product.badgeColor || '#E040FB' }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-wide leading-none mb-1">
              {product.name}
            </h2>
            <p className="text-white/40 text-sm mb-4">{product.subtitle}</p>

            {/* Quality badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mb-5"
              style={{ background: 'rgba(123,47,190,0.1)', border: '1px solid rgba(123,47,190,0.28)', color: '#C07AFF' }}
            >
              <IconStar size={11} color="#C07AFF" />
              Calidad G5 Importada
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-5">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-white/50">
                  <span className="shrink-0" style={{ color: '#E040FB' }}><IconCheck size={12} color="#E040FB" /></span>
                  {f}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-5" />

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2.5">Seleccioná tu talle</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="w-11 h-11 rounded-lg text-sm font-bold transition-all duration-150 hover:scale-105"
                    style={
                      selectedSize === s
                        ? { background: 'linear-gradient(135deg,#7B2FBE,#E040FB)', color: 'white', boxShadow: '0 0 14px rgba(224,64,251,0.4)' }
                        : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Main price */}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-white/25 text-xs mb-0.5">Precio</p>
                  <span className="text-white/30 text-sm line-through">{fmt(product.originalPrice)}</span>
                </div>
                <span
                  className="font-heading text-4xl leading-none"
                  style={{ background: 'linear-gradient(90deg,#E040FB,#7B2FBE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {fmt(product.price)}
                </span>
              </div>

              {/* Payment options */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-white/50">
                    <IconBank size={13} color="#34d399" />
                    Transferencia / Efectivo
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background:'rgba(52,211,153,0.15)', color:'#34d399' }}>-10%</span>
                  </span>
                  <span className="font-semibold text-green-400">{fmt(transferencia)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-white/50">
                    <IconCreditCard size={13} color="#60a5fa" />
                    3 cuotas sin interés
                  </span>
                  <span className="font-semibold text-blue-300">3x {fmt(cuota)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-white/50">
                    <IconTag size={13} color="#c084fc" />
                    Comprando 2 o más
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background:'rgba(192,132,252,0.15)', color:'#c084fc' }}>-15%</span>
                  </span>
                  <span className="font-semibold text-purple-300">{fmt(combo)} c/u</span>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-4 mb-6 text-xs text-white/35">
              <span className="flex items-center gap-1.5">
                <IconTruck size={13} color="currentColor" />
                Envío a todo el país · 24-48 hs
              </span>
              <span>·</span>
              <span>Embalaje seguro</span>
            </div>

            {/* CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-body font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 4px 20px rgba(37,211,102,0.28)' }}
            >
              <IconWhatsApp size={20} />
              Consultar por WhatsApp — Talle {selectedSize}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
