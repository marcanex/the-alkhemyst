import type { Track } from './types'

export const DEMO_TRACKS: Track[] = [
  {
    id: 'demo-calcination',
    title: 'Calcination',
    artist: 'THE ALKHEMYST',
    src: './assets/demo-calcination.wav',
    coverArt: './assets/spektor-ember.jpg',
    isDemo: true,
    order: 0,
    createdAt: 0,
  },
  {
    id: 'demo-dissolution',
    title: 'Dissolution',
    artist: 'THE ALKHEMYST',
    src: './assets/demo-dissolution.wav',
    coverArt: './assets/spektor-ruins.jpg',
    isDemo: true,
    order: 1,
    createdAt: 0,
  },
  {
    id: 'demo-coagulation',
    title: 'Coagulation',
    artist: 'THE ALKHEMYST',
    src: './assets/demo-coagulation.wav',
    coverArt: './assets/spektor-armor.jpg',
    isDemo: true,
    order: 2,
    createdAt: 0,
  },
  {
    id: 'demo-wellspring',
    title: 'The Wellspring',
    artist: 'THE ALKHEMYST',
    src: './assets/demo-wellspring.wav',
    coverArt: './assets/spektor-portrait.jpg',
    isDemo: true,
    order: 3,
    createdAt: 0,
  },
]

export const GALLERY_ITEMS = [
  {
    src: './assets/spektor-hero.jpg',
    alt: 'Spektor — hooded armored figure with purple eyes amid ruins',
    caption: 'The Ghost — Spektor stands where the old self burned',
  },
  {
    src: './assets/spektor-ruins.jpg',
    alt: 'Spektor among shattered ruins and ember light',
    caption: 'Ruins of the sworn — ash where vows once stood',
  },
  {
    src: './assets/spektor-ember.jpg',
    alt: 'Spektor wreathed in fire and purple glow',
    caption: 'Calcination — the false self feeds the flame',
  },
  {
    src: './assets/spektor-glitch.jpg',
    alt: 'Spektor with digital glitch and magenta distortion',
    caption: 'Between frequencies — the signal that refuses silence',
  },
  {
    src: './assets/spektor-armor.jpg',
    alt: 'Spektor in dark armor under indigo sky',
    caption: 'Forged again — plate over the wellspring',
  },
  {
    src: './assets/spektor-portrait.jpg',
    alt: 'Close portrait of Spektor with luminous purple eyes',
    caption: 'A sliver of light — the eyes that still see',
  },
]

export const SAMPLE_SHOWS = [
  {
    id: 's1',
    date: '2026-10-31',
    venue: 'The Crucible (SAMPLE)',
    city: 'Los Angeles, CA',
    ticketUrl: '#',
    isSample: true,
  },
  {
    id: 's2',
    date: '2026-11-15',
    venue: 'Void Temple (SAMPLE)',
    city: 'Berlin, DE',
    ticketUrl: '#',
    isSample: true,
  },
  {
    id: 's3',
    date: '2026-12-21',
    venue: 'Ember Hall (SAMPLE)',
    city: 'New York, NY',
    ticketUrl: '#',
    isSample: true,
  },
]

export const ALCHEMY_STAGES = [
  {
    name: 'Calcination',
    verse: 'Fire takes what was performed. The mask cracks. Ash remembers the shape of the face.',
  },
  {
    name: 'Dissolution',
    verse: 'What remains dissolves into truth. Tears become solvent. The wellspring stirs beneath.',
  },
  {
    name: 'Separation',
    verse: 'He sorts the gold from the poison — love from the lie that wore its clothes.',
  },
  {
    name: 'Conjunction',
    verse: 'Ghost meets flame. Spektor is not the man who fell; he is the one who walks.',
  },
  {
    name: 'Fermentation',
    verse: 'In the dark, new life ferments. Grief becomes fuel. Silence becomes song.',
  },
  {
    name: 'Distillation',
    verse: 'Again and again, the essence rises — purer, sharper, a blade of light.',
  },
  {
    name: 'Coagulation',
    verse: 'Body and spirit set. The wellspring feeds. She left him for dead. She was wrong.',
  },
]

export const SOCIALS = [
  { name: 'Spotify', href: '#', label: 'Spotify' },
  { name: 'Apple Music', href: '#', label: 'Apple Music' },
  { name: 'YouTube', href: '#', label: 'YouTube' },
  { name: 'Instagram', href: '#', label: 'Instagram' },
  { name: 'X', href: '#', label: 'X / Twitter' },
  { name: 'Bandcamp', href: '#', label: 'Bandcamp' },
]

export const TAGLINE = 'From erasure, the wellspring rises.'
export const ARTIST = 'THE ALKHEMYST'
export const PERSONA = 'Spektor'
