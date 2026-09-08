'use client'

import { motion } from 'motion/react'
import { useMotionPreference as useReducedMotion } from '@/hooks/use-motion-preference'
import type { ReactNode } from 'react'

const elements = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  li: motion.li,
  a: motion.a,
}

interface RevealProps {
  children: ReactNode
  as?: keyof typeof elements
  className?: string
  delay?: number
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  href?: string
  target?: string
  rel?: string
}

export default function Reveal({ children, as = 'div', delay = 0, ...props }: RevealProps) {
  const reduce = useReducedMotion()
  const Element = elements[as]

  return (
    <Element
      {...props}
      initial={false}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: [0.5, 1], y: ['1.75rem', '0rem'] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduce ? 0 : 0.8,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Element>
  )
}
