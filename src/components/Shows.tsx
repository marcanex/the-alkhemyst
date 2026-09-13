import { useState, type FormEvent } from 'react'
import { SAMPLE_SHOWS } from '../lib/demoTracks'

export function Shows() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="shows" className="section-pad" aria-labelledby="shows-title">
      <h2 id="shows-title" className="section-title">
        Shows
      </h2>
      <p className="section-sub">
        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
          Sample / Example
        </span>{' '}
        dates below are placeholders — request a real booking.
      </p>

      <ul className="mb-12 space-y-3">
        {SAMPLE_SHOWS.map((s) => (
          <li
            key={s.id}
            className="card-dark flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-400/80">
                SAMPLE · {new Date(s.date + 'T12:00:00').toLocaleDateString(undefined, {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="font-display text-lg text-white">{s.venue}</p>
              <p className="text-sm text-[#9a8aad]">{s.city}</p>
            </div>
            <a href={s.ticketUrl} className="btn-ghost !py-2 text-center" aria-disabled="true">
              Tickets (demo)
            </a>
          </li>
        ))}
      </ul>

      <div className="card-dark p-6 md:p-8">
        <h3 className="font-display text-xl tracking-wide text-purple-200">Request a Date</h3>
        <p className="mt-1 text-sm text-[#8a7a9a]">
          Demo form — nothing is sent to a server. Wire to your backend or Formspree later.
        </p>
        {sent ? (
          <p className="mt-6 text-amber-300" role="status">
            Request recorded locally. Thanks — Spektor will answer from the wellspring.
          </p>
        ) : (
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
            <label className="block text-sm">
              <span className="mb-1 block text-[#9a8aad]">Your name</span>
              <input className="input-dark" name="name" required autoComplete="name" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-[#9a8aad]">Email</span>
              <input className="input-dark" name="email" type="email" required autoComplete="email" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-[#9a8aad]">City / Venue</span>
              <input className="input-dark" name="venue" required />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-[#9a8aad]">Preferred date</span>
              <input className="input-dark" name="date" type="date" />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block text-[#9a8aad]">Message</span>
              <textarea className="input-dark min-h-[100px]" name="message" rows={4} />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">
                Send Request
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
