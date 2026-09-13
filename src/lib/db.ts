import type { Track, StoredBlob } from './types'

const DB_NAME = 'alkhemyst-db'
const DB_VERSION = 1
const TRACKS_STORE = 'tracks'
const BLOBS_STORE = 'blobs'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onerror = () => reject(req.error)
    req.onsuccess = () => resolve(req.result)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(TRACKS_STORE)) {
        const store = db.createObjectStore(TRACKS_STORE, { keyPath: 'id' })
        store.createIndex('order', 'order', { unique: false })
      }
      if (!db.objectStoreNames.contains(BLOBS_STORE)) {
        db.createObjectStore(BLOBS_STORE, { keyPath: 'id' })
      }
    }
  })
}

export async function getAllTracks(): Promise<Track[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRACKS_STORE, 'readonly')
    const req = tx.objectStore(TRACKS_STORE).getAll()
    req.onsuccess = () => {
      const tracks = (req.result as Track[]).sort((a, b) => a.order - b.order)
      resolve(tracks)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function saveTrack(track: Track): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRACKS_STORE, 'readwrite')
    tx.objectStore(TRACKS_STORE).put(track)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveTracks(tracks: Track[]): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TRACKS_STORE, 'readwrite')
    const store = tx.objectStore(TRACKS_STORE)
    tracks.forEach((t) => store.put(t))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function deleteTrack(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([TRACKS_STORE, BLOBS_STORE], 'readwrite')
    tx.objectStore(TRACKS_STORE).delete(id)
    tx.objectStore(BLOBS_STORE).delete(id)
    tx.objectStore(BLOBS_STORE).delete(`${id}-cover`)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveBlob(id: string, blob: Blob): Promise<void> {
  const db = await openDB()
  const record: StoredBlob = { id, blob, mimeType: blob.type }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(BLOBS_STORE, 'readwrite')
    tx.objectStore(BLOBS_STORE).put(record)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getBlob(id: string): Promise<Blob | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(BLOBS_STORE, 'readonly')
    const req = tx.objectStore(BLOBS_STORE).get(id)
    req.onsuccess = () => {
      const result = req.result as StoredBlob | undefined
      resolve(result?.blob ?? null)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function clearUserTracks(): Promise<void> {
  const tracks = await getAllTracks()
  for (const t of tracks) {
    if (!t.isDemo) await deleteTrack(t.id)
  }
}
