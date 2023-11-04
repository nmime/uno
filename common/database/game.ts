import { InferSchemaType, model, Schema } from "mongoose"

const gameSchema = new Schema({
  bet: Number,
  createdAt: Date,
  id: String,
  players: [
    {
      _id: false,
      id: Number,
      points: Number,
      surrender: Boolean,
      winAmount: Number
    }
  ],
  status: String,
  tax: Number
})

export type IGame = InferSchemaType<typeof gameSchema>

export const Game = model("Game", gameSchema)
