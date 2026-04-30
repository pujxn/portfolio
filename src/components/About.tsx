import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TEXT =
  "4+ years building React applications. Previously at Goldman Sachs. I care about performance, architecture, and interfaces that feel alive."

// Words that get a brief accent highlight on reveal
const ACCENTED = new Set(['Goldman', 'Sachs', 'alive.', 'performance,'])

function WordReveal({ inView }: { inView: boolean }) {
  const words = TEXT.split(' ')

  return (
    <p
      style={{
        fontSize: 'clamp(22px, 3.5vw, 46px)',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.35,
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      {words.map((word, i) => {
        const isAccented = ACCENTED.has(word)
        const randRotate = ((i * 137) % 9) - 4.5 // deterministic pseudo-random
        const randY = 20 + ((i * 73) % 30)

        return (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}
          >
            <motion.span
              style={{
                display: 'inline-block',
                color: isAccented ? 'rgba(255,255,255,1)' : undefined,
              }}
              initial={{ y: randY, rotate: randRotate, opacity: 0 }}
              animate={
                inView
                  ? { y: 0, rotate: 0, opacity: 1 }
                  : {}
              }
              transition={{
                delay: i * 0.045,
                duration: 0.7,
                type: 'spring',
                stiffness: 240,
                damping: 18,
              }}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}

// Two counter-rotating squares — geometric, precise
function RotatingSquares() {
  const size = 'clamp(80px, 14vw, 160px)'
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '22%',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '47%',
          background: 'rgba(255,255,255,0.5)',
        }}
      />
    </div>
  )
}

// A line that draws itself horizontally
function DrawLine({ inView, delay = 0 }: { inView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        height: 1,
        background: 'rgba(255,255,255,0.08)',
        transformOrigin: 'left',
        width: '100%',
      }}
    />
  )
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <section
      ref={ref}
      style={{
        background: '#050507',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)',
      }}
    >
      <DrawLine inView={inView} delay={0} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px, 7vw, 80px)',
          paddingTop: 'clamp(48px, 8vw, 96px)',
          paddingBottom: 'clamp(48px, 8vw, 96px)',
        }}
      >
        {/* Top row — label + blob */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div ref={headingRef}>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: 11,
                letterSpacing: '0.4em',
                color: 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 16,
              }}
            >
              About me
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: 'rgba(255,255,255,0.12)',
              }}
            >
              WHO
              <br />
              I AM
            </motion.div>
          </div>
          <RotatingSquares />
        </div>

        {/* Main text */}
        <WordReveal inView={inView} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap' }}>
          {[
            { value: '4+', label: 'Years of experience' },
            { value: 'GS', label: 'Goldman Sachs alumni' },
            { value: '∞', label: 'React renders shipped' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.7, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div
                style={{
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.22)',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DrawLine inView={inView} delay={0.2} />
    </section>
  )
}
