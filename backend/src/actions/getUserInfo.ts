import { findUser } from "@helpers/findUser"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function getUserInfo(res: HttpResponse, req: HttpRequest) {
  res.onAborted(() => {
    res.aborted = true
  })

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
