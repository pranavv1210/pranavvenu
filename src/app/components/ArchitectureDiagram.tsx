'use client'

import { motion } from 'framer-motion'
import type { ArchitectureFlow } from '@/lib/projects'

export default function ArchitectureDiagram({ flow }: { flow: ArchitectureFlow }) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-surface/65 p-5">
      <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
      <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{flow.label}</p>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
      <div className="relative z-10 grid gap-3 sm:grid-cols-5">
        {flow.nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="relative min-h-24 border border-white/10 bg-bg/70 p-3"
          >
            {index < flow.nodes.length - 1 ? (
              <span className="absolute -right-3 top-1/2 hidden h-px w-3 bg-accent/50 sm:block" aria-hidden="true" />
            ) : null}
            <p className="font-mono text-[10px] text-accent">{node.id}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-text">{node.label}</p>
            {node.sublabel ? <p className="mt-1 font-mono text-[10px] uppercase text-muted">{node.sublabel}</p> : null}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
