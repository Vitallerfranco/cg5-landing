import { useState, useRef } from 'react'
import { products, sections } from '../data/products'
import {
  IconSouthAmerica, IconEurope, IconShorts, IconTrophy,
  IconCreditCard, IconBank, IconTag, IconTruck, IconChevronRight
} from './Icons'

const WA_NUMBER = '5491153894880'
const fmt = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

// Minimal section icons — no emojis
const SectionIcon = ({ id, size = 22, color = 'currentColor' }) => {
  if (id === 'selecciones') return <IconSouthAmerica size={size} color={color} />
  if (id === 'clubes')      return <IconEurope      size={size} color={color} />
  if (id === 'retro')       return <IconTrophy      size={size} color={color} />
  if (id === 'shorts')      return <IconShorts      size={size} color={color} />
  return null
}

const sectionMeta = {
  selecciones: { gradient: 'linear-gradient(90deg,#00b09b,#96c93d)', color: '#00c9a7', desc: 'Argentina, Brasil, Uruguay y más selecciones' },
  clubes:      { gradient: 'linear-gradient(90deg,#4facfe,#00f2fe)', color: '#4facfe', desc: 'Boca, River, Barcelona, Real Madrid, Liverpool y más' },
  retro:       { gradient: 'linear-gradient(90deg,#f7971e,#ffd200)', color: '#FFD700', desc: 'Maradona, Ronaldinho, Kaká, Dybala — piezas de colección' },
  shorts:      { gradient: 'linear-gradient(90deg,#7B2FBE,#E040FB)', color: '#E040FB', desc: 'Shorts de todas las selecciones y equipos' },
}

// Card thumbnail: real photo if available, otherwise SVG jersey
function CardImage({ product }) {
  const hasPhoto = product.images && product.images.length > 0
  const [imgErr, setImgErr] = useState(false)

  if (hasPhoto && !imgErr) {
    return (
      <div className="w-full h-full absolute inset-0 overflow-hidden" style={{ background: '#080810' }}>
        <img
          src={product.images[0].src}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgErr(true)}
          draggable={false}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center" style={{ background: '#080810' }}>
      <span className="text-white/20 text-xs">Sin foto</span>
    </div>
  )
}

function ProductCard({ product, onClick }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  const hasPhoto = product.images && product.images.length > 0

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
      style={{ background: 'linear-gradient(165deg,#13132a 0%,#0c0c18 100%)', border: '1px solid rgba(123,47,190,0.15)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.borderColor = 'rgba(224,64,251,0.5)'
        e.currentTarget.style.boxShadow = '0 10px 36px rgba(123,47,190,0.32)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(123,47,190,0.15)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold leading-tight"
            style={{ background: `${product.badgeColor || '#E040FB'}20`, border: `1px solid ${product.badgeColor || '#E040FB'}50`, color: product.badgeColor || '#E040FB' }}>
            {product.badge}
          </span>
        )}
        {product.new && !product.badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#C020DB,#E040FB)' }}>
            NUEVA
          </span>
        )}
      </div>

      {/* Discount pill */}
      {discount > 0 && (
        <div className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#7B2FBE,#E040FB)', boxShadow: '0 0 8px rgba(224,64,251,0.35)' }}>
          -{discount}%
        </div>
      )}

      {/* Image area */}
      <div className="relative overflow-hidden" style={{ paddingBottom: hasPhoto ? '110%' : '90%' }}>
        <CardImage product={product} />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3"
          style={{ background: 'linear-gradient(to top, rgba(12,12,24,0.85) 0%, transparent 55%)' }}
        >
          <span className="flex items-center gap-1 text-xs font-semibold text-white/75">
            Ver detalle <IconChevronRight size={12} color="rgba(255,255,255,0.75)" />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-3.5 py-3 flex-1">
        <h3 className="font-heading text-xl text-white leading-tight tracking-wide">{product.name}</h3>
        <p className="text-white/30 text-[11px] mb-1.5 leading-snug">{product.subtitle}</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-0.5">
            <span className="text-white/20 text-[11px] line-through">{fmt(product.originalPrice)}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-heading text-[1.4rem] leading-none"
              style={{ background: 'linear-gradient(90deg,#E040FB,#7B2FBE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {fmt(product.price)}
            </span>
            <span className="text-white/20 text-[10px]">3x {fmt(Math.round(product.price/3))}</span>
          </div>
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.sizes.map((s) => (
              <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-medium text-white/30"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Featured card (wide, first 2 of each section)
function FeaturedCard({ product, onClick }) {
  const [imgErr, setImgErr] = useState(false)
  const hasPhoto = product.images && product.images.length > 0

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex min-h-[200px] transition-all duration-300"
      style={{ background: 'linear-gradient(165deg,#13132a 0%,#0c0c18 100%)', border: '1px solid rgba(123,47,190,0.18)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(224,64,251,0.55)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(123,47,190,0.32)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(123,47,190,0.18)'; e.currentTarget.style.boxShadow = 'none' }}
      onClick={onClick}
    >
      {/* Left: image */}
      <div className="w-40 sm:w-48 shrink-0 relative overflow-hidden" style={{ background: '#080810' }}>
        {hasPhoto && !imgErr ? (
          <img src={product.images[0].src} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgErr(true)} draggable={false} />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <span className="text-white/20 text-xs">Sin foto</span>
          </div>
        )}
      </div>

      {/* Right: info */}
      <div className="flex flex-col justify-center px-5 py-5 flex-1">
        {(product.badge || product.hot) && (
          <span className="inline-block self-start px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-2"
            style={product.badge
              ? { background: `${product.badgeColor || '#E040FB'}20`, border: `1px solid ${product.badgeColor || '#E040FB'}50`, color: product.badgeColor || '#E040FB' }
              : { background: 'linear-gradient(135deg,#7B2FBE,#E040FB)' }}>
            {product.badge || 'TOP VENTA'}
          </span>
        )}
        <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide leading-tight">{product.name}</h3>
        <p className="text-white/30 text-xs mt-1 mb-3">{product.subtitle}</p>
        <span className="text-white/20 text-xs line-through">{fmt(product.originalPrice)}</span>
        <span className="font-heading text-3xl mt-0.5"
          style={{ background: 'linear-gradient(90deg,#E040FB,#7B2FBE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {fmt(product.price)}
        </span>
        <span className="text-white/20 text-[10px] mt-0.5">3x {fmt(Math.round(product.price/3))}</span>
        <button className="mt-3 self-start px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg,#7B2FBE,#E040FB)' }}>
          Ver detalle
        </button>
      </div>
    </div>
  )
}

export default function Catalogo({ onProductSelect }) {
  const [activeTab, setActiveTab] = useState('todos')
  const [sort, setSort] = useState('popular')
  const sectionRefs = useRef({})

  const tabs = [
    { id: 'todos',       label: 'Todas' },
    { id: 'selecciones', label: 'Selecciones' },
    { id: 'clubes',      label: 'Clubes' },
    { id: 'retro',       label: 'Retro' },
    { id: 'shorts',      label: 'Shorts' },
  ]

  const sortFn = {
    popular:    (a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0),
    'price-asc':  (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    new:        (a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0),
  }

  const sorted = [...products].sort(sortFn[sort] || (() => 0))
  const filtered = activeTab === 'todos' ? sorted : sorted.filter((p) => p.section === activeTab)
  const visibleSections = activeTab === 'todos' ? sections : sections.filter((s) => s.id === activeTab)

  const scrollTo = (id) => {
    setActiveTab(id)
    setTimeout(() => sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  return (
    <section id="catalogo" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{ background: 'linear-gradient(90deg,transparent,#7B2FBE,#E040FB,#7B2FBE,transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-magenta-cg text-xs font-semibold uppercase tracking-[5px] mb-3">Colección</p>
          <h2 className="font-heading text-7xl sm:text-8xl text-white tracking-wide">Catálogo</h2>
          <p className="text-white/35 mt-3 max-w-md mx-auto text-sm">
            Camisetas importadas calidad G5 · Envíos a todo el país
          </p>
        </div>

        {/* Sticky filter bar */}
        <div
          className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-10 flex items-center gap-3 overflow-x-auto"
          style={{ background: 'rgba(8,8,8,0.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* Section tabs */}
          <div className="flex gap-2 shrink-0">
            {tabs.map((t) => (
              <button key={t.id}
                onClick={() => t.id === 'todos' ? setActiveTab('todos') : scrollTo(t.id)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5"
                style={activeTab === t.id
                  ? { background: 'linear-gradient(135deg,#7B2FBE,#E040FB)', color: 'white', boxShadow: '0 0 14px rgba(224,64,251,0.3)' }
                  : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                {t.id !== 'todos' && (
                  <span style={{ opacity: activeTab === t.id ? 1 : 0.6 }}>
                    <SectionIcon id={t.id} size={14} color={activeTab === t.id ? 'white' : 'rgba(255,255,255,0.6)'} />
                  </span>
                )}
                {t.label}
              </button>
            ))}
          </div>

          <div className="ml-auto shrink-0">
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="text-xs rounded-lg px-3 py-2 font-medium outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <option value="popular"    style={{ background: '#111' }}>Más vendidos</option>
              <option value="price-asc"  style={{ background: '#111' }}>Precio menor</option>
              <option value="price-desc" style={{ background: '#111' }}>Precio mayor</option>
              <option value="new"        style={{ background: '#111' }}>Novedades</option>
            </select>
          </div>
        </div>

        {/* Promo banner */}
        <div className="rounded-2xl p-4 sm:p-5 mb-14 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg,rgba(123,47,190,0.15) 0%,rgba(224,64,251,0.08) 100%)', border: '1px solid rgba(224,64,251,0.2)' }}>
          <div className="flex flex-wrap justify-center sm:justify-start gap-5">
            {[
              { icon: <IconCreditCard size={15} color="#60a5fa" />, text: '3 cuotas sin interés' },
              { icon: <IconBank       size={15} color="#34d399" />, text: '10% OFF transferencia' },
              { icon: <IconTag        size={15} color="#c084fc" />, text: '15% OFF comprando 2+' },
              { icon: <IconTruck      size={15} color="#fb923c" />, text: 'Envío gratis +$60.000' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {item.icon}
                <span className="text-white/60 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${WA_NUMBER}?text=Hola%20CG5%2C%20quiero%20consultar%20por%20camisetas`}
            target="_blank" rel="noopener noreferrer"
            className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-85 transition-opacity"
            style={{ background: 'linear-gradient(135deg,#7B2FBE,#E040FB)', boxShadow: '0 0 16px rgba(224,64,251,0.25)' }}>
            Consultar
          </a>
        </div>

        {/* Sections */}
        {visibleSections.map((section) => {
          const meta     = sectionMeta[section.id]
          const items    = filtered.filter((p) => p.section === section.id)
          if (!items.length) return null
          const featured = items.slice(0, 2)
          const rest     = items.slice(2)

          return (
            <div key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} className="mb-20">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-1 h-8 rounded-full shrink-0" style={{ background: meta.gradient }} />
                    <span style={{ color: meta.color }}>
                      <SectionIcon id={section.id} size={26} color={meta.color} />
                    </span>
                    <h2 className="font-heading text-5xl sm:text-6xl text-white tracking-wide">{section.label}</h2>
                  </div>
                  <p className="text-white/35 text-sm ml-4">{meta.desc}</p>
                </div>
                <span className="text-white/20 text-sm ml-4 sm:ml-0">{items.length} productos</span>
              </div>

              {/* Featured row */}
              {featured.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {featured.map((p) => (
                    <FeaturedCard key={p.id} product={p} onClick={() => onProductSelect(p.id)} />
                  ))}
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {rest.map((p) => (
                    <ProductCard key={p.id} product={p} onClick={() => onProductSelect(p.id)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </section>
  )
}
