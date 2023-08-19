import { InferSchemaType, model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    balance: Number,
    id: { required: true, type: Number },
    lang: String,
    languageCode: String,
    name: String,
    specialBalance: Number,
    username: String
  },
  {
    timestamps: true
  }
)

export type IUser = InferSchemaType<typeof userSchema>

export const User = model("User", userSchema)
