interface WebhookPayload {
  id: number
  number: string
  externalId: string
  status: OrderStatus
  customData?: string | null
  orderAmount: MoneyAmount
  selectedPaymentOption?: PaymentOption
  orderCompletedDateTime: string // ISO 8601 timestamp in UTC
}

interface MoneyAmount {
  currencyCode: string
  amount: string
}

interface PaymentOption {
  amount: MoneyAmount
  amountFee: MoneyAmount
  amountNet: MoneyAmount
  exchangeRate: string
}

enum OrderStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
  CANCELLED = "CANCELLED"
}

enum WebhookMessageType {
  ORDER_FAILED = "ORDER_FAILED",
  ORDER_PAID = "ORDER_PAID"
}

export interface WebhookOrder {
  eventDateTime: string
  eventId: number
  type: WebhookMessageType
  payload: WebhookPayload
}
