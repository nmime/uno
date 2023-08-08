export function shiftArray<T>(arr: T[], shiftBy: number): T[] {
  const len = arr.length
  if (len === 0 || shiftBy === 0 || shiftBy % len === 0) return arr

  const shift = shiftBy % len
  if (shift < 0) return [...arr.slice(shift), ...arr.slice(0, shift)]
  else return [...arr.slice(-shift), ...arr.slice(0, len - shift)]
}
