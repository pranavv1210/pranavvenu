import type { Project } from '@/lib/projects'

const visualLabels: Record<Project['visual'], string[]> = {
  route: ['RIDER', 'LOBBY', 'ROUTE', 'LIVE', 'SOS'],
  water: ['ORDER', 'DISPATCH', 'TANKER', 'DELIVER', 'PAY'],
  editor: ['EDITOR', 'STATE', 'CONTEXT', 'AI', 'ACTION'],
  frame: ['PHOTO', 'MODE', 'FRAME', 'RENDER', 'SHARE'],
  document: ['DOC', 'PARSE', 'SCORE', 'REVIEW', 'ACTION'],
  signal: ['AUDIO', 'FILTER', 'MEL', 'CNN', 'RISK'],
  city: ['CCTV', 'DETECT', 'RESTORE', 'FORECAST', 'ALERT'],
  fitness: ['PLAN', 'HYDRATE', 'METRICS', 'TRAIN', 'PROGRESS'],
}

const paths: Record<Project['visual'], string[]> = {
  route: ['M12 46 C24 18 38 18 50 44', 'M50 44 C62 70 76 70 88 38', 'M50 44 C62 18 76 18 88 38'],
  water: ['M12 40 C24 30 32 54 44 40', 'M44 40 C56 26 64 54 76 40', 'M76 40 C82 34 86 34 92 40'],
  editor: ['M14 26 H42 V42 H64 V28 H88', 'M42 42 L42 58 H72 L72 28'],
  frame: ['M18 20 H82 V58 H18 Z', 'M30 30 H70 V48 H30 Z', 'M50 20 V58'],
  document: ['M14 30 H36 C46 30 44 52 54 52 H86', 'M36 30 C48 14 64 14 76 30'],
  signal: ['M10 42 C20 18 30 66 40 42 C50 18 60 66 70 42 C78 24 86 30 92 38'],
  city: ['M10 52 L24 34 L38 46 L52 24 L66 42 L82 30 L92 48', 'M24 34 H52 V24 H82'],
  fitness: ['M12 44 C22 24 34 24 44 44 C54 64 66 64 78 36 L90 36'],
}

export default function ProjectVisual({ project }: { project: Project }) {
  const labels = visualLabels[project.visual]
  const routePaths = paths[project.visual]

  return (
    <div className={`project-visual project-visual-${project.visual}`} aria-hidden="true">
      <div className="visual-topbar">
        <span />
        <span />
        <span />
      </div>
      <svg className="project-system-svg" viewBox="0 0 100 72">
        <defs>
          <linearGradient id={`visual-gradient-${project.slug}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.82" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        {routePaths.map((path, index) => (
          <path key={path} d={path} className="project-system-path" stroke={`url(#visual-gradient-${project.slug})`} style={{ ['--i' as string]: index }} />
        ))}
        {labels.map((label, index) => {
          const x = 12 + index * 19
          const y = index % 2 === 0 ? 24 : 54

          return (
            <g key={label} className="project-system-node" transform={`translate(${x} ${y})`}>
              <rect x="-8.5" y="-5.2" width="17" height="10.4" rx="1.8" />
              <text textAnchor="middle" y="1.6">
                {label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="visual-scanline" />
    </div>
  )
}
