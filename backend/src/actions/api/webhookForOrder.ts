import config from "@typings/config"
import { WebhookMessageType, WebhookOrder } from "@typings/wallet"
import { collectRequestBody } from "@utils/collectRequestBody"
import { computeSignature } from "@utils/computeSignature"
import { Deposit } from "common/database"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function webhookForOrder(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const url = req.getUrl()
  const walletTimestamp = req.getHeader("walletpay-timestamp")
  const walletSignature = req.getHeader("walletpay-signature")

  if (!walletTimestamp || !walletSignature)
    return void res.writeStatus("400").end()

  let body: WebhookOrder[]
  try {
    const requestBody = await collectRequestBody(res)
    body = JSON.parse(requestBody) as WebhookOrder[]

    if (!body) return void res.writeStatus("400").end()
  } catch (e) {
    return void res.writeStatus("400").end()
  }

  try {
    const signature = computeSignature(
      config.WALLET_PAY_KEY,
      "POST",
      url,
      walletTimestamp,
      JSON.stringify(body)
    )

    if (signature !== walletSignature) return void res.writeStatus("401").end()
  } catch (e) {
    return void res.writeStatus("401").end()
  }

  for (const webhookOrder of body) {
    if (webhookOrder.type !== WebhookMessageType.ORDER_PAID) continue

    const deposit = await Deposit.findOne({
      _id: webhookOrder.payload.externalId
    })
    if (!deposit) continue

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    await Promise.all([
      Deposit.updateOne(
        { _id: deposit._id },
        {
          $inc: { balance: deposit.amount },
          $set: {
            paidAt: new Date(),
            receivedAmount: webhookOrder.payload.orderAmount.amount,
            receivedCurrency: webhookOrder.payload.orderAmount.currencyCode,
            status: "paid"
          }
        }
      )
    ])
  }

  if (!res.aborted)
    res.writeStatus("200").end(JSON.stringify({ success: true }))
}
