import { FRIENDS, type Friend } from '../data/friends'
import { QUESTIONS, type Category } from '../data/questions'

export type Answers = Partial<Record<number, Friend>>

export type FriendResult = {
  name: Friend
  bitch: number
  drama: number
  rich: number
  chaos: number
  threat: number
  title: string
  verdict: string
  picks: number
}

const CATEGORIES: Category[] = [
  'bitch',
  'drama',
  'rich',
  'madness',
  'attention',
  'trouble',
  'innocence',
  'friendship',
]

function maxFor(category: Category): number {
  return QUESTIONS.reduce((sum, q) => {
    const w = q.weights[category] ?? 0
    return sum + Math.abs(w)
  }, 0)
}

function pct(raw: number, category: Category | Category[]): number {
  const cats = Array.isArray(category) ? category : [category]
  const max = cats.reduce((sum, c) => sum + maxFor(c), 0)
  if (max === 0) return 0
  // Map [-max, max] onto a lively 8%-99% band so nobody is ever a boring 0.
  const normalised = (raw + max) / (2 * max)
  return Math.round(8 + normalised * 91)
}

const TOP_TITLES = [
  'THE SUPREME BITCH 👑💀',
  'CEO of Bullshit 🤡',
  'Minister of Drama 🎭',
  'Chaos Department Manager 🌪️',
]

const MID_TITLES = [
  'Professional Menace 😈',
  'Certified Trouble Maker 🚨',
  'Friendship Criminal 🚔',
  'The Quiet Problem 🤫',
]

const LOW_TITLES = [
  'Suspiciously Innocent 😇',
  'The Allegedly Innocent One 🕊️',
  'Emotional Support Friend 🧸',
  'Witness Protection Program 🫥',
]

function titleFor(rank: number, name: Friend): number {
  // Deterministic-but-varied pick so the same person doesn't always get the same label.
  return (rank + name.length) % 4
}

function verdictFor(result: Omit<FriendResult, 'title' | 'verdict'>, rank: number): string {
  const { name, bitch, drama, rich, chaos } = result
  if (rank === 0) {
    return `According to completely unverified psychic science, ${name} has been identified as the biggest source of chaos in this friendship. An impressive ${bitch}% level of bullshit that the AI can no longer ignore. Danger level: FUCKING HIGH.`
  }
  if (rank === 1) {
    return `${name} came dangerously close to the crown. ${drama}% drama, ${chaos}% chaos and a permanent seat in the friendship court. Not innocent. Just slower.`
  }
  if (rank === 2) {
    return `${name} is doing a fantastic job of looking normal. ${rich}% rich energy, ${bitch}% quiet bitchiness. The psychic is not convinced, but there is not enough evidence today.`
  }
  return `${name} somehow escaped this investigation with only ${bitch}% bitch energy. Either genuinely innocent, or the smartest criminal in the group. The crystal ball says... probably the second one.`
}

export function computeResults(answers: Answers): FriendResult[] {
  const totals = new Map<Friend, Record<Category, number>>()
  const picks = new Map<Friend, number>()
  for (const f of FRIENDS) {
    totals.set(f, Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<Category, number>)
    picks.set(f, 0)
  }

  for (const q of QUESTIONS) {
    const chosen = answers[q.id]
    if (!chosen) continue
    const bucket = totals.get(chosen)
    if (!bucket) continue
    picks.set(chosen, (picks.get(chosen) ?? 0) + 1)
    for (const [category, weight] of Object.entries(q.weights) as [Category, number][]) {
      bucket[category] += weight
    }
  }

  const partial = FRIENDS.map((name) => {
    const t = totals.get(name)!
    const chaosRaw = t.drama + t.trouble + t.madness + t.attention
    const bitch = pct(t.bitch, 'bitch')
    const drama = pct(t.drama, 'drama')
    const rich = pct(t.rich, 'rich')
    const chaos = pct(chaosRaw, ['drama', 'trouble', 'madness', 'attention'])
    const threat = Math.round(
      Math.min(99, Math.max(5, bitch * 0.4 + drama * 0.25 + chaos * 0.25 + (100 - rich) * 0.1)),
    )
    return { name, bitch, drama, rich, chaos, threat, picks: picks.get(name) ?? 0 }
  })

  return partial
    .sort((a, b) => b.threat - a.threat || b.picks - a.picks || a.name.localeCompare(b.name))
    .map((r, rank) => {
      const pool = rank === 0 ? TOP_TITLES : rank < 3 ? MID_TITLES : LOW_TITLES
      return { ...r, title: pool[titleFor(rank, r.name)], verdict: verdictFor(r, rank) }
    })
}

export function friendshipVerdict(results: FriendResult[]): string {
  const chaos = Math.round(results.reduce((s, r) => s + r.chaos, 0) / results.length)
  const friendship = Math.max(3, Math.round((100 - chaos) * 0.7))
  const sense = Math.max(1, 100 - chaos - friendship)
  return `After 15 highly scientific questions, several questionable decisions and an unnecessary amount of bullshit, the psychic has reached its conclusion. This friendship is approximately ${chaos}% chaos, ${friendship}% friendship and ${sense}% common sense. Somehow, against all scientific expectations, you people are still friends. Congratulations. 😂💀`
}

export function shareText(player: Friend, results: FriendResult[]): string {
  const lines = results.map(
    (r, i) => `${i + 1}. ${r.name} — ${r.title} (threat ${r.threat}%)`,
  )
  return [
    '🔮 SIMPLE PSYCHICS — FRIENDSHIP CHAOS RANKING 🔮',
    `Investigated by: ${player}`,
    '',
    ...lines,
    '',
    friendshipVerdict(results),
  ].join('\n')
}
