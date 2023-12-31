import { parseInitData } from "@tma.js/sdk"
import config from "@typings/config"
import { validation } from "@utils/validation"
import axios from "axios"
import { Deposit, IDeposit } from "common/database"
import { defaultLocale } from "common/typings/languages"
import { HttpRequest, HttpResponse } from "uWebSockets.js"

export async function createOrder(
  res: HttpResponse,
  req: HttpRequest
): Promise<void> {
  res.onAborted(() => {
    res.aborted = true
  })

  const Authorization = req.getHeader("authorization")
  if (!validation(Authorization.split(" ")[1]))
    return void res.writeStatus("401").end()

  const dataOfAuth = parseInitData(Authorization.split(" ")[1])
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const languageLocale = await import(
    `common/locales/${dataOfAuth.user.languageCode || defaultLocale}.json`
  )
  const amount = Number(req.getQuery("amount"))
  const currency = req.getQuery("currency")
  const userId = Number(req.getQuery("userId"))

  if (isNaN(amount) || !currency || isNaN(userId))
    return void res.writeStatus("400").end()

  const deposit = await Deposit.create({
    amount,
    createdAt: new Date(),
    currency: "MONEY",
    per: amount.toString(),
    provider: "wallet",
    status: "pending",
    userId
  } as IDeposit)

  try {
    const order = await axios.post(
      `https://pay.wallet.tg/wpay/store-api/v1/order`,
      {
        amount: {
          amount: (amount / 100) * 2,
          currencyCode: currency
        },
        customerTelegramUserId: userId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        description: languageLocale.Deposit.description,
        externalId: deposit._id,
        failReturnUrl: `https://t.me/${
          config.BOT_USERNAME
        }/deposit?startApp=${deposit._id.toHexString()}_unsuccessful&startapp=${deposit._id.toHexString()}_unsuccessful`,
        returnUrl: `https://t.me/${
          config.BOT_USERNAME
        }/deposit?startApp=${deposit._id.toHexString()}_successful&startapp=${deposit._id.toHexString()}_successful`,
        timeoutSeconds: 43200
      },
      {
        headers: { "Wpay-Store-Api-Key": config.WALLET_PAY_KEY }
      }
    )
    if (!order.data) return void res.writeStatus("406").end()

    if (!res.aborted) res.writeStatus("200").end(JSON.stringify(order.data))
  } catch (e) {
    return void res.writeStatus("406").end()
  }
}
