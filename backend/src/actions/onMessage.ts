import {
  playerChosenCardColor,
  playerPutCard,
  playerSkip,
  playerTakeCard,
  playerToggledReady,
  shoutUno,
  surrender
} from "@actions/moves"
import { sendError } from "@helpers/send"
import { MyRoom } from "@typings/room"
import { Client } from "colyseus"
import { isGameEvent, MessageInit, Player, PlayerDataClass } from "common"

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

  if ((!player || !player.info) && message.type !== "playerToggledReady") return

  if (player) player.status = "online"

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
      return surrender(context)
    case "shoutUno":
      return shoutUno(context)
    default:
      return sendError(client, "unknownAction")
  }
}
