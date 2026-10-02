import { expect, test } from 'claude-code/testing'
import { bar, colorFor, k } from './meter'

test('bar is 20 cells wide and filled by percent', () => {
  expect(bar(25)).toBe('█████' + '░'.repeat(15))
  expect(bar(100).length).toBe(20)
})

test('colour turns yellow at 60% and red at 85%', () => {
  expect(colorFor(59)).toBe('green')
  expect(colorFor(60)).toBe('yellow')
  expect(colorFor(85)).toBe('red')
})

test('token counts are shown in thousands', () => {
  expect(k(200_000)).toBe('200k')
})
