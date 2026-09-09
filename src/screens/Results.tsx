import { useEffect, useState } from 'react'
import Confetti from '../components/Confetti'
import { FRIEND_EMOJI, type Friend } from '../data/friends'
import { friendshipVerdict, shareText, type FriendResult } from '../lib/scoring'

const CALCULATING_STEPS = [
  'Calculating friendship damage...',
  'Analyzing bullshit...',
  'Consulting the psychic...',
  'Oh fuck...',
  'THE RESULTS ARE IN.',
]

const MEDALS = ['🥇', '🥈', '🥉', '🏳️']

type Props = {
  player: Friend
  results: FriendResult[]
  onPlayAgain: () => void
  onSwitchPlayer: () => void
  onHome: () => void
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold tracking-wider text-purple-200 uppercase">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-300 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function Results({
  player,
  results,
  onPlayAgain,
  onSwitchPlayer,
  onHome,
}: Props) {
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const [copied, setCopied] = useState(false)

  const calculating = step < CALCULATING_STEPS.length

  useEffect(() => {
    if (!calculating) return
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 3 ? 1500 : 1100)
    return () => window.clearTimeout(id)
  }, [step, calculating])

  useEffect(() => {
    if (calculating || revealed >= results.length) return
    const id = window.setTimeout(() => setRevealed((r) => r + 1), 900)
    return () => window.clearTimeout(id)
  }, [calculating, revealed, results.length])

  async function share() {
    const text = shareText(player, results)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Simple Psychics 🔮', text })
        return
      } catch {
        // user dismissed the share sheet — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      window.prompt('Copy your results:', text)
    }
  }

  if (calculating) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <div className="animate-pulse-glow grid size-24 place-items-center rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-900 text-5xl">
          🔮
        </div>
        <p
          key={step}
          className="glow-text animate-pop-in max-w-xl text-3xl font-black sm:text-4xl"
        >
          {CALCULATING_STEPS[step]}
        </p>
      </div>
    )
  }

  const ordered = results.slice().reverse()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-8">
      {revealed >= results.length && <Confetti />}

      <h2 className="glow-text text-center text-4xl font-black sm:text-5xl">🔮 PSYCHIC RESULTS 🔮</h2>
      <h3 className="text-center text-xl font-bold text-fuchsia-300 sm:text-2xl">
        🏆 FRIENDSHIP CHAOS RANKING
      </h3>

      <div className="flex flex-col gap-4">
        {ordered.map((r) => {
          const rank = results.indexOf(r)
          const isVisible = revealed >= results.length - rank
          if (!isVisible) {
            return (
              <div
                key={r.name}
                className="glass grid h-24 place-items-center rounded-3xl text-2xl opacity-60"
              >
                🔮 ...
              </div>
            )
          }
          const top = rank === 0
          return (
            <div
              key={r.name}
              className={[
                'glass animate-pop-in rounded-3xl p-5 sm:p-6',
                top ? 'animate-pulse-glow border-fuchsia-400/70 bg-fuchsia-500/15' : '',
              ].join(' ')}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className={top ? 'text-5xl' : 'text-3xl'}>{MEDALS[rank]}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-[0.3em] text-purple-300 uppercase">
                    #{rank + 1}
                  </p>
                  <p
                    className={[
                      'font-black break-words',
                      top ? 'glow-text text-3xl sm:text-4xl' : 'text-2xl',
                    ].join(' ')}
                  >
                    {FRIEND_EMOJI[r.name]} {r.name}
                  </p>
                  <p className="mt-1 text-lg font-bold text-fuchsia-300">{r.title}</p>
                </div>
              </div>

              <p className="mt-4 text-base leading-relaxed text-purple-100">{r.verdict}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <StatBar label="Bitch Score" value={r.bitch} />
                <StatBar label="Drama Level" value={r.drama} />
                <StatBar label="Rich Energy" value={r.rich} />
                <StatBar label="Chaos Level" value={r.chaos} />
                <div className="sm:col-span-2">
                  <StatBar label="Overall Friendship Threat" value={r.threat} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {revealed >= results.length && (
        <div className="glass animate-pop-in rounded-3xl p-6">
          <h3 className="text-center text-2xl font-black text-fuchsia-300">
            🔮 FINAL PSYCHIC VERDICT
          </h3>
          <p className="mt-3 text-base leading-relaxed text-purple-100 sm:text-lg">
            {friendshipVerdict(results)}
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onPlayAgain}
          className="glow-btn rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-4 font-black transition-transform hover:scale-[1.02] active:scale-95"
        >
          🔄 PLAY AGAIN
        </button>
        <button
          type="button"
          onClick={share}
          className="glass rounded-2xl px-5 py-4 font-black transition hover:bg-white/10"
        >
          {copied ? '✅ COPIED TO CLIPBOARD' : '📸 SHARE RESULTS'}
        </button>
        <button
          type="button"
          onClick={onSwitchPlayer}
          className="glass rounded-2xl px-5 py-4 font-black transition hover:bg-white/10"
        >
          👥 TRY WITH ANOTHER FRIEND
        </button>
        <button
          type="button"
          onClick={onHome}
          className="glass rounded-2xl px-5 py-4 font-black transition hover:bg-white/10"
        >
          🏠 BACK TO HOME
        </button>
      </div>
    </div>
  )
}
