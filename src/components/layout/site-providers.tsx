'use client'

import type { ReactNode } from 'react'
import { IconContext } from '@phosphor-icons/react'
import { MotionConfig } from 'motion/react'
import { MotionPreferenceContext } from '@/hooks/use-motion-preference'
import { usePreferences } from '@/hooks/use-preferences'

const iconDefaults = { weight: 'regular', size: '1.25rem' } as const

export function SiteProviders({ children }: { children: ReactNode }) {
  const { motionOff, ready } = usePreferences()
  // Use still artwork during SSR until the visitor's motion preference is known.
  const motionDisabled = !ready || motionOff

  return (
    <IconContext.Provider value={iconDefaults}>
      <MotionPreferenceContext.Provider value={motionDisabled}>
        {/* Motion caches this option when an element mounts. Keep it stable;
            the shared preference context controls every animation instead. */}
        <MotionConfig reducedMotion="never">{children}</MotionConfig>
      </MotionPreferenceContext.Provider>
    </IconContext.Provider>
  )
}
