import { useEffect, useRef, useState } from 'react'

export function useTypewriter(message: string, speed = 24, onDone?: () => void) {
  const [shown, setShown] = useState('')
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    setShown('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(message.slice(0, i))
      if (i >= message.length) {
        window.clearInterval(id)
        onDoneRef.current?.()
      }
    }, speed)
    return () => window.clearInterval(id)
  }, [message, speed])

  return shown
}
