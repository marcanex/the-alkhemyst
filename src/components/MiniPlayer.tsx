import type { Track } from '../lib/types'
import { formatTime } from '../hooks/useAudioPlayer'

type Props = {
  track: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  onToggle: () => void
  onNext: () => void
  onPrev: () => void
  visible: boolean
}

export function MiniPlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  onToggle,
  onNext,
  onPrev,
  visible,
}: Props) {
  if (!visible || !track) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-purple-500/25 bg-[rgba(8,6,14,0.94)] backdrop-blur-lg"
      role="region"
      aria-label="Mini player"
    >
      <div
        className="h-0.5 bg-purple-900/50"
        aria-hidden
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-orange-500 transition-[width] duration-200"
          style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
        />
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
        {track.coverArt && (
          <img src={track.coverArt} alt="" className="h-11 w-11 rounded object-cover" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{track.title}</p>
          <p className="text-[10px] tabular-nums text-[#8a7a9a]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="btn-ghost !px-2 !py-1.5 text-sm" onClick={onPrev} aria-label="Previous">
            ⏮
          </button>
          <button
            type="button"
            className="btn-primary !px-3 !py-1.5 text-sm"
            onClick={onToggle}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button type="button" className="btn-ghost !px-2 !py-1.5 text-sm" onClick={onNext} aria-label="Next">
            ⏭
          </button>
        </div>
        <a href="#music" className="hidden text-xs text-purple-300 no-underline sm:inline">
          Full player
        </a>
      </div>
    </div>
  )
}
