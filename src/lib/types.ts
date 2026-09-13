export interface Track {
  id: string
  title: string
  artist: string
  src: string
  coverArt?: string
  duration?: number
  isDemo?: boolean
  blobKey?: string
  order: number
  createdAt: number
}

export interface StoredBlob {
  id: string
  blob: Blob
  mimeType: string
}

export type AlchemyStage =
  | 'Calcination'
  | 'Dissolution'
  | 'Separation'
  | 'Conjunction'
  | 'Fermentation'
  | 'Distillation'
  | 'Coagulation'

export interface GalleryItem {
  src: string
  alt: string
  caption: string
}

export interface ShowDate {
  id: string
  date: string
  venue: string
  city: string
  ticketUrl?: string
  isSample: boolean
}
