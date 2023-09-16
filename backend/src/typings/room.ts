import { Room } from "colyseus"
import { GameStatus, MyState } from "common"

import onCreate from "@actions/onCreate"
import onAuth from "@actions/onAuth"
import onJoin from "@actions/onJoin"
import onLeave from "@actions/onLeave"
import onDispose from "@actions/onDispose"

interface Metadata {
  bet: number
  creatorId: number
  creatorName: string
  maxPlayers: number
  playersCount: number
  status: GameStatus
}

export class MyRoom extends Room<MyState, Metadata> {
  onCreate = onCreate
  onAuth = onAuth
  onJoin = onJoin
  onLeave = onLeave
  onDispose = onDispose
}
