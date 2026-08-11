'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { FiArrowDownRight, FiDownload } from 'react-icons/fi'
import { profile } from '@/lib/profile'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [photoLoaded, setPhotoLoaded] = useState(true)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 24 })
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 24 })

  useEffect(() => {
    if (reduceMotion) return
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX / window.innerWidth - 0.5)
      my.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, reduceMotion])

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden px-4 pt-28 md:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl grid-rows-[auto_1fr_auto]">
        <div className="flex flex-wrap items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          <span>India / 2026</span>
          <span>Builder / Engineer / Creative Technologist</span>
          <span>Build: portfolio v2</span>
        </div>

        <div className="relative grid items-center gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-accent">Pranav V.</p>
            <h1 className="max-w-5xl text-[clamp(4.4rem,15vw,13.8rem)] font-black uppercase leading-[0.78] tracking-normal text-text">
              I Build
              <span className="block text-outline">Systems</span>
              <span className="block">That Ship.</span>
            </h1>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { x, y }}
            className="relative z-10 justify-self-stretch lg:justify-self-end"
            data-cursor="EXPLORE"
          >
            <div className="photo-frame">
              <div className="absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Identity image
              </div>
              {photoLoaded ? (
                <Image
                  src="/photo.png"
                  alt="Portrait of Pranav V."
                  fill
                  sizes="(max-width: 768px) 92vw, 38vw"
                  className="object-cover grayscale contrast-110"
                  priority
                  onError={() => setPhotoLoaded(false)}
                />
              ) : (
                <div className="grid h-full place-items-center text-center font-mono text-xs uppercase tracking-[0.26em] text-muted">
                  Identity image
                  <br />
                  not loaded
                </div>
              )}
              <div className="photo-meta">
                <span>BASE / {profile.location}</span>
                <span>MODE / BUILDING</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-white/10 py-6 md:flex-row md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-secondary md:text-xl">
            I work across AI, full-stack engineering, mobile applications, automation, and product systems. From idea to
            usable product.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="button-primary" href="#work" data-cursor="VIEW">
              Explore work <FiArrowDownRight />
            </a>
            <a className="button-secondary" href={profile.resume} data-cursor="OPEN">
              Resume <FiDownload />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
