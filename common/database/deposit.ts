import { InferSchemaType, model, Schema } from "mongoose"

const depositSchema = new Schema(
  {
    amount: Number,
    createdAt: Date,
    currency: String,
    custom: String,
    paidAt: Date,
    per: String,
    provider: String,
    receivedAmount: Number,
    receivedCurrency: String,
    status: String,
    userId: Number
  },
  {
    timestamps: true
  }
)

export type IDeposit = InferSchemaType<typeof depositSchema>

export const Deposit = model("Deposit", depositSchema)
