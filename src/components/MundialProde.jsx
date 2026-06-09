import { leaderboard } from '../data/leaderboard'

const WA_NUMBER = '5491153894880'

const rankStyle = (rank) => {
  if (rank === 1) return { rowClass: 'rank-1-row', numClass: 'rank-1', medal: '🥇' }
  if (rank === 2) return { rowClass: 'rank-2-row', numClass: 'rank-2', medal: '🥈' }
  if (rank === 3) return { rowClass: 'rank-3-row', numClass: 'rank-3', medal: '🥉' }
  return { rowClass: '', numClass: 'text-white/40', medal: null }
}

export default function MundialProde() {
  const waMsg = encodeURIComponent('Hola CG5, quiero participar en el Mundial del Prode')
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  return (
    <section id="prode" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(224,64,251,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7B2FBE, #E040FB, transparent)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-magenta-cg text-sm font-semibold uppercase tracking-[4px] mb-3">
            Competencia
          </p>
          <h2 className="font-heading text-5xl sm:text-7xl text-white tracking-wide mb-4">
            Mundial del Prode
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            ¿Te creés el mejor pronosticador? Participá en nuestro torneo de predicciones y ganá una camiseta G5.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Info cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* How it works */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(160deg, #1a1a2e 0%, #111 100%)',
                border: '1px solid rgba(123,47,190,0.25)',
              }}
            >
              <h3
                className="font-heading text-3xl mb-4"
                style={{
                  background: 'linear-gradient(90deg, #E040FB, #7B2FBE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Cómo jugar
              </h3>
              <div className="space-y-4">
                {[
                  { step: '01', text: 'Comprá tu ticket por $1.000 ARS vía WhatsApp' },
                  { step: '02', text: 'Recibís un formulario con los partidos del Mundial' },
                  { step: '03', text: 'Completás tus predicciones antes del inicio' },
                  { step: '04', text: 'Seguí tu posición en el tablero en tiempo real' },
                  { step: '05', text: '¡El ganador se lleva una camiseta G5 gratis!' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 items-start">
                    <span
                      className="font-heading text-lg shrink-0 mt-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #7B2FBE, #E040FB)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {item.step}
                    </span>
                    <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price card */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(123,47,190,0.2) 0%, rgba(224,64,251,0.1) 100%)',
                border: '1px solid rgba(224,64,251,0.3)',
                boxShadow: '0 0 30px rgba(224,64,251,0.1)',
              }}
            >
              <p className="text-white/50 text-sm mb-1">Precio por ticket</p>
              <p
                className="font-heading text-6xl mb-1"
                style={{
                  background: 'linear-gradient(90deg, #E040FB, #7B2FBE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                $1.000
              </p>
              <p className="text-white/40 text-xs mb-4">ARS por ticket</p>


              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-bold text-base text-white transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #7B2FBE, #E040FB)',
                  boxShadow: '0 0 20px rgba(224,64,251,0.4)',
                }}
              >
                🏆 Participar
              </a>
            </div>
          </div>

          {/* Right: Leaderboard */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1a1a2e 0%, #111 100%)',
                border: '1px solid rgba(123,47,190,0.25)',
              }}
            >
              {/* Table header */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, rgba(123,47,190,0.3), rgba(224,64,251,0.15))',
                  borderBottom: '1px solid rgba(123,47,190,0.2)',
                }}
              >
                <span className="text-lg">🏆</span>
                <h3 className="font-heading text-2xl text-white tracking-wide">Tabla de Posiciones</h3>
              </div>

              {/* Column headers */}
              <div className="px-5 py-2 grid grid-cols-12 text-[10px] font-semibold uppercase tracking-widest text-white/30 border-b border-white/5">
                <span className="col-span-1">#</span>
                <span className="col-span-5">Jugador</span>
                <span className="col-span-2 text-center">Tickets</span>
                <span className="col-span-2 text-center">Aciertos</span>
                <span className="col-span-2 text-right">Pts</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {leaderboard.map((entry) => {
                  const { rowClass, numClass, medal } = rankStyle(entry.rank)
                  return (
                    <div
                      key={entry.rank}
                      className={`px-5 py-3 grid grid-cols-12 items-center rounded-none transition-colors hover:bg-white/3 ${rowClass}`}
                    >
                      <span className={`col-span-1 font-heading text-xl ${numClass}`}>
                        {medal || entry.rank}
                      </span>
                      <span className="col-span-5 text-sm text-white/80 font-medium truncate">
                        {entry.name}
                      </span>
                      <span className="col-span-2 text-center text-xs text-white/40">
                        {entry.tickets}
                      </span>
                      <span className="col-span-2 text-center text-xs text-white/50">
                        {entry.correct}
                      </span>
                      <span
                        className="col-span-2 text-right font-heading text-lg"
                        style={
                          entry.rank <= 3
                            ? {
                                background: 'linear-gradient(90deg, #E040FB, #7B2FBE)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }
                            : { color: 'rgba(255,255,255,0.6)' }
                        }
                      >
                        {entry.points}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 text-center text-xs text-white/25"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                Tabla actualizada en tiempo real · Temporada 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
