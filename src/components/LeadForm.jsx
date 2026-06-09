import { useState } from 'react'
import { IconWhatsApp, IconX } from './Icons'

const WA = '5491153894880'

export default function LeadForm({ product, selectedSize, onClose }) {
  const [name,  setName]  = useState('')
  const [phone, setPhone] = useState('')
  const [sent,  setSent]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const msg = encodeURIComponent(
      `Hola CG5! 👋\n\nMi nombre es *${name.trim()}*${phone ? ` y mi teléfono es ${phone}` : ''}.\n\nQuiero consultar por:\n🔹 *${product.name}* — ${product.subtitle}\n📐 Talle: *${selectedSize}*\n💰 Precio: $${product.price.toLocaleString('es-AR')}\n\n¿Tienen stock disponible?`
    )
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(onClose, 1500)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden"
        style={{ background: '#0f0f1a', border: '1px solid rgba(123,47,190,0.3)', boxShadow: '0 0 60px rgba(123,47,190,0.25)' }}>

        {/* Top bar */}
        <div className="h-1" style={{ background: 'linear-gradient(90deg,#7B2FBE,#E040FB)' }} />

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-heading text-3xl text-white tracking-wide">Casi listo!</h3>
              <p className="text-white/45 text-sm mt-1">Dejanos tus datos y te contactamos por WhatsApp en minutos</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-colors shrink-0 ml-3"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <IconX size={14} />
            </button>
          </div>

          {/* Product summary */}
          <div className="flex items-center gap-3 p-3 rounded-xl mb-6"
            style={{ background: 'rgba(123,47,190,0.08)', border: '1px solid rgba(123,47,190,0.2)' }}>
            <img src={product.images[0]?.src} alt={product.name}
              className="w-14 h-14 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{product.name}</p>
              <p className="text-white/40 text-xs">{product.subtitle} · Talle {selectedSize}</p>
              <p className="font-heading text-xl mt-0.5"
                style={{ background:'linear-gradient(90deg,#E040FB,#7B2FBE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                ${product.price.toLocaleString('es-AR')}
              </p>
            </div>
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-white font-semibold">Abriendo WhatsApp...</p>
              <p className="text-white/40 text-sm mt-1">Te vamos a responder enseguida</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1.5">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="¿Cómo te llamás?"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(224,64,251,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(224,64,251,0.1)' }}
                  onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1.5">
                  Tu teléfono <span className="normal-case text-white/25">(opcional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="11 1234-5678"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(224,64,251,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(224,64,251,0.1)' }}
                  onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button type="submit"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-1"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}>
                <IconWhatsApp size={20} />
                Consultar por WhatsApp
              </button>

              <p className="text-white/20 text-xs text-center">
                Tus datos solo se usan para contactarte. No compartimos tu info.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
