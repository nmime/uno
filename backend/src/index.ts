import config from "@typings/config"

import express from "express"
import expressify from "uwebsockets-express"

import { Server } from "@colyseus/core"
import { monitor } from "@colyseus/monitor"
import { playground } from "@colyseus/playground"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import { RedisDriver } from "colyseus"

import { MyRoom } from "@typings/room"

const transport = new uWebSocketsTransport()
const gameServer = new Server({
  // devMode: config.NODE_ENV === "development",
  driver: new RedisDriver(config.REDIS_URI),
  transport: transport
})

gameServer.define("game", MyRoom)

const app = expressify(transport.app)
app.use(express.json())

app.use("/playground", playground)
app.use("/colyseus", monitor())

void (async () => {
  await gameServer.listen(config.SOCKET_PORT)

  app.listen(config.PORT)

  console.log("BACKEND successful started")
})()
