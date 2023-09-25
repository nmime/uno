import { InferSchemaType, model, Schema } from "mongoose"

const adRefSchema = new Schema(
  {
    firstUsage: Date,
    lastUsage: Date,
    name: {
      index: true,
      type: String,
      unique: true
    },
    newCounter: {
      default: 0,
      type: Number
    },
    price: Number,
    total: {
      default: 0,
      type: Number
    }
  },
  {
    timestamps: true
  }
)

export type IAdRef = InferSchemaType<typeof adRefSchema>

export const adRef = model("adRef", adRefSchema)
