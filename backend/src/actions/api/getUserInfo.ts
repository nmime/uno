import { findUser } from "@helpers/findUser"
import { parse, validate } from "@tma.js/init-data-node"
import config from "@typings/config"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function getUserInfo(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")
  try {
    validate(Authorization.split(" ")[1], config.BOT_TOKEN)
  } catch (e) {
    return void res.writeStatus("401").end()
  }

  const dataOfAuth = parse(Authorization.split(" ")[1])

  const number = Number(req.getParameter(0))
  if (isNaN(number) || dataOfAuth.user.id !== number)
    return void res.writeStatus("400").end()

  const result = await findUser(number, dataOfAuth.user.firstName)
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result.toJSON()))
}
