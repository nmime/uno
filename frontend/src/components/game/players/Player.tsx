import { DimensionContext } from "@contexts/Dimension"
import { GameContext } from "@contexts/Game"
import CircularProgressBar from "@players/CircularProgressBar"
import { Information } from "@players/Information"
import { Game } from "@typings/game"
import type { PlayerDataClass } from "common"
import { MessageInit } from "common"
import Image from "next/image"
import React, { useContext } from "react"

export type PlayerProps = {
  player: PlayerDataClass
  position: { top: boolean; left: boolean; right: boolean }
  currentPlayer?: Game["currentPlayer"]
  thisPlayer?: PlayerDataClass
}

export default function Player({
  currentPlayer,
  player,
  position,
  thisPlayer
}: PlayerProps) {
  const { game, room } = useContext(GameContext)
  const { playerSize } = useContext(DimensionContext)

  const isUno =
    game.status === "playing" &&
    player.info.id === game.previousPlayer &&
    game.players.get(String(game.previousPlayer))?.shoutedUno !== true &&
    player.cardsCount === 1

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: `${playerSize * 1.2}px`,
        width: `${playerSize * 1.2}px`
      }}
      onClick={() => {
        if (!isUno) return

        room.send("game", {
          playerTo: String(player.info.id),
          type: "shoutUno"
        } as MessageInit)
      }}
    >
      <CircularProgressBar playerProps={{ currentPlayer, player, position }} />
      <div className="relative " style={{ width: `${playerSize * 0.7}px` }}>
        <Image
          className="rounded-full object-cover"
          src={`https://unogame.site/images/${player.info.id}.jpg`}
          width={playerSize}
          height={playerSize}
          priority={false}
          unoptimized={true}
          alt=""
        />
        {isUno && (
          <Image
            src={`/assets/fire.svg`}
            alt=""
            width={playerSize * 0.4}
            height={playerSize * 0.4}
            className="absolute left-1/2 top-0 -translate-x-1/2 animate-pulse cursor-pointer"
          />
        )}
      </div>
      <Information playerProps={{ player, position, thisPlayer }} />
    </div>
  )
}
