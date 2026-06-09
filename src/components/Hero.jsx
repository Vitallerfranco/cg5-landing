import { IconWhatsApp, IconShirt } from './Icons'

const WA = '5491153894880'

export default function Hero({ onShopClick }) {
  return (
    <section id="hero" style={{ position:'relative', width:'100%', height:'100vh', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>

      {/* ── Video background ── */}
      <div style={{ position:'absolute', inset:0, zIndex:0, overflow:'hidden' }}>
        <video
          src={`${import.meta.env.BASE_URL}videofondohero.mp4`}
          autoPlay muted loop playsInline
          style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            minWidth:'100%', minHeight:'100%',
            width:'auto', height:'auto',
            objectFit:'cover', pointerEvents:'none',
          }}
        />
      </div>

      {/* Overlay gradients */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background:'linear-gradient(to bottom, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.1) 30%, rgba(8,8,8,0.35) 65%, rgba(8,8,8,0.88) 100%)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        background:'radial-gradient(ellipse 50% 40% at 50% 42%, rgba(123,47,190,0.25) 0%, transparent 70%)' }} />

      {/* ── Main content — perfectly centered ── */}
      <div style={{
        position:'relative', zIndex:10,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        textAlign:'center',
        width:'100%', maxWidth:820,
        padding:'80px 24px 72px',   /* top: clear navbar, bottom: clear deslizá */
        gap:0,
      }}>

        {/* Logo */}
        <img
          src={`${import.meta.env.BASE_URL}logocg5sinfondo.png`}
          alt="CG5"
          draggable={false}
          style={{
            width:'clamp(180px,32vw,420px)',
            marginBottom:'clamp(16px,3vh,32px)',
            filter:'drop-shadow(0 0 45px rgba(224,64,251,0.85)) drop-shadow(0 0 90px rgba(123,47,190,0.5))',
            userSelect:'none',
          }}
        />

        {/* Tagline 1 */}
        <p style={{
          fontSize:'clamp(0.95rem,1.8vw,1.3rem)',
          color:'rgba(255,255,255,0.85)',
          fontWeight:300,
          letterSpacing:'0.05em',
          marginBottom:'0.3rem',
          lineHeight:1.4,
        }}>
          Camisetas de fútbol importadas.
        </p>

        {/* Tagline 2 */}
        <p style={{
          fontSize:'clamp(1.05rem,2.2vw,1.6rem)',
          fontWeight:700,
          marginBottom:'clamp(20px,3.5vh,36px)',
          background:'linear-gradient(90deg,#E040FB,#b04af0)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          letterSpacing:'0.02em',
          lineHeight:1.3,
        }}>
          Calidad G5. Originales al detalle.
        </p>

        {/* Trust badges */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px', marginBottom:'clamp(24px,4vh,40px)' }}>
          {[
            { icon:'★', text:'Calidad G5' },
            { icon:'✓', text:'Importadas' },
            { icon:'↑', text:'+500 ventas' },
            { icon:'→', text:'Envíos nacionales' },
          ].map((b) => (
            <span key={b.text} style={{
              display:'flex', alignItems:'center', gap:6,
              fontSize:'clamp(0.68rem,1.1vw,0.8rem)',
              color:'rgba(255,255,255,0.65)',
              padding:'6px 14px',
              borderRadius:999,
              background:'rgba(255,255,255,0.09)',
              border:'1px solid rgba(255,255,255,0.15)',
              backdropFilter:'blur(8px)',
              whiteSpace:'nowrap',
            }}>
              <span style={{ color:'#E040FB', fontSize:'0.75em' }}>{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
          <button
            onClick={onShopClick}
            style={{
              display:'flex', alignItems:'center', gap:8,
              fontSize:'clamp(0.9rem,1.4vw,1.05rem)',
              fontWeight:700, color:'white',
              padding:'clamp(12px,1.6vh,16px) clamp(28px,3.5vw,44px)',
              borderRadius:999, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#7B2FBE,#E040FB)',
              boxShadow:'0 0 28px rgba(224,64,251,0.5), 0 4px 18px rgba(0,0,0,0.35)',
              transition:'transform 0.2s, box-shadow 0.2s',
              whiteSpace:'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 0 40px rgba(224,64,251,0.65), 0 6px 24px rgba(0,0,0,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 28px rgba(224,64,251,0.5), 0 4px 18px rgba(0,0,0,0.35)' }}
          >
            <IconShirt size={19} color="white" />
            Ver Catálogo
          </button>

          <a
            href={`https://wa.me/${WA}?text=Hola%20CG5!%20Quiero%20consultar`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display:'flex', alignItems:'center', gap:8,
              fontSize:'clamp(0.9rem,1.4vw,1.05rem)',
              fontWeight:700, color:'white', textDecoration:'none',
              padding:'clamp(12px,1.6vh,16px) clamp(28px,3.5vw,44px)',
              borderRadius:999,
              background:'rgba(255,255,255,0.08)',
              border:'1.5px solid rgba(255,255,255,0.25)',
              backdropFilter:'blur(10px)',
              transition:'transform 0.2s, border-color 0.2s',
              whiteSpace:'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.25)' }}
          >
            <IconWhatsApp size={18} />
            Consultar
          </a>
        </div>
      </div>

      {/* Scroll hint — siempre al fondo, nunca interfiere con el contenido */}
      <div style={{
        position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
        zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:6,
        pointerEvents:'none',
        animation:'bounce 2s infinite',
      }}>
        <span style={{ color:'rgba(255,255,255,0.28)', fontSize:'0.58rem', letterSpacing:'0.3em', textTransform:'uppercase' }}>Deslizá</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }`}</style>
    </section>
  )
}
