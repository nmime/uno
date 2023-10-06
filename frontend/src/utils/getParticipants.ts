import { Game } from "@typings/game"
import { PlayerDataClass } from "common"

const getParticipants = (game: Game): Map<string, PlayerDataClass> => {
  const participants = new Map<string, PlayerDataClass>(game.players)

  if (game.status !== "playing") {
    participants.clear()

    game.visitors.forEach((value, key) => {
      if (!participants.has(key)) {
        const player = new PlayerDataClass()
        player.info = value

        participants.set(key, player)
      }
    })

    game.players.forEach((value, key) => {
      participants.set(key, value)
    })
  }

  return participants
}

export default getParticipants
