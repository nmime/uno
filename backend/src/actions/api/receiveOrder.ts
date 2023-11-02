import { validation } from "@helpers/validation"
import { Deposit } from "common/database"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function receiveOrder(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")
  if (!validation(Authorization.split(" ")[1]))
    return void res.writeStatus("401").end()

  const id = req.getParameter(0)
  if (!id) return void res.writeStatus("400").end()

  const result = await Deposit.findOne({ _id: id })
  if (!result) return void res.writeStatus("406").end()

  if (!res.aborted) res.writeStatus("200").end(JSON.stringify(result))
}
