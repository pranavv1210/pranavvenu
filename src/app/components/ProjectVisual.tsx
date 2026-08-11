import type { Project } from '@/lib/projects'

type VisualNode = {
  label: string
  detail: string
  x: number
  y: number
}

type VisualSpec = {
  headline: string
  subline: string
  nodes: VisualNode[]
  paths: string[]
  metrics: string[]
}

const visuals: Record<Project['visual'], VisualSpec> = {
  route: {
    headline: 'Live ride coordination',
    subline: 'rider intent -> route state -> group safety',
    nodes: [
      { label: 'Rider', detail: 'identity', x: 13, y: 46 },
      { label: 'Lobby', detail: 'join flow', x: 31, y: 24 },
      { label: 'Route', detail: 'map sync', x: 52, y: 38 },
      { label: 'Live', detail: 'tracking', x: 72, y: 22 },
      { label: 'SOS', detail: 'safety', x: 88, y: 48 },
    ],
    paths: ['M13 46 C22 20 39 18 52 38 C60 55 72 52 88 48', 'M31 24 C45 12 61 12 72 22', 'M52 38 C62 24 77 24 88 48'],
    metrics: ['Realtime lobby', 'OpenStreetMap', 'Supabase auth'],
  },
  signal: {
    headline: 'Audio intelligence pipeline',
    subline: 'raw waveform -> medical signal -> risk output',
    nodes: [
      { label: 'Audio', detail: 'input', x: 14, y: 48 },
      { label: 'Filter', detail: 'clean', x: 32, y: 25 },
      { label: 'Mel', detail: 'spectrogram', x: 51, y: 50 },
      { label: 'CNN', detail: 'EffNet', x: 70, y: 25 },
      { label: 'Risk', detail: 'result', x: 88, y: 48 },
    ],
    paths: ['M10 48 C20 12 29 72 40 38 C51 5 58 72 70 25 C77 12 84 28 92 48', 'M14 48 C31 57 47 57 51 50 C58 39 64 31 70 25'],
    metrics: ['Wavelet denoise', 'Mel windows', 'EfficientNet-B0'],
  },
  city: {
    headline: 'Vehicle pursuit system',
    subline: 'camera evidence -> tracking graph -> geo alert',
    nodes: [
      { label: 'CCTV', detail: 'feed', x: 14, y: 44 },
      { label: 'Detect', detail: 'vehicle', x: 33, y: 28 },
      { label: 'Restore', detail: 'clarity', x: 53, y: 45 },
      { label: 'Forecast', detail: 'route', x: 72, y: 28 },
      { label: 'Alert', detail: 'gps', x: 88, y: 45 },
    ],
    paths: ['M12 54 L33 28 L53 45 L72 28 L90 45', 'M14 44 H53 V28 H72', 'M33 28 C44 14 61 14 72 28'],
    metrics: ['CCTV graph', 'Route forecast', 'Geo alerting'],
  },
  water: {
    headline: 'Delivery ops flow',
    subline: 'customer order -> tanker dispatch -> closed payment',
    nodes: [
      { label: 'Order', detail: 'request', x: 14, y: 48 },
      { label: 'Dispatch', detail: 'assign', x: 32, y: 25 },
      { label: 'Tanker', detail: 'driver', x: 52, y: 48 },
      { label: 'Deliver', detail: 'status', x: 72, y: 25 },
      { label: 'Pay', detail: 'close', x: 88, y: 48 },
    ],
    paths: ['M14 48 C26 22 40 22 52 48 C64 74 76 74 88 48', 'M32 25 H72'],
    metrics: ['Riverpod', 'Supabase', 'Material 3'],
  },
  editor: {
    headline: 'Editor context bridge',
    subline: 'local state -> project context -> AI action',
    nodes: [
      { label: 'Editor', detail: 'VS Code', x: 14, y: 34 },
      { label: 'State', detail: 'local', x: 34, y: 52 },
      { label: 'Context', detail: 'repo', x: 52, y: 30 },
      { label: 'AI', detail: 'session', x: 70, y: 52 },
      { label: 'Action', detail: 'ship', x: 88, y: 34 },
    ],
    paths: ['M14 34 H34 V52 H70 V34 H88', 'M34 52 L52 30 L70 52'],
    metrics: ['Local-first', 'Extension API', 'Context bridge'],
  },
  frame: {
    headline: 'Graphics render loop',
    subline: 'photo input -> frame mode -> shareable artifact',
    nodes: [
      { label: 'Photo', detail: 'input', x: 14, y: 42 },
      { label: 'Mode', detail: 'select', x: 34, y: 25 },
      { label: 'Frame', detail: 'compose', x: 52, y: 45 },
      { label: 'Render', detail: 'png', x: 70, y: 25 },
      { label: 'Share', detail: 'output', x: 88, y: 42 },
    ],
    paths: ['M14 42 H52 V25 H88', 'M34 25 V58 H70 V25', 'M52 45 C62 60 78 58 88 42'],
    metrics: ['Image mask', 'Canvas export', 'Social asset'],
  },
  fitness: {
    headline: 'Fitness operating layer',
    subline: 'plan -> body metrics -> progress loops',
    nodes: [
      { label: 'Plan', detail: 'training', x: 14, y: 48 },
      { label: 'Hydrate', detail: 'habit', x: 32, y: 26 },
      { label: 'Metrics', detail: 'body', x: 52, y: 48 },
      { label: 'Train', detail: 'goals', x: 72, y: 26 },
      { label: 'Progress', detail: 'trend', x: 88, y: 48 },
    ],
    paths: ['M14 48 C25 20 41 20 52 48 C63 76 77 76 88 48', 'M32 26 H72'],
    metrics: ['Goals', 'Hydration', 'Progress'],
  },
}

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
      <svg className="project-system-svg" viewBox="0 0 100 72" role="img" aria-label={visual.headline}>
        {visual.paths.map((path, index) => (
          <path key={path} d={path} className="project-system-path" style={{ ['--i' as string]: index }} />
        ))}
        {visual.nodes.map((node, index) => (
          <g key={node.label} className="project-system-node" transform={`translate(${node.x} ${node.y})`} style={{ ['--i' as string]: index }}>
            <circle r="4.2" />
            <text textAnchor="middle" y="-7.2" className="project-node-label">
              {node.label}
            </text>
            <text textAnchor="middle" y="10.2" className="project-node-detail">
              {node.detail}
            </text>
          </g>
        ))}
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
