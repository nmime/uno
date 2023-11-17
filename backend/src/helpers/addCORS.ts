import config from "@typings/config"
import { HttpResponse } from "uWebSockets.js"

import devHeaders from "../typings/devHeaders.json"

export const addCORS = async (res: HttpResponse, next: () => Promise<void>) => {
  if (config.NODE_ENV === "development")
    for (const header in devHeaders) {
      res.writeHeader(header, devHeaders[header as keyof typeof devHeaders])
    }

  return next().catch((err) => {
    console.error("An error occurred:", err)

    res.close()
  })
}
