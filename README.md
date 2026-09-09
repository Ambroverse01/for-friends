# Simple Psychics 🔮

_"Your friends know you. We expose you."_

A frontend-only friendship roast game for four friends (Abaasa Ambrose, Ahairwe Nabudde, Koko Remah,
Francesca Latoya). An AI "psychic" named PSYCHO asks 15 questions, reacts dramatically to every
answer, and then reveals a fully calculated Friendship Chaos Ranking.

Playful roast humor between friends — no backend, no database, no accounts. Everything runs in the
browser and the current game is kept in `localStorage`.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS v4.

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build
npm run lint     # oxlint
```

Node 22+ is required (Vite 8).

## Structure

- `src/data/` — friends, the 15 questions with their scoring weights, and 40 PSYCHO reactions
- `src/lib/scoring.ts` — hidden score tracking, ranking, titles, verdict and share text
- `src/components/` — animated backdrop, confetti, PSYCHO typing bubble, friend buttons
- `src/screens/` — Home, PlayerSelect, Game, Results
