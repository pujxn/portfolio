import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
}

export default function CustomCursor({ mouseX, mouseY }: Props) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  const trailConfig = { damping: 28, stiffness: 120, mass: 1 }
  const tx = useSpring(x, trailConfig)
  const ty = useSpring(y, trailConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y, mouseX, mouseY])

  return (
    <>
      {/* outer ring — trails behind */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          top: -18,
          left: -18,
          x: tx,
          y: ty,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        />
      </motion.div>

      {/* inner dot — snappy */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          top: -2.5,
          left: -2.5,
          x: sx,
          y: sy,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#C9A84C',
            boxShadow: '0 0 8px 2px rgba(201,168,76,0.5)',
          }}
        />
      </motion.div>
    </>
  )
}
