import { InferSchemaType, model, Schema } from "mongoose"

const groupSchema = new Schema(
  {
    alive: {
      default: true,
      type: Boolean
    },
    gameId: String,
    id: { index: true, required: true, type: Number, unique: true },
    lastActivity: Date,
    membersQuantity: Number,
    title: String,
    username: String
  },
  {
    timestamps: true
  }
)

export type IGroup = InferSchemaType<typeof groupSchema>

export const Group = model("Group", groupSchema)
