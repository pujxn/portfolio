import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrambleText from './ScrambleText'

const TEXT =
  "4+ years building React applications. Previously at Goldman Sachs. I care about performance, architecture, and interfaces that feel alive."

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
        const randY = 20 + ((i * 73) % 30)

        return (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}
          >
            <motion.span
              style={{
                display: 'inline-block',
                color: isAccented ? '#C9A84C' : undefined,
              }}
              initial={{ y: randY, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
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

function DotGrid() {
  const COLS = 6
  const ROWS = 4
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: 'clamp(8px, 1.4vw, 18px)',
        flexShrink: 0,
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: i % 7 === 0 ? '#C9A84C' : 'rgba(255,255,255,0.12)',
          }}
        />
      ))}
    </div>
  )
}

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

function ScrambleStat({
  value,
  label,
  inView,
  delay,
}: {
  value: string
  label: string
  inView: boolean
  delay: number
}) {
  const [scrambling, setScrambling] = useState(false)
  const [scrambleKey, setScrambleKey] = useState(0)

  const onEnter = () => {
    setScrambling(true)
    setScrambleKey((k) => k + 1)
  }
  const onLeave = () => setScrambling(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      style={{ cursor: 'default' }}
    >
      <div
        style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#C9A84C',
          lineHeight: 1,
          marginBottom: 6,
          minWidth: '2.5ch',
        }}
      >
        {scrambling ? (
          <ScrambleText key={scrambleKey} text={value} delay={0} />
        ) : (
          value
        )}
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
  )
}

function CurrentlyLine({ inView }: { inView: boolean }) {
  const FULL = '> currently: open to frontend roles · pune, india'
  const [displayed, setDisplayed] = useState('')
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(FULL.slice(0, i))
      if (i >= FULL.length) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 1.0, duration: 0.5 }}
      style={{
        fontFamily: 'monospace',
        fontSize: 'clamp(11px, 1.1vw, 14px)',
        color: 'rgba(255,255,255,0.32)',
        marginTop: 'clamp(28px, 4vw, 44px)',
        letterSpacing: '0.03em',
      }}
    >
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: '0.55em',
          height: '1em',
          background: '#C9A84C',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
          animation: 'blink 1s step-end infinite',
          opacity: 0.8,
        }}
      />
    </motion.div>
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
                color: '#C9A84C',
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
          <DotGrid />
        </div>

        {/* Main text */}
        <WordReveal inView={inView} />

        {/* Stats row */}
        <div>
          <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap' }}>
            {[
              { value: '4+', label: 'Years of experience' },
              { value: 'GS', label: 'Goldman Sachs alumnus' },
              { value: '∞', label: 'React renders shipped' },
            ].map(({ value, label }, i) => (
              <ScrambleStat
                key={label}
                value={value}
                label={label}
                inView={inView}
                delay={0.6 + i * 0.12}
              />
            ))}
          </div>
          <CurrentlyLine inView={inView} />
        </div>
      </div>

      <DrawLine inView={inView} delay={0.2} />
    </section>
  )
}
