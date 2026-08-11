'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { featuredProjects } from '@/lib/projects'
import { fadeUp, stagger } from '@/lib/animations'
import ProjectVisual from '../ProjectVisual'

export default function Work() {
  return (
    <section id="work" className="section-shell">
      <div className="section-kicker">01 / Work</div>
      <div className="section-heading">
        <h2>
          Working
          <br />
          builds.
        </h2>
        <p>
          Real, repo-backed projects with live surfaces where available. Each one is presented as a working system, not
          a static card.
        </p>
      </div>

      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="space-y-6">
        {featuredProjects.map((project, index) => (
          <motion.article key={project.slug} variants={fadeUp} className="project-row group">
            <Link href={`/work/${project.slug}`} className="grid gap-6 lg:grid-cols-[0.68fr_1fr]" data-cursor="VIEW">
              <div className="flex flex-col justify-between gap-10">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    <span>{project.id}</span>
                    <span>{project.year} / {project.status}</span>
                  </div>
                  <h3 className="text-4xl font-black uppercase leading-[0.9] text-text md:text-6xl">{project.name}</h3>
                  <p className="mt-4 max-w-xl text-lg text-secondary">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <ProjectVisual project={project} />
              </div>
            </Link>
            <div className="mt-5 flex flex-wrap gap-4">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="meta-link" data-cursor="OPEN">
                  <FiGithub /> GitHub
                </a>
              ) : null}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="meta-link" data-cursor="OPEN">
                  <FiExternalLink /> Live
                </a>
              ) : null}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Selected / {String(index + 1).padStart(2, '0')}</span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
