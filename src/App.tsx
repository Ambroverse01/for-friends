import { useEffect, useMemo, useState } from 'react'
import Backdrop from './components/Backdrop'
import { FRIENDS, type Friend } from './data/friends'
import { computeResults, type Answers } from './lib/scoring'
import Game from './screens/Game'
import Home from './screens/Home'
import PlayerSelect from './screens/PlayerSelect'
import Results from './screens/Results'

type Screen = 'home' | 'player' | 'game' | 'results'

type SavedGame = {
  screen: Screen
  player: Friend | null
  answers: Answers
}

const STORAGE_KEY = 'simple-psychics-game'

function loadGame(): SavedGame {
  const empty: SavedGame = { screen: 'home', player: null, answers: {} }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as SavedGame
    const validPlayer = parsed.player && FRIENDS.includes(parsed.player) ? parsed.player : null
    if (!validPlayer) return empty
    return { screen: parsed.screen ?? 'home', player: validPlayer, answers: parsed.answers ?? {} }
  } catch {
    return empty
  }
}

export default function App() {
  const [{ screen, player, answers }, setGame] = useState<SavedGame>(loadGame)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, player, answers }))
    } catch {
      // storage unavailable (private mode) — the game still works in memory
    }
  }, [screen, player, answers])

  const results = useMemo(() => computeResults(answers), [answers])

  const goHome = () => setGame({ screen: 'home', player: null, answers: {} })

  return (
    <div className="relative min-h-dvh px-4 pb-16 sm:px-6">
      <Backdrop />
      <main className="relative z-10 mx-auto w-full max-w-4xl">
        {screen === 'home' && (
          <Home onEnter={() => setGame((g) => ({ ...g, screen: 'player' }))} />
        )}

        {screen === 'player' && (
          <PlayerSelect
            onConfirm={(chosen) => setGame({ screen: 'game', player: chosen, answers: {} })}
            onBack={goHome}
          />
        )}

        {screen === 'game' && player && (
          <Game
            player={player}
            answers={answers}
            onAnswer={(questionId, choice) =>
              setGame((g) => ({ ...g, answers: { ...g.answers, [questionId]: choice } }))
            }
            onFinish={() => setGame((g) => ({ ...g, screen: 'results' }))}
            onQuit={goHome}
          />
        )}

        {screen === 'results' && player && (
          <Results
            player={player}
            results={results}
            onPlayAgain={() => setGame({ screen: 'game', player, answers: {} })}
            onSwitchPlayer={() => setGame({ screen: 'player', player: null, answers: {} })}
            onHome={goHome}
          />
        )}

        <footer className="relative z-10 mt-12 text-center text-sm text-purple-300">
          <p>Made with bullshit, friendship &amp; questionable decisions 😂</p>
          <p className="mt-1 text-purple-400">© 2026 Simple Psychics</p>
        </footer>
      </main>
    </div>
  )
}
