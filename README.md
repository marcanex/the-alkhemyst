# THE ALKHEMYST

Official artist site for **THE ALKHEMYST** (persona: **Spektor**) — dark fantasy electronic, cinematic alchemy aesthetic.

**Tagline:** *From erasure, the wellspring rises.*

Live source: [github.com/marcanex/the-alkhemyst](https://github.com/marcanex/the-alkhemyst)

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
3. **Reset:** “Reset to Demos” clears user uploads from IndexedDB.

## Social links

Edit `SOCIALS` in `src/lib/demoTracks.ts` — replace `#` with real profile URLs.

## Narrative / copy

- Tagline, gallery captions, alchemy stages: `src/lib/demoTracks.ts`
- Lore body: `src/components/Lore.tsx`
- Hero blurb: `src/components/Hero.tsx`

## Deploy

### GitHub Pages

`vite.config.ts` already uses `base: './'` for relative asset paths.

1. Repo **Settings → Pages → Build from GitHub Actions** or deploy `dist/` from `main`.
2. Or locally: `npm run build` and upload `dist/`.

Example Actions workflow (optional — add as `.github/workflows/pages.yml`):

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Vercel / Netlify

- **Vercel:** Import the repo → framework Vite → build `npm run build` → output `dist`.
- **Netlify:** Same; publish directory `dist`.

Forms are client-side demos — connect Formspree, Netlify Forms, or your API before relying on them in production.

## License

Site code: use freely for THE ALKHEMYST. Spektor artwork and music remain the artist’s property.
