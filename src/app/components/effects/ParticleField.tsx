'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let raf = 0
    let width = 0
    let height = 0
    let particles: Particle[] = []
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.2 : 1.75)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = coarse ? 26000 : 17000
      const count = Math.min(coarse ? 34 : 78, Math.floor((width * height) / density))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.2 + 0.4,
      }))
    }

    const drawGrid = () => {
      const styles = getComputedStyle(document.documentElement)
      const gridColor = styles.getPropertyValue('--grid-line').trim() || 'rgba(255,255,255,0.026)'
      context.strokeStyle = gridColor
      context.lineWidth = 1
      const step = 56
      for (let x = 0; x <= width; x += step) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      for (let y = 0; y <= height; y += step) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }
    }

    const tick = () => {
      context.clearRect(0, 0, width, height)
      drawGrid()
      const styles = getComputedStyle(document.documentElement)
      const accent = styles.getPropertyValue('--accent').trim() || '#7de2d1'

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        if (!reduceMotion && !coarse) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            p.x += (dx / Math.max(dist, 1)) * 0.35
            p.y += (dy / Math.max(dist, 1)) * 0.35
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }

        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = accent
        context.globalAlpha = 0.35
        context.fill()
        context.globalAlpha = 1

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j]
          const distance = Math.hypot(p.x - q.x, p.y - q.y)
          if (distance < 122) {
            context.beginPath()
            context.moveTo(p.x, p.y)
            context.lineTo(q.x, q.y)
            context.strokeStyle = accent
            context.globalAlpha = Math.max(0.02, 0.11 - distance / 1400)
            context.stroke()
            context.globalAlpha = 1
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    resize()
    tick()
    const observer = new MutationObserver(() => resize())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" aria-hidden="true" />
}
