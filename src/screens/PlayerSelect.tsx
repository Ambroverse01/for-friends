import { useState } from 'react'
import FriendButton from '../components/FriendButton'
import Psycho from '../components/Psycho'
import { FRIENDS, type Friend } from '../data/friends'

type Props = {
  onConfirm: (player: Friend) => void
  onBack: () => void
}

export default function PlayerSelect({ onConfirm, onBack }: Props) {
  const [picked, setPicked] = useState<Friend | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 py-8">
      <Psycho message="You will answer 15 completely scientific questions that were absolutely NOT invented to start friendship drama. Choose carefully. Your answers will affect the final ranking." />

      <h2 className="glow-text text-center text-3xl font-black sm:text-4xl">Who are you? 👀</h2>

      <div className="grid gap-3">
        {FRIENDS.map((f) => (
          <FriendButton
            key={f}
            friend={f}
            selected={picked === f}
            onClick={() => setPicked(f)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="glass rounded-2xl px-6 py-4 font-semibold transition hover:bg-white/10"
        >
          🏠 BACK TO HOME
        </button>
        <button
          type="button"
          disabled={!picked}
          onClick={() => picked && onConfirm(picked)}
          className="glow-btn flex-1 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-4 text-lg font-black transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
        >
          START THE INVESTIGATION 🔮
        </button>
      </div>
    </div>
  )
}
