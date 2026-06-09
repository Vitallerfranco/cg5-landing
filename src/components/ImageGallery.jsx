import { useState, useRef, useCallback, useEffect } from 'react'

const ZOOM = 3

export default function ImageGallery({ images, name }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [zoomed, setZoomed]       = useState(false)
  const [pos, setPos]             = useState({ x: 50, y: 50 })
  const [panelPos, setPanelPos]   = useState({ top: 0 })
  const mainRef  = useRef(null)
  const wrapRef  = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  const handleMove = useCallback((e) => {
    if (!mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width)  * 100))
    const y = Math.max(0, Math.min(100, ((clientY - rect.top)  / rect.height) * 100))
    setPos({ x, y })
    if (wrapRef.current) {
      const wr = wrapRef.current.getBoundingClientRect()
      setPanelPos({ top: clientY - wr.top - 150 })
    }
  }, [])

  // Reset on image change
  useEffect(() => { setZoomed(false) }, [activeIdx])

  const img = images[activeIdx]
  if (!img) return null

  // Lens size relative to image (px)
  const lensW = 80, lensH = 80

  return (
    <div ref={wrapRef} className="flex gap-2 sm:gap-3 w-full select-none" style={{ userSelect: 'none' }}>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible pb-1 sm:pb-0">
          {images.map((im, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setActiveIdx(i)}
              className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-150"
              style={{
                border: i === activeIdx ? '2px solid #E040FB' : '2px solid rgba(255,255,255,0.07)',
                boxShadow: i === activeIdx ? '0 0 12px rgba(224,64,251,0.5)' : 'none',
                background: '#0a0a14',
              }}>
              <img src={im.src} alt={`${name} ${im.label}`}
                className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}

      {/* Main image + zoom */}
      <div className="relative flex gap-3 flex-1 min-w-0">

        {/* Main image wrapper */}
        <div ref={mainRef}
          className="relative flex-1 rounded-2xl overflow-hidden"
          style={{
            background: '#0a0a12',
            aspectRatio: '3/4',
            maxHeight: 440,
            cursor: zoomed ? 'crosshair' : 'zoom-in',
          }}
          onMouseEnter={() => !isMobile && setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={handleMove}
        >
          <img src={img.src} alt={`${name} ${img.label}`}
            className="w-full h-full object-cover"
            draggable={false} />

          {/* Zoom lens indicator */}
          {zoomed && (
            <div className="absolute pointer-events-none rounded-sm transition-opacity duration-100"
              style={{
                width: lensW, height: lensH,
                left:  `calc(${pos.x}% - ${lensW / 2}px)`,
                top:   `calc(${pos.y}% - ${lensH / 2}px)`,
                border:     '2px solid rgba(224,64,251,0.8)',
                background: 'rgba(224,64,251,0.08)',
                boxShadow:  '0 0 0 1px rgba(0,0,0,0.5)',
              }} />
          )}

          {/* Label */}
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/60"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
            {img.label}
          </div>

          {/* Zoom hint */}
          {!zoomed && (
            <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-full text-[10px] text-white/30 flex items-center gap-1"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              Zoom
            </div>
          )}
        </div>

        {/* Zoomed preview panel (desktop only) */}
        {zoomed && (
          <div className="hidden sm:block shrink-0 rounded-2xl overflow-hidden pointer-events-none"
            style={{
              width: 280, height: 380,
              background: `#0a0a12 url(${img.src}) ${pos.x}% ${pos.y}% / ${ZOOM * 100}% no-repeat`,
              border: '1px solid rgba(224,64,251,0.3)',
              boxShadow: '0 0 40px rgba(123,47,190,0.25), inset 0 0 0 1px rgba(255,255,255,0.04)',
              position: 'absolute',
              left: 'calc(100% + 12px)',
              top: 0,
              zIndex: 20,
            }} />
        )}
      </div>
    </div>
  )
}
