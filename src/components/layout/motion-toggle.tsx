'use client'

import { Pause, Play } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { usePreferences } from '@/hooks/use-preferences'

export function MotionToggle({ compact = false }: { compact?: boolean }) {
  const { motionOff, ready, toggleMotion } = usePreferences()
  const label = motionOff ? '애니메이션 켜기' : '애니메이션 끄기'

  return (
    <Button
      variant="ghost"
      size={compact ? 'icon' : 'sm'}
      className={compact ? undefined : 'motion-toggle'}
      aria-label={label}
      aria-pressed={!motionOff}
      title={label}
      onClick={toggleMotion}
      disabled={!ready}
    >
      {motionOff ? <Play /> : <Pause />}
      {!compact && label}
    </Button>
  )
}
