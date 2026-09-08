'use client'

import { useLiveStatus } from '@/hooks/use-live-status'

const timeFormat = new Intl.DateTimeFormat('ko-KR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Seoul',
})

export default function LiveCheckTime() {
  const { checkedAt } = useLiveStatus()

  return (
    <span>
      {checkedAt ? `마지막 확인 ${timeFormat.format(new Date(checkedAt))}` : '방송 상태 확인 중'}
    </span>
  )
}
