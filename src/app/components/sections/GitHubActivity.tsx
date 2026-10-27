'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import githubData from '@/../data/github.json'

type Day = { date: string; count: number; level: number }
type CalendarData = {
  username: string
  fetchedAt?: string
  start: string
  total: number
  counts: number[]
  levels: string
}

const data = githubData as CalendarData
const RAMP = ['#20252b', '#9be9a8', '#40c463', '#30a14e', '#216e39']

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 3)

function getDays(): Day[] {
  if (!data.start || !data.counts.length) return []
  const start = new Date(`${data.start}T00:00:00Z`).getTime()
  return data.counts.map((count, index) => ({
    date: new Date(start + index * 86400000).toISOString().slice(0, 10),
    count,
    level: Number(data.levels[index] ?? 0),
  }))
}

function getCurrentStreak(days: Day[]) {
  let index = days.length - 1
  if (index >= 0 && days[index].count === 0) index -= 1
  let length = 0
  while (index >= 0 && days[index].count > 0) {
    length += 1
    index -= 1
  }
  return length
}

function getLongestStreak(days: Day[]) {
  let longest = 0
  let current = 0
  days.forEach((day) => {
    current = day.count > 0 ? current + 1 : 0
    longest = Math.max(longest, current)
  })
  return longest
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${date}T00:00:00Z`),
  )
}

export default function GitHubActivity() {
  const days = useMemo(() => getDays(), [])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const [visible, setVisible] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [displayTotal, setDisplayTotal] = useState(0)
  const [hover, setHover] = useState<{ x: number; y: number; day: Day } | null>(null)

  const currentStreak = useMemo(() => getCurrentStreak(days), [days])
  const longestStreak = useMemo(() => getLongestStreak(days), [days])
  const bestDay = useMemo(
    () => days.reduce<Day | null>((best, day) => (!best || day.count > best.count ? day : best), null),
    [days],
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = hostRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible && !reducedMotion) return
    const canvas = canvasRef.current
    const host = hostRef.current
    if (!canvas || !host) return
    const context = canvas.getContext('2d')
    if (!context) return

    const startedAt = performance.now()
    const draw = (now: number) => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      const columns = 53
      const rows = 7
      const labelWidth = 34
      const top = 28
      const gap = Math.max(3, Math.min(5, width / 160))
      const cell = Math.min((width - labelWidth - gap * (columns - 1)) / columns, (height - top - 8 - gap * 6) / rows)
      const gridWidth = cell * columns + gap * (columns - 1)
      const originX = labelWidth + Math.max(0, (width - labelWidth - gridWidth) / 2)
      const originY = top
      const elapsed = reducedMotion ? Infinity : now - startedAt
      const progress = reducedMotion ? 1 : easeOut(elapsed / 1700)

      context.font = '9px var(--font-geist-mono), monospace'
      context.fillStyle = 'rgba(154, 162, 173, 0.72)'
      ;['MON', 'WED', 'FRI'].forEach((label, index) => {
        const row = index * 2 + 1
        context.fillText(label, 0, originY + row * (cell + gap) + cell * 0.78)
      })

      let previousMonth = -1
      days.slice(0, columns * rows).forEach((day, index) => {
        const column = Math.floor(index / rows)
        const row = index % rows
        const x = originX + column * (cell + gap)
        const y = originY + row * (cell + gap)
        const delay = (column + row * 1.5) * 18
        const cellProgress = reducedMotion ? 1 : easeOut((elapsed - delay) / 440)
        if (cellProgress > 0) {
          const size = cell * (0.2 + cellProgress * 0.8)
          context.globalAlpha = day.level === 0 ? 0.68 : 1
          context.fillStyle = RAMP[day.level]
          context.fillRect(x + (cell - size) / 2, y + (cell - size) / 2, size, size)
        }

        if (row === 0) {
          const date = new Date(`${day.date}T00:00:00Z`)
          const month = date.getUTCMonth()
          if (month !== previousMonth && date.getUTCDate() <= 7) {
            context.globalAlpha = 1
            context.fillStyle = 'rgba(154, 162, 173, 0.72)'
            context.fillText(date.toLocaleString('en', { month: 'short', timeZone: 'UTC' }).toUpperCase(), x, 12)
            previousMonth = month
          }
        }
      })

      context.globalAlpha = 1
      const sweepX = originX + gridWidth * progress
      if (progress < 1) {
        const gradient = context.createLinearGradient(sweepX - 36, 0, sweepX + 8, 0)
        gradient.addColorStop(0, 'rgba(125, 226, 209, 0)')
        gradient.addColorStop(1, 'rgba(125, 226, 209, 0.55)')
        context.fillStyle = gradient
        context.fillRect(sweepX - 36, originY - 5, 44, height - originY)
      }

      setDisplayTotal(Math.round(data.total * progress))
      if (!reducedMotion && elapsed < 1900) frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [days, reducedMotion, replayKey, visible])

  const handleMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!days.length) return
    const rect = event.currentTarget.getBoundingClientRect()
    const columns = 53
    const labelWidth = 34
    const top = 28
    const gap = Math.max(3, Math.min(5, rect.width / 160))
    const cell = Math.min((rect.width - labelWidth - gap * 52) / columns, (rect.height - top - 8 - gap * 6) / 7)
    const gridWidth = cell * columns + gap * 52
    const originX = labelWidth + Math.max(0, (rect.width - labelWidth - gridWidth) / 2)
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top
    const column = Math.floor((localX - originX) / (cell + gap))
    const row = Math.floor((localY - top) / (cell + gap))
    const day = days[column * 7 + row]
    const insideCell = column >= 0 && column < 53 && row >= 0 && row < 7
    setHover(insideCell && day ? { x: localX, y: localY, day } : null)
  }

  const fetchedLabel = data.fetchedAt
    ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(data.fetchedAt))
    : null

  return (
    <section id="github" className="section-shell github-activity-section">
      <div className="section-kicker">06 / Contribution signal</div>
      <div className="section-heading">
        <h2>Built in public.</h2>
        <div>
          <p>A year of shipping, debugging, and learning—drawn from my real GitHub contribution calendar.</p>
          <a className="github-profile-link" href="https://github.com/pranavv1210" target="_blank" rel="noreferrer">
            View @pranavv1210 on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <article className="github-signal-panel">
        <header className="github-signal-head">
          <div>
            <span className="github-signal-label">Last 12 months</span>
            <strong>{displayTotal.toLocaleString()}</strong>
            <small>contributions</small>
          </div>
          <button className="github-replay" onClick={() => setReplayKey((key) => key + 1)} type="button">
            <span aria-hidden="true">↻</span> Replay
          </button>
        </header>

        <div className="github-calendar-scroll">
          <div ref={hostRef} className="github-canvas-wrap">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMove}
              onMouseLeave={() => setHover(null)}
              aria-label={`${data.total.toLocaleString()} GitHub contributions over the last year`}
            />
            {hover ? (
              <div className="github-tooltip" style={{ left: hover.x + 12, top: hover.y + 12 }}>
                <strong>{hover.day.count} contribution{hover.day.count === 1 ? '' : 's'}</strong>
                <span>{formatDate(hover.day.date)}</span>
              </div>
            ) : null}
          </div>
        </div>

        <footer className="github-signal-stats">
          <div><span>Current streak</span><strong>{currentStreak} days</strong></div>
          <div><span>Longest streak</span><strong>{longestStreak} days</strong></div>
          <div><span>Busiest day</span><strong>{bestDay ? `${bestDay.count} · ${formatDate(bestDay.date)}` : '—'}</strong></div>
          <div><span>Data refreshed</span><strong>{fetchedLabel ?? 'Snapshot'}</strong></div>
        </footer>
      </article>
    </section>
  )
}
