export default function Home({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 py-10 text-center">
      <div className="animate-pop-in">
        <h1 className="glow-text text-5xl font-black tracking-tight sm:text-7xl">
          SIMPLE PSYCHICS 🔮
        </h1>
        <p className="mt-4 text-lg text-fuchsia-200 sm:text-xl">
          “We already know your friends are full of bullshit. Let&apos;s find out WHO is the biggest
          problem.”
        </p>
      </div>

      <div className="glass animate-pop-in rounded-3xl p-6 text-left sm:p-8">
        <p className="text-xs font-bold tracking-[0.3em] text-fuchsia-300 uppercase">
          A word from Ambrose
        </p>
        <div className="mt-3 space-y-3 text-base leading-relaxed text-purple-50 sm:text-lg">
          <p>Welcome to Simple Psychics, Latoya and Koko Remah 😂🔮</p>
          <p>
            I, Ambrose Abaasa, officially welcome you to the most unnecessary friendship
            investigation ever created.
          </p>
          <p>
            Today we&apos;re going to discover who is innocent, who is secretly crazy, who thinks
            they&apos;re rich, who thinks everyone is mad, and most importantly...
          </p>
          <p className="glow-text text-xl font-black text-fuchsia-300 sm:text-2xl">
            WHO IS THE MOST FUCKIN&apos; BITCH IN THIS FRIENDSHIP? 😂💀
          </p>
          <p>
            Don&apos;t take anything personally. If the results hurt, blame the AI. I had nothing to
            do with it. Probably.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEnter}
        className="glow-btn w-full max-w-md rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-fuchsia-500 px-6 py-5 text-lg font-black tracking-wide transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:text-xl"
      >
        ENTER THE PSYCHIC ROOM 🔮
      </button>

      <p className="text-sm text-purple-300">Your friends know you. We expose you.</p>
    </div>
  )
}
