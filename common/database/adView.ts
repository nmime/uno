import { InferSchemaType, model, Schema } from "mongoose"

const AdViewSchema = new Schema({
  adId: String,
  createdAt: Date,
  eventHash: String,
  lang: String,
  reward: Number,
  userId: Number
})
AdViewSchema.index({ eventHash: 1, userId: 1 }, { unique: true })

export type IAdView = InferSchemaType<typeof AdViewSchema>

export const AdView = model("AdView", AdViewSchema)
