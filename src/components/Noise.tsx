import { useEffect, useRef } from 'react'

export default function Noise() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let rafId: number
    let last = 0
    const FPS = 14

    function draw(t: number) {
      rafId = requestAnimationFrame(draw)
      if (t - last < 1000 / FPS) return
      last = t

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const img = ctx.createImageData(canvas.width, canvas.height)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0
        d[i] = v
        d[i + 1] = v
        d[i + 2] = v
        d[i + 3] = (Math.random() * 18) | 0
      }
      ctx.putImageData(img, 0, 0)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 6, opacity: 0.55, mixBlendMode: 'screen' }}
    />
  )
}
