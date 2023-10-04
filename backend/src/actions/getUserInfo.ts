import { findUser } from "@helpers/findUser"
import { HttpRequest, HttpResponse } from "uWebSockets.js"
import { validate } from "@tma.js/init-data-node"
import config from "@typings/config"

export async function getUserInfo(res: HttpResponse, req: HttpRequest) {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")

  try {
    validate(Authorization.split(" ")[1], config.BOT_TOKEN)
  } catch (e) {
    console.error(e, Authorization.split(" ")[1])
    res.writeStatus("401").end()

    return
  }

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
