'use client'

import { useSyncExternalStore } from 'react'
import {
  isLiveStatusResponse,
  unavailableLiveStatus,
  type LiveStatus,
  type LiveStatusResponse,
} from '../lib/live-status'

export interface LiveStatusSnapshot {
  status: 'loading' | LiveStatus
  title: string | null
  viewerCount: number | null
  thumbnailUrl: string | null
  checkedAt: string | null
  isRefreshing: boolean
}

const POLL_INTERVAL_MS = 30_000
const REQUEST_TIMEOUT_MS = 8_000
const initialSnapshot: LiveStatusSnapshot = {
  status: 'loading',
  title: null,
  viewerCount: null,
  thumbnailUrl: null,
  checkedAt: null,
  isRefreshing: false,
}
let snapshot = initialSnapshot
const listeners = new Set<() => void>()
let pollTimer: ReturnType<typeof setTimeout> | undefined
let abortController: AbortController | null = null
let activeRequest: Promise<void> | null = null
let requestGeneration = 0
let lastAttempt = 0

function publish(next: LiveStatusSnapshot) {
  snapshot = next
  listeners.forEach((listener) => listener())
}

function clearPollTimer() {
  if (pollTimer !== undefined) clearTimeout(pollTimer)
  pollTimer = undefined
}

function schedule() {
  clearPollTimer()
  if (listeners.size && document.visibilityState !== 'hidden') {
    const delay = Math.max(1_000, POLL_INTERVAL_MS - (Date.now() - lastAttempt))
    pollTimer = setTimeout(() => {
      void refreshLiveStatus()
    }, delay)
  }
}

function stopRequest() {
  requestGeneration += 1
  abortController?.abort()
  abortController = null
  activeRequest = null
  // A hidden tab or a route without subscribers can stay inactive indefinitely.
  // Discard the previous broadcast state so returning cannot expose old LIVE links.
  // The stable initial object also makes StrictMode cleanup/setup safe: the next
  // first subscriber starts one fresh request, and the aborted generation is ignored.
  if (snapshot !== initialSnapshot) publish(initialSnapshot)
}

/** All hook consumers share one request and one timer. */
export function refreshLiveStatus(): Promise<void> {
  if (activeRequest) return activeRequest
  clearPollTimer()
  const generation = ++requestGeneration
  const controller = new AbortController()
  abortController = controller
  lastAttempt = Date.now()
  publish({ ...snapshot, isRefreshing: true })

  activeRequest = (async () => {
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    let result: LiveStatusResponse
    try {
      const response = await fetch('/api/live-status', {
        signal: controller.signal,
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })
      const data: unknown = await response.json()
      if (!isLiveStatusResponse(data) || (!response.ok && data.status !== 'error')) {
        throw new Error('Invalid live status response')
      }
      result = data
    } catch {
      result = unavailableLiveStatus()
    } finally {
      clearTimeout(timeout)
    }
    // Cleanup/visibility changes can invalidate a request while another starts.
    if (generation !== requestGeneration) return
    abortController = null
    activeRequest = null
    publish({ ...result, isRefreshing: false })
    schedule()
  })()
  return activeRequest
}

function onVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    clearPollTimer()
    stopRequest()
  } else if (listeners.size) {
    void refreshLiveStatus()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (document.visibilityState !== 'hidden') {
      if (snapshot.status === 'loading' || Date.now() - lastAttempt >= POLL_INTERVAL_MS) {
        void refreshLiveStatus()
      } else {
        schedule()
      }
    }
  }
  return () => {
    listeners.delete(listener)
    if (!listeners.size) {
      clearPollTimer()
      stopRequest()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }
}

const getSnapshot = () => snapshot
const getServerSnapshot = () => initialSnapshot

export function useLiveStatus() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { ...state, refresh: refreshLiveStatus }
}
