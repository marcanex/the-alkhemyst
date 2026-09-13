import { useEffect, useId } from 'react'
import type { Track } from '../lib/types'
import { formatTime } from '../hooks/useAudioPlayer'
import { Visualizer } from './Visualizer'
import type { RefObject } from 'react'

type PlayerApi = {
  currentTrack: Track | null
  currentIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  analyserRef: RefObject<AnalyserNode | null>
  toggle: () => void
  seek: (t: number) => void
  next: () => void
  prev: () => void
  playTrack: (i: number) => void
  setVolumeLevel: (v: number) => void
  toggleMute: () => void
}

type Props = {
  tracks: Track[]
  player: PlayerApi
  onRename: (id: string, title: string) => void
  onRemove: (id: string) => void
  onReorder: (from: number, to: number) => void
  onUpload: (files: FileList | File[], cover?: File | null) => void
  onReset: () => void
}

export function AudioPlayer({
  tracks,
  player,
  onRename,
  onRemove,
  onReorder,
  onUpload,
  onReset,
}: Props) {
  const scrubId = useId()
  const volId = useId()
  const {
    currentTrack,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    analyserRef,
    toggle,
    seek,
    next,
    prev,
    playTrack,
    setVolumeLevel,
    toggleMute,
  } = player

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.code === 'Space' && (e.target as HTMLElement)?.closest('#music')) {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'ArrowRight' && e.altKey) next()
      if (e.key === 'ArrowLeft' && e.altKey) prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, next, prev])

  return (
    <div className="space-y-6">
      <Visualizer analyserRef={analyserRef} active={isPlaying} />

      <div className="card-dark flex flex-col gap-4 p-5 md:flex-row md:items-center">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-indigo-deep">
          {currentTrack?.coverArt ? (
            <img
              src={currentTrack.coverArt}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-purple-400/50 text-xs">
              No art
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg tracking-wide text-white">
            {currentTrack?.title ?? 'No track'}
          </p>
          <p className="text-sm text-[#9a8aad]">{currentTrack?.artist ?? '—'}</p>

          <div className="mt-3 flex items-center gap-3">
            <span className="w-10 text-xs tabular-nums text-[#8a7a9a]">
              {formatTime(currentTime)}
            </span>
            <label htmlFor={scrubId} className="sr-only">
              Seek
            </label>
            <input
              id={scrubId}
              className="scrub flex-1"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={currentTime}
              aria-label="Seek position"
            />
            <span className="w-10 text-right text-xs tabular-nums text-[#8a7a9a]">
              {formatTime(duration)}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn-ghost !px-3 !py-2"
              onClick={prev}
              aria-label="Previous track"
            >
              ⏮
            </button>
            <button
              type="button"
              className="btn-primary !px-5 !py-2"
              onClick={toggle}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              type="button"
              className="btn-ghost !px-3 !py-2"
              onClick={next}
              aria-label="Next track"
            >
              ⏭
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="btn-ghost !px-2 !py-1 text-xs"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? '🔇' : '🔊'}
              </button>
              <label htmlFor={volId} className="sr-only">
                Volume
              </label>
              <input
                id={volId}
                className="scrub w-24"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                aria-label="Volume"
              />
            </div>
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-wider text-[#6b5f7a]">
            Space (in Music) · Alt+← / Alt+→
          </p>
        </div>
      </div>

      <TrackList
        tracks={tracks}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        onPlay={playTrack}
        onRename={onRename}
        onRemove={onRemove}
        onReorder={onReorder}
      />

      <UploadZone onUpload={onUpload} onReset={onReset} />
    </div>
  )
}

function TrackList({
  tracks,
  currentIndex,
  isPlaying,
  onPlay,
  onRename,
  onRemove,
  onReorder,
}: {
  tracks: Track[]
  currentIndex: number
  isPlaying: boolean
  onPlay: (i: number) => void
  onRename: (id: string, title: string) => void
  onRemove: (id: string) => void
  onReorder: (from: number, to: number) => void
}) {
  return (
    <ul className="space-y-2" aria-label="Track list">
      {tracks.map((t, i) => (
        <li
          key={t.id}
          className={`card-dark flex flex-wrap items-center gap-3 p-3 transition ${
            i === currentIndex ? 'border-purple-500/50 ring-1 ring-purple-500/30' : ''
          }`}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', String(i))}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const from = Number(e.dataTransfer.getData('text/plain'))
            if (!Number.isNaN(from) && from !== i) onReorder(from, i)
          }}
        >
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30 text-sm text-purple-200 hover:bg-purple-600/50"
            onClick={() => onPlay(i)}
            aria-label={i === currentIndex && isPlaying ? `Playing ${t.title}` : `Play ${t.title}`}
          >
            {i === currentIndex && isPlaying ? '⏸' : '▶'}
          </button>
          {t.coverArt && (
            <img src={t.coverArt} alt="" className="h-10 w-10 rounded object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <input
              className="w-full border-0 bg-transparent font-medium text-white outline-none focus:ring-1 focus:ring-purple-500 rounded px-1"
              value={t.title}
              onChange={(e) => onRename(t.id, e.target.value)}
              aria-label={`Rename ${t.title}`}
            />
            <p className="px-1 text-xs text-[#8a7a9a]">
              {t.artist}
              {t.isDemo ? ' · Demo' : ''}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              className="btn-ghost !px-2 !py-1 text-xs"
              disabled={i === 0}
              onClick={() => onReorder(i, i - 1)}
              aria-label="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              className="btn-ghost !px-2 !py-1 text-xs"
              disabled={i === tracks.length - 1}
              onClick={() => onReorder(i, i + 1)}
              aria-label="Move down"
            >
              ↓
            </button>
            <button
              type="button"
              className="btn-ghost !px-2 !py-1 text-xs text-red-300"
              onClick={() => onRemove(t.id)}
              aria-label={`Delete ${t.title}`}
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

function UploadZone({
  onUpload,
  onReset,
}: {
  onUpload: (files: FileList | File[], cover?: File | null) => void
  onReset: () => void
}) {
  return (
    <div
      className="card-dark border-dashed border-purple-500/40 p-6 text-center"
      onDragOver={(e) => {
        e.preventDefault()
        e.currentTarget.classList.add('ring-2', 'ring-purple-500')
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('ring-2', 'ring-purple-500')
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('ring-2', 'ring-purple-500')
        if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files)
      }}
    >
      <p className="font-display text-sm tracking-widest text-purple-300">Upload Tracks</p>
      <p className="mt-2 text-sm text-[#8a7a9a]">
        Drag & drop MP3, WAV, OGG, or M4A — or pick files. Stored in IndexedDB on this device.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <label className="btn-primary cursor-pointer">
          Choose Audio
          <input
            type="file"
            accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/x-m4a,.mp3,.wav,.ogg,.m4a"
            multiple
            className="sr-only"
            onChange={(e) => {
              if (e.target.files?.length) onUpload(e.target.files)
              e.target.value = ''
            }}
          />
        </label>
        <label className="btn-ghost cursor-pointer">
          Optional Cover
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const cover = e.target.files?.[0] ?? null
              const audioInput = document.getElementById('cover-audio-pick') as HTMLInputElement
              audioInput?.click()
              ;(window as unknown as { __pendingCover?: File | null }).__pendingCover = cover
              e.target.value = ''
            }}
          />
        </label>
        <input
          id="cover-audio-pick"
          type="file"
          accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4,.mp3,.wav,.ogg,.m4a"
          multiple
          className="sr-only"
          onChange={(e) => {
            const cover = (window as unknown as { __pendingCover?: File | null }).__pendingCover
            if (e.target.files?.length) onUpload(e.target.files, cover ?? null)
            ;(window as unknown as { __pendingCover?: File | null }).__pendingCover = null
            e.target.value = ''
          }}
        />
        <button type="button" className="btn-ghost text-xs" onClick={onReset}>
          Reset to Demos
        </button>
      </div>
    </div>
  )
}
