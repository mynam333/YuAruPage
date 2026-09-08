'use client'

import { ArrowUp } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { MotionToggle } from './motion-toggle'

export function FooterControls() {
  const motionDisabled = useMotionPreference()

  return (
    <>
      <MotionToggle />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.scrollTo({ top: 0, behavior: motionDisabled ? 'instant' : 'smooth' })}
      >
        맨 위로 <ArrowUp />
      </Button>
    </>
  )
}
