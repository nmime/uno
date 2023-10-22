import { HttpResponse } from "uWebSockets.js"

export function collectRequestBody(res: HttpResponse): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer: Buffer
    res.onData((ab, isLast) => {
      const chunk = Buffer.from(ab)
      buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])

      if (isLast) {
        resolve(buffer.toString())
      }
    })

    res.onAborted(() => {
      reject(new Error("Request aborted"))
    })
  })
}
