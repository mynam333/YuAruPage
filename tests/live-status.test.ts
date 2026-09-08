import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { createLiveStatusService } from '../src/server/chzzk.ts'
import {
  CHZZK_STATUS_URL,
  FALLBACK_THUMBNAIL_URL,
  normalizeChzzkPayload,
} from '../src/lib/live-status.ts'

const checkedAt = '2026-09-08T00:00:00.000Z'
const livePayload = {
  code: 200,
  content: { status: 'OPEN', liveTitle: '아루의 작업실', concurrentUserCount: 42 },
}
const successfulResponse = (payload: unknown) => ({
  ok: true,
  status: 200,
  json: async () => payload,
})

test('OPEN gives live state and the supplied thumbnail fallback', () => {
  assert.deepEqual(normalizeChzzkPayload(livePayload, checkedAt), {
    status: 'live',
    title: '아루의 작업실',
    viewerCount: 42,
    thumbnailUrl: FALLBACK_THUMBNAIL_URL,
    checkedAt,
  })
})

test('an upstream image template is resolved and unsafe image schemes fall back', () => {
  const payload = {
    code: 200,
    content: { status: 'OPEN', liveImageUrl: 'https://example.com/image_{type}.jpg' },
  }
  assert.equal(normalizeChzzkPayload(payload).thumbnailUrl, 'https://example.com/image_1080.jpg')
  payload.content.liveImageUrl = 'javascript:alert(1)'
  assert.equal(normalizeChzzkPayload(payload).thumbnailUrl, FALLBACK_THUMBNAIL_URL)
})

test('CLOSE clears title, viewers and images left over in the upstream response', () => {
  assert.deepEqual(
    normalizeChzzkPayload(
      {
        ...livePayload,
        content: { ...livePayload.content, status: 'CLOSE' },
      },
      checkedAt,
    ),
    {
      status: 'offline',
      title: null,
      viewerCount: null,
      thumbnailUrl: null,
      checkedAt,
    },
  )
})

test('invalid, missing and unknown status payloads never become offline', () => {
  for (const payload of [
    null,
    {},
    { code: 9004 },
    { code: 200, content: {} },
    { code: 200, content: { status: 'UNKNOWN' } },
    { code: 500, content: { status: 'CLOSE' } },
  ]) {
    assert.throws(() => normalizeChzzkPayload(payload))
  }
})

test('negative and non-finite viewer counts are omitted', () => {
  for (const count of [-1, NaN, Infinity]) {
    assert.equal(
      normalizeChzzkPayload({
        code: 200,
        content: { ...livePayload.content, concurrentUserCount: count },
      }).viewerCount,
      null,
    )
  }
})

test('concurrent callers share a request and valid responses are cached for 15 seconds', async () => {
  let clock = Date.parse(checkedAt)
  let calls = 0
  const getStatus = createLiveStatusService({
    now: () => clock,
    fetcher: async () => {
      calls += 1
      return successfulResponse(livePayload)
    },
  })
  const results = await Promise.all([getStatus(), getStatus(), getStatus()])
  assert.equal(calls, 1)
  assert.ok(results.every((result) => result.status === 'live'))
  clock += 14_999
  await getStatus()
  assert.equal(calls, 1)
  clock += 1
  await getStatus()
  assert.equal(calls, 2)
})

test('requests the supported official v2 polling endpoint', async () => {
  let requestedUrl = ''
  let cacheMode: RequestCache | undefined
  const getStatus = createLiveStatusService({
    fetcher: async (url, options) => {
      requestedUrl = url
      cacheMode = options.cache
      return successfulResponse({ code: 200, content: { status: 'CLOSE' } })
    },
  })
  assert.equal((await getStatus()).status, 'offline')
  assert.equal(requestedUrl, CHZZK_STATUS_URL)
  assert.equal(cacheMode, 'no-store')
  assert.match(
    requestedUrl,
    /\/polling\/v2\/channels\/6d395c84c99777272f872171b4dfc122\/live-status$/,
  )
})

test('upstream failures replace previous live state and use a shorter error cache', async () => {
  let clock = Date.parse(checkedAt)
  let calls = 0
  const getStatus = createLiveStatusService({
    now: () => clock,
    fetcher: async () => {
      calls += 1
      if (calls > 1) throw new Error('network unavailable')
      return successfulResponse(livePayload)
    },
  })
  assert.equal((await getStatus()).status, 'live')
  clock += 15_000
  const failed = await getStatus()
  assert.equal(failed.status, 'error')
  assert.equal(failed.thumbnailUrl, null)
  clock += 4_999
  await getStatus()
  assert.equal(calls, 2)
  clock += 1
  await getStatus()
  assert.equal(calls, 3)
})

test('HTTP errors, malformed JSON and malformed payloads return unknown/error state', async () => {
  const fetchers = [
    async () => ({ ok: false, status: 403, json: async () => ({}) }),
    async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('Invalid JSON')
      },
    }),
    async () => successfulResponse({ code: 200, content: { status: 'unrecognized' } }),
  ]
  for (const fetcher of fetchers) {
    assert.equal((await createLiveStatusService({ fetcher })()).status, 'error')
  }
})

test('a timed out request resolves to error and aborts its fetch signal', async () => {
  let signal: AbortSignal | null | undefined
  const getStatus = createLiveStatusService({
    timeoutMs: 10,
    fetcher: (_url, options) => {
      signal = options.signal
      return new Promise(() => {})
    },
  })
  assert.equal((await getStatus()).status, 'error')
  assert.equal(signal?.aborted, true)
})
