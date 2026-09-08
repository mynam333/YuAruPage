'use client'

import { ArrowUpRight, Broadcast } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useLiveStatus } from '@/hooks/use-live-status'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { LIVE_URL } from '@/lib/content'

const statusLabels = {
  live: '방송 중',
  offline: '오프라인',
  loading: '방송 상태 확인 중',
  error: '방송 상태 확인 실패',
}

export function BioLiveStatus() {
  const { status } = useLiveStatus()

  return (
    <div className={`bio-status bio-status-${status}`} aria-live="polite">
      <span />
      {statusLabels[status]}
    </div>
  )
}

export function BioLiveLink() {
  const { status } = useLiveStatus()
  const reduced = useMotionPreference()
  if (status !== 'live') return null

  return (
    <motion.a
      className="bio-live-link"
      href={LIVE_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduced ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: reduced ? 0 : 0.3 }}
    >
      <Broadcast size="1.5625rem" aria-hidden="true" />
      <div>
        <span>LIVE NOW</span>
        <strong>지금 방송 보러가기</strong>
      </div>
      <ArrowUpRight size="1.5625rem" aria-hidden="true" />
    </motion.a>
  )
}
