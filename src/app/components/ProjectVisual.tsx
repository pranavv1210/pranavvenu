import type { Project } from '@/lib/projects'

type VisualStep = {
  label: string
  detail: string
}

type VisualSpec = {
  headline: string
  subline: string
  steps: VisualStep[]
  branch?: {
    from: number
    to: number
    label: string
  }
  metrics: string[]
}

const visuals: Record<Project['visual'], VisualSpec> = {
  route: {
    headline: 'Ride coordination flow',
    subline: 'create ride -> route sync -> live group safety',
    steps: [
      { label: 'Rider', detail: 'identity' },
      { label: 'Lobby', detail: 'join' },
      { label: 'Route', detail: 'map' },
      { label: 'Live', detail: 'track' },
      { label: 'SOS', detail: 'safety' },
    ],
    branch: { from: 2, to: 4, label: 'safety channel' },
    metrics: ['Realtime lobby', 'OpenStreetMap', 'Supabase auth'],
  },
  signal: {
    headline: 'Heart sound pipeline',
    subline: 'audio input -> signal processing -> model output',
    steps: [
      { label: 'Audio', detail: 'input' },
      { label: 'Filter', detail: 'clean' },
      { label: 'Mel', detail: 'spectrogram' },
      { label: 'CNN', detail: 'model' },
      { label: 'Risk', detail: 'result' },
    ],
    branch: { from: 1, to: 3, label: 'feature extraction' },
    metrics: ['Wavelet denoise', 'Mel windows', 'EfficientNet-B0'],
  },
  city: {
    headline: 'Vehicle pursuit flow',
    subline: 'camera feed -> vehicle tracking -> geo alert',
    steps: [
      { label: 'CCTV', detail: 'feed' },
      { label: 'Detect', detail: 'vehicle' },
      { label: 'Restore', detail: 'clarity' },
      { label: 'Forecast', detail: 'route' },
      { label: 'Alert', detail: 'gps' },
    ],
    branch: { from: 1, to: 3, label: 'prediction loop' },
    metrics: ['CCTV graph', 'Route forecast', 'Geo alerting'],
  },
  water: {
    headline: 'Delivery ops flow',
    subline: 'order -> dispatch -> delivery -> payment',
    steps: [
      { label: 'Order', detail: 'request' },
      { label: 'Dispatch', detail: 'assign' },
      { label: 'Tanker', detail: 'driver' },
      { label: 'Deliver', detail: 'status' },
      { label: 'Pay', detail: 'close' },
    ],
    metrics: ['Riverpod', 'Supabase', 'Material 3'],
  },
  editor: {
    headline: 'Editor context flow',
    subline: 'editor state -> project context -> AI action',
    steps: [
      { label: 'Editor', detail: 'VS Code' },
      { label: 'State', detail: 'local' },
      { label: 'Context', detail: 'repo' },
      { label: 'AI', detail: 'session' },
      { label: 'Action', detail: 'ship' },
    ],
    branch: { from: 0, to: 2, label: 'local memory' },
    metrics: ['Local-first', 'Extension API', 'Context bridge'],
  },
  frame: {
    headline: 'Graphics render flow',
    subline: 'photo -> frame mode -> generated share asset',
    steps: [
      { label: 'Photo', detail: 'input' },
      { label: 'Mode', detail: 'select' },
      { label: 'Frame', detail: 'compose' },
      { label: 'Render', detail: 'png' },
      { label: 'Share', detail: 'output' },
    ],
    metrics: ['Image mask', 'Canvas export', 'Social asset'],
  },
  fitness: {
    headline: 'Fitness system flow',
    subline: 'plan -> metrics -> progress tracking',
    steps: [
      { label: 'Plan', detail: 'training' },
      { label: 'Hydrate', detail: 'habit' },
      { label: 'Metrics', detail: 'body' },
      { label: 'Train', detail: 'goals' },
      { label: 'Progress', detail: 'trend' },
    ],
    metrics: ['Goals', 'Hydration', 'Progress'],
  },
}

const nodePositions = [
  { x: 10, y: 40 },
  { x: 30, y: 40 },
  { x: 50, y: 40 },
  { x: 70, y: 40 },
  { x: 90, y: 40 },
]

export default function ProjectVisual({ project }: { project: Project }) {
  const visual = visuals[project.visual]

  return (
    <div className={`project-visual project-visual-${project.visual}`} aria-label={`${project.name} system visual`}>
      <div className="visual-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="project-visual-copy">
        <strong>{visual.headline}</strong>
        <span>{visual.subline}</span>
      </div>
      <svg className="project-system-svg" viewBox="0 0 100 70" role="img" aria-label={visual.headline}>
        <defs>
          <marker id={`project-arrow-${project.slug}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="project-arrow-head" />
          </marker>
        </defs>

        {nodePositions.slice(0, visual.steps.length - 1).map((position, index) => {
          const next = nodePositions[index + 1]
          return (
            <line
              key={`${visual.steps[index].label}-${visual.steps[index + 1].label}`}
              x1={position.x + 5.8}
              y1={position.y}
              x2={next.x - 5.8}
              y2={next.y}
              className="project-system-line"
              markerEnd={`url(#project-arrow-${project.slug})`}
              style={{ ['--i' as string]: index }}
            />
          )
        })}

        {visual.branch ? (
          <>
            <polyline
              points={`${nodePositions[visual.branch.from].x},${nodePositions[visual.branch.from].y + 7} ${nodePositions[visual.branch.from].x},57 ${nodePositions[visual.branch.to].x},57 ${nodePositions[visual.branch.to].x},${nodePositions[visual.branch.to].y + 7}`}
              className="project-system-branch"
            />
            <text x={(nodePositions[visual.branch.from].x + nodePositions[visual.branch.to].x) / 2} y="64" textAnchor="middle" className="project-branch-label">
              {visual.branch.label}
            </text>
          </>
        ) : null}

        {visual.steps.map((step, index) => {
          const position = nodePositions[index]
          return (
            <g key={step.label} className="project-system-node" transform={`translate(${position.x} ${position.y})`} style={{ ['--i' as string]: index }}>
              <rect x="-7.4" y="-6.3" width="14.8" height="12.6" rx="2" />
              <text textAnchor="middle" y="-10.6" className="project-node-label">
                {step.label}
              </text>
              <text textAnchor="middle" y="12.9" className="project-node-detail">
                {step.detail}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="project-visual-metrics">
        {visual.metrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
      <div className="visual-scanline" />
    </div>
  )
}
