export function roundNumber(number: number | string): number {
  return Math.round(Number(number) * 10) / 10
}
