import { InferSchemaType, model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    alive: {
      default: true,
      type: Boolean
    },
    balance: {
      default: 1000,
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
    lastMessage: Date,
    name: String,
    specialBalance: {
      default: 10,
      type: Number
    },
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
