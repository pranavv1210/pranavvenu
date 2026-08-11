'use client'

import { motion } from 'framer-motion'
import { profile } from '@/lib/profile'

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-kicker">03 / About</div>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] text-text md:text-7xl">
            I like turning ambiguous problems into systems people can actually use.
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-secondary">
            <p>
              I am pursuing B.E. in Artificial Intelligence and Machine Learning at CMR Institute of Technology,
              Bengaluru. My work sits between AI, full-stack engineering, mobile applications, automation, and data.
            </p>
            <p>
              The through-line is simple: understand the problem, build the system, test the behavior, and ship a usable
              product surface.
            </p>
          </div>
        </motion.div>

        <div className="panel self-start">
          {[
            ['Current mode', profile.status],
            ['Focus', profile.focus],
            ['Base', profile.location],
            ['Education', 'B.E. AI & ML / 2026'],
            ['Status', 'Experimenting'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-6 border-b border-white/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{label}</span>
              <span className="max-w-[13rem] text-right text-sm font-semibold uppercase tracking-[0.08em] text-text">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
