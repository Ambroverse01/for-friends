export type Category =
  | 'bitch'
  | 'drama'
  | 'rich'
  | 'madness'
  | 'attention'
  | 'trouble'
  | 'innocence'
  | 'friendship'

export type Question = {
  id: number
  text: string
  /** Points added to the chosen friend, per category. */
  weights: Partial<Record<Category, number>>
  /** Reaction PSYCHO always fires for this question, before the random one. */
  scriptedReaction?: string
  /** Question 15 gets the full screen-shaking treatment. */
  dramatic?: boolean
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Who of the other three is the biggest bitch? 💀',
    weights: { bitch: 5, drama: 2, friendship: -2 },
    scriptedReaction:
      'DAMN 😭 We started with violence. No warm-up, no introduction, just straight bullshit.',
  },
  {
    id: 2,
    text: "Who do you think secretly thinks you're mad? 😂",
    weights: { madness: 4, trouble: 1 },
    scriptedReaction:
      'Interesting... so someone has been silently judging you this whole time. Friendship is looking shaky.',
  },
  {
    id: 3,
    text: 'Who do you think is the richest of the four? 💰',
    weights: { rich: 5, attention: 1 },
    scriptedReaction:
      "Money detector activated 💰👀. Let's see whether your financial intelligence is bullshit.",
  },
  {
    id: 4,
    text: 'Who is most likely to disappear when you actually need them? 📵',
    weights: { bitch: 3, friendship: -4 },
    scriptedReaction:
      'Oh they LOVE airplane mode when the problems start. Noted, filed, screenshotted.',
  },
  {
    id: 5,
    text: 'Who is most likely to start unnecessary drama and then say, “I didn\u2019t do anything”? 💀',
    weights: { drama: 5, trouble: 3, innocence: -3 },
  },
  {
    id: 6,
    text: 'Who acts innocent but is actually the biggest troublemaker? 😇➡️😈',
    weights: { trouble: 5, innocence: -4, bitch: 2 },
  },
  {
    id: 7,
    text: 'Who is most likely to leave everyone on “seen” for 8 hours and then come back like nothing happened? 😂',
    weights: { bitch: 3, attention: 2, friendship: -2 },
  },
  {
    id: 8,
    text: "Who thinks they're always right even when they're talking complete bullshit? 🤡",
    weights: { madness: 4, attention: 3, drama: 2 },
    scriptedReaction: "OH FUCK 😂 Somebody's ego just entered the chat.",
  },
  {
    id: 9,
    text: 'Who would survive the longest if the four of you were stranded somewhere together? 🏝️',
    weights: { madness: 3, friendship: 3, innocence: 1 },
  },
  {
    id: 10,
    text: "Who is most likely to secretly judge everyone's decisions? 👀",
    weights: { bitch: 3, trouble: 2, innocence: -2 },
  },
  {
    id: 11,
    text: 'Who is the biggest attention seeker? 😂',
    weights: { attention: 5, drama: 3 },
    scriptedReaction: 'The spotlight addiction has officially been detected.',
  },
  {
    id: 12,
    text: "Who would probably spend money they don't have just to look rich? 💸😭",
    weights: { rich: 3, attention: 4, madness: 2 },
  },
  {
    id: 13,
    text: 'Who is most likely to get angry first during an argument? 🔥',
    weights: { drama: 4, madness: 3, innocence: -2 },
  },
  {
    id: 14,
    text: "Who is the biggest piece of shit when they're annoyed? 😂💀",
    weights: { bitch: 4, drama: 3, friendship: -2 },
    scriptedReaction: 'Not the piece-of-shit allegations 😭. Somebody needs a lawyer.',
  },
  {
    id: 15,
    text: 'Okay... be honest. Who is the MOST FUCKIN\u2019 BITCH of the entire friendship group? 💀🔥',
    weights: { bitch: 9, drama: 4, trouble: 3, innocence: -5 },
    scriptedReaction: 'This is it. The friendship-ending question. Choose wisely.',
    dramatic: true,
  },
]
