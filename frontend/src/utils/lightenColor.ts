export function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt

  const newR = R < 255 ? (R < 1 ? 0 : R) : 255
  const newG = G < 255 ? (G < 1 ? 0 : G) : 255
  const newB = B < 255 ? (B < 1 ? 0 : B) : 255

  return (
    "#" +
    (0x1000000 + newR * 0x10000 + newG * 0x100 + newB).toString(16).slice(1)
  )
}
