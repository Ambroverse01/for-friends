import { useMemo } from 'react'

const EMOJIS = ['🔮', '💀', '😂', '👀', '💸', '🔥', '🤡', '👑', '🌪️', '💅']

type Star = { top: string; left: string; size: number; delay: string; duration: string }
type Floater = { emoji: string; left: string; delay: string; duration: string; size: number }

function makeStars(): Star[] {
  return Array.from({ length: 60 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2.5,
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 3}s`,
  }))
}

function makeFloaters(): Floater[] {
  return Array.from({ length: 14 }, (_, i) => ({
    emoji: EMOJIS[i % EMOJIS.length],
    left: `${Math.random() * 96}%`,
    delay: `${Math.random() * 18}s`,
    duration: `${16 + Math.random() * 14}s`,
    size: 16 + Math.random() * 18,
  }))
}

export default function Backdrop() {
  const stars = useMemo(() => makeStars(), [])
  const floaters = useMemo(() => makeFloaters(), [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
      {floaters.map((f, i) => (
        <span
          key={`floater-${i}`}
          className="animate-float-up absolute bottom-[-10vh] select-none opacity-70"
          style={{
            left: f.left,
            fontSize: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  )
}
