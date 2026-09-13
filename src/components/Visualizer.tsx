import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type Props = {
  analyserRef: RefObject<AnalyserNode | null>
  active: boolean
}

export function Visualizer({ analyserRef, active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      const analyser = analyserRef.current
      if (!analyser || !active || prefersReduced) {
        // idle glow line
        const g = ctx.createLinearGradient(0, 0, width, 0)
        g.addColorStop(0, 'rgba(168,85,247,0.1)')
        g.addColorStop(0.5, 'rgba(249,115,22,0.25)')
        g.addColorStop(1, 'rgba(168,85,247,0.1)')
        ctx.strokeStyle = g
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const bins = analyser.frequencyBinCount
      const data = new Uint8Array(bins)
      analyser.getByteFrequencyData(data)

      const barW = width / (bins * 0.45)
      for (let i = 0; i < bins * 0.45; i++) {
        const v = data[i] / 255
        const h = Math.max(2, v * height * 0.9)
        const x = i * barW
        const y = (height - h) / 2
        const grad = ctx.createLinearGradient(x, y, x, y + h)
        grad.addColorStop(0, `rgba(251,191,36,${0.3 + v * 0.7})`)
        grad.addColorStop(0.4, `rgba(192,38,211,${0.4 + v * 0.5})`)
        grad.addColorStop(1, `rgba(34,211,238,${0.2 + v * 0.4})`)
        ctx.fillStyle = grad
        ctx.fillRect(x, y, Math.max(1, barW - 1), h)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [analyserRef, active])

  return (
    <canvas
      ref={canvasRef}
      className="h-16 w-full rounded-lg opacity-90"
      aria-hidden="true"
    />
  )
}
