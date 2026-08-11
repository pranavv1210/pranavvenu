'use client'

import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

type Theme = 'dark' | 'light'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    const next = stored ?? preferred
    setTheme(next)
    document.documentElement.dataset.theme = next
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('theme', next)
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={toggle}
      className="theme-toggle"
      data-cursor="idle"
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
