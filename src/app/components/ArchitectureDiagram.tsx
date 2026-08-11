'use client'

import { motion } from 'framer-motion'
import type { ArchitectureFlow } from '@/lib/projects'

export default function ArchitectureDiagram({ flow }: { flow: ArchitectureFlow }) {
  const nodes = flow.nodes.map((node, index) => ({
    ...node,
    x: node.x ? node.x * 1.08 + 5 : 18 + index * 21,
    y: node.y ? node.y * 0.82 + 15 : index % 2 === 0 ? 56 : 34,
  }))
  const links = flow.links ?? nodes.slice(0, -1).map((node, index) => [node.id, nodes[index + 1].id] as [string, string])

  return (
    <div className="architecture-flow relative overflow-hidden border border-white/10 bg-surface/65 p-5">
      <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
      <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{flow.label}</p>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
      <svg className="relative z-10 mx-auto block h-auto w-full max-w-3xl" viewBox="0 0 112 76" role="img" aria-label={flow.label}>
        <defs>
          <marker id={`arrow-${flow.label.replace(/\s+/g, '-')}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" className="flow-arrow" />
          </marker>
        </defs>

        {links.map(([fromId, toId], index) => {
          const from = nodes.find((node) => node.id === fromId)
          const to = nodes.find((node) => node.id === toId)
          if (!from || !to) return null

          const midX = (from.x! + to.x!) / 2
          const midY = (from.y! + to.y!) / 2 - 8

          return (
            <motion.path
              key={`${fromId}-${toId}`}
              d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
              className="flow-line"
              markerEnd={`url(#arrow-${flow.label.replace(/\s+/g, '-')})`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
            />
          )
        })}

        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + index * 0.08, duration: 0.45 }}
            className="flow-node"
            transform={`translate(${node.x} ${node.y})`}
          >
            <rect x="-8.8" y="-6.6" width="17.6" height="13.2" rx="2.2" className="flow-node-core" />
            <rect x="-11.6" y="-9.2" width="23.2" height="18.4" rx="3" className="flow-node-ring" />
            <text textAnchor="middle" y="-13" className="flow-node-id">
              {node.id}
            </text>
            <text textAnchor="middle" y="1.7" className="flow-node-label">
              {node.label}
            </text>
            {node.sublabel ? (
              <text textAnchor="middle" y="15" className="flow-node-sub">
                {node.sublabel}
              </text>
            ) : null}
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
