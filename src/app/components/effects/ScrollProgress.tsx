'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 })

  return <motion.div className="fixed left-0 top-0 z-[90] h-px w-full origin-left bg-accent" style={{ scaleX }} />
}
