import { InferSchemaType, model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    balance: {
      default: 1000,
      type: Number
    },
    id: { required: true, type: Number },
    lang: String,
    languageCode: String,
    name: String,
    specialBalance: {
      default: 10,
      type: Number
    },
    username: String
  },
  {
    timestamps: true
  }
)

export type IUser = InferSchemaType<typeof userSchema>

export const User = model("User", userSchema)
