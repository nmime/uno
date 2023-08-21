import { Client } from "colyseus"
import { isGameEvent, MessageInit, Player, PlayerDataClass } from "common"
import { MyRoom } from "@typings/room"
import {
  playerChosenCardColor,
  playerPutCard,
  playerSkip,
  playerTakeCard,
  playerToggledReady
} from "@actions/moves"

export interface MoveContext {
  client: Client<Player>
  room: MyRoom
  message: MessageInit
  player: PlayerDataClass
  playerID: string
}

export default function onMessage(
  room: MyRoom,
  client: Client<Player>,
  message: MessageInit
) {
  if (!isGameEvent(message.type)) return

  const playerID = String(client.userData.id)
  const player = room.state.players.get(playerID)

  player.status = "online"

  const context: MoveContext = {
    client,
    message,
    player,
    playerID,
    room
  }

  switch (message.type) {
    case "playerToggledReady":
      return playerToggledReady(context)
    case "playerPutCard":
      return playerPutCard(context)
    case "playerTakeCard":
      return playerTakeCard(context)
    case "playerChosenCardColor":
      return playerChosenCardColor(context)
    case "playerSkip":
      return playerSkip(context)
    case "playerSurrender":
      // Handle player surrender if needed
      break
    default:
      return client.send("game", {
        type: "unknownAction"
      })
  }
}
