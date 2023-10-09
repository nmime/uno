import { HttpRequest, HttpResponse } from "uWebSockets.js"
import { validate } from "@tma.js/init-data-node"
import config from "@typings/config"
import { Deposit } from "common/database/deposit"

export async function receiveOrder(
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

  const id = req.getParameter(0)
  if (!id) return void res.writeStatus("400").end()

  const result = await Deposit.findOne({ _id: id })
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result))
}
