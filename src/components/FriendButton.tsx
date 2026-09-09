import { FRIEND_EMOJI, type Friend } from '../data/friends'

type Props = {
  friend: Friend
  selected?: boolean
  disabled?: boolean
  onClick: () => void
}

export default function FriendButton({ friend, selected, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        'glass group flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left text-base font-semibold transition-all duration-200 sm:text-lg',
        'min-h-[64px] active:scale-[0.98]',
        selected
          ? 'glow-btn scale-[1.02] border-fuchsia-400/70 bg-fuchsia-500/25'
          : 'hover:border-fuchsia-400/60 hover:bg-white/10',
        disabled && !selected ? 'opacity-45' : '',
      ].join(' ')}
    >
      <span className="text-2xl transition-transform duration-200 group-hover:scale-125">
        {FRIEND_EMOJI[friend]}
      </span>
      <span className="min-w-0 flex-1 break-words">{friend}</span>
      {selected && <span className="text-xl">✅</span>}
    </button>
  )
}
