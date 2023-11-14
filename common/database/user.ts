import { InferSchemaType, model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    alive: {
      default: true,
      type: Boolean
    },
    balance: {
      default: 100,
      type: Number
    },
    ban: {
      default: false,
      type: Boolean
    },
    from: String,
    id: { index: true, required: true, type: Number },
    lang: String,
    languageCode: String,
    lastActivity: Date,
    name: String,
    referralAccrual: {
      default: 0,
      type: Number
    },
    referralCounter: {
      default: 0,
      type: Number
    },
    state: String,
    statistics: {
      lose: {
        default: 0,
        type: Number
      },
      win: {
        default: 0,
        type: Number
      }
    },
    username: String
  },
  {
    timestamps: true
  }
)

export type IUser = InferSchemaType<typeof userSchema>

export const User = model("User", userSchema)
