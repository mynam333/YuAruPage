'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowClockwise,
  ArrowUpRight,
  Broadcast,
  Monitor,
  Users,
  WarningCircle,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLiveStatus, type LiveStatusSnapshot } from '@/hooks/use-live-status'
import { CHZZK_LIVE_URL } from '@/lib/live-status'
import { cn } from '@/lib/utils'
import LiveStatus from './LiveStatus'

interface LiveScreenProps {
  compact?: boolean
}

interface ScreenMessageProps extends LiveScreenProps {
  status: LiveStatusSnapshot['status']
}

const SCREEN_MESSAGES = {
  live: {
    Icon: Broadcast,
    title: 'ON AIR',
    description: '방송 중 · 썸네일을 불러올 수 없습니다.',
  },
  offline: {
    Icon: Monitor,
    title: 'OFF AIR',
    description: '현재 방송 중이 아닙니다.',
  },
  error: {
    Icon: WarningCircle,
    title: 'SIGNAL LOST',
    description: '방송 상태를 확인할 수 없습니다.',
  },
} as const

function ScreenMessage({ status, compact }: ScreenMessageProps) {
  if (status === 'loading') {
    return (
      <div className="screen-message">
        <Skeleton className="screen-loading" />
        <p>방송 상태 확인 중</p>
      </div>
    )
  }

  const { Icon, title, description } = SCREEN_MESSAGES[status]

  return (
    <div className="screen-message">
      <Icon weight="thin" />
      <span className="screen-word" data-text={title}>
        {title}
      </span>
      <p>{description}</p>
      {!compact && status === 'error' && (
        <span className="screen-description">새로고침 버튼으로 다시 확인할 수 있습니다.</span>
      )}
    </div>
  )
}

interface LiveThumbnailProps extends LiveScreenProps {
  src: string
  title: string | null
}

function LiveThumbnail({ src, title, compact }: LiveThumbnailProps) {
  const [hasFailed, setHasFailed] = useState(false)

  if (hasFailed) return <ScreenMessage status="live" compact={compact} />

  return (
    <Image
      className="live-thumbnail"
      src={src}
      alt={title ? `생방송 썸네일: ${title}` : '유아루 현재 생방송 썸네일'}
      fill
      sizes="(max-width: 768px) 100vw, min(90vw, 65.625rem)"
      unoptimized
      onError={() => setHasFailed(true)}
    />
  )
}

function getCurrentThumbnailUrl(live: LiveStatusSnapshot): string | null {
  if (live.status !== 'live' || !live.thumbnailUrl) return null

  const url = new URL(live.thumbnailUrl)
  url.searchParams.set('t', live.checkedAt ?? '')
  return url.toString()
}

export default function LiveScreen({ compact = false }: LiveScreenProps) {
  const live = useLiveStatus()
  const isLive = live.status === 'live'
  const thumbnailUrl = getCurrentThumbnailUrl(live)

  return (
    <div className={cn('live-monitor', compact && 'monitor-compact')}>
      <div className="monitor-top">
        <span>
          <Broadcast weight="duotone" /> YUARU ON AIR
        </span>
        <LiveStatus short />
      </div>

      <div className={cn('crt-screen', `screen-${live.status}`)}>
        {thumbnailUrl ? (
          <LiveThumbnail
            key={thumbnailUrl}
            src={thumbnailUrl}
            title={live.title}
            compact={compact}
          />
        ) : (
          <ScreenMessage status={live.status} compact={compact} />
        )}

        {isLive && (
          <a
            className="screen-watch"
            href={CHZZK_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="watch-icon">
              <Broadcast weight="fill" />
            </span>
            <span>
              라이브 보러 가기 <ArrowUpRight />
            </span>
          </a>
        )}

        {!isLive && live.status !== 'loading' && <div className="crt-static" aria-hidden="true" />}
        <div className="crt-scan" aria-hidden="true" />
      </div>

      <div className="monitor-bottom">
        <div className="monitor-detail">
          <span className="monitor-indicator" />
          <span>{isLive ? live.title || '유아루 생방송' : '유아루 치지직'}</span>
          {isLive && live.viewerCount !== null && (
            <span className="viewer-count">
              <Users /> {live.viewerCount.toLocaleString('ko-KR')}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={live.refresh}
          disabled={live.isRefreshing}
          aria-label="방송 상태 새로고침"
        >
          <ArrowClockwise className={cn(live.isRefreshing && 'refreshing')} />
        </Button>
      </div>
    </div>
  )
}
