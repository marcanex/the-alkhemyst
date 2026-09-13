import { Sigil } from './Sigil'
import { ARTIST } from '../lib/demoTracks'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-purple-500/15 bg-[rgba(5,3,8,0.95)] pb-28 pt-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Sigil size={56} className="text-purple-400" />
        <p className="font-display text-sm tracking-[0.25em] text-fog">{ARTIST}</p>
        <p className="max-w-md text-xs text-[#6b5f7a]">
          From erasure, the wellspring rises. Spektor walks.
        </p>
        <p className="text-xs text-[#5a4f68]">
          © {year} {ARTIST}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
