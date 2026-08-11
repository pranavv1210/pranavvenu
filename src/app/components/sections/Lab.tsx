'use client'

import { useState } from 'react'
import { labProjects } from '@/lib/projects'

export default function Lab() {
  const [active, setActive] = useState(labProjects[0]?.slug)

  return (
    <section id="lab" className="section-shell">
      <div className="section-kicker">04 / Lab</div>
      <div className="section-heading">
        <h2>Lab.</h2>
        <p>Small artifacts, analysis systems, hackathon builds, and experiments that exist because the question was: can I build this?</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {labProjects.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setActive(project.slug)}
            onMouseEnter={() => setActive(project.slug)}
            className={`lab-tile ${active === project.slug ? 'is-active' : ''}`}
            data-cursor="EXPLORE"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{project.category}</span>
            <strong>{project.name}</strong>
            <span>{project.description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
