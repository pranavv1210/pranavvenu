'use client'

import { motion } from 'framer-motion'
import type { ArchitectureFlow } from '@/lib/projects'

const nodePositions = [
  { x: 10, y: 34 },
  { x: 30, y: 34 },
  { x: 50, y: 34 },
  { x: 70, y: 34 },
  { x: 90, y: 34 },
]

export default function ArchitectureDiagram({ flow }: { flow: ArchitectureFlow }) {
  const nodes = flow.nodes.slice(0, 5)

  return (
    <div className="architecture-flow relative overflow-hidden border border-white/10 bg-surface/65 p-5">
      <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
      <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{flow.label}</p>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
      <svg className="relative z-10 mx-auto block h-auto w-full max-w-3xl" viewBox="0 0 100 58" role="img" aria-label={flow.label}>
        <defs>
          <marker id={`flow-arrow-${flow.label.replace(/\s+/g, '-')}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="flow-arrow" />
          </marker>
        </defs>

        {nodes.slice(0, -1).map((node, index) => {
          const from = nodePositions[index]
          const to = nodePositions[index + 1]

          return (
            <motion.line
              key={`${node.id}-${nodes[index + 1].id}`}
              x1={from.x + 6.5}
              y1={from.y}
              x2={to.x - 6.5}
              y2={to.y}
              className="flow-line"
              markerEnd={`url(#flow-arrow-${flow.label.replace(/\s+/g, '-')})`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            />
          )
        })}

        {nodes.map((node, index) => {
          const position = nodePositions[index]

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + index * 0.07, duration: 0.35 }}
              className="flow-node"
              transform={`translate(${position.x} ${position.y})`}
            >
              <rect x="-7.4" y="-6.3" width="14.8" height="12.6" rx="2" className="flow-node-core" />
              <rect x="-9.7" y="-8.6" width="19.4" height="17.2" rx="2.8" className="flow-node-ring" />
              <text textAnchor="middle" y="-11.5" className="flow-node-id">
                {node.id}
              </text>
              <text textAnchor="middle" y="1.5" className="flow-node-label">
                {node.label}
              </text>
              {node.sublabel ? (
                <text textAnchor="middle" y="13.2" className="flow-node-sub">
                  {node.sublabel}
                </text>
              ) : null}
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
