import { useCallback, useEffect, useState } from 'react'
import { GALLERY_ITEMS } from '../lib/demoTracks'

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)),
    [],
  )
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length)),
    [],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, prev, next])

  const item = open !== null ? GALLERY_ITEMS[open] : null

  return (
    <section id="gallery" className="section-pad" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="section-title">
        Gallery
      </h2>
      <p className="section-sub">Official Spektor art — ruins, fire, and the violet gaze.</p>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {GALLERY_ITEMS.map((g, i) => (
          <li key={g.src}>
            <button
              type="button"
              className="group relative block w-full overflow-hidden rounded-xl border border-purple-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              onClick={() => setOpen(i)}
              aria-label={`Open lightbox: ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-0 left-0 right-0 p-3 text-left text-xs text-[#e0d4f0] md:text-sm">
                {g.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {item && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 btn-ghost !px-3 !py-2"
            onClick={close}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 btn-ghost !px-3 !py-3 md:left-6"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 btn-ghost !px-3 !py-3 md:right-6"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next image"
          >
            →
          </button>
          <figure
            className="max-h-[90vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-[#c4b5fd]">
              {item.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
