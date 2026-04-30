import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fill = fillRef.current!
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      fill.style.transform = `scaleY(${total > 0 ? scrolled / total : 0})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 1,
        height: '100vh',
        background: 'rgba(201,168,76,0.1)',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={fillRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#C9A84C',
          transformOrigin: 'top',
          transform: 'scaleY(0)',
          opacity: 0.7,
        }}
      />
    </div>
  )
}
