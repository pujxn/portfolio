import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

interface Props {
  text: string
  delay?: number
  className?: string
  onDone?: () => void
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function ScrambleText({ text, delay = 0, className, onDone }: Props) {
  const [displayed, setDisplayed] = useState(() => text.split('').map(() => randomChar()))
  const doneRef = useRef(false)

  useEffect(() => {
    const chars = text.split('')
    const settled: boolean[] = chars.map(() => false)
    let frameId: number
    let startTime: number | null = null

    const LETTER_STAGGER = 32
    const SCRAMBLE_DURATION = 240

    function animate(ts: number) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime - delay

      if (elapsed < 0) {
        frameId = requestAnimationFrame(animate)
        return
      }

      const next = chars.map((ch, i) => {
        if (ch === ' ') return ' '
        const letterStart = i * LETTER_STAGGER
        const letterElapsed = elapsed - letterStart

        if (letterElapsed > SCRAMBLE_DURATION) {
          settled[i] = true
          return ch
        }
        if (letterElapsed > 0) {
          return randomChar()
        }
        return randomChar()
      })

      setDisplayed(next)

      if (settled.every((s, i) => s || chars[i] === ' ')) {
        if (!doneRef.current) {
          doneRef.current = true
          onDone?.()
        }
        return
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [text, delay, onDone])

  return (
    <span className={className} aria-label={text}>
      {displayed.map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', minWidth: ch === ' ' ? '0.35em' : undefined }}>
          {ch}
        </span>
      ))}
    </span>
  )
}
