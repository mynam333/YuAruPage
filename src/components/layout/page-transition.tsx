'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreference } from '@/hooks/use-motion-preference'

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useMotionPreference()

  return (
    <motion.div
      initial={false}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: [0.5, 1], y: ['0.5rem', '0rem'] }}
      transition={{ duration: reduced ? 0 : 0.22 }}
    >
      {children}
    </motion.div>
  )
}
