'use client'

import { useSyncExternalStore } from 'react'
import { isMotionReduced } from '@/lib/appearance'
import {
  getPreferences,
  getServerPreferences,
  subscribePreferences,
  toggleMotion,
  toggleTheme,
} from '@/lib/preferences-store'

export function usePreferences() {
  const preferences = useSyncExternalStore(
    subscribePreferences,
    getPreferences,
    getServerPreferences,
  )
  return {
    ...preferences,
    motionOff: isMotionReduced(preferences.motionSetting, preferences.systemReduced),
    toggleTheme,
    toggleMotion,
  }
}
