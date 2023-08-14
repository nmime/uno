export function shiftArray<T>(arr: T[], shiftBy: number): T[] {
  const len = arr.length
  if (len === 0 || shiftBy === 0 || shiftBy % len === 0) return arr

  const shift = shiftBy >= 0 ? shiftBy % len : (len + (shiftBy % len)) % len
  return [...arr.slice(len - shift), ...arr.slice(0, len - shift)]
}
