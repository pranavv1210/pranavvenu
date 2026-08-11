import type { Project } from '@/lib/projects'

const labels: Record<Project['visual'], string[]> = {
  route: ['RIDE 12', 'PIT STOP', 'LIVE ETA', 'SOS'],
  water: ['ORDER', 'DISPATCH', 'DRIVER', 'PAID'],
  editor: ['CTX', 'AGENT', 'PATCH', 'RUN'],
  frame: ['PHOTO', 'MODE', 'RENDER', 'SHARE'],
  document: ['PARSE', 'SCORE', 'EXPLAIN', 'REVIEW'],
  signal: ['INPUT', 'FILTER', 'MODEL', 'OUTPUT'],
  city: ['CCTV', 'DETECT', 'TRACK', 'ALERT'],
  fitness: ['PLAN', 'HYDRATE', 'METRICS', 'PROGRESS'],
}

export default function ProjectVisual({ project }: { project: Project }) {
  const items = labels[project.visual]

  return (
    <div className={`project-visual project-visual-${project.visual}`} aria-hidden="true">
      <div className="visual-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-stage">
        {items.map((item, index) => (
          <div key={item} className="visual-node" style={{ ['--i' as string]: index }}>
            <span>{item}</span>
          </div>
        ))}
        <div className="visual-scanline" />
      </div>
    </div>
  )
}
