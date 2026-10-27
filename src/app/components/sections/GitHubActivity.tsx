'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import githubData from '@/../data/github.json'

type Day = { date: string; count: number; level: number }
type Frame = { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }

const RAMP = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
const ACCENT = '#7de2d1'
const RED = '#ef4444'
const data = githubData as { start: string; total: number; counts: number[]; levels: string }

const clamp = (n: number) => Math.max(0, Math.min(1, n))
const ease = (n: number) => {
  const x = clamp(n)
  return 1 - Math.pow(1 - x, 3)
}
const mix = (a: string, b: string, p: number) => {
  const hex = (s: string) => s.replace('#', '').match(/.{2}/g)!.map((v) => parseInt(v, 16))
  const [ar, ag, ab] = hex(a)
  const [br, bg, bb] = hex(b)
  const q = clamp(p)
  return `rgb(${Math.round(ar + (br - ar) * q)}, ${Math.round(ag + (bg - ag) * q)}, ${Math.round(ab + (bb - ab) * q)})`
}

function daysFromData(): Day[] {
  if (!data.start || !data.counts.length) return []
  return data.counts.map((count, i) => ({
    date: new Date(`${data.start}T00:00:00Z`).getTime() + i * 86400000,
    count,
    level: Number(data.levels[i] ?? 0),
  })).map((day) => ({ ...day, date: new Date(day.date).toISOString().slice(0, 10) }))
}

function drawGrid({ ctx, w, h, t }: Frame, days: Day[]) {
  const cols = 53
  const rows = 7
  const gap = Math.max(2, Math.min(5, w / 150))
  const cell = Math.min((w - gap * (cols - 1)) / cols, (h - gap * (rows - 1)) / rows)
  const ox = (w - (cell * cols + gap * (cols - 1))) / 2
  const oy = (h - (cell * rows + gap * (rows - 1))) / 2

  days.slice(0, cols * rows).forEach((day, i) => {
    const col = Math.floor(i / rows)
    const row = i % rows
    const delay = (col + row * 1.6) * 18
    const p = clamp((t - delay) / 500)
    if (p <= 0) return
    const size = cell * (0.22 + 0.78 * ease(p))
    const x = ox + col * (cell + gap) + (cell - size) / 2
    const y = oy + row * (cell + gap) + (cell - size) / 2
    ctx.fillStyle = p < 1 ? mix(RAMP[0], RAMP[day.level], p) : RAMP[day.level]
    ctx.globalAlpha = 0.96
    ctx.fillRect(x, y, size, size)
  })
  ctx.globalAlpha = 1
}

function drawSkyline({ ctx, w, h, t }: Frame, days: Day[]) {
  const cols = 53
  const rows = 7
  const gap = Math.max(2, Math.min(4, w / 170))
  const cell = Math.min((w - gap * (cols - 1)) / cols, (h - gap * (rows - 1)) / rows)
  const ox = (w - (cell * cols + gap * (cols - 1))) / 2
  const oy = h * 0.82
  const max = Math.max(1, ...days.map((d) => d.count))
  const heightScale = Math.min(h * 0.55, 72) / Math.sqrt(max)

  for (let row = rows - 1; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      const i = col * rows + row
      const day = days[i]
      if (!day) continue
      const delay = (col + (rows - row) * 2) * 14
      const p = ease((t - delay) / 520)
      if (p <= 0) continue
      const x = ox + col * (cell + gap) + row * 0.8
      const height = Math.sqrt(day.count) * heightScale * p
      const y = oy - height - row * 1.2
      const depth = Math.max(2, cell * 0.16)
      ctx.fillStyle = RAMP[day.level]
      ctx.fillRect(x, y, cell, height)
      ctx.fillStyle = mix(RAMP[day.level], '#000000', 0.2)
      ctx.beginPath()
      ctx.moveTo(x + cell, y)
      ctx.lineTo(x + cell + depth, y - depth)
      ctx.lineTo(x + cell + depth, oy - row * 1.2 - depth)
      ctx.lineTo(x + cell, oy - row * 1.2)
      ctx.fill()
      ctx.fillStyle = mix(RAMP[day.level], '#ffffff', 0.18)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + depth, y - depth)
      ctx.lineTo(x + cell + depth, y - depth)
      ctx.lineTo(x + cell, y)
      ctx.fill()
    }
  }

  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0])
  if (best && t > 1500) {
    const i = days.indexOf(best)
    const col = Math.floor(i / rows)
    const row = i % rows
    const x = ox + col * (cell + gap) + cell / 2
    const y = oy - Math.sqrt(best.count) * heightScale - row * 1.2
    ctx.strokeStyle = ACCENT
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 36, y - 22)
    ctx.stroke()
    ctx.fillStyle = ACCENT
    ctx.font = '10px var(--font-geist-mono), monospace'
    ctx.fillText(`${best.count} / ${best.date}`, x + 40, y - 24)
  }
}

function drawPulse({ ctx, w, h, t }: Frame, days: Day[]) {
  const weeks = Math.ceil(days.length / 7)
  const pad = 18
  const weekly = Array.from({ length: weeks }, (_, week) => days.slice(week * 7, week * 7 + 7).reduce((s, d) => s + d.count, 0))
  const max = Math.max(1, ...weekly)
  const xStep = (w - pad * 2) / Math.max(1, weeks - 1)
  const lineY = h * 0.22
  const gridTop = h * 0.36
  const cell = Math.max(2, Math.min(5, (w - 30) / 55))

  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
  ctx.lineWidth = 1
  ctx.beginPath()
  weekly.forEach((value, i) => {
    const x = pad + i * xStep
    const y = lineY + (1 - value / max) * h * 0.16
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
  })
  ctx.stroke()

  const progress = clamp(t / 1700)
  const activeWeeks = Math.floor(ease(progress) * weeks)
  for (let week = 0; week <= activeWeeks; week++) {
    const x = pad + week * xStep
    const value = weekly[week] ?? 0
    const sourceY = lineY + (1 - value / max) * h * 0.16
    days.slice(week * 7, week * 7 + 7).forEach((day, row) => {
      const p = clamp((t - 500 - week * 24 - row * 45) / 500)
      if (p <= 0) return
      const targetY = gridTop + row * (cell + 3)
      ctx.fillStyle = RAMP[day.level]
      ctx.globalAlpha = 0.95
      ctx.fillRect(x - cell / 2, sourceY + (targetY - sourceY) * ease(p), cell, cell)
    })
  }
  ctx.globalAlpha = 1

  const cursorWeek = Math.min(weeks - 1, Math.floor(ease(clamp(t / 1500)) * (weeks - 1)))
  const cx = pad + cursorWeek * xStep
  const cy = lineY + (1 - (weekly[cursorWeek] ?? 0) / max) * h * 0.16
  ctx.fillStyle = ACCENT
  ctx.beginPath()
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
  ctx.fill()
}

function drawRing({ ctx, w, h, t }: Frame, days: Day[]) {
  const cx = w / 2
  const cy = h / 2
  const maxR = Math.min(w, h) * 0.43
  const weeks = Math.ceil(days.length / 7)
  const ringWidth = Math.max(4, maxR / 8)
  const step = maxR / 7
  const progress = ease(clamp(t / 1800))
  const visibleWeeks = Math.floor(progress * weeks)

  for (let row = 0; row < 7; row++) {
    const radius = maxR - row * step
    for (let week = 0; week < weeks; week++) {
      if (week > visibleWeeks) continue
      const i = week * 7 + row
      const day = days[i]
      if (!day) continue
      const a0 = -Math.PI / 2 + (week / weeks) * Math.PI * 2 + 0.012
      const a1 = -Math.PI / 2 + ((week + 0.82) / weeks) * Math.PI * 2
      ctx.beginPath()
      ctx.arc(cx, cy, radius, a0, a1)
      ctx.arc(cx, cy, radius - ringWidth + 1, a1, a0, true)
      ctx.closePath()
      ctx.fillStyle = RAMP[day.level]
      ctx.fill()
    }
  }

  const hand = -Math.PI / 2 + progress * Math.PI * 2
  ctx.strokeStyle = ACCENT
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(hand) * maxR, cy + Math.sin(hand) * maxR)
  ctx.stroke()
}

function getStreak(days: Day[]) {
  let end = days.length - 1
  if (end >= 0 && days[end].count === 0) end -= 1
  let start = end
  while (start >= 0 && days[start].count > 0) start -= 1
  return { start: start + 1, end, length: Math.max(0, end - start) }
}

function drawStreak({ ctx, w, h, t }: Frame, days: Day[]) {
  const { start, end, length } = getStreak(days)
  const visible = Math.min(length, Math.floor(ease(clamp(t / 1700)) * length))
  const slice = days.slice(start, start + visible)
  const pad = 22
  const baseY = h * 0.55
  const step = (w - pad * 2) / Math.max(1, length - 1)

  ctx.strokeStyle = 'rgba(255,255,255,0.10)'
  ctx.beginPath()
  ctx.moveTo(pad, baseY)
  ctx.lineTo(w - pad, baseY)
  ctx.stroke()

  if (slice.length) {
    ctx.strokeStyle = ACCENT
    ctx.lineWidth = 2
    ctx.beginPath()
    slice.forEach((day, i) => {
      const x = pad + i * step
      const y = baseY - Math.min(120, Math.log2(day.count + 1) * 18)
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    })
    ctx.stroke()
    const last = slice[slice.length - 1]
    const x = pad + (slice.length - 1) * step
    const y = baseY - Math.min(120, Math.log2(last.count + 1) * 18)
    ctx.fillStyle = ACCENT
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  if (end + 1 < days.length) {
    const x = pad + (end - start + 1) * step
    ctx.strokeStyle = RED
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(x - 4, baseY - 4)
    ctx.lineTo(x + 4, baseY + 4)
    ctx.moveTo(x + 4, baseY - 4)
    ctx.lineTo(x - 4, baseY + 4)
    ctx.stroke()
  }

  ctx.fillStyle = 'rgba(243,245,247,0.9)'
  ctx.font = '700 18px var(--font-geist), sans-serif'
  ctx.fillText(`${visible} day${visible === 1 ? '' : 's'}`, pad, 30)
}

function drawTerminal({ ctx, w, h, t }: Frame, days: Day[]) {
  ctx.fillStyle = 'rgba(8,9,11,0.86)'
  ctx.fillRect(0, 0, w, h)
  ctx.font = '11px var(--font-geist-mono), monospace'
  ctx.fillStyle = 'rgba(125,226,209,0.9)'
  const command = '$ git log --graph --since="1 year ago"'
  ctx.fillText(command.slice(0, Math.floor(clamp(t / 45) * command.length)), 16, 24)

  const glyphs = ['.', ':', '+', '#', '@']
  const cols = Math.min(53, Math.floor((w - 24) / 8))
  const rows = 7
  const startY = 48
  days.slice(0, cols * rows).forEach((day, i) => {
    const col = Math.floor(i / rows)
    const row = i % rows
    const delay = 900 + i * 3
    const p = clamp((t - delay) / 300)
    if (p <= 0) return
    const glyph = p < 1 ? glyphs[Math.floor((i * 17 + t / 60) % glyphs.length)] : glyphs[day.level]
    ctx.fillStyle = p < 1 ? ACCENT : RAMP[day.level]
    ctx.fillText(glyph, 12 + col * 8, startY + row * 13)
  })

  if (t > 1800) {
    ctx.fillStyle = 'rgba(243,245,247,0.72)'
    ctx.fillText(`// ${data.total.toLocaleString()} contributions · ${getStreak(days).length} day streak`, 16, h - 14)
  }
}

const ANIMATIONS = [
  ['01', 'The grid', 'The familiar contribution calendar, but alive.'],
  ['02', 'As a city', 'Every day becomes a small building scaled by activity.'],
  ['03', 'Week by week', 'Weekly totals pulse first, then pour into the calendar.'],
  ['04', 'Round the year', 'The same year wrapped into a clock-like ring.'],
  ['05', 'The streak', 'A moving thread traces the current run of contribution days.'],
  ['06', 'In the terminal', 'The graph resolves from scrambling glyphs into signal.'],
] as const

function CanvasCard({ index, title, description, days }: { index: number; title: string; description: string; days: Day[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [start, setStart] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [hover, setHover] = useState<{ x: number; y: number; day: Day } | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = hostRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = hostRef.current
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const draw = (now: number) => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const t = reduced ? Infinity : now - start
      const frame = { ctx, w, h, t }
      if (index === 0) drawGrid(frame, days)
      if (index === 1) drawSkyline(frame, days)
      if (index === 2) drawPulse(frame, days)
      if (index === 3) drawRing(frame, days)
      if (index === 4) drawStreak(frame, days)
      if (index === 5) drawTerminal(frame, days)
      if (visible && !reduced) requestAnimationFrame(draw)
    }
    if (visible || reduced) requestAnimationFrame(draw)
  }, [days, index, reduced, start, visible])

  const handleMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (index !== 0 || !days.length) return
    const rect = event.currentTarget.getBoundingClientRect()
    const gap = Math.max(2, Math.min(5, rect.width / 150))
    const cell = Math.min((rect.width - gap * 52) / 53, (rect.height - gap * 6) / 7)
    const ox = (rect.width - (cell * 53 + gap * 52)) / 2
    const oy = (rect.height - (cell * 7 + gap * 6)) / 2
    const col = Math.floor((event.clientX - rect.left - ox) / (cell + gap))
    const row = Math.floor((event.clientY - rect.top - oy) / (cell + gap))
    const i = col * 7 + row
    const day = days[i]
    if (day) setHover({ x: event.clientX - rect.left, y: event.clientY - rect.top, day })
    else setHover(null)
  }

  return (
    <article className="github-activity-card">
      <div className="github-activity-card-head">
        <div>
          <span className="github-activity-index">{ANIMATIONS[index][0]}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button className="github-replay" onClick={() => setStart(performance.now())} type="button">
          ↻ Replay
        </button>
      </div>
      <div ref={hostRef} className="github-canvas-wrap">
        <canvas ref={canvasRef} onMouseMove={handleMove} onMouseLeave={() => setHover(null)} aria-label={`${title} GitHub contribution visualization`} />
        {hover && index === 0 ? (
          <div className="github-tooltip" style={{ left: hover.x + 12, top: hover.y + 12 }}>
            <strong>{hover.day.count} contribution{hover.day.count === 1 ? '' : 's'}</strong>
            <span>{hover.day.date}</span>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default function GitHubActivity() {
  const days = useMemo(() => daysFromData(), [])
  const streak = getStreak(days)
  const hasData = days.length > 0

  return (
    <section id="github" className="section-shell github-activity-section">
      <div className="section-kicker">06 / Contribution signal</div>
      <div className="section-heading">
        <h2>Built in public.</h2>
        <div>
          <p>My GitHub activity, drawn from the real contribution calendar instead of a screenshot. One dataset, six ways to read the year.</p>
          <div className="github-stat-row">
            <span><strong>{hasData ? data.total.toLocaleString() : '—'}</strong> contributions</span>
            <span><strong>{hasData ? streak.length : '—'}</strong> day streak</span>
            <a href="https://github.com/pranavv1210" target="_blank" rel="noreferrer">@pranavv1210 ↗</a>
          </div>
        </div>
      </div>

      {!hasData ? (
        <div className="github-sync-state">
          <span>Contribution data is syncing from GitHub.</span>
          <small>The visualization will populate automatically after the first scheduled data refresh.</small>
        </div>
      ) : null}

      <div className="github-activity-stack">
        {ANIMATIONS.map(([_, title, description], index) => (
          <CanvasCard key={title} index={index} title={title} description={description} days={days} />
        ))}
      </div>
    </section>
  )
}
