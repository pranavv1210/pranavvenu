'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { stackGroups } from '@/lib/profile'

export default function System() {
  const [active, setActive] = useState(stackGroups[0])

  return (
    <section id="system" className="section-shell">
      <div className="section-kicker">03 / System</div>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="section-title">What I Build.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            Not a wall of badges. A capability map connected to actual work: AI, web, data, mobile, and automation.
          </p>
        </div>
        <div className="system-map">
          <button className="core-node" onMouseEnter={() => setActive(stackGroups[0])}>Pranav Core</button>
          {stackGroups.map((group, index) => (
            <motion.button
              key={group.id}
              type="button"
              onMouseEnter={() => setActive(group)}
              onFocus={() => setActive(group)}
              className={`system-node system-node-${index} ${active.id === group.id ? 'is-active' : ''}`}
              whileHover={{ scale: 1.04 }}
            >
              {group.id}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="panel">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">Active capability</p>
          <h3 className="mt-4 text-3xl font-black uppercase text-text">{active.title}</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {active.items.map((item) => (
              <span key={item} className="tag">{item}</span>
            ))}
          </div>
        </div>
        <div className="panel">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Connected proof</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {active.related.map((item) => (
              <div key={item} className="border border-white/10 bg-bg/60 p-4 text-sm font-semibold uppercase tracking-[0.08em] text-secondary">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
