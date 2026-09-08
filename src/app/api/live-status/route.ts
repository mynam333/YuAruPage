import { getLiveStatus } from '../../../server/chzzk.ts'
import { createLiveStatusRoute } from '../../../server/live-status-route.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const handleRequest = createLiveStatusRoute(getLiveStatus)

export const GET = handleRequest
export const HEAD = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
export const OPTIONS = handleRequest
