import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import ParticleField from './ParticleField'
import CustomCursor from './CustomCursor'
import ScrambleText from './ScrambleText'

export default function Hero() {
  const mouseXRef = useRef(window.innerWidth / 2)
  const mouseYRef = useRef(window.innerHeight / 2)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  // For parallax on the text block based on mouse
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { damping: 35, stiffness: 120 })
  const smy = useSpring(my, { damping: 35, stiffness: 120 })
  const rotateX = useTransform(smy, [-1, 1], [3, -3])
  const rotateY = useTransform(smx, [-1, 1], [-4, 4])

  const handleMouseMove = (e: React.MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    mx.set(nx)
    my.set(ny)
  }

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050507' }}
      onMouseMove={handleMouseMove}
    >
      <ParticleField mouseX={mouseXRef} mouseY={mouseYRef} />
      <CustomCursor mouseX={mouseXRef} mouseY={mouseYRef} />

      {/* Radial glow that follows cursor — very subtle */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 500px at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Main text block */}
      <motion.div
        className="relative flex flex-col items-center select-none"
        style={{
          zIndex: 10,
          rotateX,
          rotateY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: subtitleVisible ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            letterSpacing: '0.45em',
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          Senior Software Engineer
        </motion.div>

        {/* Name — the centrepiece */}
        <div
          style={{
            fontSize: 'clamp(52px, 11vw, 148px)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            lineHeight: 0.92,
            color: '#fff',
            position: 'relative',
          }}
        >
          {/* Ghost layer for depth */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.07), transparent 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              pointerEvents: 'none',
              userSelect: 'none',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              letterSpacing: 'inherit',
            }}
          >
            PUJAN PARIKH
          </span>

          <ScrambleText
            text="PUJAN PARIKH"
            delay={200}
            onDone={() => setSubtitleVisible(true)}
          />
        </div>

        {/* Thin rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={subtitleVisible ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            width: 'clamp(200px, 30vw, 420px)',
            height: 1,
            background: 'rgba(255,255,255,0.1)',
            marginTop: 28,
            marginBottom: 28,
            transformOrigin: 'left center',
          }}
        />

        {/* Location + tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={subtitleVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.22)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          Pune · React · 4+ years
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={subtitleVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 10 }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.15)' }}
        />
      </motion.div>

      {/* Corner coordinates — easter egg feel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={subtitleVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 28,
          right: 32,
          fontSize: 9,
          color: 'rgba(255,255,255,0.12)',
          letterSpacing: '0.2em',
          fontFamily: 'monospace',
          zIndex: 10,
        }}
      >
        18.5204° N, 73.8567° E
      </motion.div>
    </div>
  )
}
