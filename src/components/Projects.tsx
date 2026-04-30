import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const PROJECTS = [
  {
    number: '01',
    name: 'FLOWQUERY',
    description:
      'A visual, node-based query builder that compiles to SQL and runs against a real database.',
    tags: ['React', 'ReactFlow', 'TypeScript', 'PostgreSQL', 'Express'],
    github: 'https://github.com/pujxn/flowquery',
  },
  {
    number: '02',
    name: 'PREPGRID',
    description:
      'An AI-powered interview prep tool that generates questions from job descriptions and evaluates your answers.',
    tags: ['React', 'TypeScript', 'Groq', 'TanStack Query'],
    github: 'https://github.com/pujxn/prepgrid',
  },
]

// Letters slide up from behind a clip — each one staggered
function SplitReveal({
  text,
  inView,
  baseDelay = 0,
}: {
  text: string
  inView: boolean
  baseDelay?: number
}) {
  return (
    <span aria-label={text} style={{ display: 'inline-block' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            lineHeight: 1,
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', rotate: 4 }}
            animate={inView ? { y: '0%', rotate: 0 } : {}}
            transition={{
              delay: baseDelay + i * 0.038,
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Magnetic button — pulls toward cursor
function MagneticLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 12, stiffness: 180 })
  const sy = useSpring(y, { damping: 12, stiffness: 180 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.45)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.45)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ x: sx, y: sy, display: 'inline-flex', alignItems: 'center', gap: 8 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <span
        style={{
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hovered ? '#fff' : 'rgba(255,255,255,0.45)',
          transition: 'color 0.25s',
          borderBottom: '1px solid',
          borderColor: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)',
          paddingBottom: 2,
          transitionProperty: 'color, border-color',
        }}
      >
        {children}
      </span>
      <motion.span
        animate={{ x: hovered ? 5 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ fontSize: 14, color: hovered ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'color 0.25s' }}
      >
        →
      </motion.span>
    </motion.a>
  )
}

// Individual project block
function ProjectCard({
  project,
  index,
  activeIndex,
  setActiveIndex,
}: {
  project: (typeof PROJECTS)[number]
  index: number
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  // 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { damping: 20, stiffness: 220 })
  const smy = useSpring(my, { damping: 20, stiffness: 220 })
  const rotX = useTransform(smy, [-0.5, 0.5], [10, -10])
  const rotY = useTransform(smx, [-0.5, 0.5], [-10, 10])

  // Inner cursor glow
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const isInactive = activeIndex !== null && activeIndex !== index

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(nx)
    my.set(ny)
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHovered(false)
    setActiveIndex(null)
  }

  const tagVariants = {
    rest: { y: 0, rotate: 0 },
    hover: (i: number) => ({
      y: [-3, 3, -2, 1, 0],
      rotate: [-4, 4, -2, 1, 0],
      transition: { delay: i * 0.05, duration: 0.45, ease: 'easeOut' },
    }),
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.18 }}
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          perspective: 1200,
          position: 'relative',
          border: '1px solid',
          borderColor: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
          padding: 'clamp(32px, 5vw, 64px)',
          overflow: 'hidden',
          cursor: 'none',
          transition: 'border-color 0.4s, filter 0.5s, opacity 0.5s',
          filter: isInactive ? 'blur(3px)' : 'none',
          opacity: isInactive ? 0.25 : 1,
        }}
        animate={hovered ? 'hover' : 'rest'}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onHoverStart={() => { setHovered(true); setActiveIndex(index) }}
      >
        {/* Inner cursor glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle 380px at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.055), transparent 70%)`,
            transition: 'opacity 0.3s',
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Big background number */}
        <motion.div
          aria-hidden
          animate={hovered ? { scale: 1.04, rotate: 2 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            right: '-2%',
            bottom: '-12%',
            fontSize: 'clamp(140px, 22vw, 320px)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'rgba(255,255,255,0.028)',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '-0.05em',
          }}
        >
          {project.number}
        </motion.div>

        {/* Top row — number + github */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            {project.number}
          </span>
          <MagneticLink href={project.github}>View on GitHub</MagneticLink>
        </div>

        {/* Project name — letter slide-up */}
        <motion.div
          style={{
            fontSize: 'clamp(40px, 7vw, 110px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            marginBottom: 'clamp(20px, 3vw, 36px)',
            textShadow: hovered
              ? '-2px 0 rgba(255,60,60,0.55), 2px 0 rgba(60,220,255,0.55)'
              : 'none',
            transition: 'text-shadow 0.2s',
          }}
        >
          <SplitReveal text={project.name} inView={inView} baseDelay={0.1} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.18 + 0.55, duration: 0.8, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.65,
            maxWidth: 580,
            marginBottom: 'clamp(24px, 4vw, 44px)',
          }}
        >
          {project.description}
        </motion.p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              custom={i}
              variants={tagVariants}
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: index * 0.18 + 0.65 + i * 0.07,
                duration: 0.5,
                type: 'spring',
                stiffness: 320,
                damping: 14,
              }}
              whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0], transition: { duration: 0.3 } }}
              style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <section
      style={{
        background: '#050507',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)',
      }}
    >
      {/* Section heading */}
      <div ref={headingRef} style={{ marginBottom: 'clamp(40px, 8vw, 96px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              width: 60,
              background: 'rgba(255,255,255,0.2)',
              transformOrigin: 'left',
            }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: 11,
              letterSpacing: '0.4em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
            }}
          >
            Selected work
          </motion.span>
        </div>

        <div
          style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            overflow: 'hidden',
          }}
        >
          <SplitReveal text="PROJECTS" inView={headingInView} baseDelay={0.2} />
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.number}
            project={p}
            index={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  )
}
