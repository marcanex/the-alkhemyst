import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from '../lib/types'

export function useAudioPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [isMuted, setIsMuted] = useState(false)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const currentTrack = tracks[currentIndex] ?? null

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => {
      if (currentIndex < tracks.length - 1) {
        setCurrentIndex((i) => i + 1)
      } else {
        setIsPlaying(false)
      }
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    const wasPlaying = isPlaying
    audio.src = currentTrack.src
    audio.load()
    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id, currentTrack?.src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const ensureAnalyser = useCallback(() => {
    const audio = audioRef.current
    if (!audio || analyserRef.current) return analyserRef.current
    try {
      const ctx = new AudioContext()
      ctxRef.current = ctx
      const source = ctx.createMediaElementSource(audio)
      sourceRef.current = source
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyser.connect(ctx.destination)
      analyserRef.current = analyser
      return analyser
    } catch {
      return null
    }
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    ensureAnalyser()
    if (ctxRef.current?.state === 'suspended') await ctxRef.current.resume()
    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [ensureAnalyser])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(time, duration || audio.duration || 0))
    setCurrentTime(audio.currentTime)
  }, [duration])

  const next = useCallback(() => {
    if (tracks.length === 0) return
    setCurrentIndex((i) => (i + 1) % tracks.length)
    setIsPlaying(true)
  }, [tracks.length])

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      seek(0)
      return
    }
    if (tracks.length === 0) return
    setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length)
    setIsPlaying(true)
  }, [tracks.length, seek])

  const playTrack = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      setIsPlaying(true)
      // play after src updates
      requestAnimationFrame(() => {
        play()
      })
    },
    [play],
  )

  useEffect(() => {
    if (isPlaying && audioRef.current?.paused) {
      play()
    }
  }, [currentIndex, isPlaying, play])

  const setVolumeLevel = useCallback((v: number) => {
    setVolume(Math.max(0, Math.min(1, v)))
    if (v > 0) setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => setIsMuted((m) => !m), [])

  return {
    audioRef,
    currentTrack,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    analyserRef,
    play,
    pause,
    toggle,
    seek,
    next,
    prev,
    playTrack,
    setVolumeLevel,
    toggleMute,
    setCurrentIndex,
  }
}

export function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
