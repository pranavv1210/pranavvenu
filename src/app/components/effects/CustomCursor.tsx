'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type CursorState = 'idle' | 'VIEW' | 'OPEN' | 'EXPLORE'

export default function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: -40, y: -40 })
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState<CursorState>('idle')
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    setIsFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!isFinePointer || reduceMotion) return

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setVisible(true)

      const target = event.target as HTMLElement
      const cursorTarget = target.closest<HTMLElement>('[data-cursor]')
      const hrefTarget = target.closest('a')
      setLabel((cursorTarget?.dataset.cursor as CursorState | undefined) ?? (hrefTarget ? 'OPEN' : 'idle'))
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [isFinePointer, reduceMotion])

  if (!isFinePointer || reduceMotion) return null

  const active = label !== 'idle'

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent mix-blend-screen"
        animate={{ x: position.x - 4, y: position.y - 4, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.04 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] grid h-10 w-10 place-items-center rounded-full border border-accent/50 text-[9px] font-bold text-accent"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: visible ? 1 : 0,
          scale: active ? 1.65 : 1,
          backgroundColor: active ? 'rgba(125, 226, 209, 0.08)' : 'rgba(125, 226, 209, 0)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.45 }}
      >
        {active ? label : ''}
      </motion.div>
    </>
  )
}
