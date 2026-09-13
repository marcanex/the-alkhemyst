# THE ALKHEMYST

Official artist site for **THE ALKHEMYST** (persona: **Spektor**) — dark fantasy electronic, cinematic alchemy aesthetic.

**Tagline:** *From erasure, the wellspring rises.*

- **Live site:** [https://marcanex.github.io/the-alkhemyst/](https://marcanex.github.io/the-alkhemyst/)
- **Source:** [github.com/marcanex/the-alkhemyst](https://github.com/marcanex/the-alkhemyst)

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Client-only (no backend)
- IndexedDB for uploaded audio + optional cover art

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Features

- Cinematic full-viewport hero with Spektor art, purple glow, embers, subtle glitch
- Sticky nav + mobile menu
- Custom accessible audio player (play/pause, prev/next, scrubber, volume, times, keyboard)
- Sticky mini-player after scrolling past the hero
- Canvas frequency visualizer (purple / ember / cyan)
- Drag-drop + file picker uploads (mp3 / wav / ogg / m4a), rename, delete, reorder
- IndexedDB persistence for uploads; demo WAV tones ship in `public/assets/`
- Lore / Spektor narrative with alchemy-stage map (Calcination → Coagulation)
- Gallery with accessible lightbox (Esc / arrows)
- Sample show cards + request-a-date demo form
- Connect: social placeholders, newsletter + contact demo UIs
- Favicon sigil, OG/meta tags, reduced-motion respect, responsive layout

## Swapping art

Replace files under `public/assets/`:

| File | Role |
|------|------|
| `spektor-hero.jpg` | Hero background |
| `spektor-ruins.jpg` | Lore backdrop + gallery |
| `spektor-ember.jpg` | Gallery / demo cover |
| `spektor-glitch.jpg` | Gallery |
| `spektor-armor.jpg` | Lore feature + gallery |
| `spektor-portrait.jpg` | Gallery / demo cover |

Keep filenames or update paths in `src/lib/demoTracks.ts` and `src/components/Hero.tsx`.

## Swapping / adding tracks

1. **In the browser:** use Upload on the Music section (persists in IndexedDB for that browser).
2. **As shipped demos:** replace or add WAV/MP3 under `public/assets/` and edit `DEMO_TRACKS` in `src/lib/demoTracks.ts`.
3. **Reset:** “Reset Library” clears user uploads from IndexedDB.

## Social links

Edit `SOCIALS` in `src/lib/demoTracks.ts` — replace `#` with real profile URLs.

## Narrative / copy

- Tagline, gallery captions, alchemy stages: `src/lib/demoTracks.ts`
- Lore body: `src/components/Lore.tsx`
- Hero blurb: `src/components/Hero.tsx`

## Deploy

### GitHub Pages (current setup)

Live URL: **https://marcanex.github.io/the-alkhemyst/**

`vite.config.ts` uses `base: '/the-alkhemyst/'` for project Pages under `username.github.io/repo/`.

Redeploy after changes:

```bash
npm run deploy
```

That runs `npm run build` and publishes `dist/` to the `gh-pages` branch (root).

Repo **Settings → Pages** should use:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **/** (root)

If Pages is not enabled yet, after the `gh-pages` branch exists:

1. Open https://github.com/marcanex/the-alkhemyst/settings/pages
2. Set source to branch `gh-pages`, folder `/` (root)
3. Save — site should appear at the URL above within a minute or two

### Vercel / Netlify

- **Vercel:** Import the repo → framework Vite → build `npm run build` → output `dist`. Set base in Vite if the site is not at the domain root.
- **Netlify:** Same; publish directory `dist`.

Forms are client-side demos — connect Formspree, Netlify Forms, or your API before relying on them in production.

## License

Site code: use freely for THE ALKHEMYST. Spektor artwork and music remain the artist’s property.
