const WIDTH = 20

export function bar(percent: number): string {
  const filled = Math.min(WIDTH, Math.round((percent / 100) * WIDTH))
  return '█'.repeat(filled) + '░'.repeat(WIDTH - filled)
}

export function colorFor(percent: number): string {
  if (percent >= 85) return 'red'
  if (percent >= 60) return 'yellow'
  return 'green'
}

export const k = (n: number) => `${Math.round(n / 1000)}k`
