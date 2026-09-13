import { TAGLINE, ARTIST, PERSONA } from '../lib/demoTracks'

export function Hero() {
  const embers = Array.from({ length: 12 }, (_, i) => ({
    left: `${8 + (i * 7.5) % 84}%`,
    bottom: `${10 + (i % 5) * 8}%`,
    delay: `${(i * 0.35) % 3}s`,
    size: 3 + (i % 4),
  }))

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <img
          src="./assets/spektor-hero.jpg"
          alt="Spektor — hooded armored figure with glowing purple eyes"
          className="h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[rgba(5,3,8,0.55)] to-[rgba(10,6,18,0.4)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,3,8,0.85)] via-transparent to-[rgba(88,28,135,0.25)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(192,38,211,0.03) 2px, rgba(192,38,211,0.03) 4px)',
          }}
        />
      </div>

      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: e.left,
            bottom: e.bottom,
            width: e.size,
            height: e.size,
            animationDelay: e.delay,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-32 md:pb-20 md:pt-24">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-amber-400/90">
          Persona · {PERSONA}
        </p>
        <h1
          className="glitch font-display text-4xl font-bold uppercase leading-tight tracking-[0.12em] text-white sm:text-5xl md:text-7xl"
          data-text={ARTIST}
        >
          {ARTIST}
        </h1>
        <p className="mt-5 max-w-xl text-lg font-light text-[#d4c4e8] md:text-xl">
          {TAGLINE}
        </p>
        <p className="mt-3 max-w-lg text-sm text-[#9a8aad]">
          She left him for dead. He walks as ghost and flame — feeding the wellspring until the
          ash remembers his name.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#music" className="btn-primary">
            Listen
          </a>
          <a href="#lore" className="btn-ghost">
            The Story
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-void)] to-transparent"
        aria-hidden
      />
    </section>
  )
}
