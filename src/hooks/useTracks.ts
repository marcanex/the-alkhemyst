import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from '../lib/types'
import { DEMO_TRACKS } from '../lib/demoTracks'
import {
  deleteTrack,
  getAllTracks,
  getBlob,
  saveBlob,
  saveTrack,
  saveTracks,
} from '../lib/db'

function uid() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>(DEMO_TRACKS)
  const [ready, setReady] = useState(false)
  const urlsRef = useRef(new Set<string>())
  const tracksRef = useRef(tracks)
  tracksRef.current = tracks

  const revokeAll = () => {
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u))
    urlsRef.current.clear()
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const stored = await getAllTracks()
        if (cancelled) return
        if (stored.length === 0) {
          setTracks(DEMO_TRACKS)
          setReady(true)
          return
        }
        const hydrated: Track[] = []
        for (const t of stored) {
          if (t.isDemo) {
            const demo = DEMO_TRACKS.find((d) => d.id === t.id)
            hydrated.push(demo ? { ...demo, order: t.order } : t)
            continue
          }
          const audioBlob = await getBlob(t.blobKey ?? t.id)
          let src = t.src
          if (audioBlob) {
            src = URL.createObjectURL(audioBlob)
            urlsRef.current.add(src)
          }
          let coverArt = t.coverArt
          if (coverArt?.startsWith('idb:')) {
            const coverBlob = await getBlob(coverArt.slice(4))
            if (coverBlob) {
              coverArt = URL.createObjectURL(coverBlob)
              urlsRef.current.add(coverArt)
            }
          }
          hydrated.push({ ...t, src, coverArt })
        }
        setTracks(
          hydrated.length > 0
            ? hydrated.sort((a, b) => a.order - b.order)
            : DEMO_TRACKS,
        )
      } catch {
        if (!cancelled) setTracks(DEMO_TRACKS)
      } finally {
        if (!cancelled) setReady(true)
      }
    })()
    return () => {
      cancelled = true
      revokeAll()
    }
  }, [])

  const addFiles = useCallback(async (files: FileList | File[], coverFile?: File | null) => {
    const list = Array.from(files).filter(
      (f) => /audio\//.test(f.type) || /\.(mp3|wav|ogg|m4a|aac)$/i.test(f.name),
    )
    if (list.length === 0) return

    let coverUrl: string | undefined
    let coverKey: string | undefined
    if (coverFile?.type.startsWith('image/')) {
      coverKey = `cover-${uid()}`
      await saveBlob(coverKey, coverFile)
      coverUrl = URL.createObjectURL(coverFile)
      urlsRef.current.add(coverUrl)
    }

    const prevLen = tracksRef.current.length
    const created: Track[] = []

    for (let i = 0; i < list.length; i++) {
      const file = list[i]
      const id = uid()
      await saveBlob(id, file)
      const src = URL.createObjectURL(file)
      urlsRef.current.add(src)
      const title = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
      const track: Track = {
        id,
        title,
        artist: 'THE ALKHEMYST',
        src,
        coverArt: coverUrl,
        blobKey: id,
        isDemo: false,
        order: prevLen + i,
        createdAt: Date.now(),
      }
      await saveTrack({
        ...track,
        src: `idb:${id}`,
        coverArt: coverKey ? `idb:${coverKey}` : undefined,
      })
      created.push(track)
    }
    setTracks((prev) => [...prev, ...created].map((t, i) => ({ ...t, order: i })))
  }, [])

  const renameTrack = useCallback(async (id: string, title: string) => {
    setTracks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)))
    const stored = (await getAllTracks()).find((s) => s.id === id)
    if (stored && !stored.isDemo) {
      await saveTrack({ ...stored, title })
    }
  }, [])

  const removeTrack = useCallback(async (id: string) => {
    const stored = (await getAllTracks()).find((s) => s.id === id)
    if (stored && !stored.isDemo) await deleteTrack(id)
    setTracks((prev) => prev.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })))
  }, [])

  const reorder = useCallback(async (from: number, to: number) => {
    const snapshot = [...tracksRef.current]
    const [item] = snapshot.splice(from, 1)
    snapshot.splice(to, 0, item)
    const ordered = snapshot.map((t, i) => ({ ...t, order: i }))
    setTracks(ordered)

    const stored = await getAllTracks()
    const toSave = ordered.map((t) => {
      if (t.isDemo) {
        const demo = DEMO_TRACKS.find((d) => d.id === t.id)!
        return { ...demo, order: t.order }
      }
      const s = stored.find((x) => x.id === t.id)
      return {
        ...t,
        src: s?.src ?? `idb:${t.id}`,
        coverArt: s?.coverArt,
        order: t.order,
      }
    })
    await saveTracks(toSave)
  }, [])

  const resetToDemos = useCallback(async () => {
    const stored = await getAllTracks()
    for (const t of stored) await deleteTrack(t.id)
    revokeAll()
    setTracks(DEMO_TRACKS)
  }, [])

  return { tracks, ready, addFiles, renameTrack, removeTrack, reorder, resetToDemos }
}
