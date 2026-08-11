'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navItems = [
  { label: '01 / Work', href: '/#work' },
  { label: '02 / System', href: '/#system' },
  { label: '03 / About', href: '/#about' },
  { label: '04 / Lab', href: '/#lab' },
  { label: '05 / Contact', href: '/#contact' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-bg/72 px-4 py-3 backdrop-blur-xl">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.28em] text-text" data-cursor="OPEN">
          Pranav V.
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link" data-cursor="OPEN">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_16px_rgba(125,226,209,0.9)]" />
          System / Ready
        </div>

        <button
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-9 w-9 place-items-center border border-white/10 text-text md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-7xl border border-white/10 bg-surface/95 p-4 backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 font-mono text-xs uppercase tracking-[0.22em] text-secondary last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
