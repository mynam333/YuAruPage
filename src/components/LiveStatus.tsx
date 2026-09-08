'use client'

import { Badge } from '@/components/ui/badge'
import { useLiveStatus } from '@/hooks/use-live-status'
import { cn } from '@/lib/utils'

const STATUS_LABELS = {
  loading: { full: '방송 확인 중', short: '방송 확인 중' },
  live: { full: '방송 중', short: 'LIVE' },
  offline: { full: '오프라인', short: 'OFFLINE' },
  error: { full: '방송 상태 확인 불가', short: '확인 불가' },
} as const

export default function LiveStatus({ short = false }: { short?: boolean }) {
  const { status } = useLiveStatus()
  const label = STATUS_LABELS[status][short ? 'short' : 'full']

  return (
    <Badge variant="outline" className={cn('live-badge', `status-${status}`)}>
      <span className="status-dot" />
      {label}
    </Badge>
  )
}
