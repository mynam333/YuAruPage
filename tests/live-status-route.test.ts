import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { createLiveStatusRoute } from '../src/server/live-status-route.ts'
import {
  isLiveStatusResponse,
  normalizeChzzkPayload,
  unavailableLiveStatus,
} from '../src/lib/live-status.ts'

const endpoint = 'http://localhost/api/live-status'
const checkedAt = '2026-09-08T00:00:00.000Z'
const live = normalizeChzzkPayload({ code: 200, content: { status: 'OPEN' } }, checkedAt)
const offline = normalizeChzzkPayload({ code: 200, content: { status: 'CLOSE' } }, checkedAt)
const unavailable = unavailableLiveStatus(checkedAt)

function assertResponseHeaders(response: Response) {
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8')
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
}

test('GET returns a fresh JSON response for confirmed live and offline states', async () => {
  for (const status of [live, offline]) {
    const handler = createLiveStatusRoute(async () => status)
    const response = await handler(new Request(endpoint))

    assert.equal(response.status, 200)
    assertResponseHeaders(response)
    assert.deepEqual(await response.json(), status)
  }
})

test('upstream unavailability has a 503 JSON response instead of claiming offline', async () => {
  const handler = createLiveStatusRoute(async () => unavailable)
  const response = await handler(new Request(endpoint))

  assert.equal(response.status, 503)
  assertResponseHeaders(response)
  assert.deepEqual(await response.json(), unavailable)
})

test('HEAD preserves the status and headers of GET without a response body', async () => {
  for (const status of [live, offline, unavailable]) {
    const handler = createLiveStatusRoute(async () => status)
    const getResponse = await handler(new Request(endpoint))
    const headResponse = await handler(new Request(endpoint, { method: 'HEAD' }))

    assert.equal(headResponse.status, getResponse.status)
    assert.deepEqual([...headResponse.headers], [...getResponse.headers])
    assert.equal(await headResponse.text(), '')
  }
})

test('unsupported methods are rejected without requesting the upstream status', async () => {
  let calls = 0
  const handler = createLiveStatusRoute(async () => {
    calls += 1
    return live
  })

  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    const response = await handler(new Request(endpoint, { method }))

    assert.equal(response.status, 405)
    assert.equal(response.headers.get('allow'), 'GET, HEAD')
    assertResponseHeaders(response)
    assert.deepEqual(await response.json(), { error: 'Method not allowed' })
  }

  assert.equal(calls, 0)
})

test('the client contract accepts normalized responses and rejects malformed live data', () => {
  for (const response of [live, offline, unavailable]) {
    assert.equal(isLiveStatusResponse(response), true)
  }

  const invalidResponses: unknown[] = [
    null,
    {},
    { ...live, status: 'loading' },
    { ...live, checkedAt: 'not-a-date' },
    { ...live, viewerCount: -1 },
    { ...live, viewerCount: Infinity },
    { ...live, viewerCount: 1.5 },
    { ...live, thumbnailUrl: 'not-a-url' },
    { ...live, thumbnailUrl: 'javascript:alert(1)' },
    { ...offline, thumbnailUrl: live.thumbnailUrl },
    { ...unavailable, title: 'stale live title' },
  ]

  for (const response of invalidResponses) {
    assert.equal(isLiveStatusResponse(response), false)
  }
})
