import { GameEvents } from "common"
import { MyRoom } from "@typings/room"

export default function timer(room: MyRoom, actor: number, state: GameEvents) {
  const playerID = String(actor)
  const player = room.state.players.get(playerID)

  if (
    room.state.currentPlayer !== player.info.id ||
    (state === "playerChooseCardColor" &&
      player.playerState !== "chooseColor") ||
    (state === "playerTookCard" && player.playerState !== "tookCards")
  )
    return
}
