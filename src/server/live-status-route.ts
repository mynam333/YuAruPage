import type { LiveStatusResponse } from '../lib/live-status.ts'

type GetLiveStatus = () => Promise<LiveStatusResponse>

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
}

/** Keep HTTP behavior independent of the upstream service and Next.js runtime. */
export function createLiveStatusRoute(getStatus: GetLiveStatus) {
  return async function handleRequest(request: Request): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return Response.json(
        { error: 'Method not allowed' },
        {
          status: 405,
          headers: { ...RESPONSE_HEADERS, Allow: 'GET, HEAD' },
        },
      )
    }

    const result = await getStatus()

    return new Response(request.method === 'HEAD' ? null : JSON.stringify(result), {
      status: result.status === 'error' ? 503 : 200,
      headers: RESPONSE_HEADERS,
    })
  }
}
