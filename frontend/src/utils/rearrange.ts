const placesArray = [
  [],
  [0],
  [1, 0],
  [1, 0, 2],
  [1, 0, 3, 2],
  [2, 1, 4, 3, 0],
  [2, 1, 4, 3, 0, 5],
  [2, 1, 5, 3, 0, 6, 4],
  [3, 2, 6, 4, 1, 7, 5, 0],
  [3, 2, 6, 4, 1, 7, 5, 0, 8]
]

export function rearrange<T>(array: T[]): T[] {
  return placesArray[array.length].map((index) => array[index])
}
