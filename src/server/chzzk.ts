import {
  CHZZK_STATUS_URL,
  normalizeChzzkPayload,
  unavailableLiveStatus,
  type LiveStatusResponse,
} from '../lib/live-status.ts'

type FetchResponse = Pick<Response, 'ok' | 'status' | 'json'>
type Fetcher = (url: string, options: RequestInit) => Promise<FetchResponse>

interface LiveStatusServiceOptions {
  fetcher?: Fetcher
  now?: () => number
  cacheTtlMs?: number
  errorCacheTtlMs?: number
  timeoutMs?: number
}

/** A single cache and in-flight request protect CHZZK from duplicated page polling. */
export function createLiveStatusService({
  fetcher = fetch,
  now = Date.now,
  cacheTtlMs = 15_000,
  errorCacheTtlMs = 5_000,
  timeoutMs = 6_000,
}: LiveStatusServiceOptions = {}) {
  let cached: LiveStatusResponse | null = null
  let expiresAt = 0
  let pending: Promise<LiveStatusResponse> | null = null

  async function request(): Promise<LiveStatusResponse> {
    const controller = new AbortController()
    let timeout: ReturnType<typeof setTimeout> | undefined
    try {
      const response = await Promise.race([
        fetcher(CHZZK_STATUS_URL, {
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; YuaruHomepage/1.0)',
            Referer: 'https://chzzk.naver.com/',
          },
        }).then(async (response) => {
          if (!response.ok) throw new Error(`CHZZK HTTP ${response.status}`)
          return normalizeChzzkPayload(await response.json(), new Date(now()).toISOString())
        }),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => {
            controller.abort()
            reject(new Error('CHZZK request timed out'))
          }, timeoutMs)
        }),
      ])
      cached = response
      expiresAt = now() + cacheTtlMs
      return response
    } catch {
      // Do not retain a previous LIVE result or turn a network failure into OFFLINE.
      cached = unavailableLiveStatus(new Date(now()).toISOString())
      expiresAt = now() + errorCacheTtlMs
      return cached
    } finally {
      if (timeout !== undefined) clearTimeout(timeout)
      pending = null
    }
  }

  return function getStatus(): Promise<LiveStatusResponse> {
    if (cached && now() < expiresAt) return Promise.resolve(cached)
    if (pending) return pending
    pending = Promise.resolve().then(request)
    return pending
  }
}

export const getLiveStatus = createLiveStatusService()
