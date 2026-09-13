import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Lore } from './components/Lore'
import { Gallery } from './components/Gallery'
import { Shows } from './components/Shows'
import { Connect } from './components/Connect'
import { Footer } from './components/Footer'
import { AudioPlayer } from './components/AudioPlayer'
import { MiniPlayer } from './components/MiniPlayer'
import { useTracks } from './hooks/useTracks'
import { useAudioPlayer } from './hooks/useAudioPlayer'

export default function App() {
  const { tracks, addFiles, renameTrack, removeTrack, reorder, resetToDemos } = useTracks()
  const player = useAudioPlayer(tracks)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#music"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-purple-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to music
      </a>
      <Nav />
      <main>
        <Hero />
        <section id="music" className="section-pad" aria-labelledby="music-title">
          <h2 id="music-title" className="section-title">
            Music
          </h2>
          <p className="section-sub">
            Demo tones of the Great Work — upload your own masters. Player persists uploads in
            IndexedDB.
          </p>
          <AudioPlayer
            tracks={tracks}
            player={player}
            onRename={renameTrack}
            onRemove={removeTrack}
            onReorder={reorder}
            onUpload={addFiles}
            onReset={resetToDemos}
          />
        </section>
        <Lore />
        <Gallery />
        <Shows />
        <Connect />
      </main>
      <Footer />
      <MiniPlayer
        track={player.currentTrack}
        isPlaying={player.isPlaying}
        currentTime={player.currentTime}
        duration={player.duration}
        onToggle={player.toggle}
        onNext={player.next}
        onPrev={player.prev}
        visible={pastHero && !!player.currentTrack}
      />
    </>
  )
}
