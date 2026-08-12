'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { labProjects } from '@/lib/projects'

export default function Lab() {
  const [active, setActive] = useState(labProjects[0]?.slug)

  return (
    <section id="lab" className="section-shell">
      <div className="section-kicker">05 / Working experiments</div>
      <div className="section-heading">
        <h2>Active builds.</h2>
        <p>Smaller but still real systems: editor tooling, creative graphics, mobile operations, and hackathon-grade AI workflows.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {labProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            onMouseEnter={() => setActive(project.slug)}
            className={`lab-tile ${active === project.slug ? 'is-active' : ''}`}
            data-cursor="VIEW"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{project.status}</span>
            <strong>{project.name}</strong>
            <span className="lab-tile-description">{project.description}</span>
            <em>
              Open case <FiArrowUpRight />
            </em>
          </Link>
        ))}
      </div>
    </section>
  )
}
