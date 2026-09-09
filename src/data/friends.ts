export const FRIENDS = [
  'Abaasa Ambrose',
  'Ahairwe Nabudde',
  'Koko Remah',
  'Francesca Latoya',
] as const

export type Friend = (typeof FRIENDS)[number]

export const FRIEND_EMOJI: Record<Friend, string> = {
  'Abaasa Ambrose': '🕶️',
  'Ahairwe Nabudde': '🌪️',
  'Koko Remah': '👑',
  'Francesca Latoya': '💅',
}
