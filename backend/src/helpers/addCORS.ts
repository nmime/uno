import config from "@typings/config"
import { HttpResponse } from "uWebSockets.js"

export const addCORS = async (res: HttpResponse, next: () => Promise<void>) => {
  if (config.NODE_ENV === "development") {
    res.writeHeader("Access-Control-Allow-Origin", "*")

    res.writeHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    )
    res.writeHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,Authorization"
    )
    res.writeHeader("Access-Control-Allow-Credentials", "true")
  }

  return next().catch((err) => {
    console.error("An error occurred:", err)

    res.close()
  })
}
