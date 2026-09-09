import { useState } from 'react'
import FriendButton from '../components/FriendButton'
import Psycho from '../components/Psycho'
import { FRIENDS, type Friend } from '../data/friends'
import { QUESTIONS } from '../data/questions'
import { randomReaction } from '../data/reactions'
import type { Answers } from '../lib/scoring'

type Props = {
  player: Friend
  answers: Answers
  onAnswer: (questionId: number, choice: Friend) => void
  onFinish: () => void
  onQuit: () => void
}

export default function Game({ player, answers, onAnswer, onFinish, onQuit }: Props) {
  const [index, setIndex] = useState(() => {
    const firstUnanswered = QUESTIONS.findIndex((q) => !answers[q.id])
    return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered
  })
  const [reactionFor, setReactionFor] = useState<{ questionId: number; text: string } | null>(null)
  const [typingDoneFor, setTypingDoneFor] = useState<number | null>(null)

  const question = QUESTIONS[index]
  const choice = answers[question.id]
  const progress = ((index + (choice ? 1 : 0)) / QUESTIONS.length) * 100
  const reaction = reactionFor?.questionId === question.id ? reactionFor.text : null
  const typingDone = typingDoneFor === question.id

  function pick(friend: Friend) {
    if (choice) return
    onAnswer(question.id, friend)
    setReactionFor({
      questionId: question.id,
      text: question.scriptedReaction ?? randomReaction(),
    })
  }

  function next() {
    if (index === QUESTIONS.length - 1) {
      onFinish()
      return
    }
    setIndex((i) => i + 1)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 py-6">
      <div className="flex items-center justify-between text-sm font-bold tracking-widest text-fuchsia-300 uppercase">
        <span>
          Question {index + 1} / {QUESTIONS.length}
        </span>
        <span className="text-purple-300 normal-case">Playing as {player}</span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={[
          'glass animate-pop-in rounded-3xl p-6 sm:p-8',
          question.dramatic ? 'animate-shake border-fuchsia-400/60 bg-fuchsia-500/10' : '',
        ].join(' ')}
      >
        {question.dramatic && (
          <p className="mb-2 text-xs font-black tracking-[0.3em] text-fuchsia-300 uppercase">
            🔥 Final question 🔥
          </p>
        )}
        <h2 className="text-2xl leading-snug font-black sm:text-3xl">{question.text}</h2>
      </div>

      <div className="grid gap-3">
        {FRIENDS.map((f) => (
          <FriendButton
            key={f}
            friend={f}
            selected={choice === f}
            disabled={!!choice}
            onClick={() => pick(f)}
          />
        ))}
      </div>

      {reaction && (
        <Psycho key={reaction} message={reaction} onDone={() => setTypingDoneFor(question.id)} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onQuit}
          className="glass rounded-2xl px-5 py-4 font-semibold transition hover:bg-white/10"
        >
          🏠 QUIT
        </button>
        {choice && (
          <button
            type="button"
            onClick={next}
            disabled={!typingDone}
            className="glow-btn flex-1 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-4 text-lg font-black transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
          >
            {index === QUESTIONS.length - 1 ? 'REVEAL THE DAMAGE 🔮' : 'NEXT QUESTION →'}
          </button>
        )}
      </div>
    </div>
  )
}
