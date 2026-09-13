import { useState, type FormEvent } from 'react'
import { SOCIALS } from '../lib/demoTracks'

export function Connect() {
  const [newsSent, setNewsSent] = useState(false)
  const [contactSent, setContactSent] = useState(false)

  return (
    <section id="connect" className="section-pad" aria-labelledby="connect-title">
      <h2 id="connect-title" className="section-title">
        Connect
      </h2>
      <p className="section-sub">Follow the signal. Feed the wellspring.</p>

      <ul className="mb-12 flex flex-wrap gap-3" aria-label="Social links">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              className="btn-ghost !py-2"
              aria-label={`${s.label} (placeholder)`}
              onClick={(e) => e.preventDefault()}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card-dark p-6">
          <h3 className="font-display text-lg text-purple-200">Newsletter</h3>
          <p className="mt-1 text-sm text-[#8a7a9a]">Demo UI — no backend. Swap for Mailchimp / Buttondown.</p>
          {newsSent ? (
            <p className="mt-4 text-amber-300" role="status">
              Subscribed (local demo). Welcome to the circle.
            </p>
          ) : (
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e: FormEvent) => {
                e.preventDefault()
                setNewsSent(true)
              }}
            >
              <label className="sr-only" htmlFor="news-email">
                Email
              </label>
              <input
                id="news-email"
                className="input-dark flex-1"
                type="email"
                required
                placeholder="you@realm.void"
                autoComplete="email"
              />
              <button type="submit" className="btn-primary shrink-0">
                Join
              </button>
            </form>
          )}
        </div>

        <div className="card-dark p-6">
          <h3 className="font-display text-lg text-purple-200">Contact</h3>
          <p className="mt-1 text-sm text-[#8a7a9a]">Demo form — wire to your email API when ready.</p>
          {contactSent ? (
            <p className="mt-4 text-amber-300" role="status">
              Message held in the crucible (demo only).
            </p>
          ) : (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e: FormEvent) => {
                e.preventDefault()
                setContactSent(true)
              }}
            >
              <label className="block text-sm">
                <span className="mb-1 block text-[#9a8aad]">Name</span>
                <input className="input-dark" name="name" required />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-[#9a8aad]">Email</span>
                <input className="input-dark" name="email" type="email" required />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-[#9a8aad]">Message</span>
                <textarea className="input-dark min-h-[80px]" name="message" required />
              </label>
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
