import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { useLiveStatus } from '../src/hooks/use-live-status.ts'

function BroadcastState() {
  const live = useLiveStatus()
  return createElement('output', null, `${live.status}:${String(live.checkedAt)}`)
}

test('server rendering starts in loading state without browser APIs or upstream requests', () => {
  const firstRender = renderToString(createElement(BroadcastState))
  const secondRender = renderToString(createElement(BroadcastState))

  assert.equal(firstRender, '<output>loading:null</output>')
  assert.equal(secondRender, firstRender)
})
