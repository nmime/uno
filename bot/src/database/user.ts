import { InferSchemaType, model, Schema } from "mongoose"

const userSchema = new Schema(
  {
    id: { required: true, type: Number },
    lang: String,
    languageCode: String,
    name: String,
    username: String
  },
  {
    timestamps: true
  }
)

export type IUser = InferSchemaType<typeof userSchema>

export const User = model("User", userSchema)
