import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import ScrambleText from './ScrambleText'

// A big magnetic link that sweeps color on hover
function BigLink({
  href,
  children,
  inView,
  delay = 0,
}: {
  href: string
  children: string
  inView: boolean
  delay?: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)
  const [scramble, setScramble] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 10, stiffness: 140 })
  const sy = useSpring(y, { damping: 10, stiffness: 140 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
    setScramble(false)
  }

  const onEnter = () => {
    setHovered(true)
    setScramble(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.9, ease: 'easeOut' }}
    >
      <motion.a
        ref={ref}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        style={{
          x: sx,
          y: sy,
          display: 'inline-block',
          fontSize: 'clamp(16px, 2.2vw, 32px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          textDecoration: 'none',
          color: hovered ? '#fff' : 'rgba(255,255,255,0.38)',
          cursor: 'none',
          lineHeight: 1.15,
          transition: 'color 0.3s',
          position: 'relative',
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onHoverStart={onEnter}
      >
        {/* Sweep underline */}
        <motion.span
          aria-hidden
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: -4,
            left: 0,
            right: 0,
            height: 1,
            background: 'rgba(255,255,255,0.5)',
            transformOrigin: 'left',
            display: 'block',
          }}
        />

        {/* Chromatic aberration glow on hover */}
        {hovered && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              textShadow: '-2px 0 rgba(255,60,60,0.4), 2px 0 rgba(60,220,255,0.4)',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              letterSpacing: 'inherit',
              lineHeight: 'inherit',
            }}
          >
            {children}
          </span>
        )}

        {scramble ? (
          <ScrambleText key={`scramble-${children}`} text={children} delay={0} />
        ) : (
          children
        )}
      </motion.a>
    </motion.div>
  )
}

// Pulsing ring decoration
function PulseRing() {
  return (
    <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 2.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 1,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: '35%',
          borderRadius: '50%',
          background: '#C9A84C',
          boxShadow: '0 0 10px 2px rgba(201,168,76,0.6)',
        }}
      />
    </div>
  )
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [headingDone, setHeadingDone] = useState(false)

  return (
    <section
      ref={ref}
      style={{
        background: '#050507',
        padding: 'clamp(80px, 14vw, 180px) clamp(24px, 6vw, 96px)',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 'clamp(32px, 6vw, 64px)',
        }}
      >
        <PulseRing />
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            color: '#C9A84C',
            textTransform: 'uppercase',
          }}
        >
          Get in touch
        </span>
      </motion.div>

      {/* Big heading */}
      <div
        style={{
          fontSize: 'clamp(44px, 9vw, 130px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          marginBottom: 'clamp(48px, 8vw, 96px)',
        }}
      >
        {inView && (
          <>
            <div>
              <ScrambleText
                text="WANT TO BUILD"
                delay={0}
                onDone={() => setHeadingDone(true)}
              />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.15)' }}>
              <ScrambleText text="SOMETHING" delay={300} />
            </div>
            <div>
              <ScrambleText text="GREAT?" delay={600} />
            </div>
          </>
        )}
      </div>

      {/* Links */}
      <div style={{ position: 'relative' }}>
        {/* Ambient breathing glow */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            transform: 'translate(-10%, -50%)',
            width: 'clamp(300px, 60vw, 800px)',
            height: 'clamp(160px, 30vw, 400px)',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vw, 12px)' }}>
          <BigLink
            href="mailto:pujan.parikh2209@gmail.com"
            inView={headingDone}
            delay={0}
          >
            pujan.parikh2209@gmail.com
          </BigLink>
          <BigLink
            href="https://github.com/pujxn"
            inView={headingDone}
            delay={0.15}
          >
            github.com/pujxn
          </BigLink>
        </div>
      </div>

      {/* Closing line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={headingDone ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.07)',
          transformOrigin: 'left',
          marginTop: 'clamp(64px, 12vw, 140px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={headingDone ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 24,
          paddingBottom: 8,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
          PUJAN PARIKH © 2025
        </span>
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
          PUNE, IN
        </span>
      </motion.div>
    </section>
  )
}
