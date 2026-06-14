'use client'

type DiagramNode = {
  id: string
  label: string
  sublabel: string
  x: number
  y: number
  color: string
  shape?: 'circle' | 'rect'
}

type DiagramLink = {
  id: string
  from: string
  to: string
  color: string
}

const diagrams: Record<string, { nodes: DiagramNode[]; links: DiagramLink[] }> = {
  journeysync: {
    nodes: [
      { id: 'app', label: 'APP', sublabel: 'MOBILE', x: 48, y: 100, color: '#a3a3a3' },
      { id: 'api', label: 'API', sublabel: 'WS/API', x: 150, y: 100, color: '#c084fc' },
      { id: 'db', label: 'DB', sublabel: 'DATA', x: 245, y: 45, color: '#c084fc' },
      { id: 'maps', label: 'MAP', sublabel: 'MAPS', x: 245, y: 155, color: '#38bdf8' }
    ],
    links: [
      { id: 'j1', from: 'app', to: 'api', color: '#a855f7' },
      { id: 'j2', from: 'api', to: 'db', color: '#a855f7' },
      { id: 'j3', from: 'api', to: 'maps', color: '#38bdf8' }
    ]
  },
  'ai-resume': {
    nodes: [
      { id: 'react', label: 'UI', sublabel: 'REACT', x: 42, y: 100, color: '#a3a3a3', shape: 'circle' },
      { id: 'node', label: 'API', sublabel: 'NODE', x: 115, y: 100, color: '#22c55e', shape: 'circle' },
      { id: 'nlp', label: 'NLP', sublabel: 'MATCH', x: 188, y: 100, color: '#fb923c', shape: 'circle' },
      { id: 'out', label: 'RANK', sublabel: 'OUTPUT', x: 258, y: 100, color: '#60a5fa' }
    ],
    links: [
      { id: 'ai1', from: 'react', to: 'node', color: '#22c55e' },
      { id: 'ai2', from: 'node', to: 'nlp', color: '#fb923c' },
      { id: 'ai3', from: 'nlp', to: 'out', color: '#60a5fa' }
    ]
  },
  'cardio-guard': {
    nodes: [
      { id: 'audio', label: 'WAV', sublabel: 'INPUT', x: 42, y: 100, color: '#a3a3a3' },
      { id: 'mel', label: 'MEL', sublabel: 'PREP', x: 115, y: 100, color: '#2dd4bf' },
      { id: 'tfl', label: 'TFL', sublabel: 'MODEL', x: 188, y: 100, color: '#22c55e' },
      { id: 'app', label: 'APP', sublabel: 'RESULT', x: 258, y: 100, color: '#38bdf8' }
    ],
    links: [
      { id: 'cg1', from: 'audio', to: 'mel', color: '#14b8a6' },
      { id: 'cg2', from: 'mel', to: 'tfl', color: '#22c55e' },
      { id: 'cg3', from: 'tfl', to: 'app', color: '#0ea5e9' }
    ]
  },
  gridlock: {
    nodes: [
      { id: 'cctv', label: 'CAM', sublabel: 'CCTV', x: 42, y: 100, color: '#a3a3a3' },
      { id: 'seg', label: 'SAM', sublabel: 'SEG', x: 125, y: 100, color: '#fb923c' },
      { id: 'restore', label: 'AI', sublabel: 'RESTORE', x: 208, y: 55, color: '#f87171' },
      { id: 'route', label: 'ETA', sublabel: 'ROUTE', x: 208, y: 145, color: '#c084fc' },
      { id: 'alert', label: 'GPS', sublabel: 'ALERT', x: 268, y: 100, color: '#38bdf8' }
    ],
    links: [
      { id: 'gl1', from: 'cctv', to: 'seg', color: '#fb923c' },
      { id: 'gl2', from: 'seg', to: 'restore', color: '#ef4444' },
      { id: 'gl3', from: 'seg', to: 'route', color: '#a855f7' },
      { id: 'gl4', from: 'restore', to: 'alert', color: '#38bdf8' },
      { id: 'gl5', from: 'route', to: 'alert', color: '#38bdf8' }
    ]
  }
}

function centerFor(nodes: DiagramNode[], id: string) {
  return nodes.find((node) => node.id === id)!
}

export default function ArchitectureDiagram({ type = 'journeysync' }: { type?: string }) {
  const diagram = diagrams[type] ?? diagrams.journeysync

  return (
    <div className="w-full mt-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden p-3 sm:p-5 md:p-6 relative group flex justify-center shadow-inner">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
      <svg
        className="relative z-10 w-full max-w-[300px] h-auto transition-transform duration-700 group-hover:scale-[1.02]"
        viewBox="0 0 310 200"
        role="img"
        aria-label={`${type} architecture diagram`}
      >
        {diagram.links.map((link) => {
          const from = centerFor(diagram.nodes, link.from)
          const to = centerFor(diagram.nodes, link.to)

          return (
            <g key={link.id}>
              <path
                id={link.id}
                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                stroke={link.color}
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />
              <circle r="3" fill="#fff">
                <animateMotion dur="1.2s" repeatCount="indefinite">
                  <mpath href={`#${link.id}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}

        {diagram.nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
            {node.shape === 'circle' ? (
              <circle r="20" fill="#1a1a1a" stroke={node.color} strokeOpacity="0.7" />
            ) : (
              <rect x="-20" y="-20" width="40" height="40" rx="6" fill="#1a1a1a" stroke={node.color} strokeOpacity="0.7" />
            )}
            <text textAnchor="middle" y="4" fill="#f5f5f5" fontSize="10" fontWeight="700">
              {node.label}
            </text>
            <text textAnchor="middle" y="33" fill={node.color} fontSize="9" fontWeight="700">
              {node.sublabel}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
