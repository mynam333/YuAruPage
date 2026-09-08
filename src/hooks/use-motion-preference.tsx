'use client'

import { createContext, useContext } from 'react'

export const MotionPreferenceContext = createContext(false)
export function useMotionPreference() {
  return useContext(MotionPreferenceContext)
}
