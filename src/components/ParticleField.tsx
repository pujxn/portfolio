import { useEffect, useRef } from 'react'

interface Dot {
  hx: number
  hy: number
  x: number
  y: number
  vx: number
  vy: number
}

interface Props {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
}

const COLS = 32
const ROWS = 22
const REPULSION = 90
const SPRING = 0.055
const DAMPING = 0.78
const DOT_RADIUS = 1.2

export default function ParticleField({ mouseX, mouseY }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let width = 0
    let height = 0

    function buildGrid() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      const cols = COLS
      const rows = ROWS
      const colGap = width / (cols + 1)
      const rowGap = height / (rows + 1)

      dotsRef.current = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = colGap * (c + 1)
          const hy = rowGap * (r + 1)
          dotsRef.current.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 })
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, width, height)

      const mx = mouseX.current
      const my = mouseY.current

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPULSION && dist > 0) {
          const force = (REPULSION - dist) / REPULSION
          dot.vx += (dx / dist) * force * 4
          dot.vy += (dy / dist) * force * 4
        }

        // spring to home
        dot.vx += (dot.hx - dot.x) * SPRING
        dot.vy += (dot.hy - dot.y) * SPRING

        dot.vx *= DAMPING
        dot.vy *= DAMPING
        dot.x += dot.vx
        dot.y += dot.vy

        // brightness based on proximity to cursor
        const dxFinal = dot.x - mx
        const dyFinal = dot.y - my
        const proximity = Math.sqrt(dxFinal * dxFinal + dyFinal * dyFinal)
        const brightness = proximity < 140
          ? 0.12 + 0.35 * (1 - proximity / 140)
          : 0.1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    buildGrid()
    tick()

    const onResize = () => {
      buildGrid()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [mouseX, mouseY])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
