import { InferSchemaType, model, Schema } from "mongoose"

const AdRefSchema = new Schema(
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
    },
    uniqueCounter: {
      default: 0,
      type: Number
    }
  },
  {
    timestamps: true
  }
)

export type IAdRef = InferSchemaType<typeof AdRefSchema>

export const AdRef = model("AdRef", AdRefSchema)
