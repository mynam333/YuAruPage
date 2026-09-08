import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { isMotionReduced, parseMotionSetting } from '../src/lib/appearance.ts'

test('a saved motion-on choice enables animation even when the operating system reduces motion', () => {
  const restoredChoice = parseMotionSetting('full')

  assert.equal(isMotionReduced(restoredChoice, true), false)
  assert.equal(isMotionReduced(restoredChoice, false), false)
})

test('a saved motion-off choice keeps animation disabled when the operating system allows motion', () => {
  const restoredChoice = parseMotionSetting('reduced')

  assert.equal(isMotionReduced(restoredChoice, false), true)
  assert.equal(isMotionReduced(restoredChoice, true), true)
})

test('system, missing and unrecognized saved choices follow the operating system preference', () => {
  const storedValues = ['system', null, '', 'invalid', 'true', 'false', 'FULL']

  for (const storedValue of storedValues) {
    const restoredChoice = parseMotionSetting(storedValue)

    assert.equal(
      isMotionReduced(restoredChoice, true),
      true,
      `Saved value ${String(storedValue)} should respect reduced system motion`,
    )
    assert.equal(
      isMotionReduced(restoredChoice, false),
      false,
      `Saved value ${String(storedValue)} should respect full system motion`,
    )
  }
})
