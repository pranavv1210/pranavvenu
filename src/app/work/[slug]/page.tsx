import { notFound } from 'next/navigation'
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi'
import Link from 'next/link'
import ArchitectureDiagram from '@/app/components/ArchitectureDiagram'
import CustomCursor from '@/app/components/effects/CustomCursor'
import Grain from '@/app/components/effects/Grain'
import ParticleField from '@/app/components/effects/ParticleField'
import ProjectVisual from '@/app/components/ProjectVisual'
import { getProject, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) return {}

  return {
    title: `${project.name} - Pranav V.`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()

  return (
    <main className="relative min-h-screen">
      <ParticleField />
      <Grain />
      <CustomCursor />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8">
        <Link href="/#work" className="meta-link" data-cursor="OPEN">
          <FiArrowLeft /> Back to work
        </Link>

        <section className="grid gap-8 py-14 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">{project.id}</p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.85] text-text md:text-8xl">{project.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-secondary">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="button-secondary" data-cursor="OPEN">
                  GitHub <FiGithub />
                </a>
              ) : null}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-primary" data-cursor="OPEN">
                  Live Demo <FiExternalLink />
                </a>
              ) : null}
            </div>
          </div>
          <ProjectVisual project={project} />
        </section>

        <section className="grid gap-4 pb-20 lg:grid-cols-4">
          {[
            ['Role', project.role],
            ['Stack', project.stack.join(' / ')],
            ['Year', project.year],
            ['Status', project.status],
          ].map(([label, value]) => (
            <div key={label} className="panel">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{label}</p>
              <p className="mt-4 text-sm font-semibold uppercase leading-relaxed text-text">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <DetailBlock title="Problem" copy={project.problem} />
            <DetailBlock title="Solution" copy={project.solution} />
            <DetailBlock title="Result / Outcome" copy={project.outcome} />
          </div>
          <div className="space-y-4">
            <ArchitectureDiagram flow={project.architecture} />
            <div className="panel">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">Key features</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="border border-white/10 bg-bg/60 p-4 text-sm text-secondary">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function DetailBlock({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="panel">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{title}</p>
      <p className="mt-4 text-base leading-relaxed text-secondary">{copy}</p>
    </article>
  )
}
