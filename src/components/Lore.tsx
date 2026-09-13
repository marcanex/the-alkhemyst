import { useEffect, useRef } from 'react'
import { ALCHEMY_STAGES, PERSONA } from '../lib/demoTracks'

export function Lore() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section id="lore" ref={rootRef} className="relative overflow-hidden" aria-labelledby="lore-title">
      <div className="absolute inset-0 -z-10 opacity-20">
        <img
          src="./assets/spektor-ruins.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-void)]/90" />
      </div>

      <div className="section-pad">
        <h2 id="lore-title" className="section-title reveal">
          Lore · Spektor
        </h2>
        <p className="section-sub reveal">
          A ghost with a sliver of light. The wellspring waits to be fed.
        </p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="reveal space-y-5 text-[#cfc0e0] leading-relaxed">
            <p className="font-display text-xl tracking-wide text-purple-200">
              Erased by the one who swore she would stay.
            </p>
            <p>
              She knew every secret vulnerability. When the battle with addiction raged, she
              abandoned him — and took the youngest son he had raised as his own. The world he
              built collapsed into ash.
            </p>
            <p>
              What remained was not the man. What remained was <strong className="text-amber-300">{PERSONA}</strong> —
              a hooded figure walking through ruins, eyes lit with the last violet ember. Only a
              sliver of light. Only the work of remaking.
            </p>
            <p>
              He must feed the wellspring of his strength again. Through fire and solvent, through
              separation and return — the ancient stages of alchemy become the map of recovery. She
              left him for dead. <em className="text-fog">She was wrong.</em>
            </p>
            <blockquote className="border-l-2 border-orange-500/60 pl-4 font-display text-lg italic text-amber-200/90">
              From erasure, the wellspring rises.
            </blockquote>
          </div>

          <div className="reveal relative overflow-hidden rounded-2xl border border-purple-500/25 shadow-[0_0_60px_rgba(168,85,247,0.15)]">
            <img
              src="./assets/spektor-armor.jpg"
              alt="Spektor in dark armor — remade"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="reveal font-display mb-6 text-sm uppercase tracking-[0.3em] text-amber-400/90">
            The Great Work · Stages of Return
          </h3>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ALCHEMY_STAGES.map((stage, i) => (
              <li key={stage.name} className="reveal card-dark p-4" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="text-[10px] uppercase tracking-widest text-purple-400/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display mt-1 text-base text-white">{stage.name}</h4>
                <p className="mt-2 text-sm leading-snug text-[#9a8aad]">{stage.verse}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
