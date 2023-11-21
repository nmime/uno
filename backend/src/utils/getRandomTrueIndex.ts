import { randomInt } from "crypto"

export function getRandomTrueIndex(boolArray: boolean[]): number | null {
  const trueIndices = boolArray.reduce((indices, value, index) => {
    if (value) indices.push(index)
    return indices
  }, [] as number[])

  if (trueIndices.length === 0) return null

  const randomIndex = randomInt(trueIndices.length)

  return trueIndices[randomIndex]
}
