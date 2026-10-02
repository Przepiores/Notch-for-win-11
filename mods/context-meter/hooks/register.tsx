import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Fill } from '../types'
import { bar, colorFor, k } from './meter'

const fill = atom({ plugin: 'context-meter', key: 'fill' } as const, null)

export const register: Register = on => {
  on('session.measure', async ($, e, next) => {
    const { tokens, window, percent } = e.context
    if (e.changed.includes('context') && tokens !== undefined && percent !== undefined) {
      const value: Fill = { tokens, window, percent }
      await update($, fill, () => value)
    }
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const value = await read($, fill)
    if (e.props.hasSurvey || value === null) return next(e)

    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text dimColor>Kontekst </Text>
        <Text color={colorFor(value.percent)}>{bar(value.percent)}</Text>
        <Text bold> {value.percent}%</Text>
        <Text dimColor> ({k(value.tokens)} / {k(value.window)})</Text>
      </Box>
    )
  })
}
