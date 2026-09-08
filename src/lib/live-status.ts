export const CHZZK_CHANNEL_ID = '6d395c84c99777272f872171b4dfc122'
// CHZZK v1 now returns code 9004 (update required). The supported v2 endpoint
// preserves the explicit OPEN/CLOSE broadcast state contract.
export const CHZZK_STATUS_URL = `https://api.chzzk.naver.com/polling/v2/channels/${CHZZK_CHANNEL_ID}/live-status`
export const CHZZK_CHANNEL_URL = `https://chzzk.naver.com/${CHZZK_CHANNEL_ID}`
export const CHZZK_LIVE_URL = `https://chzzk.naver.com/live/${CHZZK_CHANNEL_ID}`
export const FALLBACK_THUMBNAIL_URL =
  'https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26752561/live/4507562/record/25444456/thumbnail/image_1080.jpg'

export type LiveStatus = 'live' | 'offline' | 'error'

export interface LiveStatusResponse {
  status: LiveStatus
  title: string | null
  viewerCount: number | null
  thumbnailUrl: string | null
  checkedAt: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function thumbnailFrom(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return FALLBACK_THUMBNAIL_URL
  try {
    const url = new URL(value.replaceAll('{type}', '1080'))
    if (url.protocol === 'https:') return url.toString()
  } catch {
    // A live broadcast can temporarily have no usable thumbnail.
  }
  return FALLBACK_THUMBNAIL_URL
}

/** Only an explicit upstream OPEN or CLOSE status establishes broadcast state. */
export function normalizeChzzkPayload(
  payload: unknown,
  checkedAt = new Date().toISOString(),
): LiveStatusResponse {
  if (!isRecord(payload) || payload.code !== 200 || !isRecord(payload.content)) {
    throw new Error('CHZZK returned an invalid response envelope')
  }
  const content = payload.content
  if (content.status !== 'OPEN' && content.status !== 'CLOSE') {
    throw new Error('CHZZK did not provide a recognized broadcast status')
  }
  const isLive = content.status === 'OPEN'
  const title = typeof content.liveTitle === 'string' ? content.liveTitle.trim() : ''
  return {
    status: isLive ? 'live' : 'offline',
    title: isLive && title ? title : null,
    viewerCount:
      isLive &&
      typeof content.concurrentUserCount === 'number' &&
      Number.isFinite(content.concurrentUserCount) &&
      content.concurrentUserCount >= 0
        ? Math.floor(content.concurrentUserCount)
        : null,
    thumbnailUrl: isLive ? thumbnailFrom(content.liveImageUrl) : null,
    checkedAt,
  }
}

export function unavailableLiveStatus(checkedAt = new Date().toISOString()): LiveStatusResponse {
  return { status: 'error', title: null, viewerCount: null, thumbnailUrl: null, checkedAt }
}

export function isLiveStatusResponse(value: unknown): value is LiveStatusResponse {
  if (!isRecord(value)) return false
  if (typeof value.checkedAt !== 'string' || !Number.isFinite(Date.parse(value.checkedAt))) {
    return false
  }

  if (value.status === 'offline' || value.status === 'error') {
    return value.title === null && value.viewerCount === null && value.thumbnailUrl === null
  }

  if (value.status !== 'live') return false
  if (value.title !== null && typeof value.title !== 'string') return false
  if (
    value.viewerCount !== null &&
    (typeof value.viewerCount !== 'number' ||
      !Number.isInteger(value.viewerCount) ||
      value.viewerCount < 0)
  ) {
    return false
  }

  if (value.thumbnailUrl === null) return true
  if (typeof value.thumbnailUrl !== 'string') return false

  try {
    return new URL(value.thumbnailUrl).protocol === 'https:'
  } catch {
    return false
  }
}
