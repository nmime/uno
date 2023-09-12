import { findUser } from "@helpers/findUser"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function getUserInfo(res: HttpResponse, req: HttpRequest) {
  res.onAborted(() => {
    res.aborted = true
  })

  res.writeHeader("Access-Control-Allow-Origin", "*")
  res.writeHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  res.writeHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept, x-requested-with"
  )
  res.writeHeader("Access-Control-Max-Age", "3600")

  const number = Number(req.getParameter(0))

  if (isNaN(number)) {
    res.writeStatus("400").end()

    return
  }

  const result = await findUser(number)

  if (!result) {
    res.writeStatus("406").end()

    return
  }

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result.toJSON()))
}
