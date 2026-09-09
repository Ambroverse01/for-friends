import { useMemo } from 'react'

const COLORS = ['#b026ff', '#ff2ea6', '#ffd93d', '#4dd6ff', '#7cf29c']

function makePieces(count: number) {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2.5}s`,
    duration: `${2.4 + Math.random() * 2.6}s`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    width: 6 + Math.random() * 6,
    height: 10 + Math.random() * 10,
  }))
}

export default function Confetti({ count = 70 }: { count?: number }) {
  const pieces = useMemo(() => makePieces(count), [count])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="animate-confetti absolute top-0 rounded-[2px]"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
