import { useTypewriter } from '../hooks/useTypewriter'

type Props = {
  message: string
  speed?: number
  onDone?: () => void
}

export default function Psycho({ message, speed, onDone }: Props) {
  const shown = useTypewriter(message, speed, onDone)
  const typing = shown.length < message.length

  return (
    <div className="glass animate-pop-in flex items-start gap-3 rounded-3xl p-4 sm:gap-4 sm:p-5">
      <div className="animate-pulse-glow grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-900 text-2xl sm:size-14 sm:text-3xl">
        🔮
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-[0.3em] text-fuchsia-300 uppercase">Psycho</p>
        <p className="mt-1 text-base leading-relaxed break-words text-purple-50 sm:text-lg">
          {shown}
          {typing && <span className="ml-0.5 animate-pulse text-fuchsia-400">▍</span>}
        </p>
      </div>
    </div>
  )
}
